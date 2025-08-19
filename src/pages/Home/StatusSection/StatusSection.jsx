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
      <div className="text-center py-16 text-xl font-medium text-text dark:text-text">
        Loading statistics...
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: '👤',
      gradient: 'from-primary to-secondary',
    },
    {
      title: 'Total Classes',
      value: stats.totalClasses,
      icon: '📚',
      gradient: 'from-secondary to-accent',
    },
    {
      title: 'Total Enrollments',
      value: stats.totalEnrollments,
      icon: '✅',
      gradient: 'from-accent to-primary',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      {/* Section Heading */}
      <motion.h2
        className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-primary"
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        📊 Platform Statistics
      </motion.h2>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Stats Cards */}
        <div className="space-y-6">
          {statCards.map((stat, idx) => (
            <motion.div
              key={idx}
              className={`rounded-3xl p-8 shadow-2xl bg-gradient-to-br ${stat.gradient} text-white backdrop-blur-md hover:scale-105 transition-transform duration-500 cursor-pointer`}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
            >
              <div className="flex items-center gap-4">
                <div className="text-5xl">{stat.icon}</div>
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold">
                    {stat.title}
                  </h3>
                  <p className="text-3xl md:text-4xl font-bold mt-1">
                    {stat.value}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Illustration */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="https://i.ibb.co/bMHBGDJn/events-3.jpg"
            alt="Stats Illustration"
            className="max-w-full rounded-2xl shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
