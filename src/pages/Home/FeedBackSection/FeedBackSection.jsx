import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Spinner from '../../../components/Spinner/Spinner';
import { motion } from 'framer-motion';

const FeedbackCarousel = () => {
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
    <section className="max-w-5xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold text-center mb-10 text-primary">
        ❤️ What Our Students Say
      </h2>

      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        autoPlay
        interval={6000}
        transitionTime={800}
        emulateTouch
        swipeable
        showIndicators
        className="rounded-xl overflow-hidden"
      >
        {feedbacks.map((fb, idx) => (
          <motion.div
            key={idx}
            className="bg-white dark:bg-gray-800 shadow-xl p-6 sm:p-10 rounded-xl max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg text-gray-700 dark:text-gray-200 italic mb-6">
              “{fb.description}”
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <img
                src={
                  fb.studentImage ||
                  'https://i.ibb.co/4gM3vTQ/default-avatar.png'
                }
                alt={fb.studentEmail}
                className="w-16 h-16 rounded-full object-cover border-2 border-primary"
              />
              <div className="text-center sm:text-left">
                <p className="text-lg font-semibold text-gray-800 dark:text-white">
                  {fb.studentName || fb.studentEmail}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Class: {fb.classTitle}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </Carousel>
    </section>
  );
};

export default FeedbackCarousel;
