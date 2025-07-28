import { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../../components/Spinner/Spinner';

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: userInfo = {}, isLoading } = useQuery({
    queryKey: ['userInfo', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  if (isLoading || !user) {
    return <Spinner></Spinner>;
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gradient-to-tr from-purple-100 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm rounded-3xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            <img
              src={
                userInfo.image ||
                user?.photoURL ||
                'https://i.ibb.co/4pDNDk1/avatar.png'
              }
              alt="User Profile"
              className="w-40 h-40 object-cover rounded-full border-4 border-primary hover:scale-105 transition"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-2">
              {userInfo.name || user?.displayName || 'No Name'}
            </h2>
            <div className="space-y-1 text-lg text-gray-600 dark:text-gray-300">
              <p>
                <span className="font-semibold text-gray-700 dark:text-white">
                  Role:
                </span>{' '}
                {userInfo.role || 'Student'}
              </p>
              <p>
                <span className="font-semibold text-gray-700 dark:text-white">
                  Email:
                </span>{' '}
                {userInfo.email || user?.email}
              </p>
              <p>
                <span className="font-semibold text-gray-700 dark:text-white">
                  Phone:
                </span>{' '}
                {userInfo.phone || 'Not Provided'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
