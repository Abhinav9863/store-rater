import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function StoreOwnerRoute() {
  const { user } = useContext(AuthContext);
  return user && user.role === 'Store Owner' ? <Outlet /> : <Navigate to="/" />;
}

export default StoreOwnerRoute;
