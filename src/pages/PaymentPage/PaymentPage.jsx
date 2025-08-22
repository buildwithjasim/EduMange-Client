import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Spinner from '../../components/Spinner/Spinner';
import CheckoutForm from '../CheckoutForm/CheckoutForm';

const PaymentPage = () => {
  const { id } = useParams();
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const res = await axiosSecure.get(`/classes/${id}`);
        if (res?.data?._id) {
          setClassData(res.data);
        } else {
          setError('Class not found');
        }
      } catch {
        setError('Failed to load class info.');
      } finally {
        setLoading(false);
      }
    };
    fetchClass();
  }, [id, axiosSecure]);

  if (loading) return <Spinner />;
  if (error)
    return (
      <p className="text-center mt-10 text-red-600 font-medium">{error}</p>
    );

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-background dark:bg-gray-900 shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-2 text-center text-primary">
        {classData.title}
      </h2>
      <p className="text-center text-text dark:text-text/80">
        Teacher: {classData.teacherName}
      </p>
      <p className="text-center font-semibold text-accent mt-1">
        Price: ${classData.price}
      </p>

      <div className="mt-8">
        <CheckoutForm classData={classData} />
      </div>
    </div>
  );
};

export default PaymentPage;
