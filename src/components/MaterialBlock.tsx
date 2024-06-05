import { FC, useState, ChangeEvent, useEffect } from "react";
import { IMaterials } from "../models/IMaterials";
import { IAuthors } from "../models/IAuthors";
import { IDiscipline } from "../models/IDiscipline";
import { ITypesMaterials } from "../models/ITypesMaterials";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import i18n from "../i18n";
import { NavLink } from "react-router-dom";

interface MaterialBlockProps {
  material: IMaterials;
  authors: IAuthors[];
  disciplines: IDiscipline[];
  materialsTypes: ITypesMaterials[];
  onSave: (id: string, change: object) => void;
  openModal: (id: string) => void;
}

const MaterialBlock: FC<MaterialBlockProps> = ({
  material,
  authors,
  disciplines,
  materialsTypes,
  onSave,
  openModal,
}) => {
  const [editedMaterial, setEditedMaterial] = useState<IMaterials>({
    ...material,
  });
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  useEffect(() => {
    const isDifferent =
      editedMaterial.title !== material.title ||
      editedMaterial.description !== material.description ||
      editedMaterial.discipline !== material.discipline ||
      editedMaterial.materialType !== material.materialType ||
      editedMaterial.author !== material.author;
    setHasChanges(isDifferent);
  }, [editedMaterial, material]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditedMaterial((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const changes: { [key: string]: any } = {};
    if (editedMaterial.title !== material.title) {
      changes.title = editedMaterial.title;
    }
    if (editedMaterial.description !== material.description) {
      changes.description = editedMaterial.description;
    }
    if (editedMaterial.discipline !== material.discipline) {
      changes.disciplineId = editedMaterial.discipline;
    }
    if (editedMaterial.materialType !== material.materialType) {
      changes.materialType = editedMaterial.materialType;
    }
    if (editedMaterial.author !== material.author) {
      changes.authorId = editedMaterial.author;
    }
    onSave(material._id, changes);
  };

  const handleDoubleClickTitle = () => {
    setIsEditingTitle(true);
  };

  const handleDoubleClickDescription = () => {
    setIsEditingDescription(true);
  };

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };
  

  const { _id, previewImageUrl, createdAt, contentUrl } = material;

  const imageUrl = "http://localhost:3001/uploads/" + previewImageUrl;
  const fileUrl = "http://localhost:3001/uploads/" + contentUrl;

  return (
    <div
      key={_id}
      className="flex flex-col justify-between w-[327px] py-6 px-5 rounded-3xl border-x-2 h-max border-gray-200 shadow-dark-lg bg-bg-blue-design"
    >
      <img
        src={
          previewImageUrl ? imageUrl : "https://via.placeholder.com/250x100?text=No+Image"
        }
        alt={editedMaterial.title}
        className="object-cover rounded-lg mb-3 w-full h-[100px]"
      />
      <div className="h-full flex flex-col text-center">
        <div>
          <p className="text-base mb-4 bg-white" onDoubleClick={handleDoubleClickTitle}>
            <strong>{i18n.t('material.materialName')}</strong>{" "}
            {isEditingTitle ? (
              <input
                type="text"
                name="title"
                value={editedMaterial.title}
                onChange={handleChange}
                onBlur={() => setIsEditingTitle(false)}
              />
            ) : (
              editedMaterial.title
            )}
          </p>
          <div className="relative">
            <p
              className="text-sm mb-4 bg-white"
              onDoubleClick={handleDoubleClickDescription}
              style={{
                whiteSpace: isDescriptionExpanded ? "normal" : "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              <strong>{i18n.t('material.materialDescription')}</strong>{" "}
              {isEditingDescription ? (
                <input
                  type="text"
                  name="description"
                  value={editedMaterial.description}
                  onChange={handleChange}
                  onBlur={() => setIsEditingDescription(false)}
                />
              ) : isDescriptionExpanded ? (
                <div className="mt-4 border-t border-gray-200 break-words">
                  <p className="text-sm">{editedMaterial.description}</p>
                </div>
              ) : (
                editedMaterial.description
              )}
            </p>
          </div>
          <button onClick={toggleDescription} className={`mb-4 w-6 transition-transform ${
              isDescriptionExpanded ? "rotate-180" : ""
            }`}>
            {editedMaterial.description &&
              editedMaterial.description.length >= 32 &&
              <ChevronDownIcon />
              }
          </button>

          <p className="text-xs mb-4 bg-white rounded-2xl">
            <strong>{i18n.t('material.materialDiscipline')}</strong>{" "}
            <select
              name="discipline"
              value={editedMaterial.discipline}
              onChange={handleChange}
            >
              {disciplines.map((discipline) => (
                <option key={discipline._id} value={discipline._id}>
                  {discipline.name}
                </option>
              ))}
            </select>
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center flex-col space-y-4">
              <p className="bg-white text-xs mb-4 rounded-2xl w-min">
                <strong>{i18n.t('material.materialTypematerial')}</strong>{" "}
                <select
                  name="materialType"
                  value={editedMaterial.materialType}
                  onChange={handleChange}
                  className="text-center"
                >
                  {materialsTypes.map((type) => (
                    <option key={type._id} value={type._id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </p>
              <p className="text-xs flex flex-col bg-white rounded-2xl">
                <strong>{i18n.t('material.materialCountViewers')}</strong>{" "}
                {editedMaterial.downloadCount}
              </p>
            </div>
            <div className="flex items-center flex-col space-y-4 ">
              <p className="text-xs mb-4 bg-white rounded-2xl w-min">
                <strong>{i18n.t('material.materialAuthor')}</strong>
                <select
                  name="author"
                  value={editedMaterial.author}
                  onChange={handleChange}
                  className="text-center rounded-2xl"
                >
                  {authors.map((author) => (
                    <option key={author._id} value={author._id}>
                      {author.fullName}
                    </option>
                  ))}
                </select>
              </p>
              <p className="text-xs flex flex-col bg-white rounded-2xl">
                <strong>{i18n.t('material.materialDateUpload')}</strong>{" "}
                {new Date(createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-3 mt-2">
          <NavLink
            to={fileUrl}
            download
            className="bg-white shadow-dark-lg text-black px-4 py-2 rounded-lg text-sm text-center"
          >
            {i18n.t('material.buttonDownloadMaterial')}
          </NavLink>
          <button
            onClick={handleSave}
            className={`shadow-dark-lg px-4 py-2 rounded-lg text-sm ${
              hasChanges
                ? "bg-white text-black"
                : "bg-gray-500 text-gray-300 cursor-not-allowed"
            }`}
            disabled={!hasChanges}
          >
            {i18n.t('material.buttonSaveChanges')}
          </button>
          <button
            onClick={() => openModal(_id)}
            className="bg-white shadow-dark-lg text-black px-4 py-2 rounded-lg text-sm"
          >
            {i18n.t('material.buttonDeleteMaterial')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaterialBlock;
