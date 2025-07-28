import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

export default function PrivateRoute({ Children }) {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    <span className="loading loading-dots loading-xl"></span>;
  }
  if (!user) {
    <Navigate to="/login"></Navigate>;
  }
  return Children;
}
