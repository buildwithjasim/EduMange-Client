import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import useAxiosSecure from '../../hooks/useAxiosSecure';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import Spinner from '../../components/Spinner/Spinner';

const PaymentPage = () => {
  const { id } = useParams();
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    axiosSecure
      .get(`/classes/${id}`)
      .then(res => {
        if (isMounted) {
          if (res?.data?._id) {
            setClassData(res.data);
          } else {
            setError('Class not found.');
          }
          setLoading(false);
        }
      })
      .catch(err => {
        console.error('Failed to load class data:', err);
        if (isMounted) {
          setError('Something went wrong while fetching class info.');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id, axiosSecure]);

  if (loading) {
    return <Spinner></Spinner>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-600">{error}</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-2 text-center">{classData.title}</h2>
      <p className="text-center text-gray-700">
        Instructor: <strong>{classData.teacherName}</strong>
      </p>
      <p className="text-center font-semibold mt-1 text-indigo-600">
        Price: ${classData.price}
      </p>

      <div className="mt-8 border-t pt-6">
        <CheckoutForm classData={classData} />
      </div>
    </div>
  );
};

export default PaymentPage;
