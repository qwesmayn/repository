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
    <div className="p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 lg:gap-16 mb-4 md:mb-8 lg:mb-16">
        <NavLink to={ANALITIC_ROUTE} className="text-lg md:text-xl font-medium">
          <div className="bg-blue-200 py-12 md:py-24 rounded-lg shadow-md flex items-center justify-center text-center">
            <span>Аналітика {">"}</span>
          </div>
        </NavLink>
        <NavLink to={USER_MANAGE_ROUTE} className="text-lg md:text-xl font-medium">
          <div className="bg-green-200 py-12 md:py-24 rounded-lg shadow-md flex items-center justify-center text-center">
            <span>Керування користувачами {">"}</span>
          </div>
        </NavLink>
        <NavLink to={DOWNLOAD_ROUTE} className="text-lg md:text-xl font-medium">
          <div className="bg-red-200 py-12 md:py-24 rounded-lg shadow-md flex items-center justify-center text-center">
            <span>Завантаження матеріалу {">"}</span>
          </div>
        </NavLink>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 lg:gap-16">
        <NavLink to={DISCIPLINE_MANAGE_ROUTE} className="text-lg md:text-xl font-medium">
          <div className="bg-yellow-200 py-12 md:py-24 rounded-lg shadow-md flex items-center justify-center text-center">
            <span>Керування дисциплінами {">"}</span>
          </div>
        </NavLink>
        <NavLink to={GROUP_MANAGE_ROUTE} className="text-lg md:text-xl font-medium">
          <div className="bg-purple-200 py-12 md:py-24 rounded-lg shadow-md flex items-center justify-center text-center">
            <span>Керування групами {">"}</span>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default MainNav;
