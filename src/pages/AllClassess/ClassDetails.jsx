import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Spinner from '../../components/Spinner/Spinner';

const ClassDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure.get(`/classes/${id}`).then(res => {
      setClassData(res.data);
      setLoading(false);
    });
  }, [id, axiosSecure]);

  if (loading) return <Spinner />;
  if (!classData) return <p className="text-center mt-10">Class not found</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <img
        src={classData.image}
        alt="Class"
        className="rounded w-full h-64 object-cover mb-4"
      />
      <h2 className="text-3xl font-bold mb-2">{classData.title}</h2>
      <p>
        <strong>Teacher:</strong> {classData.teacherName}
      </p>
      <p>
        <strong>Description:</strong> {classData.description}
      </p>
      <p className="font-semibold mt-2 text-indigo-600">
        Price: ${classData.price}
      </p>

      <button
        className="btn btn-primary mt-5"
        onClick={() => navigate(`/payment/${id}`)}
      >
        Pay
      </button>
    </div>
  );
};

export default ClassDetails;
