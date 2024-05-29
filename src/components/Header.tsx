import { useState } from "react";
import logo from "../static/logo.png";
import { ArrowRightStartOnRectangleIcon, Bars3Icon, GlobeAltIcon, XMarkIcon,} from "@heroicons/react/24/outline";
import { ADMIN_ROUTE, ANALITIC_ROUTE, DISCIPLINE_MANAGE_ROUTE, DOWNLOAD_ROUTE, GROUP_MANAGE_ROUTE, USER_MANAGE_ROUTE } from "../utils/consts";

const Header = () => {
  const [language, setLanguage] = useState<string>("ua");
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    setLanguageDropdownOpen(false); 
  };

  const handleLogout = () => {
    // Обработчик для выхода с аккаунта
    console.log("Logged out");
  };

  const pages = [
    { name: "Главная", link: ADMIN_ROUTE },
    { name: "Аналитика", link: ANALITIC_ROUTE },
    { name: "Управление пользователями", link: USER_MANAGE_ROUTE },
    { name: "Управление группами", link: GROUP_MANAGE_ROUTE },
    { name: "Управление дисциплинами", link: DISCIPLINE_MANAGE_ROUTE },
    { name: "Загрузка материала", link: DOWNLOAD_ROUTE },
  ];

  return (
    <header className="bg-white shadow-xl py-4 px-6 flex flex-col lg:flex-row items-center justify-between">
      {/* Logo and University Name */}
      <div className="flex items-center flex-col w-3/12 justify-between mb-4 lg:mb-0 lg:flex-row">
        <img src={logo} alt="Лого" className="h-16 w-16 lg:h-24 lg:w-24 lg:mr-4" />
        <div className="text-center">
          <span className="text-lg lg:text-xl font-medium">Репозіторій Університету</span>
          <br />
          <span className="text-lg lg:text-xl font-medium">ITSTEP</span>
        </div>
      </div>

      {/* Search Input */}
      <div className="flex-none w-full lg:max-w-xs mb-4 lg:mb-0">
        <input
          type="text"
          placeholder="Пошук"
          className="w-full px-2 py-1 border text-center border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Бургер-меню */}
      <div className="relative">
        <button className="focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <XMarkIcon className="w-6 h-6 lg:w-8 lg:h-8"/>
          ) : (
            <Bars3Icon className="w-6 h-6 lg:w-8 lg:h-8"/>
          )}
        </button>
        {menuOpen && (
          <div className="absolute left-0 top-full mt-2 w-max bg-white border rounded-lg shadow-lg py-2 text-center">
            {pages.map((page, index) => (
              <a
                key={index}
                href={page.link}
                className="block px-4 py-2 hover:bg-gray-100 shadow-xl"
              >
                {page.name}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Phone Number, Language Switcher, Logout Button */}
      <div className="flex items-center space-x-4 lg:space-x-6">
        <span className="text-base lg:text-lg font-medium">+380 98 888 88 88</span>
        <div className="relative flex items-center">
          <button
            className="focus:outline-none"
            onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
          >
            <GlobeAltIcon className="w-8 h-8 lg:w-10 lg:h-10"/>
          </button>
          {/* Выпадающий список языков */}
          {languageDropdownOpen && (
            <div className="absolute right-0 mt-32 w-36 bg-white rounded-lg shadow-lg z-10">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => handleLanguageChange("en")}
              >
                English
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => handleLanguageChange("ua")}
              >
                Українська
              </button>
            </div>
          )}
        </div>
        <button className="focus:outline-none" onClick={handleLogout}>
          <ArrowRightStartOnRectangleIcon className="w-6 h-6 lg:w-8 lg:h-8"/>
        </button>
      </div>
    </header>
  );
};

export default Header;
