import React, { use, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Eye, EyeOff } from 'lucide-react';
import { AuthContext } from '../Contexts/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = 'https://freelify-market-place-server.vercel.app';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  // Get all needed values from AuthContext
  const { createUser, profileUpdate, setUser, setLoading, googleSignIn } =
    use(AuthContext);

  const validatePassword = password => {
    if (password.length < 6) return 'Must be at least 6 characters';
    if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password))
      return 'Must include both uppercase and lowercase letters';
    return '';
  };

  const handlePasswordChange = e => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validatePassword(value));
  };

  const handleRegister = async e => {
    e.preventDefault();

    if (isSubmitting) return; // Prevent double submission

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value || '';

    const error = validatePassword(password);
    if (error) {
      setPasswordError(error);
      return;
    }
    setPasswordError('');
    setIsSubmitting(true);
    setLoading(true);

    try {
      console.log('🔵 Step 1: Creating Firebase user...');

      // ✅ Step 1: Create Firebase user
      const firebaseResult = await createUser(email, password);
      const user = firebaseResult.user;
      console.log('✅ Firebase user created:', user.email);

      // ✅ Step 2: Update Firebase profile
      console.log('🔵 Step 2: Updating Firebase profile...');
      await profileUpdate(name, photoURL);
      console.log('✅ Firebase profile updated');

      // ✅ Step 3: Register user in MongoDB backend
      console.log('🔵 Step 3: Registering in MongoDB...');
      const backendResponse = await axios.post(`${API_URL}/auth/register`, {
        name: name,
        email: email,
        password: password,
        photoURL: photoURL,
      });

      console.log('✅ MongoDB user created:', backendResponse.data);

      // ✅ Step 4: Store JWT token
      if (backendResponse.data.token) {
        localStorage.setItem('token', backendResponse.data.token);
        console.log('✅ JWT token stored');
      }

      // ✅ Step 5: Update context with user info
      setUser({
        ...user,
        displayName: name,
        photoURL: photoURL,
      });

      setLoading(false);
      setIsSubmitting(false);
      toast.success('Account created successfully!');
      navigate('/');
    } catch (error) {
      console.error('❌ Registration failed:', error);
      setLoading(false);
      setIsSubmitting(false);

      // Better error messages
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.code === 'auth/email-already-in-use') {
        toast.error('This email is already registered');
      } else if (error.code === 'auth/weak-password') {
        toast.error('Password is too weak');
      } else if (error.code === 'auth/invalid-email') {
        toast.error('Invalid email address');
      } else {
        toast.error(error.message || 'Registration failed. Please try again.');
      }
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);

    try {
      console.log('🔵 Google Sign In started...');

      // ✅ Step 1: Sign in with Google (Firebase)
      const result = await googleSignIn();
      const user = result.user;
      console.log('✅ Google sign in successful:', user.email);

      // ✅ Step 2: Register/Login with backend
      try {
        console.log('🔵 Syncing with MongoDB...');

        // Try to register (will fail if user exists, that's okay)
        const backendResponse = await axios.post(`${API_URL}/auth/register`, {
          name: user.displayName || 'User',
          email: user.email,
          password: user.uid, // Use Firebase UID as password for social login
          photoURL: user.photoURL || '',
        });

        // Store token if registration successful
        if (backendResponse.data.token) {
          localStorage.setItem('token', backendResponse.data.token);
          console.log('✅ New user registered in MongoDB');
        }
      } catch (backendError) {
        // If user already exists (400 error), try to login
        if (backendError.response?.status === 400) {
          console.log('🔵 User exists, logging in...');

          try {
            const loginResponse = await axios.post(`${API_URL}/auth/login`, {
              email: user.email,
              password: user.uid, // Use Firebase UID as password
            });

            if (loginResponse.data.token) {
              localStorage.setItem('token', loginResponse.data.token);
              console.log('✅ Logged in to MongoDB');
            }
          } catch (loginError) {
            console.warn('⚠️ MongoDB login failed (non-critical):', loginError);
            // Continue anyway - Firebase auth is successful
          }
        } else {
          console.warn('⚠️ MongoDB sync failed (non-critical):', backendError);
          // Continue anyway - Firebase auth is successful
        }
      }

      setUser(user);
      setLoading(false);
      toast.success('Signed in with Google successfully!');
      navigate('/');
    } catch (error) {
      console.error('❌ Google sign in failed:', error);
      setLoading(false);
      toast.error(error.message || 'Failed to sign in with Google');
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#fff3ea] to-[#fffdfb] dark:from-[#0f172a] dark:to-[#020617] py-16">
      <div className="w-11/12 max-w-md bg-white dark:bg-[#161b22] shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-[#ff6f3c] text-center mb-2">
          Join Freelify
        </h2>
        <p className="text-center text-sm text-gray-600 dark:text-gray-300 mb-6">
          Create your account to start freelancing
        </p>

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6900] dark:focus:ring-[#ff5500] disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6900] dark:focus:ring-[#ff5500] disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
              Photo URL (Optional)
            </label>
            <input
              type="file"
              name="photoURL"
              placeholder="https://example.com/photo.jpg"
              disabled={isSubmitting}
              className="file-input w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6900] dark:focus:ring-[#ff5500] disabled:opacity-50 disabled:cursor-not-allowed"
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
                onChange={handlePasswordChange}
                placeholder="Create a strong password"
                required
                disabled={isSubmitting}
                className={`w-full px-4 py-2 border ${
                  passwordError
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 dark:border-gray-600 focus:ring-[#ff6900] dark:focus:ring-[#ff5500]'
                } rounded-lg focus:outline-none focus:ring-2 pr-10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isSubmitting}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 disabled:opacity-50"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
            {!passwordError && password && (
              <p className="text-green-500 text-sm mt-1">
                Password looks good!
              </p>
            )}
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="terms"
              required
              disabled={isSubmitting}
              className="mt-1 w-4 h-4 text-[#ff6900] border-gray-300 rounded focus:ring-[#ff6900] disabled:opacity-50"
            />
            <label
              htmlFor="terms"
              className="text-sm text-gray-600 dark:text-gray-300"
            >
              I agree to the{' '}
              <Link
                to="/terms-of-service"
                className="text-[#ff6f3c] hover:text-[#ff9346] font-medium"
              >
                Terms & Conditions
              </Link>{' '}
              and{' '}
              <Link
                to="/privacy-policy"
                className="text-[#ff6f3c] hover:text-[#ff9346] font-medium"
              >
                Privacy Policy
              </Link>
            </label>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={passwordError || isSubmitting}
            className="w-full bg-[#ff6f3c] text-white font-semibold py-2 rounded-lg hover:bg-[#ff9346] dark:hover:bg-[#ff6900] transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating Account...
              </>
            ) : (
              'Register'
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center justify-center my-4">
          <div className="w-1/4 h-px bg-gray-300 dark:bg-gray-600"></div>
          <span className="mx-3 text-gray-500 dark:text-gray-400 font-medium">
            or
          </span>
          <div className="w-1/4 h-px bg-gray-300 dark:bg-gray-600"></div>
        </div>

        {/* Google Sign In */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <p className="text-center text-gray-700 dark:text-gray-300 mt-6">
          Already have an account?{' '}
          <Link
            to="/auth/login"
            className="text-[#ff6f3c] font-semibold hover:text-[#ff9346]"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
