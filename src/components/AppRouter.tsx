import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/typeHooks';
import ProtectedRoute from './ProtectedRoute';
import { ADMIN_LOGIN_ROUTE, ADMIN_ROUTE, STUDENT_MAIN_ROUTE } from '../utils/consts';
import { authRoutesAdmin, authRoutesStudent, publicRoutes } from '../routes';

const AppRouter: FC = () => {
  const { isAuth, user } = useAppSelector((state) => state.userReducer);
  
  return (
    <Routes>
      {isAuth && user?.role === 'admin' ? (
        authRoutesAdmin.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))
      ) : isAuth && user?.role === 'student' ? (
        authRoutesStudent.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))
      ) : (
        publicRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<ProtectedRoute element={<Component />} />} />
        ))
      )}
      <Route path="*" element={<Navigate to={isAuth ? (user?.role === 'admin' ? ADMIN_ROUTE : STUDENT_MAIN_ROUTE) : ADMIN_LOGIN_ROUTE} replace />} />
    </Routes>
  );
};

export default AppRouter;
