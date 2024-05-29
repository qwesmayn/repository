import { useState, useEffect, FC } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/typeHooks";
import {
  getGroups,
  createDisciplines,
  createLink,
} from "../../store/action_creators/actionCreatos";
import { clearErrors } from "../../store/reducers/groupSlice";
import ErrorAlert from "../ErrorAlert";

interface ModalAddDisciplineProps {
  isOpen: boolean;
  onRequestClose: (isOpen: boolean) => void;
  nextId: number;
}

const ModalAddDiscipline: FC<ModalAddDisciplineProps> = ({
  isOpen,
  onRequestClose,
  nextId,
}) => {
  const dispatch = useAppDispatch();
  const { groups, isLoading: isGroupsLoading } = useAppSelector(
    (state) => state.groupReducer
  );
  const [disciplineName, setDisciplineName] = useState("");
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      dispatch(getGroups());
    }
  }, [isOpen, dispatch]);

  const handleAddGroup = (groupId: string) => {
    setSelectedGroups((prevSelected) => [...prevSelected, groupId]);
  };

  const handleRemoveGroup = (groupId: string) => {
    setSelectedGroups((prevSelected) =>
      prevSelected.filter((id) => id !== groupId)
    );
  };

  const handleSubmit = async () => {
    try {
      const result = await dispatch(
        createDisciplines({ name: disciplineName })
      ).unwrap();
      const disciplineId = result._id;
      for (const groupId of selectedGroups) {
        await dispatch(createLink({ groupId, disciplineId })).unwrap();
      }
    } catch (error) {
      setLocalError("Не удалось добавить дисциплину и создать связи.");
    }
  };

  const clearError = () => {
    dispatch(clearErrors());
    setLocalError(null);
  };

  return (
<>
  {isOpen && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-9/12">
        <h2 className="text-xl mb-4">Додати дисципліну</h2>
        <div className="flex flex-wrap justify-center items-center space-x-7">
          <input
            type="text"
            value={nextId}
            readOnly
            placeholder="Назва дисципліни"
            className="w-12 p-2 border border-gray-300 rounded text-center shadow-xl"
          />
          <input
            type="text"
            value={disciplineName}
            onChange={(e) => setDisciplineName(e.target.value)}
            placeholder="Назва дисципліни"
            className="w-1/4 p-2 border border-gray-300 rounded text-center shadow-xl"
          />
          <select
            onChange={(e) => handleAddGroup(e.target.value)}
            disabled={isGroupsLoading}
            className="w-1/4 p-2 border border-gray-300 text-center rounded-3xl shadow-xl"
          >
            <option value="" disabled>Виберіть групу</option>
            {groups.map((group) => (
              <option key={group._id} value={group._id}>
                {group.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white py-2 px-20 rounded mr-2 hover:bg-blue-600 shadow-xl"
          >
            Зберегти
          </button>
          <button
            onClick={() => onRequestClose(false)}
            className="bg-gray-500 text-white py-2 px-20 rounded hover:bg-gray-600 shadow-xl"
          >
            Відмінити
          </button>
        </div>
        <div className="flex justify-end mt-4 mr-7">
          <div className="bg-white p-4 rounded-lg shadow-lg w-1/5 ">
            <h3 className="text-lg mb-2">Вибрані групи:</h3>
            <ul className="mb-4">
              {selectedGroups.map((groupId) => (
                <li
                  key={groupId}
                  className="flex justify-between items-center mb-2 border-b border-gray-300 last:border-b-0"
                >
                  <span className="mb-1">
                    {groups.find((group) => group._id === groupId)?.name}
                  </span>
                  <button
                    onClick={() => handleRemoveGroup(groupId)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Видалити
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {localError && (
          <ErrorAlert error={localError} clearError={clearError} />
        )}
      </div>
    </div>
  )}
</>

  );
};

export default ModalAddDiscipline;
