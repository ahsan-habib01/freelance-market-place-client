import { createBrowserRouter } from 'react-router';
import RootLayout from '../Layouts/RootLayout';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import AllJobs from '../Pages/AllJobs';

const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
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
