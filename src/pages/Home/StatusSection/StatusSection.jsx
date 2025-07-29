import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';

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

  if (isLoading) {
    return (
      <div className="text-center py-16 text-xl font-medium text-gray-500 dark:text-gray-400">
        Loading statistics...
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      color: 'from-pink-400 to-pink-600',
      icon: '👤',
    },
    {
      title: 'Total Classes',
      value: stats.totalClasses,
      color: 'from-blue-400 to-blue-600',
      icon: '📚',
    },
    {
      title: 'Total Enrollments',
      value: stats.totalEnrollments,
      color: 'from-green-400 to-green-600',
      icon: '✅',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-center mb-12 text-primary">
        📊 Platform Statistics
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Cards */}
        <div className="space-y-6">
          {statCards.map((stat, idx) => (
            <motion.div
              key={idx}
              className={`rounded-2xl text-white shadow-lg p-6 bg-gradient-to-br ${stat.color}`}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <h3 className="text-xl font-semibold">{stat.title}</h3>
              <p className="text-4xl font-bold">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Right: Image */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="https://i.ibb.co/bMHBGDJn/events-3.jpg"
            alt="Stats Illustration"
            className="max-w-full rounded-xl shadow-xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
