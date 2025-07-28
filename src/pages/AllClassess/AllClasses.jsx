import { useEffect, useState } from 'react';

import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const AllClasses = () => {
  const [classes, setClasses] = useState([]);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    axiosSecure
      .get('/classes/approved')
      .then(res => setClasses(res.data))
      .catch(err => console.error('Error fetching classes:', err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">
        All Approved Classes
      </h2>
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
                <strong>Enrolled:</strong> {singleClass.enrolled || 0}
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
    </div>
  );

  function handleEnroll(cls) {
    // Add your enroll logic here
    // For now, we can just log it
    console.log('Enroll clicked for:', cls.title);
  }
};

export default AllClasses;
