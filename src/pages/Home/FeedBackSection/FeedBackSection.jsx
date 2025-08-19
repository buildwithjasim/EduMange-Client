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
    <section className="max-w-7xl mx-auto px-4 py-16">
      {/* Section Heading */}
      <motion.h2
        className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-primary"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        💬 What Our Students Say
      </motion.h2>

      {/* Feedback Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {feedbacks.map((fb, idx) => (
          <motion.div
            key={idx}
            className="relative rounded-3xl p-6 shadow-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 backdrop-blur-md border border-transparent hover:border-primary hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-400 cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
          >
            {/* Feedback Text */}
            <p className="text-text dark:text-text italic mb-6 text-base md:text-lg leading-relaxed">
              “{fb.description}”
            </p>

            {/* Student Info */}
            <div className="flex items-center gap-4 mt-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary flex-shrink-0">
                <img
                  src={
                    fb.studentImage ||
                    'https://i.ibb.co/4gM3vTQ/default-avatar.png'
                  }
                  alt={fb.studentEmail}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-lg font-semibold text-text dark:text-text">
                  {fb.studentName || fb.studentEmail}
                </p>
                <p className="text-sm text-secondary dark:text-secondary">
                  Class: {fb.classTitle}
                </p>
              </div>
            </div>

            {/* Rating Stars */}
            {fb.rating && (
              <div className="mt-4 flex items-center gap-1 text-accent">
                {Array.from({ length: fb.rating }).map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeedbackCards;
