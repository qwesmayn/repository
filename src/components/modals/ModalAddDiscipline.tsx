import { useState, useEffect, FC } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/typeHooks";
import {
  getGroups,
  createDisciplines,
  createLink,
  getDisciplines,
} from "../../store/action_creators/actionCreatos";
import Popup from "../Popup";

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
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      dispatch(getGroups());
    }
  }, [isOpen, dispatch]);

  const isGroupSelected = (groupId: string) => {
    return selectedGroups.includes(groupId);
  };

  const handleAddGroup = (groupId: string) => {
    if (!isGroupSelected(groupId)) {
      setSelectedGroups((prevSelected) => [...prevSelected, groupId]);
    }
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
      setIsPopupOpen(true);
      // Сброс выбранных групп после успешного создания дисциплины
      setSelectedGroups([]);
    } catch (error) {
      console.log(error);
    }
  };

  const onCloseModal = (isOpen: boolean) => {
    onRequestClose(isOpen);
    setDisciplineName("");
    setSelectedGroups([]);
    dispatch(getDisciplines());
    setIsPopupOpen(false);
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
                className="bg-bg-blue-design w-12 p-2 border border-gray-300 rounded text-center shadow-dark-lg"
              />
              <input
                type="text"
                value={disciplineName}
                onChange={(e) => setDisciplineName(e.target.value)}
                placeholder="Назва дисципліни"
                className="bg-bg-blue-design w-1/4 p-2 border border-gray-300 rounded text-center shadow-dark-lg"
              />
              <select
                onChange={(e) => handleAddGroup(e.target.value)}
                disabled={isGroupsLoading}
                className="bg-bg-blue-design w-1/4 p-2 border border-gray-300 text-center rounded-3xl shadow-dark-lg"
              >
                <option value="" disabled selected>
                  Выберите группу
                </option>
                {groups.map((group) => (
                  <option
                    key={group._id}
                    value={group._id}
                    disabled={isGroupSelected(group._id)}
                  >
                    {group.name}
                  </option>
                ))}
              </select>
              <button
                onClick={handleSubmit}
                disabled={
                  selectedGroups.length === 0 || disciplineName.trim() === ""
                }
                className="bg-bg-blue-design text-black py-2 px-20 rounded-2xl mr-2 shadow-dark-lg"
              >
                Зберегти
              </button>

              <button
                onClick={() => onCloseModal(false)}
                className="bg-bg-blue-design text-black py-2 px-20 rounded-2xl shadow-dark-lg"
              >
                Відмінити
              </button>
            </div>
            <div className="flex justify-end mt-4 mr-7">
              <div className="bg-bg-blue-design p-4 rounded-lg shadow-dark-lg w-1/5 ">
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
            {isPopupOpen && (
              <Popup
                message="Дисципліна успішно створена"
                closeModal={() => {
                  onCloseModal(false);
                }}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ModalAddDiscipline;
