import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import AuthContext from '../../contexts/AuthContext';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const CheckoutForm = ({ classData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const createIntent = async () => {
      try {
        const price = parseFloat(classData?.price);
        if (!price || isNaN(price)) {
          setError('Invalid class price.');
          return;
        }

        const res = await axiosSecure.post('/create-payment-intent', { price });
        if (res.data?.clientSecret) {
          setClientSecret(res.data.clientSecret);
        } else {
          throw new Error('No clientSecret returned');
        }
      } catch (err) {
        console.error('Error creating payment intent:', err);
        setError('Failed to initiate payment. Please try again later.');
      }
    };

    if (classData?.price) {
      createIntent();
    }
  }, [classData, axiosSecure]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setProcessing(true);
    setError('');

    const card = elements.getElement(CardElement);
    if (!card) {
      setError('Card element not found.');
      setProcessing(false);
      return;
    }

    const { paymentIntent, error: paymentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user?.displayName || 'Anonymous',
            email: user?.email || 'unknown@edumanage.com',
          },
        },
      });

    if (paymentError) {
      setError(paymentError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === 'succeeded') {
      const paymentData = {
        classId: classData._id,
        email: user.email,
        transactionId: paymentIntent.id,
        price: parseFloat(classData.price),
        date: new Date(),
      };

      console.log(paymentData);

      try {
        await axiosSecure.post('/payments', paymentData);
        toast.success('Payment successful! You are now enrolled.');
        navigate('/dashboard/my-enrolled-classes');
      } catch (err) {
        console.error('Payment saved, but enrollment failed:', err);
        setError('Payment completed, but failed to save enrollment info.');
      }
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#32325d',
              '::placeholder': { color: '#aab7c4' },
            },
            invalid: { color: '#fa755a' },
          },
        }}
        className="p-4 border rounded"
      />
      <button
        type="submit"
        disabled={!stripe || processing || !clientSecret}
        className="btn btn-primary w-full"
      >
        {processing ? 'Processing...' : `Pay $${classData?.price || 0}`}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
};

export default CheckoutForm;
