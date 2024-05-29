import React, { FC, useEffect, useRef, useState } from "react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "../hooks/typeHooks";
import {
  getDisciplines,
  getAuthors,
  createMaterial,
  getMaterialsTypes,
} from "../store/action_creators/actionCreatos";
import { useForm } from "react-hook-form";

const LoadPage: FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const [isLinkChecked, setIsLinkChecked] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [file, setFile] = useState<File | undefined>(undefined);
  const [coverFile, setCoverFile] = useState<File | undefined>(undefined);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const { disciplines } = useAppSelector((state) => state.disciplineReducer);
  const { authors } = useAppSelector((state) => state.userManageReducer);
  const { materialsTypes } = useAppSelector((state) => state.materialReducer)

  useEffect(() => {
    Promise.all([
      dispatch(getDisciplines()),
      dispatch(getAuthors()),
      dispatch(getMaterialsTypes()),
    ]);
  }, []);

  const handleFileUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile ?? undefined);
  };

  const handleCoverChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedCoverFile = event.target.files?.[0] || null;
    setCoverFile(selectedCoverFile ?? undefined);
    if (selectedCoverFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedCoverFile);
    }
  };

  const handleLinkCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsLinkChecked(event.target.checked);
  };

  const handleCoverDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedCoverFile = event.dataTransfer.files[0];
    setCoverFile(droppedCoverFile);
    if (droppedCoverFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result as string);
      };
      reader.readAsDataURL(droppedCoverFile);
    }
  };

  const onSubmit = (data: any) => {
    const materialData = {
      title: data.title,
      description: data.description,
      authorId: data.author,
      disciplineId: data.discipline,
      materialType: data.materialType,
      contentType: isLinkChecked ? "external" : "internal",
      contentUrl: data.contentUrl,
      previewImage: coverFile,
      materialFile: file,
    };

    dispatch(createMaterial(materialData));
  };

  return (
    <div
      className="flex justify-between items-center mt-16 px-12 h-max"
      onDrop={handleCoverDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className="max-w-md w-full bg-white shadow-md rounded-md p-6 space-y-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-9 shadow-xl">
            <input
              id="title"
              type="text"
              placeholder="Введіть назву:"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
              {...register("title", { required: true })}
            />
            {errors.title && (
              <span className="text-red-500">Назва обов'язкова</span>
            )}
          </div>
          <div className="mb-9 shadow-xl">
            <textarea
              id="description"
              placeholder="Введіть опис:"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
              {...register("description", { required: true })}
            ></textarea>
            {errors.description && (
              <span className="text-red-500">Опис обов'язковий</span>
            )}
          </div>
          <div className="mb-9 shadow-xl">
            <select
              id="discipline"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
              {...register("discipline", { required: true })}
            >
              {disciplines.map((discipline) => (
                <option key={discipline._id} value={discipline._id}>
                  {discipline.name}
                </option>
              ))}
            </select>
            {errors.discipline && (
              <span className="text-red-500">Дисципліна обов'язкова</span>
            )}
          </div>
          <div className="mb-9 shadow-xl">
            <select
              id="materialType"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
              {...register("materialType", { required: true })}
            >
                {materialsTypes.map((materialsType) => (
                    <option key={materialsType._id} value={materialsType._id}>
                        {materialsType.name}
                    </option>
                ))}
            </select>
          </div>
          <div className="mb-9 shadow-xl">
            <select
              id="author"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
              {...register("author", { required: true })}
            >
              {authors.map((author) => (
                <option key={author._id} value={author._id}>
                  {author.fullName}
                </option>
              ))}
            </select>
            {errors.author && (
              <span className="text-red-500">Автор обов'язковий</span>
            )}
          </div>
          <div className="mb-9 shadow-xl">
            <div className="flex items-center">
              <input
                id="link"
                type="text"
                placeholder="Вставте посилання:"
                className={`w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 ${
                  isLinkChecked ? "" : "opacity-50 cursor-not-allowed"
                }`}
                disabled={!isLinkChecked}
                {...register("link")}
              />
              <label htmlFor="link" className="ml-2 flex">
                <input
                  type="checkbox"
                  id="linkCheckbox"
                  checked={isLinkChecked}
                  onChange={handleLinkCheckboxChange}
                  className="mr-3"
                />
                Посилання?
              </label>
            </div>
          </div>
          <div className="mb-9 shadow-xl">
            <button
              type="button"
              className="w-full bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition-colors duration-300"
              onClick={handleFileUploadClick}
            >
              Завантажити файл
            </button>
            <input
              ref={fileInputRef}
              id="file"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </form>
      </div>
      <div
        className="flex flex-col items-center justify-center cursor-pointer"
        onDrop={handleCoverDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => coverInputRef.current?.click()}
      >
        <p className="text-sm font-medium">Перетягніть обкладинку</p>
        <div className="w-full flex justify-center shadow-xl my-4">
          {coverPreview ? (
            <img
              src={coverPreview}
              alt="Preview"
              className="w-16 h-16 object-cover"
            />
          ) : (
            <ArrowUpTrayIcon className="w-16" />
          )}
        </div>
        <p className="text-sm text-yellow-600 mb-2">
          *Розмір файлу не повинен перевищувати 10 МБ.
        </p>
        <button className="px-6 py-2 bg-white text-gray-700 rounded-md shadow-xl transition-colors duration-300">
          Завантажити обкладинку
        </button>
        <input
          ref={coverInputRef}
          id="coverFile"
          type="file"
          className="hidden"
          onChange={handleCoverChange}
        />
      </div>
      <div className="flex flex-col items-start space-y-4 mb-auto">
        <button
          type="button"
          className="px-6 py-2 bg-blue-500 w-full text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
          onClick={handleSubmit(onSubmit)}
        >
          Додати
        </button>
        <button
          type="button"
          className="px-6 py-2 bg-gray-300 w-full text-gray-700 rounded-md hover:bg-gray-400 transition-colors duration-300"
        >
          Скасувати
        </button>
      </div>
    </div>
  );
};

export default LoadPage;
