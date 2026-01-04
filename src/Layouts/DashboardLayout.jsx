import { useContext, useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import {
  FiHome,
  FiPlusCircle,
  FiBriefcase,
  FiCheckSquare,
  FiUser,
  FiUsers,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
  FiGrid,
} from 'react-icons/fi';
import Logo from '../Components/Navbar/Logo';

const DashboardLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };
  
  // User menu items
  const userMenuItems = [
    { name: 'Dashboard Home', path: '/dashboard', icon: FiHome },
    { name: 'Add Job', path: '/dashboard/add-job', icon: FiPlusCircle },
    { name: 'My Jobs', path: '/dashboard/my-jobs', icon: FiBriefcase },
    {
      name: 'Accepted Jobs',
      path: '/dashboard/my-accepted-jobs',
      icon: FiCheckSquare,
    },
  ];

  // Admin menu items (additional to user items)
  const adminMenuItems = [
    { name: 'Admin Dashboard', path: '/dashboard/admin', icon: FiGrid },
    { name: 'Manage Users', path: '/dashboard/admin/users', icon: FiUsers },
    { name: 'Manage Jobs', path: '/dashboard/admin/jobs', icon: FiBriefcase },
    {
      name: 'Manage Categories',
      path: '/dashboard/admin/categories',
      icon: FiSettings,
    },
  ];

  // Combine menu items based on role
  const menuItems =
    user?.role === 'admin'
      ? [ ...adminMenuItems]
      : userMenuItems;

  const isActive = path => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Navbar */}
      <nav className="fixed top-0 z-50 w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            {/* Left side - Menu button & Logo */}
            <div className="flex items-center justify-start">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                {sidebarOpen ? (
                  <FiX className="w-6 h-6" />
                ) : (
                  <FiMenu className="w-6 h-6" />
                )}
              </button>
              <Link to="/" className="flex ml-2 md:mr-24">
                {/* <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-blue-600 dark:text-blue-400">
                  Freelify
                </span> */}
                <Logo></Logo>
              </Link>
            </div>

            {/* Right side - Profile dropdown */}
            <div className="flex items-center">
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-3 text-sm bg-gray-100 dark:bg-gray-700 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 px-4 py-2"
                >
                  <img
                    className="w-8 h-8 rounded-full"
                    src={user?.photoURL || 'https://via.placeholder.com/150'}
                    alt="user"
                  />
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {user?.displayName || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                      {user?.role || 'user'}
                    </p>
                  </div>
                </button>

                {/* Profile Dropdown */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 z-50 mt-2 w-56 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600">
                    <div className="px-4 py-3 border-b dark:border-gray-600">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {user?.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {user?.email}
                      </p>
                    </div>
                    <ul className="py-2">
                      <li>
                        <Link
                          to={
                            user?.role === 'admin'
                              ? '/dashboard/admin/profile'
                              : '/dashboard/profile'
                          }
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                          onClick={() => setProfileDropdownOpen(false)}
                        >
                          <FiUser className="w-4 h-4" />
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/dashboard"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                          onClick={() => setProfileDropdownOpen(false)}
                        >
                          <FiHome className="w-4 h-4" />
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                          <FiLogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 lg:translate-x-0`}
      >
        <div className="h-full px-3 pb-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            {menuItems.map(item => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center p-3 rounded-lg transition-colors ${
                      active
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        active ? 'text-blue-600 dark:text-blue-300' : ''
                      }`}
                    />
                    <span className="ml-3">{item.name}</span>
                  </Link>
                </li>
              );
            })}

            {/* Divider before Profile/Logout */}
            <li className="pt-4 border-t border-gray-200 dark:border-gray-700"></li>

            {/* Profile Link */}
            <li>
              <Link
                to={
                  user?.role === 'admin'
                    ? '/dashboard/admin/profile'
                    : '/dashboard/profile'
                }
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center p-3 rounded-lg transition-colors ${
                  isActive('/dashboard/profile') ||
                  isActive('/dashboard/admin/profile')
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <FiUser className="w-5 h-5" />
                <span className="ml-3">Profile</span>
              </Link>
            </li>

            {/* Logout Button */}
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center w-full p-3 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                <FiLogOut className="w-5 h-5" />
                <span className="ml-3">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-gray-900/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="p-4 lg:ml-64 mt-14">
        <div className="p-4 rounded-lg">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
