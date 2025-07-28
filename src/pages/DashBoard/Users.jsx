import { useEffect, useState, useCallback } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const Users = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const limit = 10;

  // 🔁 Fetch users
  const fetchUsers = useCallback(async () => {
    try {
      const res = await axiosSecure.get(
        `/users?search=${search}&page=${page}&limit=${limit}`
      );
      setUsers(res.data.users || []);
      setCount(res.data.count || 0);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  }, [axiosSecure, search, page]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // 👑 Make Admin
  const handleMakeAdmin = async id => {
    try {
      await axiosSecure.patch(`/users/admin/${id}`);
      toast.success('User promoted to Admin!');
      // ✅ Update only the affected user
      setUsers(prev =>
        prev.map(user => (user._id === id ? { ...user, role: 'admin' } : user))
      );
    } catch (error) {
      toast.error('Failed to promote user');
    }
  };

  const totalPages = Math.ceil(count / limit);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">👥 All Users</h2>

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search by name or email"
        className="input input-bordered w-full max-w-md mb-4"
        value={search}
        onChange={e => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      {/* 📋 Users Table */}
      <div className="overflow-x-auto rounded-lg">
        <table className="table table-zebra w-full text-sm">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>User Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Make Admin</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user._id}>
                  <td>{(page - 1) * limit + index + 1}</td>
                  <td>
                    <img
                      src={user?.photoURL || '/default-avatar.png'}
                      alt="user"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td>{user?.name || 'Unknown'}</td>
                  <td>{user?.email}</td>
                  <td>
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      disabled={user?.role === 'admin'}
                      className={`btn btn-sm ${
                        user.role === 'admin' ? 'btn-success' : 'btn-primary'
                      }`}
                    >
                      {user?.role === 'admin' ? 'Admin' : 'Make Admin'}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🔄 Pagination */}
      <div className="flex justify-center mt-6 flex-wrap gap-2">
        {[...Array(totalPages).keys()].map(i => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`btn btn-sm ${
              i + 1 === page ? 'btn-accent' : 'btn-outline'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Users;
