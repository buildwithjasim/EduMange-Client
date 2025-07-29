import { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import Spinner from '../../components/Spinner/Spinner';

const AllClasses = () => {
  const { loading: authLoading, user } = useContext(AuthContext);
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // keep this
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!authLoading && user?.email) {
      const fetchClasses = async () => {
        try {
          const res = await axiosSecure.get('/classes/approved');
          setClasses(res.data);
        } catch (err) {
          console.error('Error fetching classes:', err);
        } finally {
          setIsLoading(false); // always stop spinner
        }
      };
      fetchClasses();
    }
  }, [axiosSecure, authLoading, user]);

  if (authLoading || isLoading) {
    return <Spinner />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">All Classes</h2>
      {classes.length === 0 ? (
        <p className="text-center text-gray-600">No classes available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map(singleClass => (
            <div
              key={singleClass._id}
              className="card w-full bg-base-100 shadow-xl"
            >
              <figure>
                <img
                  src={singleClass.image}
                  alt={singleClass.title}
                  className="h-64 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{singleClass.title}</h2>
                <p>
                  <strong>Teacher:</strong> {singleClass.teacherName}
                </p>
                <p>
                  <strong>Price:</strong> ${singleClass.price}
                </p>
                <p>
                  <strong>Total Enrolled:</strong> {singleClass.enrolled || 0}
                </p>
                <p className="text-sm">
                  {singleClass.description?.slice(0, 80)}...
                </p>
                <div className="card-actions justify-end">
                  <Link to={`/class/${singleClass._id}`}>
                    <button className="btn btn-primary">Enroll Now</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllClasses;
