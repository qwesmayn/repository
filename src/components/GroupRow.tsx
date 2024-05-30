import { FC, useState, ChangeEvent } from "react";
import { IGroups } from "../models/IGroups";

interface GroupRowProps {
  group: IGroups;
  index: number;
  selectedGroupId: string | null;
  setSelectedGroupId: (id: string | null) => void;
  openDeleteModal: (id: string) => void;
  saveGroupChanges: (id: string, changes: { [key: string]: any }) => void;
}

const GroupRow: FC<GroupRowProps> = ({
  group,
  index,
  selectedGroupId,
  setSelectedGroupId,
  openDeleteModal,
  saveGroupChanges,
}) => {
  const [editedGroup, setEditedGroup] = useState<IGroups>({ ...group });
  const [isEditingName, setIsEditingName] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedGroup((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (editedGroup.name !== group.name) {
      saveGroupChanges(group._id, { name: editedGroup.name });
    }
  };

  const handleDoubleClickName = () => {
    setIsEditingName(true);
  };

  return (
    <div key={group._id} className="mb-9 p-4 transition-all duration-300 border-2 border-black">
      <div className="flex justify-between">
        <div className="text-center shadow-dark-lg px-5 py-1 w-max">{index + 1}</div>
        <div className="text-center shadow-dark-lg px-40 py-1" onDoubleClick={handleDoubleClickName}>
          {isEditingName ? (
            <input
              type="text"
              name="name"
              value={editedGroup.name}
              onChange={handleChange}
              onBlur={() => setIsEditingName(false)}
              autoFocus
            />
          ) : (
            <span className="px-4">{editedGroup.name}</span>
          )}
        </div>
        <div className="text-center px-2 py-1">
        <button
            className="bg-blue-500 shadow-dark-lg text-white px-20 py-2 rounded-2xl transition-colors duration-300"
            onClick={() => {
              setSelectedGroupId(selectedGroupId === group._id ? null : group._id);
              handleSave(); 
            }}
          >
            Зберегти зміни
          </button>
        </div>
        <div className="text-center px-2 py-1">
          <button
            className="bg-red-500 text-white shadow-dark-lg px-20 py-2 rounded-2xl transition-colors duration-300"
            onClick={() => openDeleteModal(group._id)}
          >
            Видалити групу
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupRow;
