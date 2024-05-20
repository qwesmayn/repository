import AnalyticPage from "./pages/AnalyticPage"
import AuthPage from "./pages/AuthPage"
import LoadPage from "./pages/LoadPage"
import MainPage from "./pages/MainPage"
import ManageDiscipline from "./pages/ManageDiscipline"
import ManageGroup from "./pages/ManageGroup"
import UserManagePage from "./pages/UserManagePage"
import { ADMIN_ROUTE, ANALITIC_ROUTE, DISCIPLINE_MANAGE_ROUTE, DOWNLOAD_ROUTE, GROUP_MANAGE_ROUTE, LOGIN_ROUTE, USER_MANAGE_ROUTE } from "./utils/consts"

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component : MainPage
    },

    {
        path: ANALITIC_ROUTE,
        Component : AnalyticPage
    },

    {
        path: USER_MANAGE_ROUTE,
        Component : UserManagePage
    },

    {
        path: DOWNLOAD_ROUTE,
        Component : LoadPage
    },

    {
        path: DISCIPLINE_MANAGE_ROUTE,
        Component : ManageDiscipline
    },

    {
        path: GROUP_MANAGE_ROUTE,
        Component : ManageGroup
    },
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component : AuthPage,
    },
]