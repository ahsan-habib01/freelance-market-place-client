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
      if (!token) {
        return 'user';
      }

      const response = await axios.get(`${API_URL}/users/profile/${email}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data?.role || 'user';
    } catch (error) {
      console.error('Failed to fetch user role:', error);
      return 'user';
    }
  };

  // Sync user with backend and get role
  const syncUserWithBackend = async (firebaseUser, password = null) => {
    try {
      // Determine the password to use
      const loginPassword = password || `google_${firebaseUser.uid}`;

      // Try to login first
      try {
        const loginResponse = await axios.post(`${API_URL}/auth/login`, {
          email: firebaseUser.email,
          password: loginPassword,
        });

        if (loginResponse.data.success) {
          localStorage.setItem('token', loginResponse.data.token);
          return loginResponse.data.user.role || 'user';
        }
      } catch (loginError) {
        // If login fails with 404 or 401, try to register
        if (
          loginError.response?.status === 404 ||
          loginError.response?.status === 401
        ) {
          console.log('User not found in backend, attempting registration...');

          const registerResponse = await axios.post(
            `${API_URL}/auth/register`,
            {
              name: firebaseUser.displayName || 'User',
              email: firebaseUser.email,
              password: loginPassword,
              photoURL: firebaseUser.photoURL || '',
            }
          );

          if (registerResponse.data.success) {
            localStorage.setItem('token', registerResponse.data.token);
            return registerResponse.data.user.role || 'user';
          }
        } else {
          console.error('Backend login error:', loginError);
        }
      }
    } catch (error) {
      console.error('Backend sync failed:', error);
    }
    return 'user';
  };

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then(async result => {
        const role = await syncUserWithBackend(result.user, password);
        setUser({
          ...result.user,
          role: role,
        });
        return result;
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const profileUpdate = (displayName, photoURL) => {
    setLoading(true);
    return updateProfile(auth.currentUser, { displayName, photoURL })
      .then(async () => {
        const role = await fetchUserRole(auth.currentUser.email);
        setUser({
          ...auth.currentUser,
          displayName,
          photoURL,
          role: role,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .then(async result => {
        const role = await syncUserWithBackend(result.user, password);
        setUser({
          ...result.user,
          role: role,
        });
        return result;
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
      .then(async res => {
        const role = await syncUserWithBackend(res.user);
        setUser({
          ...res.user,
          role: role,
        });
        return res;
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const signOutUser = () => {
    localStorage.removeItem('token');
    setUser(null);
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
    return () => unSubscribe();
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
