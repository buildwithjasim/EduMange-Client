import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Spinner from '../../components/Spinner/Spinner';

const TeacherRequests = () => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ['teacherRequests'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/teacher-requests');
      return res.data;
    },
  });

  const approveMutation = useMutation({
    mutationFn: async id => {
      await axiosSecure.patch(`/admin/teacher-requests/approve/${id}`);
    },
    onSuccess: () => {
      toast.success('✅ Approved successfully');
      queryClient.invalidateQueries(['teacherRequests']);
    },
    onError: () => toast.error('❌ Approval failed'),
  });

  const rejectMutation = useMutation({
    mutationFn: async id => {
      await axiosSecure.patch(`/admin/teacher-requests/reject/${id}`);
    },
    onSuccess: () => {
      toast.success('✅ Rejected successfully');
      queryClient.invalidateQueries(['teacherRequests']);
    },
    onError: () => toast.error('❌ Rejection failed'),
  });

  if (isLoading) return <Spinner />;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-primary">
        📋 Teacher Requests
      </h2>
      <div className="overflow-x-auto rounded-2xl shadow-lg">
        <table className="table w-full text-sm bg-background">
          <thead className="bg-primary/20 text-primary uppercase text-xs">
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
            {requests.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center text-text/60 py-6">
                  No teacher requests found.
                </td>
              </tr>
            )}

            {requests.map((request, index) => {
              const isFinal =
                request.status === 'accepted' || request.status === 'rejected';

              return (
                <tr
                  key={request._id}
                  className="border-b hover:bg-primary/10 transition-colors"
                >
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={request.photo}
                      alt="user"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="text-primary font-medium">{request.name}</td>
                  <td>{request.experience}</td>
                  <td>{request.title}</td>
                  <td>{request.category}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        request.status === 'pending'
                          ? 'bg-accent/20 text-accent'
                          : request.status === 'accepted'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="flex gap-2 justify-center">
                    <button
                      className="btn btn-accent btn-sm text-white"
                      disabled={isFinal || approveMutation.isPending}
                      onClick={() => approveMutation.mutate(request._id)}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-error btn-sm text-white"
                      disabled={isFinal || rejectMutation.isPending}
                      onClick={() => rejectMutation.mutate(request._id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherRequests;
