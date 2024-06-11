import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/typeHooks";
import {
  getDisciplines,
  getGroupsOnIdDiscipline,
  deleteLink,
  changeDisciplines,
  deleteDisciplines,
  changeAuthors,
  getAuthors,
  getStudentsByDisciplineIds,
  deleteLinkStudent,
} from "../store/action_creators/actionCreatos";
import ModalDelete from "../components/modals/ModalDelete";
import ErrorAlert from "../components/ErrorAlert";
import { clearErrors } from "../store/reducers/groupSlice";
import ModalAddDiscipline from "../components/modals/ModalAddDiscipline";
import ModalAddGroup from "../components/modals/ModalAddLinkGroups";
import Dropdown from "../components/DropDown";
import DisciplineRow from "../components/DisciplineRow";
import { IAuthors } from "../models/IAuthors";
import i18n from "../i18n";
import ModalAddStudent from "../components/modals/ModalAddStudent";

const ManageDisciplines: FC = () => {
  const dispatch = useAppDispatch();
  const {
    disciplines,
    isLoading: isDisciplinesLoading,
    error,
  } = useAppSelector((state) => state.disciplineReducer);
  const { groupsById } = useAppSelector((state) => state.groupsByIdReducer);
  const { studentsById } = useAppSelector((state) => state.studentByIdReducer);
  const {authors} = useAppSelector((state) => state.userManageReducer)
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
  const [isModalAddStudentOpen, setIsModalAddStudentOpen] = useState<boolean>(false);
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>("");
  const [selectedDisciplineStudentId, setSelectedDisciplineStudentId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getAuthors())
    dispatch(getDisciplines());
  }, [dispatch]);

  useEffect(() => {
    if (!isDisciplinesLoading && disciplines.length > 0) {
      const disciplineIds = disciplines.map((discipline) => discipline._id);
      debugger
      dispatch(getGroupsOnIdDiscipline(disciplineIds));
      dispatch(getStudentsByDisciplineIds(disciplineIds));
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

  const openModalAddStudent = () => {
    setIsModalAddStudentOpen(true);
  };

  const closeModalAddStudent = () => {
    setIsModalAddStudentOpen(false);
  };

  const handleDeleteDiscipline = (disciplineId: string) => {
    setDisciplineToDelete(disciplineId);
    setIsModalOpen(true);
  };

  const confirmDeleteDiscipline = async () => {
    if (disciplineToDelete) {
      try {
        // Пройтись по каждому преподавателю
        await Promise.all(
          authors.map(async (author: IAuthors) => {
            // Найти объект дисциплины в массиве disciplines
            if (!disciplineToDelete) return;
            if (author.disciplines.some((d) => d._id === disciplineToDelete)) {
              // Удалить дисциплину из списка дисциплин преподавателя
              const updatedDisciplines = author.disciplines.filter(
                (d) => d._id !== disciplineToDelete
              );
              // Обновить данные преподавателя в хранилище
              await dispatch(changeAuthors({ id: author._id, change: { disciplines: updatedDisciplines } }));
            }
          })
        );
        // Удалить саму дисциплину
        const resultAction = await dispatch(deleteDisciplines(disciplineToDelete));
        if (deleteDisciplines.fulfilled.match(resultAction)) {
          dispatch(getDisciplines());
        } else if (deleteDisciplines.rejected.match(resultAction)) {
          setLocalError(
            "Не удалось удалить дисциплину (возможно есть существующие связи с преподавателями)."
          );
        }
        setIsModalOpen(false);
        setDisciplineToDelete(null);
      } catch (error) {
        console.error("Ошибка при удалении дисциплины:", error);
      }
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

  const handleDeleteStudent = async (studentId: string, disciplineId: string) => {
    const resultAction = await dispatch(deleteLinkStudent({ studentId, disciplineId }));
    if (deleteLinkStudent.fulfilled.match(resultAction)) {
      dispatch(getStudentsByDisciplineIds([disciplineId]));
    } else if (deleteLinkStudent.rejected.match(resultAction)) {
      setLocalError("Не удалось удалить связь с студентом.");
    }
  };

  const toggleDisciplineGroups = (disciplineId: string) => {
    setSelectedDisciplineId(
      selectedDisciplineId === disciplineId ? null : disciplineId
    );
  };

  const toggleDisciplineStudents = (disciplineId: string) => {
    setSelectedDisciplineStudentId(
      selectedDisciplineStudentId === disciplineId ? null : disciplineId
    );
  };
  

  const saveDisciplineChanges = async (
    id: string,
    changes: { [key: string]: any }
  ) => {
    debugger;
    await dispatch(changeDisciplines({ id, change: changes }));
    await dispatch(getDisciplines());
  };

  const clearError = () => {
    dispatch(clearErrors());
    setLocalError(null);
  };

  const nextIdDiscipline = disciplines.length + 1;

  return (
    <div className="overflow-x-auto px-20 pt-16">
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
          placeholder={i18n.t('material.sortByDiscipline')}
        />
        <button
          className="bg-bg-blue-design text-black border border-gray-300 px-4 py-2 rounded-3xl shadow-dark-lg transition-colors duration-300"
          onClick={() => setIsModalAddOpen(true)}
        >
          {i18n.t('userManage.addDiscipline')}
        </button>
      </div>

      <div className="overflow-x-auto">
  <div className="grid grid-row-6 gap-4 border-[3px] border-black px-6 pt-14">
    {disciplines
      .filter(
        (discipline) =>
          selectedDiscipline === "" ||
          (discipline._id === selectedDiscipline && discipline._id !== disciplineToDelete)
      )
      .map((discipline, index) => (
        <DisciplineRow
        key={discipline._id}
        index={index}
        discipline={discipline}
        selectedDisciplineId={selectedDisciplineId}
        selectedDisciplineStudentId={selectedDisciplineStudentId}
        toggleDisciplineGroups={toggleDisciplineGroups}
        toggleDisciplineStudents={toggleDisciplineStudents}
        groups={groupsById.filter((group) => group.discipline === discipline._id)}
        students={studentsById.filter((student) => student.discipline === discipline._id)}
        handleDeleteGroup={handleDeleteGroup}
        openModalAddGroup={openModalAddGroup}
        saveDisciplineChanges={saveDisciplineChanges}
        handleDeleteDiscipline={handleDeleteDiscipline}
        openModalAddStudent={openModalAddStudent}
        handleDeleteStudent={handleDeleteStudent}
      />
      ))}
  </div>
</div>
      <ModalDelete
        nameDel={i18n.t('disciplinesManage.deleteDiscipline')}
        description={i18n.t('disciplinesManage.deleteDisciplineDescr')}
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        confirmDelete={confirmDeleteDiscipline}
      />
      <ModalAddGroup
        isOpen={isModalAddGroupOpen}
        onRequestClose={closeModalAddGroup}
        disciplineId={selectedDisciplineId || ""}
      />

      <ModalAddStudent
        isOpen={isModalAddStudentOpen}
        onRequestClose={closeModalAddStudent}
        disciplineId={selectedDisciplineStudentId || ""}
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
