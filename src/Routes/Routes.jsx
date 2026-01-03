import { createBrowserRouter } from 'react-router';
import RootLayout from '../Layouts/RootLayout';
import DashboardLayout from '../Layouts/DashboardLayout';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import AllJobs from '../Pages/AllJobs';
import JobDetails from '../Pages/JobDetails';
import About from '../Pages/About';
import Contact from '../Pages/Contact';
import Error from '../Components/Error/Error';
import Loading from '../Components/Loading/Loading';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';

// Dashboard Pages - User
import DashboardHome from '../Pages/Dashboard/User/DashboardHome';
import AddJob from '../Pages/Dashboard/User/AddJob';
import MyAddedJobs from '../Pages/Dashboard/User/MyAddedJobs';
import MyAcceptedJobs from '../Pages/Dashboard/User/MyAcceptedJobs';
import UpdateJob from '../Pages/Dashboard/User/UpdateJob';
import DeleteJob from '../Pages/Dashboard/User/DeleteJob';
import UserProfile from '../Pages/Dashboard/User/UserProfile';

// Dashboard Pages - Admin
import AdminDashboard from '../Pages/Dashboard/Admin/AdminDashboard';
import ManageUsers from '../Pages/Dashboard/Admin/ManageUsers';
import ManageJobs from '../Pages/Dashboard/Admin/ManageJobs';
import ManageCategories from '../Pages/Dashboard/Admin/ManageCategories';
import AdminProfile from '../Pages/Dashboard/Admin/AdminProfile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      // ==================== PUBLIC ROUTES ====================
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'all-jobs',
        element: <AllJobs />,
      },
      {
        path: 'all-jobs/:id',
        element: <JobDetails />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'auth/login',
        element: <Login />,
      },
      {
        path: 'auth/register',
        element: <Register />,
      },
    ],
  },

  // ==================== DASHBOARD ROUTES ====================
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <Error />,
    children: [
      // USER DASHBOARD ROUTES
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: 'add-job',
        element: <AddJob />,
      },
      {
        path: 'my-jobs',
        element: <MyAddedJobs />,
      },
      {
        path: 'my-accepted-jobs',
        element: <MyAcceptedJobs />,
      },
      {
        path: 'update-job/:id',
        element: <UpdateJob />,
      },
      {
        path: 'delete-job/:id',
        element: <DeleteJob />,
      },
      {
        path: 'profile',
        element: <UserProfile />,
      },

      // ADMIN DASHBOARD ROUTES (Protected by AdminRoute)
      {
        path: 'admin',
        element: (
          // <AdminRoute>
          <AdminDashboard />
          // </AdminRoute>
        ),
      },
      {
        path: 'admin/users',
        element: <ManageUsers />,
      },
      {
        path: 'admin/jobs',
        element: <ManageJobs />,
      },
      {
        path: 'admin/categories',
        element: <ManageCategories />,
      },
      {
        path: 'admin/profile',
        element: <AdminProfile />,
      },
    ],
  },
]);

export default router;
