import React, { use, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Eye, EyeOff } from 'lucide-react';
import { AuthContext } from '../Contexts/AuthContext';
import toast from 'react-hot-toast';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

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

  const handleRegister = e => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value;

    const error = validatePassword(password);
    if (error) {
      setPasswordError(error);
      return;
    }
    setPasswordError('');

    // Create user with Firebase and sync with backend
    createUser(email, password)
      .then(res => {
        const user = res.user;

        // Update profile with name and photo
        profileUpdate(name, photoURL)
          .then(() => {
            setUser({
              ...user,
              displayName: name,
              photoURL: photoURL,
            });
            setLoading(false);
            toast.success('Account created successfully!');
            navigate('/');
          })
          .catch(e => {
            toast.error(e.message);
            setLoading(false);
          });
      })
      .catch(e => {
        toast.error(e.message);
        setLoading(false);
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(res => {
        setUser(res.user);
        setLoading(false);
        toast.success('Signed in with Google successfully!');
        navigate('/');
      })
      .catch(e => {
        toast.error(e.message);
        setLoading(false);
      });
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
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6900] dark:focus:ring-[#ff5500]"
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
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6900] dark:focus:ring-[#ff5500]"
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
              Photo URL
            </label>
            <input
              type="url"
              name="photoURL"
              placeholder="Enter your photo URL (optional)"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6900] dark:focus:ring-[#ff5500]"
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
                className={`w-full px-4 py-2 border ${
                  passwordError
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 dark:border-gray-600 focus:ring-[#ff6900] dark:focus:ring-[#ff5500]'
                } rounded-lg focus:outline-none focus:ring-2 pr-10 transition-all duration-300`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
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
              className="mt-1 w-4 h-4 text-[#ff6900] border-gray-300 rounded focus:ring-[#ff6900]"
            />
            <label
              htmlFor="terms"
              className="text-sm text-gray-600 dark:text-gray-300"
            >
              I agree to the{' '}
              <Link
                to="/terms"
                className="text-[#ff6f3c] hover:text-[#ff9346] font-medium"
              >
                Terms & Conditions
              </Link>{' '}
              and{' '}
              <Link
                to="/privacy"
                className="text-[#ff6f3c] hover:text-[#ff9346] font-medium"
              >
                Privacy Policy
              </Link>
            </label>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={passwordError}
            className="w-full bg-[#ff6f3c] text-white font-semibold py-2 rounded-lg hover:bg-[#ff9346] dark:hover:bg-[#ff6900] transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Register
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
          className="w-full flex items-center justify-center gap-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
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
