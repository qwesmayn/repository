import { FC, useState, ChangeEvent, useEffect } from "react";
import { IGroups } from "../models/IGroups";
import i18n from "../i18n";

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
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const isDifferent = (
      editedGroup.name !== group.name
    );
    setHasChanges(isDifferent);
  }, [editedGroup, group]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedGroup((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (hasChanges) {
      saveGroupChanges(group._id, { name: editedGroup.name });
      setHasChanges(false);
    }
  };

  const handleDoubleClickName = () => {
    setIsEditingName(true);
  };

  return (
    <div key={group._id} className="mb-9 p-4 transition-all duration-300 border-2 border-black">
      <div className="flex justify-between">
        <div className="text-center shadow-dark-lg px-7 py-3 w-max h-max bg-bg-blue-design">{index + 1}</div>
        <div className="text-center  shadow-dark-lg px-40 h-max py-3 bg-bg-blue-design" onDoubleClick={handleDoubleClickName}>
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
            className={` shadow-dark-lg text-black px-20 py-3 rounded-2xl transition-colors duration-300 ${hasChanges ? 'bg-bg-blue-design text-black' : 'bg-gray-500 text-gray-300 cursor-not-allowed'}`}
            onClick={() => {
              setSelectedGroupId(selectedGroupId === group._id ? null : group._id);
              handleSave(); 
            }}
            disabled={!hasChanges}
          >
            {i18n.t('material.buttonSaveChanges')}
          </button>
        </div>
        <div className="text-center px-2 py-1">
          <button
            className="bg-bg-blue-design text-black shadow-dark-lg px-20 py-3 rounded-2xl transition-colors duration-300"
            onClick={() => openDeleteModal(group._id)}
          >
            {i18n.t('groupManage.deleteGroup')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupRow;
