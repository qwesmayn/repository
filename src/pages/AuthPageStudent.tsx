import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import logo from "../static/logo.png";
import { useAppDispatch, useAppSelector } from "../hooks/typeHooks";
import { studentLogin } from "../store/action_creators/actionCreatos";
import { STUDENT_MAIN_ROUTE } from "../utils/consts";
import i18n from "../i18n";
import { setLanguage } from "../store/reducers/userSlice";

interface FormData {
  login: string;
  password: string;
}

const AuthPageStudent: FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    mode: "onBlur"
  });
  const [lang, setLang] = useState("uk");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector(state => state.userReducer);

  const onSubmit = async (data: FormData) => {
    try {
      await dispatch(studentLogin(data));
      navigate(STUDENT_MAIN_ROUTE);
    } catch (e) {
      console.error(e);
    }
  };

  const handleLanguageChange = (lang: string) => {
    dispatch(setLanguage(lang));
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
    setLang(lang)
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 pb-12 lg:px-8 bg-bg-blue-design h-screen">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-24 w-auto"
          src={logo}
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        {i18n.t('nameUniversity')}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Login
            </label>
            <div className="mt-2">
              <input
                id="login"
                type="text"
                autoComplete="username"
                required
                {...register("login", { 
                  required: 'Login is required',
                })}
                className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.login ? 'border-red-500' : ''}`}
              />
              {errors.login && <p className="mt-2 text-sm text-red-500">{errors.login.message}</p>}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium leading-6 text-gray-900">
              {i18n.t('userManage.password')}
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                {...register("password", { 
                  required: 'Password is required'
                })}
                className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.password ? 'border-red-500' : ''}`}
              />
              {errors.password && <p className="mt-2 text-sm text-red-500">{errors.password.message}</p>}
            </div>
          </div>

          <div className="flex justify-center cursor-pointer">
        <div onClick={() => handleLanguageChange(lang === "uk" ? "en" : "uk")}>
          {lang === "uk" ? "EN" : "UK"}
        </div>
      </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              disabled={isLoading}
            >
              {i18n.t('enter')}
            </button>
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AuthPageStudent;
