import React, { use, useState } from 'react';
import Logo from './Logo';
import NavLinks from './NavLinks';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { HashLoader } from 'react-spinners';
import { Menu, X } from 'lucide-react';
import { AuthContext } from '../../Contexts/AuthContext';
import people from '../../assets/people.png';
import { FiGrid, FiUser, FiLogOut } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { user, signOutUser, loading } = use(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignout = () => {
    signOutUser()
      .then(() => {
        navigate('/auth/login');
        toast.success('Signed out successfully!');
      })
      .catch(e => toast.error(e.message));
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="w-11/12 mx-auto py-4 flex justify-between items-center">
        <Link to="/">
          <Logo />
        </Link>

        <div className="hidden md:block">
          <NavLinks />
        </div>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-orange-400 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {loading ? (
          <HashLoader color="orange" size={40} />
        ) : user ? (
          <div className="hidden md:flex flex-col items-center space-y-2">
            <div className="flex justify-center items-center gap-4">
              <ThemeToggle />

              <button
                popoverTarget="popover-1"
                style={{ anchorName: '--anchor-1' }}
                className="relative group"
              >
                <img
                  src={
                    user?.photoURL ||
                    'https://img.icons8.com/?size=160&id=114015&format=png'
                  }
                  className="h-11 w-11 border-2 border-amber-400 rounded-full object-cover cursor-pointer"
                  alt="User"
                />

                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-[#ff9346] text-white text-sm font-medium py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none shadow-md">
                  {user?.displayName}
                </span>
              </button>
            </div>

            <ul
              className="dropdown dropdown-end menu w-56 rounded-box bg-white dark:bg-gray-700 shadow-md space-y-2 p-4"
              popover="auto"
              id="popover-1"
              style={{ positionAnchor: '--anchor-1' }}
            >
              <div className="border-b border-gray-200 dark:border-gray-600 pb-3 mb-2">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {user?.displayName}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user?.email}
                </p>
                {user?.role && (
                  <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded capitalize">
                    {user.role}
                  </span>
                )}
              </div>

              <li>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200"
                >
                  <FiGrid className="text-[#ff9346]" size={18} />
                  Dashboard
                </Link>
              </li>

              <li>
                <Link
                  to={
                    user?.role === 'admin'
                      ? '/dashboard/admin/profile'
                      : '/dashboard/profile'
                  }
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200"
                >
                  <FiUser className="text-[#ff9346]" size={18} />
                  Profile
                </Link>
              </li>

              <li className="pt-2 border-t border-gray-200 dark:border-gray-600">
                <button
                  onClick={handleSignout}
                  className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
                >
                  <FiLogOut size={18} />
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="hidden md:flex justify-center items-center gap-4">
            <ThemeToggle />
            <Link
              to="/auth/login"
              className="px-4 py-2 border-2 border-[#ff6900] bg-gradient-to-r from-[#ff9346] to-[#ff6900] text-white rounded-lg font-semibold hover:bg-[#ff6900] hover:border-[#ff9346] hover:shadow-lg hover:scale-105 transition-transform duration-300"
            >
              Login
            </Link>

            <Link
              to="/auth/register"
              className="px-4 py-2 border-2 border-[#ff6900] text-[#ff6900] rounded-lg font-semibold hover:bg-[#ff5506] hover:text-white hover:shadow-lg hover:scale-105 transition-transform duration-300"
            >
              Register
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 py-4 space-y-4 text-center">
          <NavLinks />

          {user ? (
            <div className="space-y-3 px-4">
              <div className="pb-3 border-b border-gray-200 dark:border-gray-600">
                <img
                  src={user?.photoURL || people}
                  className="h-12 w-12 rounded-full border-2 border-orange-400 mx-auto"
                  alt="User"
                />
                <p className="font-semibold mt-2 text-gray-900 dark:text-white">
                  {user?.displayName}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user?.email}
                </p>
                {user?.role && (
                  <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded capitalize">
                    {user.role}
                  </span>
                )}
              </div>

              <Link
                to="/dashboard"
                className="flex items-center justify-center gap-2 w-full py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
                onClick={() => setMenuOpen(false)}
              >
                <FiGrid size={18} />
                Dashboard
              </Link>

              <Link
                to={
                  user?.role === 'admin'
                    ? '/dashboard/admin/profile'
                    : '/dashboard/profile'
                }
                className="flex items-center justify-center gap-2 w-full py-2 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition"
                onClick={() => setMenuOpen(false)}
              >
                <FiUser size={18} />
                Profile
              </Link>

              <div className="flex justify-center">
                <ThemeToggle />
              </div>

              <button
                onClick={() => {
                  handleSignout();
                  setMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 w-full py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
              >
                <FiLogOut size={18} />
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3 items-center px-4">
              <ThemeToggle />

              <Link
                to="/auth/login"
                className="w-full py-2 bg-[#ff9346] text-white rounded-lg font-semibold hover:bg-[#ff6900] transition"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>

              <Link
                to="/auth/register"
                className="w-full py-2 border-2 border-[#ff9346] text-[#ff6900] rounded-lg font-semibold hover:bg-[#ff9346] hover:text-white transition"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
