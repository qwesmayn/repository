import AnalyticPage from "./pages/AnalyticPage";
import AuthPage from "./pages/AuthPage";
import LoadPage from "./pages/LoadPage";
import MainPage from "./pages/MainPage";
import ManageDiscipline from "./pages/ManageDiscipline";
import ManageGroup from "./pages/ManageGroup";
import UserManagePage from "./pages/UserManagePage";
import AuthPageStudent from "./pages/AuthPageStudent";
import {
  ADMIN_LOGIN_ROUTE,
  ADMIN_ROUTE,
  ANALITIC_ROUTE,
  DISCIPLINE_MANAGE_ROUTE,
  DOWNLOAD_ROUTE,
  GROUP_MANAGE_ROUTE,
  STUDENT_ABOUT_ROUTE,
  STUDENT_LOGIN_ROUTE,
  STUDENT_MAIN_ROUTE,
  STUDENT_MATERIALS_ROUTE,
  USER_MANAGE_ROUTE,
} from "./utils/consts";
import MainPageStudent from "./pages/MainPageStudent";
import InformationPage from "./pages/InformationPage";

export const authRoutesAdmin = [
  { path: ADMIN_ROUTE, Component: MainPage },
  { path: ANALITIC_ROUTE, Component: AnalyticPage },
  { path: USER_MANAGE_ROUTE, Component: UserManagePage },
  { path: DOWNLOAD_ROUTE, Component: LoadPage },
  { path: DISCIPLINE_MANAGE_ROUTE, Component: ManageDiscipline },
  { path: GROUP_MANAGE_ROUTE, Component: ManageGroup },
];

export const authRoutesStudent = [
  { path: STUDENT_MAIN_ROUTE, Component: MainPageStudent },
  { path: STUDENT_MATERIALS_ROUTE, Component: AnalyticPage },
  { path: STUDENT_ABOUT_ROUTE, Component: InformationPage },
];

export const publicRoutes = [
  { path: ADMIN_LOGIN_ROUTE, Component: AuthPage },
  { path: STUDENT_LOGIN_ROUTE, Component: AuthPageStudent },
];
