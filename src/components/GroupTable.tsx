import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/typeHooks";
import { IGroups } from "../models/IGroups";
import { deleteGroups, getGroups, changeGroups, deleteLink, getGroupsOnIdDiscipline, getStudents, changeStudents } from "../store/action_creators/actionCreatos";
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
  const {groupsById} = useAppSelector((state) => state.groupsByIdReducer)
  const {disciplines} = useAppSelector((state) => state.disciplineReducer)
  const {students} = useAppSelector((state) => state.userManageReducer)
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [groupToDelete, setGroupToDelete] = useState<string | null>(null);
  const { errorCreate, errorDelete } = useAppSelector((state) => state.groupReducer);

  useEffect(() => {
    dispatch(getGroups());
    dispatch(getStudents())
    dispatch(getGroupsOnIdDiscipline(disciplines.map(discipline => discipline._id)));
  }, []);

  const clearError = () => {
    dispatch(clearErrors());
  };

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
      try {
        // Получить все записи, связанные с этой группой
        const groupRecords = groupsById.filter(record => record.group._id === groupToDelete);
  
        // Удалить связи между группой и записями
        await Promise.all(groupRecords.map(async record => {
          try {
            await dispatch(deleteLink({ groupId: groupToDelete, disciplineId: record.discipline })).unwrap();
          } catch (error) {
            console.error("Ошибка при удалении связи:", error);
            throw error; // Пробрасываем ошибку дальше для обработки во внешнем блоке try-catch
          }
        }));
  
        // Удалить группу у всех студентов
        await Promise.all(students.map(async student => {
          if (student.group._id === groupToDelete) {
            // Обновить данные студента без группы
            await dispatch(changeStudents({ id: student._id, change: { group: null } }));
          }
        }));
  
        // Удалить саму группу
        const resultAction = await dispatch(deleteGroups(groupToDelete));
        if (deleteGroups.fulfilled.match(resultAction)) {
          dispatch(getGroups());
        }
        closeDeleteModal();
      } catch (error) {
        console.error("Ошибка при удалении группы:", error);
      }
    }
  };
  

  const saveGroupChanges = async (id: string, changes: { [key: string]: any }) => {
    await dispatch(changeGroups({ id, change: changes }));
    await dispatch(getGroups());
  };

  const filteredGroups = selectedGroup
    ? groups.filter((group) => group.name === selectedGroup)
    : groups;

  return (
    <div className="py-4 mx-20">
      <div className="w-full bg-white px-52 border-[3px] border-black">
        <div className="p-8">
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
      </div>

      <ModalDelete
        nameDel="группу"
        description="Усі наявні зв'язки буде видалено"
        isModalOpen={isDeleteModalOpen}
        closeModal={closeDeleteModal}
        confirmDelete={confirmDelete}
      />
      <ErrorAlert error={errorCreate || errorDelete} clearError={clearError} />
    </div>
  );
};

export default GroupTable;
