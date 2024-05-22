import { FC, useState } from "react";
import { useAppDispatch } from "../hooks/typeHooks";
import { getStudents, deleteStudents, changeStudents} from "../store/action_creators/actionCreatos";
import { IStudents } from "../models/IStudents";

interface userTableProps {
  students : IStudents[]
}


const UsersTable: FC<userTableProps> = ({students}) => {
    const dispatch = useAppDispatch()
    const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  
    const deleteUser = async(id: string) =>{
        await dispatch(deleteStudents(id)),
        await dispatch(getStudents())
    }

    const changeUser = async(id : string, change : Object) => {
      await dispatch(changeStudents(({id, change})))
      await dispatch(getStudents())
    }
  
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-separate border-spacing-5">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Group</th>
              <th>Login</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id} className="hover:bg-gray-100 transition-all duration-300">
                <td className="text-center align-top">{student._id}</td>
                <td className="text-center align-top">{student.fullName}</td>
                <td className="text-center align-top">
                  <div>
                    <button
                      className="bg-gray-300 text-black px-2 py-1 rounded transition-colors duration-300"
                      onClick={() => setSelectedStudentId(selectedStudentId === student._id ? null : student._id)}
                    >
                      Група ▼
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-700 ${
                        selectedStudentId === student._id ? 'max-h-screen' : 'max-h-0'
                      }`}
                    >
                      <ul className="m-auto mb-3 mt-5 w-max bg-white border border-gray-300 rounded shadow-lg p-2 overflow-y-auto">
                        {student.group?                           <li className="flex justify-between items-center px-2 py-1 border-b">
                            <span className="mr-6">{student.group.name}</span>
                            <button
                              className="text-red-500 transition-colors duration-300"
                              onClick={() => changeUser(student._id, {group : null})}
                            >
                              &times;
                            </button>
                          </li>: null}

                        <li className="flex justify-between items-center px-2 py-1 border-b">
                          <button className="text-blue-500 transition-colors duration-300">Додати групу</button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </td>
                <td className="text-center align-top">{student.login}</td>
                <td className="text-center align-top">{student.password}</td>
                <td className="text-center align-top">
                  <div className="flex justify-center space-x-2">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded transition-colors duration-300">Save</button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded transition-colors duration-300" onClick={() => deleteUser(student._id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            
          </tbody>
        </table>
      </div>
    );
  };

  export default UsersTable