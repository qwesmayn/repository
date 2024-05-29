import { FC, useState, ChangeEvent } from "react";
import { IStudents } from "../models/IStudents";

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
    changeUser(student._id, changes);
  };

  const handleDoubleClickFullName = () => {
    setIsEditingFullName(true);
  };

  const handleDoubleClickLogin = () => {
    setIsEditingLogin(true);
  };

  return (
    <tr key={student._id} className="hover:bg-gray-100 transition-all duration-300">
      <td className="text-center align-top shadow-xl px-4">{index + 1}</td>
      <td className="text-center align-top shadow-xl" onDoubleClick={handleDoubleClickFullName}>
        {isEditingFullName ? (
          <input
            type="text"
            name="fullName"
            value={editedStudent.fullName}
            onChange={handleChange}
            onBlur={() => setIsEditingFullName(false)}
            autoFocus
          />
        ) : (
          editedStudent.fullName
        )}
      </td>
      <td className="text-center align-top">
        <div>
          <button
            className="bg-white shadow-xl px-6 text-black py-1 rounded transition-colors duration-300"
            onClick={() =>
              setSelectedStudentId(selectedStudentId === student._id ? null : student._id)
            }
          >
            Група ▼
          </button>
          <div
            className={`overflow-hidden transition-all duration-700 ${
              selectedStudentId === student._id ? "max-h-screen" : "max-h-0"
            }`}
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
                <button
                  className="text-blue-500 transition-colors duration-300"
                  onClick={() => openAddGroupModal(student._id)}
                >
                  Додати групу
                </button>
              </li>
            </ul>
          </div>
        </div>
      </td>
      <td className="text-center align-top shadow-xl" onDoubleClick={handleDoubleClickLogin}>
        {isEditingLogin ? (
          <input
            type="text"
            name="login"
            value={editedStudent.login}
            onChange={handleChange}
            onBlur={() => setIsEditingLogin(false)}
            autoFocus
          />
        ) : (
          editedStudent.login
        )}
      </td>
      <td className="text-center align-top shadow-xl">{student.password}</td>
      <td className="text-center align-top">
      <button
            className="bg-blue-500 shadow-xl text-white px-2 py-2 rounded-2xl transition-colors duration-300"
            onClick={handleSave}
          >
            Зберегти зміни
          </button>
      </td>
      <td className="text-center align-top ">
          <button
            className="bg-red-500 text-white shadow-xl px-2 py-2 rounded-2xl transition-colors duration-300"
            onClick={() => openModal(student._id)}
          >
            Видалити користувача
          </button>
      </td>
    </tr>
  );
};

export default StudentRow;
