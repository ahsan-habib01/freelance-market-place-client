import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import useAuth from './useAuth';

// Create axios instance with base URL
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000', // Change to your backend URL
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { signOutUser } = useAuth();

  useEffect(() => {
    // Request interceptor - Add JWT token to headers
    const requestInterceptor = instance.interceptors.request.use(
      config => {
        const token = localStorage.getItem('token'); // Get JWT token from localStorage
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    // Response interceptor - Handle errors
    const responseInterceptor = instance.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        const status = error.response?.status;

        // If unauthorized or forbidden, logout user
        if (status === 401 || status === 403) {
          console.log('Unauthorized access - logging out');
          localStorage.removeItem('token'); // Clear token
          signOutUser()
            .then(() => {
              navigate('/auth/login');
            })
            .catch(err => {
              console.error('Logout error:', err);
              navigate('/auth/login');
            });
        }

        return Promise.reject(error);
      }
    );

    // Cleanup function - Remove interceptors
    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [signOutUser, navigate]);

  return instance;
};

export default useAxiosSecure;
