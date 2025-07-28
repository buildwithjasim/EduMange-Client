import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';

const MyClass = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState(null); // for update modal
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  // Fetch teacher classes on mount
  useEffect(() => {
    if (!user?.email) return;
    setLoading(true);
    axiosSecure
      .get('/teacher/classes', { params: { email: user.email } })
      .then(res => {
        setClasses(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [user, axiosSecure]);

  // Delete confirmation + delete action
  const handleDelete = classId => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this class!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/teacher/classes/${classId}`);
          Swal.fire('Deleted!', 'Class has been deleted.', 'success');
          setClasses(prev => prev.filter(c => c._id !== classId));
        } catch (error) {
          console.error(error);
          Swal.fire('Error!', 'Failed to delete the class.', 'error');
        }
      }
    });
  };

  // Open update modal
  const openUpdateModal = classData => {
    setSelectedClass(classData);
    setShowUpdateModal(true);
  };

  // Handle update submit
  const handleUpdateSubmit = async e => {
    e.preventDefault();
    if (!selectedClass) return;
    try {
      const { _id, price, description, title, image } = selectedClass;
      // Only send fields that can be updated
      await axiosSecure.patch(`/teacher/classes/${_id}`, {
        price: parseFloat(price),
        description,
        title,
        image,
      });

      Swal.fire('Success', 'Class updated successfully', 'success');
      setShowUpdateModal(false);
      // Refresh the list with updated data
      setClasses(prev =>
        prev.map(c =>
          c._id === _id ? { ...c, price, description, title, image } : c
        )
      );
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Failed to update class', 'error');
    }
  };

  if (loading)
    return <p className="text-center mt-10">Loading your classes...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Classes</h1>

      {classes.length === 0 && (
        <p className="text-center">You have not added any classes yet.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {classes.map(cls => (
          <div
            key={cls._id}
            className="border rounded shadow p-4 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold">{cls.title}</h2>
              <p>
                <strong>Teacher:</strong> {cls.teacherName} ({cls.teacherEmail})
              </p>
              <p>
                <strong>Price:</strong> ${cls.price}
              </p>
              <p className="mt-2">{cls.description}</p>
              {cls.image && (
                <img
                  src={cls.image}
                  alt={cls.title}
                  className="mt-4 w-full h-40 object-cover rounded"
                />
              )}
              <p className="mt-2 font-semibold">
                Status:
                <span
                  className={`ml-1 ${
                    cls.status === 'approved'
                      ? 'text-green-600'
                      : cls.status === 'pending'
                      ? 'text-yellow-600'
                      : 'text-red-600'
                  }`}
                >
                  {cls.status}
                </span>
              </p>
            </div>

            <div className="mt-4 flex gap-2 justify-end">
              <button
                onClick={() => openUpdateModal(cls)}
                className="btn btn-sm btn-warning"
              >
                Update
              </button>

              <button
                onClick={() => handleDelete(cls._id)}
                className="btn btn-sm btn-error"
              >
                Delete
              </button>

              <button
                onClick={() => navigate(`/dashboard/my-class/${cls._id}`)}
                className="btn btn-sm btn-primary"
                disabled={cls.status !== 'approved'}
                title={
                  cls.status !== 'approved'
                    ? 'Wait until admin approves this class'
                    : 'See class details'
                }
              >
                See Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Update Modal */}
      {showUpdateModal && selectedClass && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-lg">
            <h3 className="text-xl font-bold mb-4">Update Class</h3>
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div>
                <label className="block font-medium">Title</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={selectedClass.title}
                  onChange={e =>
                    setSelectedClass(prev => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div>
                <label className="block font-medium">Price</label>
                <input
                  type="number"
                  step="0.01"
                  className="input input-bordered w-full"
                  value={selectedClass.price}
                  onChange={e =>
                    setSelectedClass(prev => ({
                      ...prev,
                      price: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div>
                <label className="block font-medium">Description</label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  value={selectedClass.description}
                  onChange={e =>
                    setSelectedClass(prev => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div>
                <label className="block font-medium">Image URL</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={selectedClass.image || ''}
                  onChange={e =>
                    setSelectedClass(prev => ({
                      ...prev,
                      image: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setShowUpdateModal(false)}
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

export default MyClass;
