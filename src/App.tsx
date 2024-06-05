import { FC } from 'react';
import './App.css';
import AppRouter from './components/AppRouter';
import Header from './components/Header';
import { useLocation } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import { useAppSelector } from './hooks/typeHooks';
import { ADMIN_LOGIN_ROUTE, STUDENT_LOGIN_ROUTE } from './utils/consts';
import Loading from './components/Loadind';

const App: FC = () => {
  const { pathname } = useLocation();
  const loginPage = pathname === ADMIN_LOGIN_ROUTE || pathname === STUDENT_LOGIN_ROUTE;
  useAuth();
  const { isLoading, isAuth } = useAppSelector((state) => state.userReducer);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='font-inter'>
      {isAuth && !loginPage && <Header />}
      <AppRouter />
    </div>
  );
};

export default App;
