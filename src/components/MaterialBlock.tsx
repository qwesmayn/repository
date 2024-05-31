import { FC, useState, ChangeEvent, useEffect } from "react";
import { IMaterials } from "../models/IMaterials";
import { IAuthors } from "../models/IAuthors";
import { IDiscipline } from "../models/IDiscipline";
import { ITypesMaterials } from "../models/ITypesMaterials";

interface MaterialBlockProps {
  material: IMaterials;
  authors: IAuthors[];
  disciplines: IDiscipline[];
  materialsTypes: ITypesMaterials[];
  onDownload: (id: string) => void;
  onSave: (id: string, change: object) => void;
  openModal: (id: string) => void;
}

const MaterialBlock: FC<MaterialBlockProps> = ({
  material,
  authors,
  disciplines,
  materialsTypes,
  onDownload,
  onSave,
  openModal,
}) => {
  const [editedMaterial, setEditedMaterial] = useState<IMaterials>({
    ...material,
  });
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const isDifferent = (
      editedMaterial.title !== material.title ||
      editedMaterial.description !== material.description ||
      editedMaterial.discipline !== material.discipline ||
      editedMaterial.materialType !== material.materialType ||
      editedMaterial.author !== material.author
    );
    setHasChanges(isDifferent);
  }, [editedMaterial, material]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  const { _id, previewImageUrl, createdAt } = material;

  return (
    <div
      key={_id}
      className="flex flex-col justify-between w-[327px] py-6 px-5 rounded-3xl border-x-2 border-gray-200 shadow-dark-lg"
    >
      <img
        src={
          previewImageUrl || "https://via.placeholder.com/250x100?text=No+Image"
        }
        alt={editedMaterial.title}
        className="object-cover rounded-lg mb-3"
        style={{ width: "100%", height: "55%" }}
      />
      <div className="h-full flex flex-col text-center">
        <div>
          <p className="text-base mb-4" onDoubleClick={handleDoubleClickTitle}>
            <strong>Назва:</strong>{" "}
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
          <p
            className="text-sm mb-4"
            onDoubleClick={handleDoubleClickDescription}
          >
            <strong>Опис:</strong>{" "}
            {isEditingDescription ? (
              <input
                type="text"
                name="description"
                value={editedMaterial.description}
                onChange={handleChange}
                onBlur={() => setIsEditingDescription(false)}
              />
            ) : (
              editedMaterial.description
            )}
          </p>
          <p className="text-xs mb-4">
            <strong>Дисципліна:</strong>{" "}
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
              <p className="text-xs mb-4">
                <strong>Тип матеріалу:</strong>{" "}
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
              <p className="text-xs mb-2 flex flex-col">
                <strong>К-сть переглядів:</strong>{" "}
                {editedMaterial.downloadCount}
              </p>
            </div>
            <div className="flex items-center flex-col space-y-4">
              <p className="text-xs mb-4">
                <strong>Автор:</strong>
                <select
                  name="author"
                  value={editedMaterial.author}
                  onChange={handleChange}
                  className="text-center"
                >
                  {authors.map((author) => (
                    <option key={author._id} value={author._id}>
                      {author.fullName}
                    </option>
                  ))}
                </select>
              </p>
              <p className="text-xs flex flex-col">
                <strong>Дата завантаження:</strong>{" "}
                {new Date(createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-3 mt-2">
          <button
            onClick={() => onDownload(_id)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm"
          >
            Скачати матеріал
          </button>
          <button
            onClick={handleSave}
            className={`px-4 py-2 rounded-lg text-sm ${
              hasChanges ? "bg-green-500 text-white" : "bg-gray-500 text-gray-300 cursor-not-allowed"
            }`}
            disabled={!hasChanges}
          >
            Зберегти зміни
          </button>
          <button
            onClick={() => openModal(_id)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm"
          >
            Видалити
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaterialBlock;
