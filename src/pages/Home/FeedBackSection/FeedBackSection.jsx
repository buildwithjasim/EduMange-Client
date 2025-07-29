import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Spinner from '../../../components/Spinner/Spinner';
import { motion } from 'framer-motion';

const FeedbackCards = () => {
  const axiosSecure = useAxiosSecure();

  const { data: feedbacks = [], isLoading } = useQuery({
    queryKey: ['feedback'],
    queryFn: async () => {
      const res = await axiosSecure.get('/feedback');
      return res.data;
    },
  });

  if (isLoading) return <Spinner />;

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold text-center mb-10 text-primary">
        ❤️ What Our Students Say
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {feedbacks.map((fb, idx) => (
          <motion.div
            key={idx}
            className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-6 border hover:border-primary transition duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <p className="text-gray-700 dark:text-gray-300 italic mb-4">
              “{fb.description}”
            </p>

            <div className="flex items-center gap-4 mt-6">
              <img
                src={
                  fb.studentImage ||
                  'https://i.ibb.co/4gM3vTQ/default-avatar.png'
                }
                alt={fb.studentEmail}
                className="w-14 h-14 rounded-full object-cover border-2 border-primary"
              />
              <div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {fb.studentName || fb.studentEmail}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Class: {fb.classTitle}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeedbackCards;
