import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { FaUserPlus } from 'react-icons/fa';
import Swal from 'sweetalert2';
import AuthContext from '../../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const { registerUser, updateProfile, signInWithGoogle } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async data => {
    try {
      const { name, email, password, photoURL } = data;
      const res = await registerUser(email, password);
      await updateProfile(res.user, {
        displayName: name,
        photoURL: photoURL || '',
      });

      Swal.fire('Success!', 'Account created successfully!', 'success');
      navigate('/login');
    } catch (error) {
      Swal.fire('Error', error.message);
    }
  };

  const handleGoogle = async () => {
    try {
      await signInWithGoogle();
      Swal.fire('Success!', 'Signed in with Google', 'success');
      navigate('/');
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-100 p-4">
      {/* Left Side: Register Form */}
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register('name', { required: true })}
            className="input input-bordered w-full"
            placeholder="Name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">Name is required</p>
          )}

          <input
            {...register('photoURL')}
            className="input input-bordered w-full"
            placeholder="Photo URL (optional)"
          />

          <input
            {...register('email', { required: true })}
            className="input input-bordered w-full"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">Email is required</p>
          )}

          <input
            type="password"
            {...register('password', { required: true, minLength: 6 })}
            className="input input-bordered w-full"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">
              Password is required (min 6 characters)
            </p>
          )}

          <button type="submit" className="btn btn-primary w-full">
            Register
          </button>
          <button
            type="button"
            onClick={handleGoogle}
            className="btn btn-outline w-full"
          >
            Continue with Google
          </button>
        </form>
        <p className="mt-4 text-sm">
          Already have an account?{' '}
          <Link className="text-blue-600" to="/login">
            Login here
          </Link>
        </p>
      </div>
      {/* Right Side: Icon */}
      <div className="text-blue-500 text-[8rem] hidden md:flex items-center justify-center ml-10">
        <FaUserPlus className="text-[120px] text-blue-500" />
      </div>
    </div>
  );
};

export default Register;
