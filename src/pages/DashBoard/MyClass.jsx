import { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Link } from 'react-router';
import AuthContext from '../../contexts/AuthContext';
import Spinner from '../../components/Spinner/Spinner';

const MyClasses = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [classes, setClasses] = useState([]);
  const [updatingClass, setUpdatingClass] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/teacher/classes?email=${user.email}`)
        .then(res => setClasses(res.data))
        .catch(err => console.error(err));
    }
  }, [user, axiosSecure]);

  const handleDelete = async id => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this class!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/teacher/classes/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire('Deleted!', 'Your class has been deleted.', 'success');
          setClasses(prev => prev.filter(cls => cls._id !== id));
        }
      } catch (error) {
        Swal.fire('Error!', 'Failed to delete the class.', 'error');
      }
    }
  };

  const handleUpdate = async e => {
    e.preventDefault();
    const form = e.target;
    const updated = {
      title: form.title.value,
      price: parseFloat(form.price.value),
      description: form.description.value,
      image: form.image.value,
    };

    try {
      const res = await axiosSecure.patch(
        `/teacher/classes/${updatingClass._id}`,
        updated
      );
      if (res.data.modifiedCount > 0) {
        Swal.fire('Success!', 'Class updated.', 'success');
        setUpdatingClass(null);
        // Re-fetch classes
        const refresh = await axiosSecure.get(
          `/teacher/classes?email=${user.email}`
        );
        setClasses(refresh.data);
      }
    } catch (error) {
      Swal.fire('Error!', 'Update failed.', 'error');
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="w-full p-5">
      <h2 className="text-2xl font-bold mb-4">📚 My Classes</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map(cls => (
          <div key={cls._id} className="card bg-base-100 shadow-xl">
            <figure>
              <img
                src={cls.image}
                alt={cls.title}
                className="h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{cls.title}</h2>
              <p>{cls.description}</p>
              <p>
                <b>Price:</b> ${cls.price}
              </p>
              <p>
                <b>Status:</b> {cls.status}
              </p>
              <div className="flex gap-2 mt-4">
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => setUpdatingClass(cls)}
                >
                  Update
                </button>
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => handleDelete(cls._id)}
                >
                  Delete
                </button>
                <Link
                  to={`/dashboard/my-class/${cls._id}`}
                  className={`btn btn-sm ${
                    cls.status === 'approved' ? 'btn-primary' : 'btn-disabled'
                  }`}
                >
                  See Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for update */}
      {updatingClass && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-xl max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">✏️ Update Class</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                name="title"
                defaultValue={updatingClass.title}
                required
                className="input input-bordered w-full"
              />
              <input
                type="number"
                name="price"
                defaultValue={updatingClass.price}
                required
                className="input input-bordered w-full"
              />
              <textarea
                name="description"
                defaultValue={updatingClass.description}
                required
                className="textarea textarea-bordered w-full"
              ></textarea>
              <input
                type="text"
                name="image"
                defaultValue={updatingClass.image}
                required
                className="input input-bordered w-full"
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setUpdatingClass(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyClasses;
