import axios from 'axios';

export const saveUserInDb = async user => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/user`, user);
    return res.data;
  } catch (error) {
    console.error('Error saving user to DB:', error);
    throw error;
  }
};
