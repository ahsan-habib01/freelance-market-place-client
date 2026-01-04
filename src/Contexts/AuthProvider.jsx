import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from './../Firebase/firebase.config';
import axios from 'axios';

const googleProvider = new GoogleAuthProvider();
const API_URL = 'https://freelify-market-place-server.vercel.app';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user role from backend
  const fetchUserRole = async email => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/users/profile/${email}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.role || 'user';
    } catch (error) {
      console.error('Failed to fetch user role:', error);
      return 'user';
    }
  };

  // Sync user with backend and get role
  const syncUserWithBackend = async (firebaseUser, password = null) => {
    try {
      // Try to login first
      const loginResponse = await axios.post(`${API_URL}/auth/login`, {
        email: firebaseUser.email,
        password: password || 'firebase-user',
      });

      if (loginResponse.data.success) {
        localStorage.setItem('token', loginResponse.data.token);
        return loginResponse.data.user.role || 'user';
      }
    } catch (error) {
      // If login fails, register the user in backend
      try {
        const registerResponse = await axios.post(`${API_URL}/auth/register`, {
          name: firebaseUser.displayName || 'User',
          email: firebaseUser.email,
          password: password || 'firebase-user',
          photoURL: firebaseUser.photoURL || '',
        });

        if (registerResponse.data.success) {
          localStorage.setItem('token', registerResponse.data.token);
          return registerResponse.data.user.role || 'user';
        }
      } catch (registerError) {
        console.error('Backend sync failed:', registerError);
      }
    }
    return 'user';
  };

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password).then(
      async result => {
        const role = await syncUserWithBackend(result.user, password);
        // Update user object with role
        setUser({
          ...result.user,
          role: role,
        });
        return result;
      }
    );
  };

  const profileUpdate = (displayName, photoURL) => {
    setLoading(true);
    return updateProfile(auth.currentUser, { displayName, photoURL }).then(
      async () => {
        // Fetch role from backend
        const role = await fetchUserRole(auth.currentUser.email);
        // Update React context user state with role
        setUser({
          ...auth.currentUser,
          displayName,
          photoURL,
          role: role,
        });
      }
    );
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password).then(
      async result => {
        const role = await syncUserWithBackend(result.user, password);
        // Update user object with role
        setUser({
          ...result.user,
          role: role,
        });
        return result;
      }
    );
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider).then(async res => {
      const role = await syncUserWithBackend(res.user);
      setUser({
        ...res.user,
        role: role,
      });
      return res;
    });
  };

  const signOutUser = () => {
    localStorage.removeItem('token');
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async currentUser => {
      if (currentUser) {
        // Fetch role from backend
        const role = await fetchUserRole(currentUser.email);
        setUser({
          ...currentUser,
          role: role,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unSubscribe;
  }, []);

  const authInfo = {
    user,
    setUser,
    createUser,
    profileUpdate,
    signIn,
    googleSignIn,
    signOutUser,
    loading,
    setLoading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
