import { FC, useState, ChangeEvent, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../static/logo.png";
import {
  ArrowRightStartOnRectangleIcon,
  Bars3Icon,
  GlobeAltIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
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
} from "../utils/consts";
import { setAuth, setLanguage } from "../store/reducers/userSlice";
import { useAppDispatch, useAppSelector } from "../hooks/typeHooks";
import { NavLink } from "react-router-dom";
import i18n from "../i18n";

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { language, user } = useAppSelector((state) => state.userReducer);
  const [languageDropdownOpen, setLanguageDropdownOpen] =
    useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleLanguageChange = (lang: string) => {
    dispatch(setLanguage(lang));
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
    setLanguageDropdownOpen(false);
  };

  const handleLogout = () => {
    dispatch(setAuth(false));
    if (user?.role === "admin") {
      navigate(ADMIN_LOGIN_ROUTE);
    } else {
      navigate(STUDENT_LOGIN_ROUTE);
    }
    localStorage.clear();
  };

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if(user?.role === "admin"){
      if (event.key === "Enter" && searchQuery.trim() !== "") {
        navigate(`${ANALITIC_ROUTE}?search=${searchQuery.trim()}`);
      }
    }
    else {
      if (event.key === "Enter" && searchQuery.trim() !== "") {
        navigate(`${STUDENT_MATERIALS_ROUTE}?search=${searchQuery.trim()}`);
      }
    }
  };

  const pages = user?.role === "admin"? [
    { name: i18n.t("pages.mainPage"), link: ADMIN_ROUTE },
    { name: i18n.t("pages.anaLyticPage"), link: ANALITIC_ROUTE },
    { name: i18n.t("pages.userManagePage"), link: USER_MANAGE_ROUTE },
    { name: i18n.t("pages.downloadPage"), link: DOWNLOAD_ROUTE },
    {
      name: i18n.t("pages.manageDisciplinePage"),
      link: DISCIPLINE_MANAGE_ROUTE,
    },
    { name: i18n.t("pages.manageGroupPage"), link: GROUP_MANAGE_ROUTE },
  ] : [
    { name: i18n.t("pages.mainPage"), link: STUDENT_MAIN_ROUTE },
    { name: i18n.t("headerStudent.burgerMaterials"), link: STUDENT_MATERIALS_ROUTE },
    { name: i18n.t("headerStudent.burgerAbout"), link: STUDENT_ABOUT_ROUTE },
  ] ;

  return (
    <header className="bg-white shadow-dark-lg  py-4 px-6 flex flex-col lg:flex-row items-center justify-between">
      {/* Logo and University Name */}
      <div className="flex items-center flex-col w-3/12 justify-between mb-4 lg:mb-0 lg:flex-row">
        <NavLink to={ADMIN_ROUTE}>
          <img
            src={logo}
            alt="Лого"
            className="h-16 w-16 lg:h-24 lg:w-24 lg:mr-4"
          />
        </NavLink>
        <NavLink to={"#"}>
          <div className="text-center">
            <span className="text-lg lg:text-xl font-medium">
              {i18n.t("nameUniversity")}
            </span>
          </div>
        </NavLink>
      </div>

      {/* Search Input */}
      <div className="flex-none w-full lg:max-w-xs mb-4 lg:mb-0">
        <input
          type="text"
          placeholder={i18n.t("findPlaceholder")}
          value={searchQuery}
          onChange={handleSearchInputChange}
          onKeyPress={handleSearchKeyPress}
          className="w-full px-2 py-1 border text-center border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-bg-blue-design"
        />
      </div>

      {/* Бургер-меню */}
      <div className="relative">
        <button
          className="focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <XMarkIcon className="w-6 h-6 lg:w-8 lg:h-8" />
          ) : (
            <Bars3Icon className="w-6 h-6 lg:w-8 lg:h-8" />
          )}
        </button>
        {menuOpen && (
          <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-max bg-white border rounded-lg shadow-dark-lg py-4 px-6 text-center z-50">
            {pages.map((page, index) => (
              <NavLink
                key={index}
                to={page.link}
                onClick={() => setMenuOpen(!menuOpen)}
                className="bg-bg-blue-design block px-4 py-2 shadow-dark-lg mb-2"
              >
                {page.name}
              </NavLink>
            ))}
          </div>
        )}
      </div>

      {/* Phone Number, Language Switcher, Logout Button */}
      <div className="flex items-center space-x-4 lg:space-x-6">
        <span className="text-base lg:text-lg font-medium">
          +380 98 888 88 88
        </span>
        <div className="relative flex items-center">
          <button
            className="focus:outline-none"
            onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
          >
            <GlobeAltIcon className="w-8 h-8 lg:w-10 lg:h-10" />
          </button>
          {/* Выпадающий список языков */}
          {languageDropdownOpen && (
            <div className="absolute right-0 mt-32 w-36 bg-white rounded-lg shadow-lg z-10">
              <button
                className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                  language === "en" ? "font-bold" : ""
                }`}
                onClick={() => handleLanguageChange("en")}
              >
                English
              </button>
              <button
                className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                  language === "ua" ? "font-bold" : ""
                }`}
                onClick={() => handleLanguageChange("ua")}
              >
                Українська
              </button>
            </div>
          )}
        </div>
        <button className="focus:outline-none" onClick={handleLogout}>
          <ArrowRightStartOnRectangleIcon className="w-6 h-6 lg:w-8 lg:h-8" />
        </button>
      </div>
    </header>
  );
};

export default Header;
