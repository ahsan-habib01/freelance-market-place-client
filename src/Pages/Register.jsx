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

    if (isSubmitting) return;

    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim().toLowerCase();
    const photoURL = form.photoURL.value.trim() || '';

    // Validate all fields
    if (!name || !email || !password) {
      toast.error('Please fill all required fields');
      return;
    }

    const error = validatePassword(password);
    if (error) {
      setPasswordError(error);
      toast.error(error);
      return;
    }

    setPasswordError('');
    setIsSubmitting(true);
    setLoading(true);

    try {
      console.log('🔵 Starting registration for:', email);

      // ✅ Step 1: Register in MongoDB FIRST (this checks if email exists)
      console.log('🔵 Step 1: Registering in MongoDB...');

      const backendResponse = await axios.post(`${API_URL}/auth/register`, {
        name: name,
        email: email,
        password: password,
        photoURL: photoURL,
      });

      console.log('✅ MongoDB user created:', backendResponse.data);

      // ✅ Step 2: Create Firebase user (MongoDB succeeded, email is unique)
      console.log('🔵 Step 2: Creating Firebase user...');

      let firebaseUser;
      try {
        const firebaseResult = await createUser(email, password);
        firebaseUser = firebaseResult.user;
        console.log('✅ Firebase user created:', firebaseUser.email);

        // ✅ Step 3: Update Firebase profile
        console.log('🔵 Step 3: Updating Firebase profile...');
        await profileUpdate(name, photoURL);
        console.log('✅ Firebase profile updated');
      } catch (firebaseError) {
        console.warn('⚠️ Firebase creation failed, but MongoDB user exists');

        // If Firebase fails but MongoDB succeeded, we can still continue
        if (firebaseError.code === 'auth/email-already-in-use') {
          console.log("📝 Firebase user already exists, that's okay");
        } else {
          console.error('Firebase error:', firebaseError);
        }
      }

      // ✅ Step 4: Store JWT token
      if (backendResponse.data.token) {
        localStorage.setItem('token', backendResponse.data.token);
        console.log('✅ JWT token stored');
      }

      // ✅ Step 5: Update context with user info
      if (firebaseUser) {
        setUser({
          ...firebaseUser,
          displayName: name,
          photoURL: photoURL,
          role: backendResponse.data.user.role || 'user',
        });
      } else {
        // If Firebase failed, set user from backend data
        setUser({
          email: email,
          displayName: name,
          photoURL: photoURL,
          role: backendResponse.data.user.role || 'user',
        });
      }

      toast.success('Account created successfully! Welcome to Freelify!');

      // Small delay to show success message
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      console.error('❌ Registration failed:', error);

      // Handle MongoDB registration errors
      if (error.response?.status === 400) {
        // Email already exists in MongoDB
        const message =
          error.response.data.message || 'This email is already registered.';
        toast.error(message);
      } else if (error.response?.status === 500) {
        toast.error('Server error. Please try again later.');
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.message?.includes('Network')) {
        toast.error('Network error. Please check your connection.');
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setLoading(true);

    try {
      console.log('🔵 Google Sign In started...');

      // ✅ Step 1: Sign in with Google (Firebase)
      const result = await googleSignIn();
      const user = result.user;
      console.log('✅ Google sign in successful:', user.email);

      // ✅ Step 2: Try to register in MongoDB (will fail if exists, that's okay)
      console.log('🔵 Registering with MongoDB...');

      try {
        const backendResponse = await axios.post(`${API_URL}/auth/register`, {
          name: user.displayName || 'User',
          email: user.email,
          password: `google_${user.uid}`, // Use Firebase UID as password for Google users
          photoURL: user.photoURL || '',
        });

        if (backendResponse.data.token) {
          localStorage.setItem('token', backendResponse.data.token);
          console.log('✅ New user registered in MongoDB');
        }

        setUser({
          ...user,
          role: backendResponse.data.user.role || 'user',
        });
      } catch (backendError) {
        // User might already exist, try to login
        if (backendError.response?.status === 400) {
          console.log('⚠️ User already exists, attempting login...');

          try {
            const loginResponse = await axios.post(`${API_URL}/auth/login`, {
              email: user.email,
              password: `google_${user.uid}`,
            });

            if (loginResponse.data.token) {
              localStorage.setItem('token', loginResponse.data.token);
              console.log('✅ Logged in to existing MongoDB account');
            }

            setUser({
              ...user,
              role: loginResponse.data.user.role || 'user',
            });
          } catch (loginError) {
            console.warn('⚠️ Login failed, continuing with Firebase user');
            setUser(user);
          }
        } else {
          console.warn(
            '⚠️ Backend registration failed, continuing with Firebase user'
          );
          setUser(user);
        }
      }

      toast.success('✨ Signed in with Google successfully!');

      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      console.error('❌ Google sign in failed:', error);

      if (error.code === 'auth/popup-closed-by-user') {
        toast.error('Sign in was cancelled');
      } else if (error.code === 'auth/popup-blocked') {
        toast.error('Please allow popups for this site');
      } else if (error.code === 'auth/cancelled-popup-request') {
        toast.error('Another sign-in popup is already open');
      } else {
        toast.error('Failed to sign in with Google');
      }
    } finally {
      setLoading(false);
      setIsSubmitting(false);
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
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6900] dark:focus:ring-[#ff5500] dark:bg-[#0d1117] dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
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
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6900] dark:focus:ring-[#ff5500] dark:bg-[#0d1117] dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
              Photo URL (Optional)
            </label>
            <input
              type="url"
              name="photoURL"
              placeholder="https://example.com/photo.jpg"
              disabled={isSubmitting}
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
                onChange={handlePasswordChange}
                placeholder="Create a strong password"
                required
                disabled={isSubmitting}
                className={`w-full px-4 py-2 border ${
                  passwordError
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 dark:border-gray-600 focus:ring-[#ff6900] dark:focus:ring-[#ff5500]'
                } rounded-lg focus:outline-none focus:ring-2 pr-10 dark:bg-[#0d1117] dark:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
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
              <p className="text-red-500 text-sm mt-1 animate-pulse">
                {passwordError}
              </p>
            )}
            {!passwordError && password && (
              <p className="text-green-500 text-sm mt-1">
                ✓ Password looks good!
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
                className="text-[#ff6f3c] hover:text-[#ff9346] font-medium underline"
              >
                Terms & Conditions
              </Link>{' '}
              and{' '}
              <Link
                to="/privacy-policy"
                className="text-[#ff6f3c] hover:text-[#ff9346] font-medium underline"
              >
                Privacy Policy
              </Link>
            </label>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={passwordError || isSubmitting}
            className="w-full bg-[#ff6f3c] text-white font-semibold py-3 rounded-lg hover:bg-[#ff9346] dark:hover:bg-[#ff6900] transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating Account...
              </>
            ) : (
              'Create Account'
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

        {/* Google Sign In */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isSubmitting}
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
          Already have an account?{' '}
          <Link
            to="/auth/login"
            className="text-[#ff6f3c] font-semibold hover:text-[#ff9346] underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
