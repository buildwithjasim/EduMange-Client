import { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import AuthContext from '../../contexts/AuthContext';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import Spinner from '../../components/Spinner/Spinner';

const categories = [
  'Web Development',
  'Digital Marketing',
  'Graphic Design',
  'Data Science',
  'Mobile Development',
];

const TeachOnEduManage = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const [teacherRequest, setTeacherRequest] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isFetching, setIsFetching] = useState(true); //

  if (loading) {
    return <Spinner></Spinner>;
  }

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.email) return;

      try {
        // 1. Fetch teacher request
        const requestRes = await axiosSecure.get('/teacher/request', {
          params: { email: user.email },
        });
        setTeacherRequest(requestRes.data || null);

        // 2. Fetch user role
        const roleRes = await axiosSecure.get(`/user/role?email=${user.email}`);
        setUserRole(roleRes.data?.role || 'student');
      } catch (err) {
        console.error(err);
        setUserRole('student');
      } finally {
        setIsFetching(false);
      }
    };

    fetchUserData();
  }, [user, axiosSecure]);

  const onSubmit = async data => {
    try {
      const payload = {
        email: user?.email,
        name: user?.displayName,
        photo: user?.photoURL,
        experience: data.experience,
        title: data.title,
        category: data.category,
      };

      await axiosSecure.post('/teacher/request', payload);
      Swal.fire(
        'Success',
        'Your request has been submitted for review.',
        'success'
      );
      setTeacherRequest({ ...payload, status: 'pending' });
      reset();
    } catch (err) {
      Swal.fire(
        'Error',
        err.response?.data?.error || 'Submission failed',
        'error'
      );
    }
  };

  const handleResend = async () => {
    try {
      await axiosSecure.patch('/teacher/request/resend', {
        email: user?.email,
      });
      Swal.fire('Success', 'Your request has been sent again.', 'success');
      setTeacherRequest(prev => ({ ...prev, status: 'pending' }));
    } catch {
      Swal.fire('Error', 'Failed to resend your request.', 'error');
    }
  };

  if (loading || isFetching || !user) return <Spinner />;

  if (userRole === 'teacher') {
    return (
      <div className="p-5 text-center">
        <h2 className="text-2xl font-bold text-green-600">
          ✅ You are already a teacher.
        </h2>
      </div>
    );
  }

  if (teacherRequest?.status === 'pending') {
    return (
      <div className="p-5 text-center">
        <h2 className="text-2xl font-bold text-yellow-600">
          ⏳ Your teacher request is pending approval.
        </h2>
        <p>Please wait for the admin to review your application.</p>
      </div>
    );
  }

  if (teacherRequest?.status === 'rejected') {
    return (
      <div className="p-5 text-center">
        <h2 className="text-2xl font-bold text-red-600">
          ❌ Your teacher request was rejected.
        </h2>
        <button className="btn btn-primary mt-4" onClick={handleResend}>
          Resend Request
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-5 bg-white dark:bg-base-200 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center text-primary">
        📚 Apply to Teach on EduManage
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="font-medium">Name</label>
          <input
            type="text"
            value={user?.displayName || 'Unknown'}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        <div className="flex flex-col items-start">
          <label className="font-medium">Photo</label>
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt="User"
              className="w-24 h-24 rounded-full object-cover mt-2"
            />
          ) : (
            <p className="text-sm text-gray-500">No photo available</p>
          )}
        </div>

        <div>
          <label className="font-medium">Email</label>
          <input
            type="email"
            value={user?.email || ''}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        <div>
          <label className="font-medium">Experience</label>
          <select
            {...register('experience', { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select experience level</option>
            <option value="beginner">Beginner</option>
            <option value="mid-level">Mid-Level</option>
            <option value="experienced">Experienced</option>
          </select>
        </div>

        <div>
          <label className="font-medium">Title</label>
          <input
            type="text"
            {...register('title', { required: true })}
            placeholder="Your teaching title"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="font-medium">Category</label>
          <select
            {...register('category', { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select a category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Submit for Review
        </button>
      </form>
    </div>
  );
};

export default TeachOnEduManage;
