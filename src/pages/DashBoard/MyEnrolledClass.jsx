import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const MyEnrolledClass = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const {
    data: enrolled = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['enrollments', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/enrollments?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-600 mt-10">
        <p className="font-medium">
          Failed to load your enrolled classes. Please try again later.
        </p>
        <p className="text-sm">{error?.message}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      <h2 className="text-3xl font-bold text-primary mb-6 text-center">
        📚 My Enrolled Classes
      </h2>

      {enrolled.length === 0 ? (
        <div className="text-center text-text/70 dark:text-text/50 mt-10">
          <p className="text-lg">You haven't enrolled in any classes yet.</p>
          <Link to="/" className="btn btn-outline mt-4">
            Browse Classes
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolled.map(cls => (
            <div
              key={cls._id}
              className="card bg-background dark:bg-gray-900 shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-shadow"
            >
              <figure className="h-44 overflow-hidden">
                <img
                  src={cls.image}
                  alt={cls.classTitle}
                  className="w-full h-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="text-xl font-bold text-primary">
                  {cls.classTitle}
                </h2>
                <p className="text-sm text-text dark:text-text/70">
                  👨‍🏫 Instructor: {cls.teacherName}
                </p>
                <p className="text-sm text-text dark:text-text/70">
                  💵 Price: ${cls.price}
                </p>
                <p className="text-xs text-text/60 dark:text-text/50">
                  📅 Enrolled on:{' '}
                  {new Date(cls.enrolledAt).toLocaleDateString()}
                </p>
                <Link
                  to={`/dashboard/my-enroll-class/${cls.classId}`}
                  className="btn btn-primary mt-4 w-full"
                >
                  Continue Learning
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEnrolledClass;
