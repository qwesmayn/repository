import { FC, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { IGroups } from "../../models/IGroups";
import i18n from "../../i18n";

interface ModalAddGroupProps {
  isModalOpen: boolean;
  closeModal: () => void;
  saveGroup: (selectedGroup: string) => void;
  groups: IGroups[];
}

const ModalAddGroup: FC<ModalAddGroupProps> = ({ isModalOpen, closeModal, saveGroup, groups }) => {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [isGroupListOpen, setIsGroupListOpen] = useState<boolean>(false);
  const toggleGroupList = () => {
    setIsGroupListOpen(!isGroupListOpen);
  };

  const handleSave = () => {
    if (selectedGroup) {
      saveGroup(selectedGroup);
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 shadow-lg w-max">
        <div className="flex justify-end">
          <button className="text-gray-600 hover:text-gray-800" onClick={closeModal}>
            <XMarkIcon className="w-6" />
          </button>
        </div>
        <h2 className="text-xl mb-4">{i18n.t('userManage.sortByGroup')}</h2>
        <div className="flex space-x-4">
          <div className="flex-grow relative">
            <div className="flex items-center mb-3">
              <button
                className="bg-bg-blue-design border mr-5 border-gray-300 shadow-dark-lg px-3 py-2 w-64 transition duration-500 ease-in-out"
                onClick={toggleGroupList}
              >
{i18n.t('userManage.group')}
              </button>
              <div className="flex">
              <button
                className={`bg-bg-blue-design mr-3 text-black px-4 py-2 shadow-dark-lg ${
                  selectedGroup ? "" : "opacity-50 cursor-not-allowed"
                }`}
                onClick={handleSave}
                disabled={!selectedGroup}
              >
{i18n.t('userManage.buttonSave')}
              </button>
              <button className="bg-bg-blue-design text-black px-4 py-2 shadow-dark-lg" onClick={closeModal}>
              {i18n.t('userManage.buttonCancel')}
              </button>
              </div>
            </div>
            <div className="flex">
              <ul
                className={`border border-gray-300 w-64 shadow-dark-lg p-2 max-h-60 overflow-y-auto transition-all duration-500 mr-5 ${
                  isGroupListOpen ? "max-h-60 visible opacity-100" : "max-h-0 invisible opacity-0"
                }`}
              >
                {groups.map((group) => (
                  <li key={group._id}>
                    <button
                      className={`w-full text-left py-2 shadow-dark-lg ${
                        selectedGroup === group._id ? "bg-blue-500 mb-2 text-center text-white" : "bg-white mb-2 text-black text-center"
                      }`}
                      onClick={() => {
                        setSelectedGroup(selectedGroup === group._id ? null : group._id);
                      }}
                    >
                      {group.name}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="flex-grow border border-gray-300 shadow-dark-lg p-4">
                <h3 className="text-lg">{i18n.t('disciplinesManage.selectedGroup')}</h3>
                <p className="mt-2">{selectedGroup ? groups.find((group) => group._id === selectedGroup)?.name : i18n.t('groupManage.choose')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAddGroup;
