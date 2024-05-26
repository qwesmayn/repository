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

const ManageDisciplines: FC = () => {
  const dispatch = useAppDispatch();
  const { disciplines, isLoading: isDisciplinesLoading, error } = useAppSelector(
    (state) => state.disciplineReducer
  );
  const { groupsById } = useAppSelector((state) => state.groupsByIdReducer);
  const [selectedDisciplineId, setSelectedDisciplineId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [disciplineToDelete, setDisciplineToDelete] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

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

  const handleDeleteDiscipline = (disciplineId: string) => {
    setDisciplineToDelete(disciplineId);
    setIsModalOpen(true);
  };

  const confirmDeleteDiscipline = async () => {
    if (disciplineToDelete) {
      const resultAction = await dispatch(deleteDisciplines(disciplineToDelete));
      if (deleteDisciplines.fulfilled.match(resultAction)) {
        dispatch(getDisciplines());
      } else if (deleteDisciplines.rejected.match(resultAction)) {
        setLocalError("Не удалось удалить дисцплины(возможно есть существующие связи с authors).");
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
      setLocalError("Failed to delete group link.");
    }
  };

  const toggleDisciplineGroups = (disciplineId: string) => {
    setSelectedDisciplineId(selectedDisciplineId === disciplineId ? null : disciplineId);
  };

  const clearError = () => {
    dispatch(clearErrors());
    setLocalError(null);
  };

  return (
    <div className="overflow-x-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <button className="bg-white text-black border border-gray-300 px-4 py-2 rounded shadow-xl transition-colors duration-300">
          Додати дисципліну
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-separate border-spacing-5 text-center">
          <tbody>
            {disciplines.map((discipline, index) => (
              <tr key={discipline._id}>
                <td className="align-top">{index + 1}</td>
                <td className="align-top">{discipline.name}</td>
                <td className="align-top">
                  <button
                    className="bg-white shadow-xl px-20 text-black py-2 rounded transition-colors duration-300"
                    onClick={() => toggleDisciplineGroups(discipline._id)}
                  >
                    Група ▼
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-700 ${
                      selectedDisciplineId === discipline._id ? 'max-h-screen' : 'max-h-0'
                    }`}
                  >
                    <ul className="m-auto mb-3 mt-5 w-max bg-white border border-gray-300 rounded shadow-lg p-2 overflow-y-auto">
                      {groupsById
                        .filter((group) => group.discipline === discipline._id)
                        .map((group) => (
                          <li key={group._id} className="flex justify-between items-center px-2 py-1 border-b">
                            <span className="mr-6">{group.group.name}</span>
                            <button
                              className="text-red-500 transition-colors duration-300"
                              onClick={() => handleDeleteGroup(group.group._id, group.discipline)}
                            >
                              &times;
                            </button>
                          </li>
                        ))}
                      <li className="flex justify-between items-center px-2 py-1 border-b">
                        <button className="text-blue-500 transition-colors duration-300" onClick={() => {
                          // Add logic to open modal to add group
                        }}>
                          Додати групу
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
                <td className="align-top">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-md">
                    Зберегти зміни
                  </button>
                </td>
                <td className="align-top">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md mr-2"
                    onClick={() => handleDeleteDiscipline(discipline._id)}
                  >
                    Видалити дисципліну
                  </button>
                </td>
              </tr>
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
      <ErrorAlert error={localError} clearError={clearError} />
    </div>
  );
};

export default ManageDisciplines;
