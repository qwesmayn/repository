import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/typeHooks";
import { IGroups } from "../models/IGroups";
import { deleteGroups, getGroups } from "../store/action_creators/actionCreatos";
import ModalDelete from "./modals/ModalDelete";
import ErrorAlert from "./ErrorAlert";
import { clearErrors } from "../store/reducers/groupSlice";

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

  // Фильтрация групп на основе выбранной группы
  const filteredGroups = selectedGroup
    ? groups.filter((group) => group.name === selectedGroup)
    : groups;

  return (
    <div className="py-4 px-52">
      <div className="w-full bg-white">
        {filteredGroups.map((group, index) => (
          <div key={group._id} className=" mb-4 p-4 hover:bg-gray-100 transition-all duration-300">
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center shadow-xl px-2 py-1">{index + 1}</div>
              <div className="text-center shadow-xl px-2 py-1">
                <span className="px-4">{group.name}</span>
              </div>
              <div className="text-center px-2 py-1">
                <button
                  className="bg-blue-500 shadow-xl text-white px-20 py-2 rounded-2xl transition-colors duration-300"
                  onClick={() => setSelectedGroupId(selectedGroupId === group._id ? null : group._id)}
                >
                  Зберегти зміни
                </button>
              </div>
              <div className="text-center px-2 py-1">
                <button
                  className="bg-red-500 text-white shadow-xl px-20 py-2 rounded-2xl transition-colors duration-300"
                  onClick={() => openDeleteModal(group._id)}
                >
                  Видалити групу
                </button>
              </div>
            </div>
          </div>
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
