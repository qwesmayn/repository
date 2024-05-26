import { FC, useState } from "react";

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
        <h2 className="text-xl mb-4">Добавить группу</h2>
        <div className="flex space-x-4 items-center">
          <input
            type="text"
            value={nextId}
            readOnly
            className="border p-2 w-12 text-center"
            placeholder="Название группы"
          />
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="border py-2 px-20 w-full text-center"
            placeholder="Название группы"
          />
          <div className="flex justify-end space-x-4">
          <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleSave}
            >
              Зберегти
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={closeModal}
            >
              Відмінити
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAddGroup;
