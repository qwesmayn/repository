import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/typeHooks";
import { createLink, getDisciplines, getGroups } from "../../store/action_creators/actionCreatos";
import { clearErrors } from "../../store/reducers/groupSlice";
import ErrorAlert from "../ErrorAlert";
import i18n from "../../i18n";

interface ModalAddGroupProps {
  isOpen: boolean;
  onRequestClose: (isOpen: boolean) => void;
  disciplineId: string;
}

const ModalAddGroup: FC<ModalAddGroupProps> = ({ isOpen, onRequestClose, disciplineId }) => {
  const dispatch = useAppDispatch();
  const { groups} = useAppSelector(
    (state) => state.groupReducer
  );
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [localError, setLocalError] = useState<string | null>(null);
  const [isGroupListOpen, setIsGroupListOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      dispatch(getGroups());
    }
  }, [isOpen]);

  const handleToggleGroupList = () => {
    setIsGroupListOpen(!isGroupListOpen);
  };

  const handleToggleGroup = (groupId: string) => {
    setSelectedGroups((prevSelected) => {
      if (prevSelected.includes(groupId)) {
        return prevSelected.filter((id) => id !== groupId);
      } else {
        return [...prevSelected, groupId];
      }
    });
  };

  const handleSubmit = async () => {
    try {
      if (selectedGroups.length > 0) {
        await Promise.all(selectedGroups.map(groupId => dispatch(createLink({ groupId, disciplineId }))));
        dispatch(getDisciplines());
        onRequestClose(false);
      }
    } catch (error) {
      setLocalError("Не удалось добавить связь между дисциплиной и группой");
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
          <div className="bg-white p-6 rounded-lg shadow-lg w-4/12">
            <h2 className="text-xl mb-4">{i18n.t('disciplinesManage.titleAddDiscipline')}</h2>
            <div className="flex justify-center space-x-4">
              <div>
                <button
                  className="bg-bg-blue-design border border-gray-300 rounded-lg p-2 w-64 transition duration-500 ease-in-out"
                  onClick={handleToggleGroupList}
                >
                  {i18n.t('userManage.group')}
                </button>
                {isGroupListOpen && (
                  <ul className="bg-bg-blue-design mt-1 border border-gray-300 w-64 rounded-lg p-2 max-h-60 overflow-y-auto">
                    {groups.map((group) => (
                      <li key={group._id}>
                        <button
                          className={`w-full text-left py-2 rounded-lg ${selectedGroups.includes(group._id) ? "bg-blue-500 mb-1 text-center text-white" : "bg-white mb-2 text-black text-center"}`}
                          onClick={() => handleToggleGroup(group._id)}
                        >
                          {group.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <div className="flex justify-end mb-4">
                  <button
                    onClick={handleSubmit}
                    className={`bg-bg-blue-design mr-3 text-black px-4 py-2 rounded-2xl shadow-dark-lg  ${selectedGroups.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={selectedGroups.length === 0}
                  >
                    {i18n.t('userManage.buttonSave')}
                  </button>
                  <button
                    onClick={() => onRequestClose(false)}
                    className="bg-bg-blue-design text-black py-2 px-4 rounded-2xl shadow-dark-lg"
                  >
                    {i18n.t('userManage.buttonCancel')}
                  </button>
                </div>
                <div className="bg-bg-blue-design flex flex-col border border-gray-300 rounded-lg p-4">
                  <h3 className="text-lg">{i18n.t('disciplinesManage.selectedGroup')}</h3>
                  {selectedGroups.map(groupId => (
                    <p key={groupId} className="mt-2">{groups.find((group) => group._id === groupId)?.name}</p>
                  ))}
                </div>
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

export default ModalAddGroup;
