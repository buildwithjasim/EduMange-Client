import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import AuthContext from '../../contexts/AuthContext';

const ClassDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [classData, setClassData] = useState(null);

  useEffect(() => {
    axiosSecure
      .get(`/classes/${id}`)
      .then(res => setClassData(res.data))
      .catch(() => Swal.fire('Error', 'Class not found', 'error'));
  }, [id, axiosSecure]);

  const handlePay = () => {
    if (!user)
      return Swal.fire('Login Required', 'Please login first.', 'info');

    navigate(`/payment/${id}`);
  };

  if (!classData) return <div className="p-10 text-center">Loading...</div>;

  const {
    title,
    image,
    teacherName,
    teacherEmail,
    price,
    description,
    enrolled = 0,
  } = classData;

  return (
    <div className="p-10 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <img
        src={image}
        alt={title}
        className="w-full h-96 object-cover rounded-lg mb-6"
      />

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <p>
            <strong>Teacher Name:</strong> {teacherName}
          </p>
          <p>
            <strong>Teacher Email:</strong> {teacherEmail}
          </p>
          <p>
            <strong>Total Enrolled:</strong> {enrolled}
          </p>
        </div>
        <div>
          <p>
            <strong>Price:</strong> ${price}
          </p>
          <p>
            <strong>Description:</strong>
          </p>
          <p>{description}</p>
        </div>
      </div>

      <div className="mt-6 text-right">
        <button className="btn btn-primary" onClick={handlePay}>
          Pay & Enroll
        </button>
      </div>
    </div>
  );
};

export default ClassDetails;
