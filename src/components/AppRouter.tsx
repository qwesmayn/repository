import { FC} from "react";
import { LOGIN_ROUTE } from "../utils/consts";
import { Navigate, Route, Routes } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";

const AppRouter : FC = () => {

  const isAuth = true;
  return (
    <Routes>
      {isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      <Route path="*" element={<Navigate to={LOGIN_ROUTE} replace />} />
    </Routes>
  );
};

export default AppRouter;
