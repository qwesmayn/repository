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
import Popup from "../components/Popup";

const LoadPage: FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const [isLinkChecked, setIsLinkChecked] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [file, setFile] = useState<File | undefined>(undefined);
  const [coverFile, setCoverFile] = useState<File | undefined>(undefined);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const { disciplines } = useAppSelector((state) => state.disciplineReducer);
  const { authors } = useAppSelector((state) => state.userManageReducer);
  const { materialsTypes } = useAppSelector((state) => state.materialReducer);

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
    dispatch(createMaterial(materialData))
  };

  return (
    <div className="flex justify-between items-start mt-16 px-12 h-max">
      <div className="max-w-md w-full bg-white shadow-dark-lg rounded-md p-6 space-y-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-9 shadow-dark-lg">
            <input
              id="title"
              type="text"
              placeholder="Введіть назву:"
              className="bg-bg-blue-design w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
              {...register("title", { required: true })}
            />
            {errors.title && (
              <span className="text-red-500">Назва обов'язкова</span>
            )}
          </div>
          <div className="mb-9 shadow-dark-lg">
            <textarea
              id="description"
              placeholder="Введіть опис:"
              className="bg-bg-blue-design w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
              {...register("description", { required: true })}
            ></textarea>
            {errors.description && (
              <span className="text-red-500">Опис обов'язковий</span>
            )}
          </div>
          <div className="mb-9 shadow-dark-lg">
            <select
              id="discipline"
              className="bg-bg-blue-design w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
              {...register("discipline", { required: true })}
            >
              {disciplines.map((discipline) => (
                <option key={discipline._id} value={discipline._id}>
                  {discipline.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-9 shadow-dark-lg">
            <select
              id="materialType"
              className="bg-bg-blue-design w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
              {...register("materialType", { required: true })}
            >
              {materialsTypes.map((materialsType) => (
                <option key={materialsType._id} value={materialsType._id}>
                  {materialsType.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-9 shadow-dark-lg">
            <select
              id="author"
              className="bg-bg-blue-design w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
              {...register("author", { required: true })}
            >
              {authors.map((author) => (
                <option key={author._id} value={author._id}>
                  {author.fullName}
                </option>
              ))}
            </select>
          </div>
          <div className="mb flex items-center">
            <div className="flex-1">
              {!isLinkChecked ? (
                <div className="mb-9 ">
                  <p className="text-sm font-medium text-center bg-bg-blue-design">
                    Перетягніть файл
                  </p>
                  <div className="w-full flex justify-center mb-4 bg-bg-blue-design">
                    <ArrowUpTrayIcon className="w-16" />
                  </div>
                  <p className="text-sm text-yellow-600 mb-2 text-center">
                    *Розмір файлу не повинен перевищувати 10 МБ.
                  </p>
                  <button
                    type="button"
                    className="w-full bg-bg-blue-design text-black rounded-2xl px-4 py-2 shadow-dark-lg transition-colors duration-300"
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
              ) : (
                <input
                  id="link"
                  type="text"
                  placeholder="Вставте посилання:"
                  className={`bg-bg-blue-design w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 ${
                    isLinkChecked ? "" : "opacity-50 cursor-not-allowed"
                  }`}
                  disabled={!isLinkChecked}
                  {...register("link")}
                />
              )}
            </div>
            <div className="ml-4 flex items-center bg-bg-blue-design">
              <input
                type="checkbox"
                id="linkCheckbox"
                checked={isLinkChecked}
                onChange={handleLinkCheckboxChange}
                className="mr-2"
              />
              <label htmlFor="linkCheckbox">Посилання?</label>
            </div>
          </div>
        </form>
      </div>
      <div
        className="flex flex-col items-center justify-center mt-52 cursor-pointer "
        onDrop={handleCoverDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => coverInputRef.current?.click()}
      >
        <p className="text-sm font-medium ">Перетягніть обкладинку</p>
        <div className="w-full flex justify-center shadow-dark-lg my-4 bg-bg-blue-design">
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
        <button className="px-6 py-2 bg-bg-blue-design text-black rounded-2xl shadow-dark-lg transition-colors duration-300">
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
          className="px-6 py-2 bg-bg-blue-design w-full text-black rounded-2xl shadow-dark-lg  transition-colors duration-300"
          onClick={handleSubmit(onSubmit)}
        >
          Додати
        </button>
        <button
          type="button"
          className="px-6 py-2 bg-bg-blue-design w-full text-black rounded-2xl shadow-dark-lg transition-colors duration-300"
          onClick={() => setShowSuccessPopup(true)}
        >
          Скасувати
        </button>
      </div>
      {showSuccessPopup && (
        <Popup
          message="Матеріал успішно скасовано"
          closeModal={() => {
            reset()
            setShowSuccessPopup(false)
          }}
        />
      )}
    </div>
  );
};

export default LoadPage;
