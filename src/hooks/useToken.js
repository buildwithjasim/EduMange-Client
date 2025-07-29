// hooks/useToken.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const useToken = email => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (email) {
      axios
        .post(`${import.meta.env.VITE_API_URL}/jwt`, { email })
        .then(res => {
          const token = res.data.token;
          localStorage.setItem('access-token', token);
          setToken(token);
        })
        .catch(err => {
          console.error('JWT fetch error:', err);
        });
    }
  }, [email]);

  return { token };
};

export default useToken;
