import { FC } from 'react';
import './App.css';
import AppRouter from './components/AppRouter';
import Header from './components/Header';
import { useLocation } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import { useAppSelector } from './hooks/typeHooks';
import Loading from './components/Loadind';

const App: FC = () => {
  const { pathname } = useLocation();
  const login = pathname === "/login";
  useAuth();
  const { isLoading } = useAppSelector((state) => state.userReducer);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      {login ? null : <Header />}
      <AppRouter />
    </div>
  );
};

export default App;
