import { useContext, useEffect, useState } from 'react';
import AuthContext from '../contexts/AuthContext';
import useAxiosSecure from './useAxiosSecure';

export default function useUserRole() {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [role, setRole] = useState(null);
  const [isRoleLoading, setIsRoleLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchUserRole = async () => {
      try {
        const { data } = await axiosSecure(
          `${import.meta.env.VITE_API_URL}/user/role/${user.email}`
        );
        setRole(data?.role);
      } catch (err) {
        console.error('Failed to fetch user role', err);
      } finally {
        setIsRoleLoading(false);
      }
    };

    fetchUserRole();
  }, [user, axiosSecure]);

  return [role, isRoleLoading];
}
