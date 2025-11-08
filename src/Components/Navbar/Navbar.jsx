import React, { use, useState } from 'react';
import Logo from './Logo';
import NavLinks from './NavLinks';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { HashLoader } from 'react-spinners';
import { Menu, X } from 'lucide-react';
import { AuthContext } from '../../Contexts/AuthContext';
import people from '../../assets/people.png'

const Navbar = () => {
  const { user, setUser, signOutUser, loading } = use(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignout = () => {
    signOutUser()
      .then(() => {
        setUser(null);
        navigate('/auth/login');
      })
      .catch(e => toast.error(e.message));
  };

  return (
    <nav className="bg-green-100 shadow-md sticky top-0 z-50">
      <div className="w-11/12 mx-auto py-4 flex justify-between items-center">
        <Logo />

        <div className="hidden md:block">
          <NavLinks />
        </div>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-green-200 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {loading ? (
          <HashLoader color="green" size={40} />
        ) : user ? (
          <div className="hidden md:flex flex-col items-center space-y-2 relative">
            <button
              popoverTarget="popover-1"
              style={{ anchorName: '--anchor-1' }}
            >
              <img
                src={
                  user?.photoURL ||
                  'https://img.icons8.com/?size=160&id=114015&format=png'
                }
                className="h-11 w-11 border-2 border-green-400 rounded-full object-cover cursor-pointer"
                alt="User"
              />
            </button>

            <div
              className="dropdown dropdown-end menu w-52 rounded-box bg-white shadow-md space-y-2 text-center"
              popover="auto"
              id="popover-1"
              style={{ positionAnchor: '--anchor-1' }}
            >
              <h2 className="text-lg font-semibold">{user?.displayName}</h2>
              <p className="text-sm text-gray-600">{user?.email}</p>
              <button
                onClick={handleSignout}
                className="px-5 py-2 bg-[#E3B23C] text-white rounded-lg font-semibold hover:bg-[#B97C16] transition cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div className="hidden md:flex justify-center items-center gap-4">
            <Link
              to="/auth/login"
              className="px-5 py-2 border-2 border-green-600 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 hover:border-green-700 transition"
            >
              Login
            </Link>

            <Link
              to="/auth/register"
              className="px-5 py-2 border-2 border-green-600 text-green-700 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition"
            >
              Register
            </Link>
          </div>
        )}
      </div>

      {menuOpen && (
        <div className="md:hidden bg-green-50 border-t border-green-200 py-4 space-y-4 text-center ">
          <NavLinks />
          {user ? (
            <div className="space-y-3">
              <div>
                <img
                  src={
                    user?.photoURL ||
                    people
                  }
                  className="h-12 w-12 rounded-full border-2 border-green-400 mx-auto"
                  alt="User"
                />
                <p className="font-semibold mt-1">{user?.displayName}</p>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>
              <button
                onClick={handleSignout}
                className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3 items-center">
              <Link
                to="/auth/login"
                className="w-3/4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/auth/register"
                className="w-3/4 py-2 border-2 border-green-600 text-green-700 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition"
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
