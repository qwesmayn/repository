import { FC, useState } from "react";
import { useAppDispatch } from "../hooks/typeHooks";
import { getAuthors, deleteAuthors } from "../store/action_creators/actionCreatos";
import { IAuthors } from "../models/IAuthors";

interface authorsTableProps{
  authors : IAuthors[]
}

const AuthorsTable: FC<authorsTableProps> = ({authors}) => {
    const dispatch = useAppDispatch()
    const [selectedAuthorId, setSelectedAuthorId] = useState<string | null>(null);
  
    const deleteAutho = async (id: string) =>{
        await dispatch(deleteAuthors(id)),
        await dispatch(getAuthors())
    }
  
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-separate border-spacing-5">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Position</th>
              <th>Disciplines</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((author) => (
              <tr key={author._id} className="hover:bg-gray-100 transition-all duration-300">
                <td className="text-center align-top">{author._id}</td>
                <td className="text-center align-top">{author.fullName}</td>
                <td className="text-center align-top">{author.position}</td>
                <td className="text-center align-top">
                  <div>
                    <button
                      className="bg-gray-300 text-black px-2 py-1 rounded transition-colors duration-300"
                      onClick={() => setSelectedAuthorId(selectedAuthorId === author._id ? null : author._id)}
                    >
                      Дисципліни ▼
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-700 ${
                        selectedAuthorId === author._id ? 'max-h-screen' : 'max-h-0'
                      }`}
                    >
                      <ul className="m-auto mb-3 mt-5 w-max bg-white border border-gray-300 rounded shadow-lg p-2 overflow-y-auto">
                        {author.disciplines.map((discipline, index) => (
                          <li key={index} className="flex justify-between items-center px-2 py-1 border-b">
                            <span className="mr-6">{discipline.name}</span>
                            <button
                              className="text-red-500 transition-colors duration-300"
                              onClick={() => console.log("Delete discipline")}
                            >
                              &times;
                            </button>
                          </li>
                        ))}
                        <li className="flex justify-between items-center px-2 py-1 border-b">
                          <button className="text-blue-500 transition-colors duration-300">Додати дисципліну</button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </td>
                <td className="text-center align-top">
                  <div className="flex justify-center space-x-2">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded transition-colors duration-300">Save</button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded transition-colors duration-300" onClick={() => deleteAutho(author._id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  

  export default AuthorsTable