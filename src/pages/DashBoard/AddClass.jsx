import { useForm } from 'react-hook-form';

import AuthContext from '../../contexts/AuthContext';
import { useContext } from 'react';
import Spinner from '../../components/Spinner/Spinner';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const AddClass = () => {
  const { user, loading } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure(); // ✅ must call

  if (loading) return <Spinner />;

  const onSubmit = async data => {
    const classData = {
      title: data.title,
      teacherName: user.displayName,
      teacherEmail: user.email,
      price: data.price,
      description: data.description,
      image: data.image,
    };

    try {
      const res = await axiosSecure.post('/teacher/classes', classData);

      if (res.data.insertedId) {
        Swal.fire({
          icon: 'success',
          title: '✅ Class Added!',
          text: 'Your class has been submitted for review.',
          confirmButtonColor: '#3085d6',
        });

        reset();
        navigate('/dashboard/my-classes');
      }
    } catch (err) {
      console.error('Submit error:', err); // debug
      Swal.fire({
        icon: 'error',
        title: '❌ Failed to Add Class',
        text:
          err.response?.data?.error ||
          'Something went wrong. Please try again.',
        confirmButtonColor: '#d33',
      });
    }
  };

  return (
    <div className="w-full p-15 mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">➕ Add New Class</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Title</label>
          <input
            {...register('title')}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label>Your Name</label>
          <input
            value={user.displayName}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>
        <div>
          <label>Email</label>
          <input
            value={user.email}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            {...register('price')}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            {...register('description')}
            required
            className="textarea textarea-bordered w-full"
          />
        </div>
        <div>
          <label>Image URL</label>
          <input
            {...register('image')}
            required
            className="input input-bordered w-full"
          />
        </div>
        <button className="btn btn-primary w-full" type="submit">
          Add Class
        </button>
      </form>
    </div>
  );
};

export default AddClass;
