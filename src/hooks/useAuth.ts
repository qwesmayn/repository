import { useEffect } from 'react';
import { useAppDispatch } from '../hooks/typeHooks';
import { useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE } from '../utils/consts';
import { setAuth } from '../store/reducers/userSlice';
import { getAuth } from '../store/action_creators/actionCreatos';

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
          navigate(LOGIN_ROUTE);
        })
    } else {
      dispatch(setAuth(false));
      navigate(LOGIN_ROUTE);
    }
  }, [dispatch, navigate]);
};

export default useAuth;

