import React, { useState, use } from 'react';
import { Link, useNavigate } from 'react-router';
import { Eye, EyeOff } from 'lucide-react';
import { AuthContext } from '../Contexts/AuthContext';
import { toast } from 'react-toastify';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const { setUser, createUser, profileUpdate, googleSignIn, setLoading } =
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
    const displayName = e.target.name?.value;
    const photoURL = e.target.photo?.value;
    const email = e.target.email?.value;

    const error = validatePassword(password);
    if (error) {
      setPasswordError(error);
      return;
    }

    createUser(email, password)
      .then(res => {
        const user = res.user;
        profileUpdate(displayName, photoURL)
          .then(() => {
            setUser(user);
            e.target.reset();
            setPassword('');
            toast.success('Registration successful!');
            setLoading(false);
            navigate('/');
          })
          .catch(err => {
            toast.error(err.message);
            setLoading(false);
          });
      })
      .catch(err => {
        toast.error(err.message);
        setLoading(false);
      });
  };

  const handleGoogleLogin = () => {
    googleSignIn()
      .then(res => {
        const user = res.user;
        setUser(user);
        // toast.success('Signin successful');
        setLoading(false);
        navigate('/');
      })
      .catch(err => {
        toast.error(err.message);
        setLoading(false);
      });
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-green-50 py-16">
      <title>Create Your Account - GreenNest</title>
      <div className="w-11/12 max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-green-800 text-center mb-2">
          Create Your Account
        </h2>
        <p className="text-center text-sm text-green-700 mb-6">
          A Global Hub for Freelancers and Dream Projects
        </p>

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-green-800 font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
              className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-green-800 font-medium mb-2">
              Photo URL
            </label>
            <input
              type="url"
              name="photo"
              placeholder="Enter your photo URL"
              className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-green-800 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-green-800 font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
                required
                className={`w-full px-4 py-2 border ${
                  passwordError
                    ? 'border-red-500 focus:ring-red-500'
                    : password
                    ? 'border-green-500 focus:ring-green-500'
                    : 'border-green-300 focus:ring-green-500'
                } rounded-lg focus:outline-none focus:ring-2 pr-10 transition-all duration-300`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-green-700 hover:text-green-900"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition cursor-pointer"
          >
            Register
          </button>
        </form>

        <div className="flex items-center justify-center my-1">
          <div className="w-1/4 h-px bg-green-300"></div>
          <span className="mx-3 text-green-700 font-medium">or</span>
          <div className="w-1/4 h-px bg-green-300"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 border border-green-400 text-green-700 font-semibold py-2 rounded-lg hover:bg-green-100 transition cursor-pointer"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <p className="text-center text-green-700 mt-6">
          Already have an account?{' '}
          <Link
            to="/auth/login"
            className="text-green-600 font-semibold hover:text-green-800"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
