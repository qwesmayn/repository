import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/typeHooks';
import { ADMIN_ROUTE } from '../utils/consts';

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ element }) => {
  const { isAuth } = useAppSelector((state) => state.userReducer);

  if (isAuth) {
    return <Navigate to={ADMIN_ROUTE} replace />;
  } else {
    return element;
  }
};

export default ProtectedRoute;
