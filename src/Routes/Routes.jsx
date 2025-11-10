import { createBrowserRouter } from 'react-router';
import RootLayout from '../Layouts/RootLayout';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import AllJobs from '../Pages/AllJobs';
import JobDetails from '../Pages/JobDetails';
import Error from '../Components/Error/Error';
import Loading from '../Components/Loading/Loading';
import PrivateRoute from './PrivateRoute';
import AddJob from '../Pages/AddJob';
import MyAddedJobs from '../Pages/MyAddedJobs';
import MyAccepted from '../Pages/MyAccepted';
import UpdateJob from '../Pages/UpdateJob';

const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    errorElement: <Error></Error>,
    hydrateFallbackElement: <Loading></Loading>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'allJobs',
        Component: AllJobs,
      },
      {
        path: 'allJobs/:id',
        element: (
          <PrivateRoute>
            <JobDetails></JobDetails>
          </PrivateRoute>
        ),
      },
      {
        path: 'addJob',
        element: (
          <PrivateRoute>
            <AddJob></AddJob>
          </PrivateRoute>
        ),
      },
      {
        path: 'myAddedJobs',
        element: (
          <PrivateRoute>
            <MyAddedJobs></MyAddedJobs>
          </PrivateRoute>
        ),
      },
      {
        path: '/my-accepted-tasks',
        element: (
          <PrivateRoute>
            <MyAccepted></MyAccepted>
          </PrivateRoute>
        ),
      },
      {
        path: "/update-job/:id",
        element: <UpdateJob></UpdateJob>
      },
      {
        path: 'auth/login',
        Component: Login,
      },
      {
        path: 'auth/register',
        Component: Register,
      },
    ],
  },
]);

export default router;
