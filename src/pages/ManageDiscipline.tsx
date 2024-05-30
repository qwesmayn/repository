import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/typeHooks";
import {
  getDisciplines,
  deleteDisciplines,
  getGroupsOnIdDiscipline,
  deleteLink,
} from "../store/action_creators/actionCreatos";
import ModalDelete from "../components/modals/ModalDelete";
import ErrorAlert from "../components/ErrorAlert";
import { clearErrors } from "../store/reducers/groupSlice";
import ModalAddDiscipline from "../components/modals/ModalAddDiscipline";
import ModalAddGroup from "../components/modals/ModalAddLinkGroups";
import Dropdown from "../components/DropDown";
import DisciplineRow from "../components/DisciplineRow";

const ManageDisciplines: FC = () => {
  const dispatch = useAppDispatch();
  const {
    disciplines,
    isLoading: isDisciplinesLoading,
    error,
  } = useAppSelector((state) => state.disciplineReducer);
  const { groupsById } = useAppSelector((state) => state.groupsByIdReducer);
  const [selectedDisciplineId, setSelectedDisciplineId] = useState<
    string | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState<boolean>(false);
  const [disciplineToDelete, setDisciplineToDelete] = useState<string | null>(
    null
  );
  const [localError, setLocalError] = useState<string | null>(null);
  const [isModalAddGroupOpen, setIsModalAddGroupOpen] =
    useState<boolean>(false);
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>("");

  useEffect(() => {
    dispatch(getDisciplines());
  }, [dispatch]);

  useEffect(() => {
    if (!isDisciplinesLoading && disciplines.length > 0) {
      const disciplineIds = disciplines.map((discipline) => discipline._id);
      dispatch(getGroupsOnIdDiscipline(disciplineIds));
    }
  }, [dispatch, disciplines, isDisciplinesLoading]);

  useEffect(() => {
    if (error) {
      setLocalError(error);
    }
  }, [error]);

  const openModalAddGroup = () => {
    setIsModalAddGroupOpen(true);
  };

  const closeModalAddGroup = () => {
    setIsModalAddGroupOpen(false);
  };

  const handleDeleteDiscipline = (disciplineId: string) => {
    setDisciplineToDelete(disciplineId);
    setIsModalOpen(true);
  };

  const confirmDeleteDiscipline = async () => {
    if (disciplineToDelete) {
      const resultAction = await dispatch(
        deleteDisciplines(disciplineToDelete)
      );
      if (deleteDisciplines.fulfilled.match(resultAction)) {
        dispatch(getDisciplines());
      } else if (deleteDisciplines.rejected.match(resultAction)) {
        setLocalError(
          "Не удалось удалить дисцплины(возможно есть существующие связи с authors)."
        );
      }
      setIsModalOpen(false);
      setDisciplineToDelete(null);
    }
  };

  const handleDeleteGroup = async (groupId: string, disciplineId: string) => {
    const resultAction = await dispatch(deleteLink({ groupId, disciplineId }));
    if (deleteLink.fulfilled.match(resultAction)) {
      dispatch(getGroupsOnIdDiscipline([disciplineId])); // Обновляем группы для конкретной дисциплины
    } else if (deleteLink.rejected.match(resultAction)) {
      setLocalError("Не уадлось удалить связь с группой.");
    }
  };

  const toggleDisciplineGroups = (disciplineId: string) => {
    setSelectedDisciplineId(
      selectedDisciplineId === disciplineId ? null : disciplineId
    );
  };

  const clearError = () => {
    dispatch(clearErrors());
    setLocalError(null);
  };

  const nextIdDiscipline = disciplines.length + 1;

  return (
    <div className="overflow-x-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <Dropdown
          value={selectedDiscipline}
          onChange={(e) => setSelectedDiscipline(e.target.value)}
          options={[
            ...disciplines.map((discipline) => ({
              value: discipline._id,
              label: discipline.name,
            })),
          ]}
          placeholder="Виберіть дисципліну"
        />
        <button
          className="bg-white text-black border border-gray-300 px-4 py-2 rounded-3xl shadow-dark-lg transition-colors duration-300"
          onClick={() => setIsModalAddOpen(true)}
        >
          Додати дисципліну
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-separate border-spacing-5 text-center">
          <tbody>
            {disciplines
              .filter(
                (discipline) =>
                  selectedDiscipline === "" ||
                  discipline._id === selectedDiscipline
              )
              .map((discipline, index) => (
                <DisciplineRow
                  key={discipline._id}
                  index={index}
                  discipline={discipline}
                  selectedDisciplineId={selectedDisciplineId}
                  toggleDisciplineGroups={toggleDisciplineGroups}
                  groupsById={groupsById}
                  handleDeleteGroup={handleDeleteGroup}
                  openModalAddGroup={openModalAddGroup}
                  handleDeleteDiscipline={handleDeleteDiscipline}
                />
              ))}
          </tbody>
        </table>
      </div>
      <ModalDelete
        nameDel="дисципліну"
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        confirmDelete={confirmDeleteDiscipline}
      />
      <ModalAddGroup
        isOpen={isModalAddGroupOpen}
        onRequestClose={closeModalAddGroup}
        disciplineId={selectedDisciplineId || ""}
      />

      <ModalAddDiscipline
        isOpen={isModalAddOpen}
        onRequestClose={setIsModalAddOpen}
        nextId={nextIdDiscipline}
      />
      <ErrorAlert error={localError} clearError={clearError} />
    </div>
  );
};

export default ManageDisciplines;
