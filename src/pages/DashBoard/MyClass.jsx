import Swal from 'sweetalert2';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyClass = () => {
  const { user } = useAuthContext();
  const [editingClass, setEditingClass] = useState(null);
  const navigate = useNavigate();

  const handleDelete = async id => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this class?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/teacher/classes/${id}`);
      toast.success('Class deleted');
      refetch();
    }
  };

  const handleUpdate = async data => {
    await axiosSecure.patch(`/teacher/classes/${editingClass._id}`, data);
    setEditingClass(null);
    refetch();
    toast.success('Class updated');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {myClasses.map(cls => (
        <div key={cls._id} className="card bg-white shadow-md">
          <img src={cls.image} className="h-40 object-cover rounded-t" />
          <div className="p-4">
            <h3 className="text-xl font-bold">{cls.title}</h3>
            <p>
              <strong>Teacher:</strong> {cls.teacherName}
            </p>
            <p>
              <strong>Email:</strong> {cls.teacherEmail}
            </p>
            <p>
              <strong>Price:</strong> ${cls.price}
            </p>
            <p className="mb-2">
              <strong>Status:</strong>
              <span
                className={`badge ml-2 ${
                  cls.status === 'approved' ? 'badge-success' : 'badge-warning'
                }`}
              >
                {cls.status}
              </span>
            </p>
            <div className="flex gap-2">
              <button
                className="btn btn-sm btn-outline"
                onClick={() => setEditingClass(cls)}
              >
                Update
              </button>
              <button
                className="btn btn-sm btn-error"
                onClick={() => handleDelete(cls._id)}
              >
                Delete
              </button>
              <button
                className="btn btn-sm btn-info"
                disabled={cls.status !== 'approved'}
                onClick={() =>
                  navigate(`/dashboard/teacher/my-class/${cls._id}`)
                }
              >
                See Details
              </button>
            </div>
          </div>
        </div>
      ))}

      {editingClass && (
        <UpdateClassModal
          cls={editingClass}
          onClose={() => setEditingClass(null)}
          onSubmit={handleUpdate}
        />
      )}
    </div>
  );
};
