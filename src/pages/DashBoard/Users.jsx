import { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Users = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const limit = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axiosSecure.get(
        `/users?search=${search}&page=${page}&limit=${limit}`
      );
      setUsers(res.data.users);
      setCount(res.data.count);
    };
    fetchUsers();
  }, [search, page]);

  const handleMakeAdmin = async id => {
    await axiosSecure.patch(`/users/admin/${id}`);
    // Refresh users
    const res = await axiosSecure.get(
      `/users?search=${search}&page=${page}&limit=${limit}`
    );
    setUsers(res.data.users);
  };

  const totalPages = Math.ceil(count / limit);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Users</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name or email"
        className="input input-bordered w-full mb-4"
        value={search}
        onChange={e => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>User Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Make Admin</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{(page - 1) * limit + index + 1}</td>
                <td>
                  <img
                    src={user.photoURL}
                    alt="user"
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td>{user.displayName}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    onClick={() => handleMakeAdmin(user._id)}
                    disabled={user.role === 'admin'}
                    className="btn btn-sm btn-primary"
                  >
                    {user.role === 'admin' ? 'Admin' : 'Make Admin'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
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
