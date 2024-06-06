import { FC, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from './hooks/typeHooks';
import { ADMIN_LOGIN_ROUTE, STUDENT_LOGIN_ROUTE } from './utils/consts';
import withAuth from './hoc/withAuth';
import AppRouter from './components/AppRouter';
import Loading from './components/Loadind';

const App: FC = () => {
  const location = useLocation();
  const { pathname } = location;
  const { isLoading, isAuth } = useAppSelector((state) => state.userReducer);

  useEffect(() => {
    localStorage.setItem('lastPathname', pathname);
  }, [pathname]); 

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='font-inter'>
      {isAuth && ![ADMIN_LOGIN_ROUTE, STUDENT_LOGIN_ROUTE].includes(pathname) && <Header />}
      <AppRouter/>
    </div>
  );
};

export default withAuth(App);
