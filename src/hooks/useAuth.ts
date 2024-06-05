import { useEffect } from 'react';
import { useAppDispatch } from '../hooks/typeHooks';
import { useNavigate } from 'react-router-dom';
import { setAuth } from '../store/reducers/userSlice';
import { getAuth } from '../store/action_creators/actionCreatos';
import { ADMIN_LOGIN_ROUTE, STUDENT_LOGIN_ROUTE } from '../utils/consts';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(getAuth())
        .unwrap()
        .then(() => {
          dispatch(setAuth(true));
        })
        .catch(() => {
          localStorage.removeItem('token');
          dispatch(setAuth(false));
          // Проверяем текущий путь, чтобы определить на какую страницу перенаправить
          const currentPath = window.location.pathname;
          if (currentPath === STUDENT_LOGIN_ROUTE) {
            navigate(STUDENT_LOGIN_ROUTE);
          } else {
            navigate(ADMIN_LOGIN_ROUTE);
          }
        })
    } else {
      dispatch(setAuth(false));
      // Проверяем текущий путь, чтобы определить на какую страницу перенаправить
      const currentPath = window.location.pathname;
      if (currentPath === STUDENT_LOGIN_ROUTE) {
        navigate(STUDENT_LOGIN_ROUTE);
      } else {
        navigate(ADMIN_LOGIN_ROUTE);
      }
    }
  }, [dispatch, navigate]);
};

export default useAuth;
