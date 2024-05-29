import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/typeHooks";
import { IGroups } from "../models/IGroups";
import { deleteGroups, getGroups, changeGroups } from "../store/action_creators/actionCreatos";
import ModalDelete from "./modals/ModalDelete";
import ErrorAlert from "./ErrorAlert";
import { clearErrors } from "../store/reducers/groupSlice";
import GroupRow from "./GroupRow";

interface GroupTableProps {
  groups: IGroups[];
  selectedGroup: string;
}

const GroupTable: FC<GroupTableProps> = ({ groups, selectedGroup }) => {
  const dispatch = useAppDispatch();
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [groupToDelete, setGroupToDelete] = useState<string | null>(null);
  const { errorCreate, errorDelete } = useAppSelector((state) => state.groupReducer);

  const openDeleteModal = (id: string) => {
    setGroupToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setGroupToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const confirmDelete = async () => {
    if (groupToDelete) {
      const resultAction = await dispatch(deleteGroups(groupToDelete));
      if (deleteGroups.fulfilled.match(resultAction)) {
        dispatch(getGroups());
      }
      closeDeleteModal();
    }
  };

  useEffect(() => {
    dispatch(getGroups());
  }, [dispatch]);

  const clearError = () => {
    dispatch(clearErrors());
  };

  const saveGroupChanges = async (id: string, changes: { [key: string]: any }) => {
    await dispatch(changeGroups({ id, change: changes }));
    await dispatch(getGroups());
  };

  const filteredGroups = selectedGroup
    ? groups.filter((group) => group.name === selectedGroup)
    : groups;

  return (
    <div className="py-4 px-52">
      <div className="w-full bg-white">
        {filteredGroups.map((group, index) => (
          <GroupRow
            key={group._id}
            group={group}
            index={index}
            selectedGroupId={selectedGroupId}
            setSelectedGroupId={setSelectedGroupId}
            openDeleteModal={openDeleteModal}
            saveGroupChanges={saveGroupChanges}
          />
        ))}
      </div>

      <ModalDelete
        nameDel="группу"
        isModalOpen={isDeleteModalOpen}
        closeModal={closeDeleteModal}
        confirmDelete={confirmDelete}
      />
      <ErrorAlert error={errorCreate || errorDelete} clearError={clearError} />
    </div>
  );
};

export default GroupTable;
