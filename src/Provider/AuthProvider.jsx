import { useEffect, useState } from 'react';

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
// import axios from 'axios';
import AuthContext from '../contexts/AuthContext';
import { auth } from '../Firebase/firebase.config';
import axios from 'axios';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔐 Register user
  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // 🔐 Login user
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // 🔐 Google Sign-in
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // 🔐 Logout
  const logout = () => {
    setLoading(true);
    localStorage.removeItem('access-token');
    return signOut(auth);
  };

  // 🔁 Handle user state & JWT

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async currentUser => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        const { data } = await axios.post('http://localhost:5000/jwt', {
          email: currentUser.email,
        });
        localStorage.setItem('token', data.token);
      } else {
        localStorage.removeItem('token');
      }
    });

    return () => unsubscribe();
  }, []);
  const authInfo = {
    user,
    loading,
    setLoading,
    registerUser,
    loginUser,
    logout,
    signInWithGoogle,
    setUser,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
