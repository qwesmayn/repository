import { FC, useState } from "react";
import { useAppDispatch } from "../hooks/typeHooks";
import {
  getStudents,
  deleteStudents,
  changeStudents,
} from "../store/action_creators/actionCreatos";
import { IStudents } from "../models/IStudents";
import ModalDelete from "./modals/ModalDelete";
import ModalAddGroup from "./modals/ModalAddStudentGroup";
import { IGroups } from "../models/IGroups";
import StudentRow from "./studentRow";
import Popup from "./Popup";
import i18n from "../i18n";

interface UserTableProps {
  students: IStudents[];
  groups: IGroups[];
}

const UsersTable: FC<UserTableProps> = ({ students, groups }) => {
  const dispatch = useAppDispatch();
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
    null
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [studentToDelete, setStudentToDelete] = useState<string | null>(null);
  const [isAddGroupModalOpen, setIsAddGroupModalOpen] =
    useState<boolean>(false);
  const [studentToAddGroup, setStudentToAddGroup] = useState<string | null>(
    null
  );
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openModal = (id: string) => {
    setStudentToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const closeModal = () => {
    setStudentToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const confirmDelete = async () => {
    if (studentToDelete) {
      await dispatch(deleteStudents(studentToDelete));
      await dispatch(getStudents());
      closeModal();
    }
  };

  const changeUser = async (id: string, change: Object) => {
    await dispatch(changeStudents({ id, change }));
    setIsPopupOpen(true)
  };

  const UpdateUser = () => {
    dispatch(getStudents())
  }

  const openAddGroupModal = (id: string) => {
    setStudentToAddGroup(id);
    setIsAddGroupModalOpen(true);
  };

  const closeAddGroupModal = () => {
    setStudentToAddGroup(null);
    setIsAddGroupModalOpen(false);
  };

  const saveGroup = async (group: string) => {
    if (studentToAddGroup) {
      await dispatch(
        changeStudents({ id: studentToAddGroup, change: { group } })
      );
      setIsPopupOpen(true)
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="grid grid-row-6 gap-4 p-7 border-[3px] border-black">
        {students.map((student, index) => (
          <StudentRow
            key={student._id}
            student={student}
            index={index}
            selectedStudentId={selectedStudentId}
            setSelectedStudentId={setSelectedStudentId}
            changeUser={changeUser}
            openAddGroupModal={openAddGroupModal}
            openModal={openModal}
          />
        ))}
      </div>

      <ModalDelete
        nameDel={i18n.t('userManage.deleteWhatStudent')}
        isModalOpen={isDeleteModalOpen}
        closeModal={closeModal}
        confirmDelete={confirmDelete}
      />
      <ModalAddGroup
        isModalOpen={isAddGroupModalOpen}
        closeModal={closeAddGroupModal}
        saveGroup={saveGroup}
        groups={groups}
      />
      {isPopupOpen && <Popup message="Зміни збережено" closeModal={UpdateUser}/>}
    </div>
  );
};

export default UsersTable;
