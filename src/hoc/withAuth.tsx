import React, { useEffect } from 'react';
import { useAppDispatch } from '../hooks/typeHooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { setAuth } from '../store/reducers/userSlice';
import { getAuth } from '../store/action_creators/actionCreatos';
import { ADMIN_LOGIN_ROUTE, STUDENT_LOGIN_ROUTE } from '../utils/consts';

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const WithAuth: React.FC<P> = (props) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation()

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
            const currentPath = location.pathname;
            if (currentPath === STUDENT_LOGIN_ROUTE) {
              navigate(STUDENT_LOGIN_ROUTE);
            } else {
              navigate(ADMIN_LOGIN_ROUTE);
            }
          });
      } else {
        dispatch(setAuth(false));
      }
    }, [dispatch, navigate]);

    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export default withAuth;
