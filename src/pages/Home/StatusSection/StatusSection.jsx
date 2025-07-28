import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const StatsSection = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const [usersRes, classesRes, enrollmentsRes] = await Promise.all([
        axiosSecure.get('/stats/total-users'),
        axiosSecure.get('/stats/total-classes'),
        axiosSecure.get('/stats/total-enrollments'),
      ]);

      return {
        totalUsers: usersRes.data.totalUsers,
        totalClasses: classesRes.data.totalClasses,
        totalEnrollments: enrollmentsRes.data.totalEnrollments,
      };
    },
  });

  if (isLoading)
    return <div className="text-center py-10">Loading statistics...</div>;

  return (
    <>
      <div>
        <h2 className="text-3xl font-bold text-center mb-6">Sats Section </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center px-6 py-10 max-w-6xl mx-auto">
          {/* Left Section: Cards */}
          <div className="space-y-6">
            <div className="card bg-base-200 shadow-lg p-6">
              <h2 className="text-xl font-semibold">Total Users</h2>
              <p className="text-3xl font-bold">{stats.totalUsers}</p>
            </div>
            <div className="card bg-base-200 shadow-lg p-6">
              <h2 className="text-xl font-semibold">Total Classes</h2>
              <p className="text-3xl font-bold">{stats.totalClasses}</p>
            </div>
            <div className="card bg-base-200 shadow-lg p-6">
              <h2 className="text-xl font-semibold">Total Enrollments</h2>
              <p className="text-3xl font-bold">{stats.totalEnrollments}</p>
            </div>
          </div>

          {/* Right Section: Image */}
          <div className="flex justify-center">
            <img
              src="https://i.ibb.co/bMHBGDJn/events-3.jpg"
              alt="Education stats"
              className="max-w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default StatsSection;
