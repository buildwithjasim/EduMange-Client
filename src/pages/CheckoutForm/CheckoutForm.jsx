import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import AuthContext from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CheckoutForm = ({ classData }) => {
  const { user } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Create Payment Intent
  useEffect(() => {
    if (classData?.price > 0) {
      axiosSecure
        .post('/create-payment-intent', { price: classData.price })
        .then(res => {
          setClientSecret(res.data.clientSecret);
        })
        .catch(err => {
          console.error('❌ Failed to create payment intent:', err);
        });
    }
  }, [classData?.price, axiosSecure]);

  const handleSubmit = async e => {
    e.preventDefault();
    setProcessing(true);
    setError('');

    if (!stripe || !elements) {
      setError('Stripe not properly initialized.');
      setProcessing(false);
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setError('Card element not found.');
      setProcessing(false);
      return;
    }

    const { error: methodError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: 'card',
        card,
      });

    if (methodError) {
      setError(methodError.message);
      setProcessing(false);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
        receipt_email: user.email,
      });

    if (confirmError) {
      setError(confirmError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === 'succeeded') {
      const paymentData = {
        email: user.email,
        classId: classData._id, // sent as string, backend will convert to ObjectId
        classTitle: classData.title,
        teacherName: classData.teacherName,
        image: classData.image,
        price: classData.price,
        enrolledAt: new Date(),
        transactionId: paymentIntent.id,
      };

      try {
        const res = await axiosSecure.post('/payments', paymentData);

        if (res.data?.success) {
          Swal.fire(
            '✅ Success!',
            'Payment complete & class enrolled!',
            'success'
          );
          navigate('/dashboard/my-enrolled-classes');
        } else {
          throw new Error('Saving to database failed');
        }
      } catch (err) {
        console.error('❌ Error saving payment:', err);
        Swal.fire('Error', 'Payment succeeded but saving failed.', 'error');
      }
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-6">
      <CardElement className="border p-3 rounded-md" />
      {error && <p className="text-red-500">{error}</p>}

      <button
        className="btn btn-primary w-full"
        type="submit"
        disabled={!stripe || processing}
      >
        {processing ? 'Processing...' : `Pay $${classData.price}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
