import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import Loading from '../Components/Loading/Loading';

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  // Check if user is logged in AND has admin role
  if (user && user.role === 'admin') {
    return children;
  }

  // If not admin, redirect to dashboard home
  return <Navigate to="/dashboard" state={{ from: location }} replace />;
};

export default AdminRoute;
