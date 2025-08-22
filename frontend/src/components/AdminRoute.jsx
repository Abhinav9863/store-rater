import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function AdminRoute() {
  const { user } = useContext(AuthContext);
  return user && user.role === 'System Administrator' ? <Outlet /> : <Navigate to="/" />;
}

export default AdminRoute;
