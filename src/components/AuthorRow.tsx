import { FC, useState, ChangeEvent } from "react";
import { IAuthors } from "../models/IAuthors";

interface AuthorRowProps {
  author: IAuthors;
  index: number;
  selectedAuthorId: string | null;
  toggleSelectedAuthor: (id: string) => void;
  changeDiscAuthors: (authorId: string, disciplineIdToDelete: string | null) => void;
  openAddDisciplineModal: (id: string) => void;
  openModal: (id: string) => void;
  saveAuthorChanges: (id: string, changes: { [key: string]: any }) => void;
}

const AuthorRow: FC<AuthorRowProps> = ({
  author,
  index,
  selectedAuthorId,
  toggleSelectedAuthor,
  changeDiscAuthors,
  openAddDisciplineModal,
  openModal,
  saveAuthorChanges,
}) => {
  const [editedAuthor, setEditedAuthor] = useState<IAuthors>({ ...author });
  const [isEditingFullName, setIsEditingFullName] = useState(false);
  const [isEditingPosition, setIsEditingPosition] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedAuthor((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const changes: { [key: string]: any } = {};
    if (editedAuthor.fullName !== author.fullName) {
      changes.fullName = editedAuthor.fullName;
    }
    if (editedAuthor.position !== author.position) {
      changes.position = editedAuthor.position;
    }
    saveAuthorChanges(author._id, changes);
  };

  const handleDoubleClickFullName = () => {
    setIsEditingFullName(true);
  };

  const handleDoubleClickPosition = () => {
    setIsEditingPosition(true);
  };

  return (
    <tr key={author._id} className="hover:bg-gray-100 transition-all duration-300">
      <td className="text-center align-top shadow-xl px-2">{index + 1}</td>
      <td className="text-center align-top shadow-xl w-80" onDoubleClick={handleDoubleClickFullName}>
        {isEditingFullName ? (
          <input
            type="text"
            name="fullName"
            value={editedAuthor.fullName}
            onChange={handleChange}
            onBlur={() => setIsEditingFullName(false)}
            autoFocus
          />
        ) : (
          editedAuthor.fullName
        )}
      </td>
      <td className="text-center align-top shadow-xl w-80" onDoubleClick={handleDoubleClickPosition}>
        {isEditingPosition ? (
          <input
            type="text"
            name="position"
            value={editedAuthor.position}
            onChange={handleChange}
            onBlur={() => setIsEditingPosition(false)}
            autoFocus
          />
        ) : (
          editedAuthor.position
        )}
      </td>
      <td className="text-center align-top">
        <div>
          <button
            className="bg-white shadow-xl text-black px-5 py-1 rounded transition-colors duration-300  w-80"
            onClick={() => toggleSelectedAuthor(author._id)}
          >
            Дисципліни ▼
          </button>
          <div
            className={`overflow-hidden transition-all duration-700 ${
              selectedAuthorId === author._id ? "max-h-screen" : "max-h-0"
            }`}
          >
            <ul className="m-auto mb-3 mt-5 w-max bg-white border border-gray-300 rounded shadow-lg p-2 overflow-y-auto">
              {author.disciplines.map((discipline, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center px-2 py-1 border-b"
                >
                  <span className="mr-6">{discipline.name}</span>
                  <button
                    className="text-red-500 transition-colors duration-300"
                    onClick={() => changeDiscAuthors(author._id, discipline._id)}
                  >
                    &times;
                  </button>
                </li>
              ))}
              <li className="flex justify-between items-center px-2 py-1 border-b">
                <button
                  className="text-blue-500 transition-colors duration-300"
                  onClick={() => openAddDisciplineModal(author._id)}
                >
                  Додати дисципліну
                </button>
              </li>
            </ul>
          </div>
        </div>
      </td>
      <td className="text-center align-top">
      <button
            className="bg-blue-500 shadow-xl text-white px-2 py-2 rounded-2xl transition-colors duration-300"
            onClick={handleSave}
          >
            Зберегти зміни
          </button>
      </td>
      <td className="text-center align-top">
          <button
            className="bg-red-500 shadow-xl text-white px-2 py-2 rounded-2xl transition-colors duration-300"
            onClick={() => openModal(author._id)}
          >
            Видалити користувача
          </button>
      </td>
    </tr>
  );
};

export default AuthorRow;
