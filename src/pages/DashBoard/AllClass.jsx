import { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const AllClass = () => {
  const axiosSecure = useAxiosSecure();
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    axiosSecure
      .get('/admin/classes')
      .then(res => setClasses(res.data))
      .catch(err => console.error(err));
  }, [axiosSecure]);

  const handleApprove = async id => {
    try {
      const res = await axiosSecure.patch(`/admin/classes/approve/${id}`);
      if (res.data.modifiedCount > 0) {
        Swal.fire('✅ Approved!', 'Class has been approved.', 'success');
        setClasses(prev =>
          prev.map(cls =>
            cls._id === id ? { ...cls, status: 'approved' } : cls
          )
        );
      }
    } catch (error) {
      Swal.fire('❌ Error', 'Could not approve the class', 'error');
    }
  };

  const handleReject = async id => {
    try {
      const res = await axiosSecure.patch(`/admin/classes/reject/${id}`);
      if (res.data.modifiedCount > 0) {
        Swal.fire('ℹ️ Rejected!', 'Class has been rejected.', 'info');
        setClasses(prev =>
          prev.map(cls =>
            cls._id === id ? { ...cls, status: 'rejected' } : cls
          )
        );
      }
    } catch (error) {
      Swal.fire('❌ Error', 'Could not reject the class', 'error');
    }
  };

  const visibleClasses = classes.filter(cls => cls.status !== 'rejected');

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-[80vh]">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        📋 Manage Submitted Classes
      </h2>

      <div className="overflow-x-auto shadow-lg rounded-lg bg-white dark:bg-gray-800">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm text-gray-700 dark:text-gray-200">
          <thead className="bg-gray-100 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-300 uppercase">
            <tr>
              <th className="px-6 py-4 text-left">Image</th>
              <th className="px-6 py-4 text-left">Title</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Description</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
              <th className="px-6 py-4 text-center">Progress</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {visibleClasses.map(cls => (
              <tr
                key={cls._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <td className="px-6 py-4">
                  <img
                    src={cls.image}
                    alt={cls.title}
                    className="w-14 h-14 rounded object-cover border"
                  />
                </td>
                <td className="px-6 py-4 font-medium">{cls.title}</td>
                <td className="px-6 py-4">{cls.teacherEmail}</td>
                <td className="px-6 py-4">
                  <span title={cls.description}>
                    {cls.description.slice(0, 50)}...
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                      cls.status === 'approved'
                        ? 'bg-green-100 text-green-700'
                        : cls.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {cls.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex flex-col lg:flex-row items-center justify-center gap-2">
                    <button
                      onClick={() => handleApprove(cls._id)}
                      disabled={cls.status !== 'pending'}
                      className="btn btn-sm bg-green-500 hover:bg-green-600 text-white disabled:opacity-50 w-24"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(cls._id)}
                      disabled={cls.status !== 'pending'}
                      className="btn btn-sm bg-red-500 hover:bg-red-600 text-white disabled:opacity-50 w-24"
                    >
                      Reject
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  {cls.status === 'approved' ? (
                    <Link
                      to={`/dashboard/class-progress/${cls._id}`}
                      className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      View Progress
                    </Link>
                  ) : (
                    <button
                      className="btn btn-sm bg-gray-400 text-white cursor-not-allowed"
                      disabled
                    >
                      Disabled
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllClass;
