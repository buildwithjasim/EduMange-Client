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
    const fetchClass = async () => {
      try {
        const res = await axiosSecure.get(`/classes/${id}`);
        setClassData(res.data);
      } catch (err) {
        console.error(err);
        setClassData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchClass();
  }, [id, axiosSecure]);

  if (loading) return <Spinner />;
  if (!classData)
    return (
      <p className="text-center mt-10 text-text dark:text-text/80">
        Class not found
      </p>
    );

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-background dark:bg-gray-900 shadow-lg rounded-xl">
      <img
        src={classData.image}
        alt={classData.title}
        className="rounded w-full h-64 object-cover mb-4 border border-primary/20"
      />
      <h2 className="text-3xl font-bold mb-2 text-primary">
        {classData.title}
      </h2>
      <p className="text-text dark:text-text/80">
        <strong>Teacher:</strong> {classData.teacherName}
      </p>
      <p className="text-text dark:text-text/80 mt-2">
        <strong>Description:</strong> {classData.description}
      </p>
      <p className="font-semibold mt-2 text-accent">
        Price: ${classData.price}
      </p>

      <button
        className="btn btn-primary mt-5 w-full"
        onClick={() => navigate(`/payment/${id}`)}
      >
        Pay
      </button>
    </div>
  );
};

export default ClassDetails;
