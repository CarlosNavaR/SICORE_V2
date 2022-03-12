import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../Context/Authcontext';

const PrivateRoute = ({ children }: any) => {
  const { isLogin } = useContext(AuthContext);
  return isLogin ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};
export default PrivateRoute;
