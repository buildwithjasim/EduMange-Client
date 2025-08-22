import { useContext } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import AuthContext from '../../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { saveUserInDb } from '../../../api/utils';

const Login = () => {
  const { loginUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async data => {
    try {
      const result = await loginUser(data.email, data.password);
      const userData = {
        name: result?.user?.displayName,
        email: result?.user?.email,
        image: result?.user?.photoURL,
      };
      await saveUserInDb(userData);
      Swal.fire('Success!', 'Logged in successfully!', 'success');
      setTimeout(() => navigate('/'), 300);
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };

  const handleGoogle = async () => {
    try {
      const result = await signInWithGoogle();
      const userData = {
        name: result?.user?.displayName,
        email: result?.user?.email,
        image: result?.user?.photoURL,
      };
      await saveUserInDb(userData);
      Swal.fire('Success!', 'Logged in with Google!', 'success');
      setTimeout(() => navigate('/'), 300);
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-background p-6">
      {/* Left Side: Login Form */}
      <div className="bg-background border border-primary/20 p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-primary text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            {...register('password', { required: true })}
            className="input input-bordered w-full focus:border-primary"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">Password is required</p>
          )}

          <button type="submit" className="btn btn-primary w-full">
            Login
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
          Don't have an account?{' '}
          <Link className="text-accent font-semibold" to="/register">
            Register here
          </Link>
        </p>
      </div>

      {/* Right Side: Icon */}
      <div className="flex justify-center items-center mt-10 md:mt-0 md:ml-10">
        <FaSignInAlt className="text-[120px] text-primary" />
      </div>
    </div>
  );
};

export default Login;
