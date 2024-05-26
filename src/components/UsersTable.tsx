import { FC, useState } from "react";
import { useAppDispatch } from "../hooks/typeHooks";
import { getStudents, deleteStudents, changeStudents } from "../store/action_creators/actionCreatos";
import { IStudents } from "../models/IStudents";
import ModalDelete from "./modals/ModalDelete";
import ModalAddGroup from "./modals/ModalAddStudentGroup";
import { IGroups } from "../models/IGroups";

interface UserTableProps {
  students: IStudents[],
  groups : IGroups[]
}

const UsersTable: FC<UserTableProps> = ({ students, groups }) => {
  const dispatch = useAppDispatch();
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [studentToDelete, setStudentToDelete] = useState<string | null>(null);
  const [isAddGroupModalOpen, setIsAddGroupModalOpen] = useState<boolean>(false);
  const [studentToAddGroup, setStudentToAddGroup] = useState<string | null>(null);

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
    await dispatch(changeStudents(({ id, change })));
    await dispatch(getStudents());
  };

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
      await dispatch(changeStudents({ id: studentToAddGroup, change: { group } }));
      await dispatch(getStudents());
      closeAddGroupModal();
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border-separate border-spacing-5">
        <tbody>
          {students.map((student, index) => (
            <tr key={student._id} className="hover:bg-gray-100 transition-all duration-300">
              <td className="text-center align-top shadow-xl px-4">{index+1}</td>
              <td className="text-center align-top shadow-xl">{student.fullName}</td>
              <td className="text-center align-top">
                <div>
                  <button
                    className="bg-white shadow-xl px-6 text-black py-1 rounded transition-colors duration-300"
                    onClick={() => setSelectedStudentId(selectedStudentId === student._id ? null : student._id)}
                  >
                    Група ▼
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-700 ${selectedStudentId === student._id ? 'max-h-screen' : 'max-h-0'}`}
                  >
                    <ul className="m-auto mb-3 mt-5 w-max bg-white border border-gray-300 rounded shadow-lg p-2 overflow-y-auto">
                      {student.group ? (
                        <li className="flex justify-between items-center px-2 py-1 border-b">
                          <span className="mr-6">{student.group.name}</span>
                          <button
                            className="text-red-500 transition-colors duration-300"
                            onClick={() => changeUser(student._id, { group: null })}
                          >
                            &times;
                          </button>
                        </li>
                      ) : null}
                      <li className="flex justify-between items-center px-2 py-1 border-b">
                        <button className="text-blue-500 transition-colors duration-300" onClick={() => openAddGroupModal(student._id)}>Додати групу</button>
                      </li>
                    </ul>
                  </div>
                </div>
              </td>
              <td className="text-center align-top shadow-xl">{student.login}</td>
              <td className="text-center align-top shadow-xl">{student.password}</td>
              <td className="text-center align-top ">
                <div className="flex justify-center space-x-2">
                  <button className="bg-blue-500 shadow-xl text-white px-2 py-1 rounded transition-colors duration-300">Save</button>
                  <button
                    className="bg-red-500 text-white shadow-xl px-2 py-1 rounded transition-colors duration-300"
                    onClick={() => openModal(student._id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <ModalDelete
        nameDel="користувача" isModalOpen = {isDeleteModalOpen} closeModal={closeModal} confirmDelete={confirmDelete}
       />
      <ModalAddGroup
        isModalOpen={isAddGroupModalOpen} closeModal={closeAddGroupModal} saveGroup={saveGroup} groups = {groups}
      />
    </div>
  );
};

export default UsersTable;
