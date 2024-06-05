import { FC } from "react";
import { NavLink } from "react-router-dom";
import {
  STUDENT_ABOUT_ROUTE,
  STUDENT_MATERIALS_ROUTE,
} from "../utils/consts";
import i18n from "../i18n";

const MainNavStudent: FC = () => {
  return (
    <div className="flex flex-col items-center p-4 md:p-8 lg:p-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-56 mb-8 md:mb-12 lg:mb-16">
        <NavLink to={STUDENT_MATERIALS_ROUTE} className="text-lg md:text-xl font-medium bg-bg-blue-design w-max rounded-3xl">
          <div className="w-[339px] h-[231px]  rounded-3xl shadow-dark-lg flex items-center justify-center text-center">
            <span>{i18n.t("headerStudent.burgerMaterials")}{" >"}</span>
          </div>
        </NavLink>
        <NavLink to={STUDENT_ABOUT_ROUTE} className="text-lg md:text-xl font-medium bg-bg-blue-design  w-max rounded-3xl">
          <div className="w-[339px] h-[231px] rounded-3xl shadow-dark-lg flex items-center justify-center text-center">
            <span>{i18n.t("headerStudent.burgerAbout")}{" >"}</span>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default MainNavStudent;
