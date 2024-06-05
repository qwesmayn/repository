import React, { FC, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/typeHooks";
import {
  getMaterials,
  getAuthors,
  getDisciplines,
  getMaterialsTypes,
  deleteMaterials,
  changeMaterials,
} from "../store/action_creators/actionCreatos";
import Dropdown from "../components/DropDown";
import ModalDelete from "../components/modals/ModalDelete";
import { NavLink, useLocation } from "react-router-dom";
import { IAuthors } from "../models/IAuthors";
import { ANALITIC_ROUTE, STUDENT_MATERIALS_ROUTE } from "../utils/consts";
import i18n from "../i18n";
import MaterialsList from "../components/MaterialList";

interface AnalyticPageProps {}

const AnalyticPage: FC<AnalyticPageProps> = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search") || "";

  const dispatch = useAppDispatch();
  const { disciplines } = useAppSelector((state) => state.disciplineReducer);
  const { materials, materialsTypes } = useAppSelector(
    (state) => state.materialReducer
  );
  const { authors } = useAppSelector((state) => state.userManageReducer);
  const {user} = useAppSelector((state) => state.userReducer)
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>("");
  const [selectedMaterialType, setSelectedMaterialType] = useState<string>("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [materialToDelete, setMaterialToDelete] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getMaterials());
    dispatch(getAuthors());
    dispatch(getDisciplines());
    dispatch(getMaterialsTypes());
  }, []);

  const handleSave = async (id: string, change: object) => {
    await dispatch(changeMaterials({ id: id, change: change }));
    await dispatch(getMaterials());
  };

  const handleDisciplineChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedDiscipline(event.target.value);
  };

  const handleMaterialTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedMaterialType(event.target.value);
  };

  const openDeleteModal = (id: string) => {
    setMaterialToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setMaterialToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const confirmDelete = async () => {
    if (materialToDelete) {
      const resultAction = await dispatch(deleteMaterials(materialToDelete));
      if (deleteMaterials.fulfilled.match(resultAction)) {
        dispatch(getMaterials());
      }
      closeDeleteModal();
    }
  };

  const getAuthorNameById = (
    authorId: string,
    authors: IAuthors[]
  ): string | undefined => {
    const author = authors.find((authora) => authora._id === authorId);
    debugger;
    return author ? author.fullName : undefined;
  };

  const filteredMaterials = materials.filter((material) => {
    const matchesSearchQuery =
      !searchQuery ||
      (material.author &&
        getAuthorNameById(material.author, authors)
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase())) ||
      material.title.toLowerCase().includes(searchQuery.toLowerCase());

    return (
      (selectedDiscipline === "" ||
        material.discipline === selectedDiscipline) &&
      (selectedMaterialType === "" ||
        material.materialType === selectedMaterialType) &&
      matchesSearchQuery
    );
  });

  return (
    <div>
      <div className="p-8">
        <div className="pl-9 mb-[62px] flex gap-4">
          <Dropdown
            value={selectedDiscipline}
            onChange={handleDisciplineChange}
            options={disciplines.map((discipline) => ({
              value: discipline._id,
              label: discipline.name,
            }))}
            placeholder={i18n.t('material.sortByDiscipline')}
          />
          <Dropdown
            value={selectedMaterialType}
            onChange={handleMaterialTypeChange}
            options={materialsTypes.map((type) => ({
              value: type._id,
              label: type.name,
            }))}
            placeholder={i18n.t('material.sortByMaterial')}
          />
          <NavLink to={ user?.role === "admin" ? ANALITIC_ROUTE : STUDENT_MATERIALS_ROUTE}>
            <button className=" p-2 shadow-dark-lg rounded-2xl">
             {i18n.t('material.clearSearch')}
            </button>
          </NavLink>
        </div>
        <MaterialsList
          materials={filteredMaterials}
          authors={authors}
          disciplines={disciplines}
          materialsTypes={materialsTypes}
          onSave={handleSave}
          openModal={openDeleteModal}
          isStudentView = {user?.role === "student"}
        />
        <ModalDelete
          nameDel={i18n.t('material.deleteWhatAnalytic')}
          isModalOpen={isDeleteModalOpen}
          closeModal={closeDeleteModal}
          confirmDelete={confirmDelete}
        />
      </div>
    </div>
  );
};

export default AnalyticPage;
