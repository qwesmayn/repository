import { FC, useState, ChangeEvent, useEffect } from "react";
import { IStudents } from "../models/IStudents";
import i18n from "../i18n";

interface StudentRowProps {
  student: IStudents;
  index: number;
  selectedStudentId: string | null;
  setSelectedStudentId: (id: string | null) => void;
  changeUser: (id: string, change: Object) => Promise<void>;
  openAddGroupModal: (id: string) => void;
  openModal: (id: string) => void;
}

const StudentRow: FC<StudentRowProps> = ({
  student,
  index,
  selectedStudentId,
  setSelectedStudentId,
  changeUser,
  openAddGroupModal,
  openModal,
}) => {
  const [editedStudent, setEditedStudent] = useState<IStudents>({ ...student });
  const [isEditingFullName, setIsEditingFullName] = useState(false);
  const [isEditingLogin, setIsEditingLogin] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const isDifferent = (
      editedStudent.fullName !== student.fullName ||
      editedStudent.login !== student.login ||
      editedStudent.password !== student.password
    );
    setHasChanges(isDifferent);
  }, [editedStudent, student]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedStudent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const changes: { [key: string]: any } = {};
    if (editedStudent.fullName !== student.fullName) {
      changes.fullName = editedStudent.fullName;
    }
    if (editedStudent.login !== student.login) {
      changes.login = editedStudent.login;
    }
    if (editedStudent.password !== student.password) {
      changes.password = editedStudent.password;
    }
    changeUser(student._id, changes);
  };

  const handleDoubleClickFullName = () => {
    setIsEditingFullName(true);
  };

  const handleDoubleClickLogin = () => {
    setIsEditingLogin(true);
  };

  const handleDoubleClickPassword = () => {
    setIsEditingPassword(true);
  };

  return (
    <div key={student._id} className="flex transition-all justify-between duration-300 border-2 border-black mb-5 p-3">
      <div className="text-center align-top shadow-dark-lg w-20 h-max py-3 bg-bg-blue-design">{index + 1}</div>
      <div className="text-center align-top shadow-dark-lg w-96 h-max py-3 overflow-hidden whitespace-nowrap bg-bg-blue-design" onDoubleClick={handleDoubleClickFullName}>
        {isEditingFullName ? (
          <input
            type="text"
            name="fullName"
            value={editedStudent.fullName}
            onChange={handleChange}
            onBlur={() => setIsEditingFullName(false)}
            autoFocus
            className="w-full"
          />
        ) : (
          <div className="truncate">{editedStudent.fullName}</div>
        )}
      </div>

      <div className="text-center align-top">
        <div>
          <button
            className="bg-bg-blue-design shadow-dark-lg px-6 text-black py-3 rounded-3xl transition-colors duration-300"
            onClick={() =>
              setSelectedStudentId(selectedStudentId === student._id ? null : student._id)
            }
          >
            {i18n.t('userManage.group')}
          </button>
          <div
            className={`overflow-hidden transition-all duration-700 ${
              selectedStudentId === student._id ? "max-h-screen" : "max-h-0"
            }`}
          >
            <ul className="m-auto mb-3 mt-5 w-max bg-bg-blue-design border border-gray-300 rounded shadow-dark-lg p-2 overflow-y-auto">
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
                <button
                  className="text-blue-500 transition-colors duration-300"
                  onClick={() => openAddGroupModal(student._id)}
                >
            {i18n.t('userManage.addGroup')}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-bg-blue-design text-center align-top shadow-dark-lg w-72 h-max py-3 overflow-hidden whitespace-nowrap" onDoubleClick={handleDoubleClickLogin}>
        {isEditingLogin ? (
          <input
            type="text"
            name="login"
            value={editedStudent.login}
            onChange={handleChange}
            onBlur={() => setIsEditingLogin(false)}
            autoFocus
            className="w-full"
          />
        ) : (
          <div className="truncate">{editedStudent.login}</div>
        )}
      </div>
      <div className="bg-bg-blue-design text-center align-top shadow-dark-lg w-96 h-max py-3 overflow-hidden whitespace-nowrap" onDoubleClick={handleDoubleClickPassword}>
        {isEditingPassword ? (
          <input
            type="text"
            name="password"
            value={editedStudent.password}
            onChange={handleChange}
            onBlur={() => setIsEditingPassword(false)}
            autoFocus
            className="w-full"
          />
        ) : (
          <div className="truncate">{editedStudent.password}</div>
        )}
      </div>
      <div className="text-center align-top">
        <button
          className={`h-min py-3 px-3 rounded-2xl shadow-dark-lg transition-colors duration-300 ${
            hasChanges ? "bg-bg-blue-design text-black" : "bg-gray-500 text-gray-300 cursor-not-allowed"
          }`}
          onClick={handleSave}
          disabled={!hasChanges}
        >
          {i18n.t('material.buttonSaveChanges')}
        </button>
      </div>
      <div className="text-center align-top">
        <button
          className="bg-bg-blue-design text-black shadow-dark-lg py-3 px-3 rounded-2xl transition-colors duration-300"
          onClick={() => openModal(student._id)}
        >
          {i18n.t('userManage.buttonDeleteStudent')}
        </button>
      </div>
    </div>
  );
};

export default StudentRow;
