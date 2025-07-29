import { useEffect } from 'react';
import axios from 'axios';

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(config => {
      const token = localStorage.getItem('edu-token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
    };
  }, []);

  return axiosSecure;
};

export default useAxiosSecure;
