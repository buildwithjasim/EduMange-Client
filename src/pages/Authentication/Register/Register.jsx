import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { FaUserPlus } from 'react-icons/fa';
import Swal from 'sweetalert2';
import AuthContext from '../../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { saveUserInDb } from '../../../api/utils';

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

      const userData = {
        name,
        email,
        photoURL,
      };
      await saveUserInDb(userData);
      Swal.fire('Success!', 'Account created successfully!', 'success');
      navigate('/login');
    } catch (error) {
      Swal.fire('Error', error.message);
    }
  };

  const handleGoogle = async () => {
    try {
      const result = await signInWithGoogle();
      const userData = {
        name: result?.user?.displayName,
        email: result?.user?.email,
        photoURL: result?.user?.photoURL,
      };

      await saveUserInDb(userData);
      Swal.fire('Success!', 'Signed in with Google', 'success');
      navigate('/');
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-background p-6">
      {/* Left Side: Register Form */}
      <div className="bg-background border border-primary/20 p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-primary">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register('name', { required: true })}
            className="input input-bordered w-full focus:border-primary"
            placeholder="Name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">Name is required</p>
          )}

          <input
            {...register('photoURL')}
            className="input input-bordered w-full focus:border-primary"
            placeholder="Photo URL (optional)"
          />

          <input
            {...register('email', { required: true })}
            className="input input-bordered w-full focus:border-primary"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">Email is required</p>
          )}

          <input
            type="password"
            {...register('password', { required: true, minLength: 6 })}
            className="input input-bordered w-full focus:border-primary"
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
            className="btn btn-outline border-primary text-primary hover:bg-primary hover:text-background w-full"
          >
            Continue with Google
          </button>
        </form>
        <p className="mt-4 text-sm text-text/80 text-center">
          Already have an account?{' '}
          <Link className="text-accent font-semibold" to="/login">
            Login here
          </Link>
        </p>
      </div>

      {/* Right Side: Icon */}
      <div className="flex justify-center items-center mt-10 md:mt-0 md:ml-10">
        <FaUserPlus className="text-[120px] text-primary" />
      </div>
    </div>
  );
};

export default Register;
