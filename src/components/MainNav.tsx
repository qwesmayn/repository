import { FC } from "react";
import { NavLink } from "react-router-dom";
import {
  ANALITIC_ROUTE,
  DISCIPLINE_MANAGE_ROUTE,
  DOWNLOAD_ROUTE,
  GROUP_MANAGE_ROUTE,
  USER_MANAGE_ROUTE,
} from "../utils/consts";

const MainNav: FC = () => {
  return (
    <div className="flex flex-col items-center p-4 md:p-8 lg:p-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-56 mb-8 md:mb-12 lg:mb-16">
        <NavLink to={ANALITIC_ROUTE} className="text-lg md:text-xl font-medium bg-bg-blue-design w-max rounded-3xl">
          <div className="w-[339px] h-[231px]  rounded-3xl shadow-dark-lg flex items-center justify-center text-center">
            <span>Аналітика {">"}</span>
          </div>
        </NavLink>
        <NavLink to={USER_MANAGE_ROUTE} className="text-lg md:text-xl font-medium bg-bg-blue-design  w-max rounded-3xl">
          <div className="w-[339px] h-[231px] rounded-3xl shadow-dark-lg flex items-center justify-center text-center">
            <span>Керування користувачами {">"}</span>
          </div>
        </NavLink>
        <NavLink to={DOWNLOAD_ROUTE} className="text-lg md:text-xl font-medium bg-bg-blue-design  w-max rounded-3xl">
          <div className="w-[339px] h-[231px] rounded-3xl shadow-dark-lg flex items-center justify-center text-center">
            <span>Завантаження матеріалу {">"}</span>
          </div>
        </NavLink>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-56 ">
        <NavLink to={DISCIPLINE_MANAGE_ROUTE} className="text-lg md:text-xl font-medium bg-bg-blue-design  w-max rounded-3xl">
          <div className="w-[339px] h-[231px] rounded-3xl shadow-dark-lg flex items-center justify-center text-center">
            <span>Керування дисциплінами {">"}</span>
          </div>
        </NavLink>
        <NavLink to={GROUP_MANAGE_ROUTE} className="text-lg md:text-xl font-medium bg-bg-blue-design  w-max rounded-3xl">
          <div className="w-[339px] h-[231px] rounded-3xl shadow-dark-lg flex items-center justify-center text-center">
            <span>Керування групами {">"}</span>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default MainNav;
