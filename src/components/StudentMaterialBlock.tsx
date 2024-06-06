import React, { FC } from "react";
import { IMaterials } from "../models/IMaterials";
import { IAuthors } from "../models/IAuthors";
import { IDiscipline } from "../models/IDiscipline";
import { ITypesMaterials } from "../models/ITypesMaterials";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import i18n from "../i18n";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../hooks/typeHooks";
import { changeDownloads } from "../store/action_creators/actionCreatos";

interface StudentMaterialBlockProps {
  material: IMaterials;
  authors: IAuthors[];
  disciplines: IDiscipline[];
  materialsTypes: ITypesMaterials[];
}

const StudentMaterialBlock: FC<StudentMaterialBlockProps> = ({
  material,
  authors,
  disciplines,
  materialsTypes,
}) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] =
    React.useState(false);
  const dispatch = useAppDispatch();

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const getDisciplineName = (id: string) => {
    const discipline = disciplines.find((d) => d._id === id);
    return discipline ? discipline.name : "Unknown Discipline";
  };

  const getMaterialTypeName = (id: string) => {
    const type = materialsTypes.find((t) => t._id === id);
    return type ? type.name : "Unknown Type";
  };

  const getAuthorName = (id: string) => {
    const author = authors.find((a) => a._id === id);
    return author ? author.fullName : "Unknown Author";
  };

  const handleSetDownload = (id: string) => {
    dispatch(changeDownloads(id));
  };

  const {
    _id,
    previewImageUrl,
    title,
    description,
    createdAt,
    downloadCount,
    contentUrl,
  } = material;

  const imageUrl = "http://localhost:3001/uploads/" + previewImageUrl;
  const fileUrl = "http://localhost:3001/uploads/" + contentUrl;

  return (
    <div
      key={_id}
      className="flex flex-col justify-between w-[327px] py-6 px-5 rounded-3xl border-x-2 h-max border-gray-200 shadow-dark-lg bg-bg-blue-design"
    >
      <img
        src={
          previewImageUrl
            ? imageUrl
            : "https://via.placeholder.com/250x100?text=No+Image"
        }
        alt={title}
        className="object-cover rounded-lg mb-3 w-full h-[100px]"
      />
      <div className="h-full flex flex-col text-center">
        <div>
          <p className="text-base mb-4 bg-white p-1">
            <strong>{i18n.t("material.materialName")}</strong> {title}
          </p>
          <div className="relative">
            <p
              className="text-sm mb-4 bg-white p-1"
              style={{
                whiteSpace: isDescriptionExpanded ? "normal" : "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              <strong>{i18n.t("material.materialDescription")}</strong>{" "}
              {description}
            </p>
          </div>

          {description && description.length >= 32 && (
            <button
              onClick={toggleDescription}
              className={` w-6 transition-transform ${
                isDescriptionExpanded ? "rotate-180" : ""
              }`}
            >
              <ChevronDownIcon />
            </button>
          )}
          <p className="text-xs mb-4 bg-white rounded-2xl p-1">
            <strong>{i18n.t("material.materialDiscipline")}</strong>{" "}
            {getDisciplineName(material.discipline)}
          </p>
          <p className="text-xs mb-4 bg-white rounded-2xl p-1">
            <strong>{i18n.t("material.materialAuthor")}</strong>{" "}
            {getAuthorName(material.author)}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center flex-col space-y-4">
              <p className="bg-white text-xs rounded-2xl p-1">
                <strong>{i18n.t("material.materialTypematerial")}</strong>
                <br /> {getMaterialTypeName(material.materialType)}
              </p>
            </div>
            <div className="flex items-center flex-col space-y-4 ">
              <p className="text-xs flex flex-col bg-white rounded-2xl p-1">
                <strong>{i18n.t("material.materialDateUpload")}</strong>{" "}
                {new Date(createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-3 mt-2">
          <NavLink
            to={fileUrl}
            download
            onClick={() => handleSetDownload(_id)}
            className="bg-white shadow-dark-lg text-black px-4 py-2 rounded-lg text-sm text-center"
          >
            {i18n.t("material.buttonDownloadMaterial")}
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default StudentMaterialBlock;
