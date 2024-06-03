import { FC } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import logo from "../static/logo.png";
import { useAppDispatch, useAppSelector } from "../hooks/typeHooks";
import { ADMIN_ROUTE } from "../utils/consts";
import { Login } from "../store/action_creators/actionCreatos";

interface FormData {
  email: string;
  password: string;
}

const AuthPage: FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    mode: "onBlur"
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector(state => state.userReducer);

  const onSubmit = async (data: FormData) => {
    try {
      await dispatch(Login(data)).unwrap();
      navigate(ADMIN_ROUTE);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-bg-blue-design h-screen">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-24 w-auto"
            src={logo}
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Репозиторий Университета ITSTEP
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
                  {...register("email", { required: true,
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                  })}
                  className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && <p className="mt-2 text-sm text-red-500">Email is required</p>}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Пароль
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  {...register("password", { required: true})}
                  className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.password ? 'border-red-500' : ''}`}
                />
                {errors.password && <p className="mt-2 text-sm text-red-500">Password is required</p>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={isLoading}
              >
                {isLoading ? 'Загрузка...' : 'Вхід'}
              </button>
              {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AuthPage;
