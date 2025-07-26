import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import AuthContext from '../../contexts/AuthContext';
import { useContext } from 'react';

const AddClass = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async data => {
    const payload = {
      title: data.title,
      teacherName: user.displayName,
      teacherEmail: user.email,
      price: data.price,
      description: data.description,
      image: data.image,
    };

    console.log(payload);

    try {
      const res = await axios.post('/teacher/classes', payload);
      if (res.data.insertedId) {
        toast.success('✅ Class added for review!');
        reset();
        navigate('/dashboard/teacher/my-classes');
      }
    } catch (err) {
      toast.error('❌ Failed to add class.');
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
