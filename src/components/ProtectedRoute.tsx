import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/typeHooks';
import { ADMIN_ROUTE, STUDENT_MAIN_ROUTE } from '../utils/consts';

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ element }) => {
  const { isAuth, user } = useAppSelector((state) => state.userReducer);

  if (isAuth) {
    // Проверяем роль пользователя
    if (user?.role === 'admin') {
      // Если пользователь админ, перенаправляем на админскую страницу
      return <Navigate to={ADMIN_ROUTE} replace />;
    } else if (user?.role === 'student') {
      return <Navigate to={STUDENT_MAIN_ROUTE} replace />;
    }
  } else {
    return element
  }
};

export default ProtectedRoute;
