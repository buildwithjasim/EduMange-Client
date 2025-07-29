import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
    axiosSecure
      .get(`/classes/${id}`)
      .then(res => {
        if (res?.data?._id) {
          setClassData(res.data);
        } else {
          setError('Class not found');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load class info.');
        setLoading(false);
      });
  }, [id, axiosSecure]);

  if (loading) return <Spinner />;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-2 text-center">{classData.title}</h2>
      <p className="text-center">Teacher: {classData.teacherName}</p>
      <p className="text-center text-indigo-600 font-semibold">
        Price: ${classData.price}
      </p>

      <div className="mt-8">
        <CheckoutForm classData={classData} />
      </div>
    </div>
  );
};

export default PaymentPage;
