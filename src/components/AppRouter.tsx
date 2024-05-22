import { FC } from 'react';
import { ADMIN_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import { Navigate, Route, Routes } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes';
import { useAppSelector } from '../hooks/typeHooks';

const ProtectedLogin: FC<{ element: JSX.Element }> = ({ element }) => {
  const { isAuth } = useAppSelector((state) => state.userReducer);
  return isAuth ? <Navigate to={ADMIN_ROUTE} replace /> : element;
};

const AppRouter: FC = () => {
  const isAuth = true

  return (
    <Routes>
      {isAuth && authRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={
          path === LOGIN_ROUTE ? (
            <ProtectedLogin element={<Component />} />
          ) : (
            <Component />
          )
        } />
      ))}
      <Route path="*" element={<Navigate to={LOGIN_ROUTE} replace />} />
    </Routes>
  );
};

export default AppRouter;
