import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Spinner from '../../components/Spinner/Spinner';
import { Link } from 'react-router-dom';
const TeacherRequests = () => {
  const queryClient = useQueryClient();

  const axiosSecure = useAxiosSecure();

  // 🔍 Fetch all teacher requests
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ['teacherRequests'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/teacher-requests');
      return res.data;
    },
  });

  //  Approve request mutation
  const approveMutation = useMutation({
    mutationFn: async id => {
      await axiosSecure.patch(`/admin/teacher-requests/approve/${id}`);
    },
    onSuccess: () => {
      toast.success('Approved successfully');
      queryClient.invalidateQueries(['teacherRequests']);
    },
    onError: () => toast.error('Approval failed'),
  });

  //  Reject request mutation
  const rejectMutation = useMutation({
    mutationFn: async id => {
      await axiosSecure.patch(`/admin/teacher-requests/reject/${id}`);
    },
    onSuccess: () => {
      toast.success('Rejected successfully');
      queryClient.invalidateQueries(['teacherRequests']);
    },
    onError: () => toast.error('Rejection failed'),
  });

  if (isLoading) return <Spinner></Spinner>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📋 Teacher Requests</h2>
      <div className="overflow-x-auto rounded-xl">
        <table className="table w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th>#</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Experience</th>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => {
              const isFinal =
                request.status === 'accepted' || request.status === 'rejected';
              return (
                <tr key={request._id} className="border-b hover:bg-gray-50">
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={request.photo}
                      alt="user"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td>{request.name}</td>
                  <td>{request.experience}</td>
                  <td>{request.title}</td>
                  <td>{request.category}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        request.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : request.status === 'accepted'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="flex gap-2 justify-center">
                    <Link
                      variant="success"
                      size="sm"
                      disabled={isFinal}
                      onClick={() => approveMutation.mutate(request._id)}
                    >
                      Approve
                    </Link>
                    <Link
                      variant="destructive"
                      size="sm"
                      disabled={isFinal}
                      onClick={() => rejectMutation.mutate(request._id)}
                    >
                      Reject
                    </Link>
                  </td>
                </tr>
              );
            })}
            {requests.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center text-gray-500 py-6">
                  No teacher requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherRequests;
