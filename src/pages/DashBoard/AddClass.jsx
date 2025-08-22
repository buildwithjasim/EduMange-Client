import { useForm } from 'react-hook-form';
import AuthContext from '../../contexts/AuthContext';
import { useContext } from 'react';
import Spinner from '../../components/Spinner/Spinner';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AddClass = () => {
  const { user, loading } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  if (loading) return <Spinner />;

  const onSubmit = async data => {
    const classData = {
      title: data.title,
      teacherName: user.displayName,
      teacherEmail: user.email,
      price: parseFloat(data.price),
      description: data.description,
      image: data.image,
    };

    try {
      const res = await axiosSecure.post('/teacher/classes', classData);

      if (res.data.insertedId) {
        Swal.fire({
          icon: 'success',
          title: '✅ Class Added!',
          text: 'Your class has been submitted for admin review.',
          confirmButtonColor: '#2563eb', // primary color
        });

        reset();
        navigate('/dashboard/my-class');
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: '❌ Failed to Add Class',
        text:
          err.response?.data?.error ||
          'Something went wrong. Please try again.',
        confirmButtonColor: '#d33', // red for error
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-background dark:bg-gray-900 rounded-2xl shadow-lg mt-8">
      <h2 className="text-3xl font-bold text-primary mb-6 text-center">
        Submit a New Class
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block mb-1 font-semibold text-text dark:text-text/80">
            Class Title
          </label>
          <input
            {...register('title')}
            required
            placeholder="e.g. Advanced JavaScript"
            className="input input-bordered w-full border-primary focus:border-accent focus:ring-accent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold text-text dark:text-text/80">
              Your Name
            </label>
            <input
              value={user.displayName}
              readOnly
              className="input input-bordered w-full bg-primary/10 dark:bg-primary/20 text-primary"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-text dark:text-text/80">
              Email
            </label>
            <input
              value={user.email}
              readOnly
              className="input input-bordered w-full bg-primary/10 dark:bg-primary/20 text-primary"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-semibold text-text dark:text-text/80">
            Price (USD)
          </label>
          <input
            type="number"
            {...register('price')}
            required
            placeholder="e.g. 29.99"
            step="0.01"
            className="input input-bordered w-full border-primary focus:border-accent focus:ring-accent"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-text dark:text-text/80">
            Description
          </label>
          <textarea
            {...register('description')}
            required
            placeholder="Brief description about the course"
            className="textarea textarea-bordered w-full min-h-[100px] border-primary focus:border-accent focus:ring-accent"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-text dark:text-text/80">
            Image URL
          </label>
          <input
            {...register('image')}
            required
            placeholder="Paste image URL here"
            className="input input-bordered w-full border-primary focus:border-accent focus:ring-accent"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full text-white text-lg tracking-wide shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
        >
          Submit Class for Review
        </button>
      </form>
    </div>
  );
};

export default AddClass;
