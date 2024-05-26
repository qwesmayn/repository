import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/typeHooks";
import { createGroup, getGroups } from "../store/action_creators/actionCreatos";
import ModalAddGroup from "../components/modals/ModalAddGroup";
import GroupTable from "../components/GroupTable";

const ManageGroup: FC = () => {
  const dispatch = useAppDispatch();
  const { groups } = useAppSelector((state) => state.groupReducer);
  const [isAddGroupModalOpen, setIsAddGroupModalOpen] = useState<boolean>(false);
  const [selectedGroup, setSelectedGroup] = useState<string>("");

  useEffect(() => {
    dispatch(getGroups());
  }, [dispatch]);

  const openAddGroupModal = () => {
    setIsAddGroupModalOpen(true);
  };

  const closeAddGroupModal = () => {
    setIsAddGroupModalOpen(false);
  };

  const saveGroup = async (groupName: string) => {
    await dispatch(createGroup({ name: groupName }));
    await dispatch(getGroups());
    closeAddGroupModal();
  };

  const nextidGroup = groups.length + 1;

  const handleGroupChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGroup(event.target.value);
  };

  return (
    <div className="overflow-x-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <select
          className="border border-gray-300 rounded-full shadow-xl px-4 py-2 mr-4"
          value={selectedGroup}
          onChange={handleGroupChange}
        >
          <option value="">Все группы</option>
          {groups.map((group) => (
            <option key={group._id} value={group.name}>
              {group.name}
            </option>
          ))}
        </select>
        <button
          className="bg-white text-black broder border-gray-300 px-4 py-2 rounded shadow-xl transition-colors duration-300"
          onClick={openAddGroupModal}
        >
          Добавить группу
        </button>
      </div>
      <GroupTable groups={groups} selectedGroup={selectedGroup} />
      <ModalAddGroup
        isModalOpen={isAddGroupModalOpen}
        closeModal={closeAddGroupModal}
        nextId={nextidGroup}
        saveGroup={saveGroup}
      />
    </div>
  );
};

export default ManageGroup;
