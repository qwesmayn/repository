import { useEffect } from 'react';
import { useAppDispatch } from '../hooks/typeHooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { setAuth } from '../store/reducers/userSlice';
import { getAuth } from '../store/action_creators/actionCreatos';
import { ADMIN_LOGIN_ROUTE, STUDENT_LOGIN_ROUTE } from '../utils/consts';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(location)
    if (token) {
      dispatch(getAuth())
        .unwrap()
        .then(() => {
          dispatch(setAuth(true));
        })
        .catch(() => {
          localStorage.removeItem('token');
          dispatch(setAuth(false));
          // Сохраняем текущий путь перед перенаправлением
          const currentPath = location.pathname;
          localStorage.setItem('currentPath', currentPath);
          if (currentPath === STUDENT_LOGIN_ROUTE) {
            navigate(STUDENT_LOGIN_ROUTE);
          } else {
            navigate(ADMIN_LOGIN_ROUTE);
          }
        });
    } else {
      dispatch(setAuth(false));
      // Сохраняем текущий путь перед перенаправлением
      const currentPath = location.pathname;
      localStorage.setItem('currentPath', currentPath);
      if (currentPath === STUDENT_LOGIN_ROUTE) {
        navigate(STUDENT_LOGIN_ROUTE);
      } else {
        navigate(ADMIN_LOGIN_ROUTE);
      }
    }
  }, [dispatch, navigate, location.pathname]);
};

export default useAuth;
