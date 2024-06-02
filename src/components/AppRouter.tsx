import { FC } from 'react';
import { ADMIN_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import { Navigate, Route, Routes } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes';
import { useAppSelector } from '../hooks/typeHooks';
import ProtectedRoute from './ProtectedRoute';

const AppRouter: FC = () => {
  const { isAuth } = useAppSelector((state) => state.userReducer);

  return (
    <Routes>
      {isAuth ? (
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))
      ) : (
        publicRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<ProtectedRoute element={<Component />} />} />
        ))
      )}
      <Route path="*" element={<Navigate to={isAuth ? ADMIN_ROUTE : LOGIN_ROUTE} replace />} />
    </Routes>
  );
};

export default AppRouter;
