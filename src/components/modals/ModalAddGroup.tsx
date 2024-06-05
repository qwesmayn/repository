import { FC, useState } from "react";
import i18n from "../../i18n";

interface ModalAddGroupProps {
  isModalOpen: boolean;
  closeModal: () => void;
  saveGroup: (groupName: string) => void;
  nextId: number;
}

const ModalAddGroup: FC<ModalAddGroupProps> = ({
  isModalOpen,
  closeModal,
  saveGroup,
  nextId,
}) => {
  const [groupName, setGroupName] = useState<string>("");

  const handleSave = () => {
    if (groupName.trim()) {
      saveGroup(groupName);
      setGroupName("");
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl mb-4">{i18n.t("userManage.addGroup")}</h2>
        <div className="flex space-x-4 items-center">
          <input
            type="text"
            value={nextId}
            readOnly
            className="border p-2 w-12 text-center bg-bg-blue-design shadow-dark-lg"
            placeholder="ID"
          />
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="border py-2 px-20 w-full text-center bg-bg-blue-design shadow-dark-lg"
            placeholder={i18n.t("groupManage.nameGroup")}
          />
          <div className="flex justify-end space-x-4">
            <button
              className="bg-bg-blue-design text-black px-4 py-2 rounded-2xl shadow-dark-lg"
              onClick={handleSave}
            >
              {i18n.t("userManage.buttonSave")}
            </button>
            <button
              className="bg-bg-blue-design text-black px-4 py-2 rounded-2xl shadow-dark-lg"
              onClick={closeModal}
            >
              {i18n.t("userManage.buttonCancel")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAddGroup;
