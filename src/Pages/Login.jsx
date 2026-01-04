import React, { use, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { Eye, EyeOff } from 'lucide-react';
import { AuthContext } from '../Contexts/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = 'https://freelify-market-place-server.vercel.app';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { signIn, googleSignIn, setUser, setLoading } = use(AuthContext);

  const handleLogin = async e => {
    e.preventDefault();

    if (isLoading) return;

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    // Basic validation
    if (!trimmedEmail || !trimmedPassword) {
      toast.error('Please enter both email and password');
      return;
    }

    if (trimmedPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    setLoading(true);

    try {
      console.log('🔵 Starting login for:', trimmedEmail);

      // ✅ Step 1: Sign in with Firebase
      console.log('🔵 Step 1: Authenticating with Firebase...');
      const result = await signIn(trimmedEmail, trimmedPassword);
      const user = result.user;
      console.log('✅ Firebase login successful:', user.email);

      // ✅ Step 2: Authenticate with MongoDB backend to get JWT token
      console.log('🔵 Step 2: Authenticating with MongoDB...');
      try {
        const backendResponse = await axios.post(`${API_URL}/auth/login`, {
          email: trimmedEmail,
          password: trimmedPassword,
        });

        console.log('✅ MongoDB login successful');

        // ✅ Step 3: Store JWT token
        if (backendResponse.data.token) {
          localStorage.setItem('token', backendResponse.data.token);
          console.log('✅ JWT token stored');
        }

        // ✅ Step 4: Update user context
        setUser(user);

        toast.success('Welcome back to Freelify!');

        // Navigate after showing success message
        setTimeout(() => {
          navigate(location.state?.from || '/');
        }, 1000);
      } catch (backendError) {
        console.error('❌ MongoDB login failed:', backendError);

        // Firebase auth succeeded but backend failed
        if (backendError.response?.status === 401) {
          toast.error('Invalid email or password');
        } else if (backendError.response?.status === 404) {
          toast.error('User not found. Please register first.');
        } else {
          toast.error('Login failed. Please try again.');
        }

        // Still set the user since Firebase auth succeeded
        setUser(user);
        navigate(location.state?.from || '/');
      }
    } catch (error) {
      console.error('❌ Login failed:', error);

      // Handle Firebase authentication errors
      if (error.code === 'auth/user-not-found') {
        toast.error('No account found with this email');
      } else if (error.code === 'auth/wrong-password') {
        toast.error('Incorrect password');
      } else if (error.code === 'auth/invalid-email') {
        toast.error('Invalid email address');
      } else if (error.code === 'auth/user-disabled') {
        toast.error('This account has been disabled');
      } else if (error.code === 'auth/too-many-requests') {
        toast.error('Too many failed attempts. Please try again later.');
      } else if (error.code === 'auth/network-request-failed') {
        toast.error('Network error. Please check your connection.');
      } else {
        toast.error('Login failed. Please check your credentials.');
      }
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setLoading(true);

    try {
      console.log('🔵 Google Sign In started...');

      // ✅ Step 1: Sign in with Google (Firebase)
      const result = await googleSignIn();
      const user = result.user;
      console.log('✅ Google sign in successful:', user.email);

      // ✅ Step 2: Sync with backend
      console.log('🔵 Syncing with MongoDB...');

      try {
        // Try to login first
        const loginResponse = await axios.post(`${API_URL}/auth/login`, {
          email: user.email,
          password: user.uid, // Google users use Firebase UID as password
        });

        if (loginResponse.data.token) {
          localStorage.setItem('token', loginResponse.data.token);
          console.log('✅ Logged in to MongoDB');
        }
      } catch (loginError) {
        // If login fails, try to register
        if (
          loginError.response?.status === 401 ||
          loginError.response?.status === 404
        ) {
          console.log('🔵 User not found, registering...');

          try {
            const registerResponse = await axios.post(
              `${API_URL}/auth/register`,
              {
                name: user.displayName || 'User',
                email: user.email,
                password: user.uid,
                photoURL: user.photoURL || '',
              }
            );

            if (registerResponse.data.token) {
              localStorage.setItem('token', registerResponse.data.token);
              console.log('✅ Registered in MongoDB');
            }
          } catch (registerError) {
            console.warn('⚠️ MongoDB registration failed:', registerError);
          }
        }
      }

      setUser(user);
      toast.success('Signed in with Google successfully!');

      setTimeout(() => {
        navigate(location.state?.from || '/');
      }, 1000);
    } catch (error) {
      console.error('❌ Google sign in failed:', error);

      if (error.code === 'auth/popup-closed-by-user') {
        toast.error('Sign in was cancelled');
      } else if (error.code === 'auth/popup-blocked') {
        toast.error('Please allow popups for this site');
      } else if (
        error.code === 'auth/account-exists-with-different-credential'
      ) {
        toast.error('An account already exists with this email');
      } else {
        toast.error('Failed to sign in with Google');
      }
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  };


  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#fff3ea] to-[#fffdfb] dark:from-[#0f172a] dark:to-[#020617] py-16">
      <div className="w-11/12 max-w-md bg-white dark:bg-[#161b22] shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-[#ff6f3c] text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-sm text-gray-600 dark:text-gray-300 mb-6">
          Log in to continue exploring Freelify
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={isLoading}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6900] dark:focus:ring-[#ff5500] dark:bg-[#0d1117] dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                disabled={isLoading}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6900] dark:focus:ring-[#ff5500] pr-10 dark:bg-[#0d1117] dark:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 disabled:opacity-50"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-[#ff6f3c] dark:hover:text-[#ff9346] font-medium transition"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#ff6f3c] text-white font-semibold py-3 rounded-lg hover:bg-[#ff9346] dark:hover:bg-[#ff6900] transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center justify-center my-6">
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
          <span className="mx-4 text-gray-500 dark:text-gray-400 font-medium text-sm">
            OR
          </span>
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
        </div>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <p className="text-center text-gray-700 dark:text-gray-300 mt-6">
          Don't have an account?{' '}
          <Link
            to="/auth/register"
            className="text-[#ff6f3c] font-semibold hover:text-[#ff9346] underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
