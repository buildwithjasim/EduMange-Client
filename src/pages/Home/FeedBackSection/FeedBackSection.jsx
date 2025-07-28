import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useQuery } from '@tanstack/react-query';

import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Spinner from '../../../components/Spinner/Spinner';

const FeedbackCarousel = () => {
  const axiosSecure = useAxiosSecure();

  const { data: feedbacks = [], isLoading } = useQuery({
    queryKey: ['feedback'],
    queryFn: async () => {
      const res = await axiosSecure.get('/feedback');
      return res.data;
    },
  });

  if (isLoading) return <Spinner></Spinner>;

  return (
    <div className="max-w-4xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-6">Student Feedback</h2>
      <Carousel showThumbs={false} infiniteLoop autoPlay interval={5000}>
        {feedbacks.map((fb, idx) => (
          <div key={idx} className="bg-white shadow-lg p-6 rounded-lg">
            <p className="text-gray-700 italic mb-4">"{fb.description}"</p>
            <div className="flex items-center gap-4">
              <img
                src={
                  fb.studentImage ||
                  'https://i.ibb.co/4gM3vTQ/default-avatar.png'
                }
                alt={fb.studentEmail}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="text-left">
                <p className="font-semibold">
                  {fb.studentName || fb.studentEmail}
                </p>
                <p className="text-sm text-gray-500">Class: {fb.classTitle}</p>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default FeedbackCarousel;
