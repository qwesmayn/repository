import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import logo from "../static/logo.png";
import { useAppDispatch, useAppSelector } from "../hooks/typeHooks";
import { ADMIN_ROUTE } from "../utils/consts";
import { Login } from "../store/action_creators/actionCreatos";
import i18n from "../i18n";
import { setLanguage } from "../store/reducers/userSlice";

interface FormData {
  email: string;
  password: string;
}

const AuthPage: FC = () => {
  const [lang, setLang] = useState("uk");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onBlur",
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector((state) => state.userReducer);

  const onSubmit = async (data: FormData) => {
    try {
      await dispatch(Login(data)).unwrap();
      navigate(ADMIN_ROUTE);
    } catch (e) {
      console.error(e);
    }
  };

  const handleLanguageChange = (lang: string) => {
    dispatch(setLanguage(lang));
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
    setLang(lang);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-start px-6 pt-[89px] lg:px-[128px] bg-bg-blue-design h-screen">
      <img className="w-[120px] mb-24" src={logo} alt="Your Company" />
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {i18n.t("nameUniversity")}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                {...register("email", {
                  required: "email",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: i18n.t("auth.emailInvalid"),
                  },
                })}
                className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                {i18n.t("userManage.password")}
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                {...register("password", {
                  required: "password",
                })}
                className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-center cursor-pointer">
            <div
              onClick={() => handleLanguageChange("en")}
              className={`mr-[34px] ${
                lang === "en" && "border-b border-black"
              }`}
            >
              EN
            </div>
            <div
              onClick={() => handleLanguageChange("uk")}
              className={`${lang === "uk" && "border-b border-black"}`}
            >
              UK
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              disabled={isLoading}
            >
              {i18n.t("enter")}
            </button>
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
