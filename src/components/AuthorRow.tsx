import { FC, useState, ChangeEvent, useEffect } from "react";
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
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const isDifferent = (
      editedAuthor.fullName !== author.fullName ||
      editedAuthor.position !== author.position
    );
    setHasChanges(isDifferent);
  }, [editedAuthor, author]);

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
    <tr key={author._id} className="flex transition-all justify-between duration-300 border-2 border-black mb-5 p-3">
      <td className="text-center align-top shadow-dark-lg h-max py-3 px-5">{index + 1}</td>
      <td className="text-center align-top shadow-dark-lg w-80 h-max py-3" onDoubleClick={handleDoubleClickFullName}>
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
      <td className="text-center align-top shadow-dark-lg w-80 h-max py-3" onDoubleClick={handleDoubleClickPosition}>
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
      <td className="text-center align-top ">
        <div>
          <button
            className="bg-white shadow-dark-lg text-black px-5 py-3 rounded transition-colors duration-300  w-80"
            onClick={() => toggleSelectedAuthor(author._id)}
          >
            Дисципліни ▼
          </button>
          <div
            className={`overflow-hidden transition-all duration-700 ${
              selectedAuthorId === author._id ? "max-h-screen" : "max-h-0"
            }`}
          >
            <ul className="m-auto mb-3 mt-5 w-max bg-white border border-gray-300 rounded shadow-dark-lg p-2 overflow-y-auto">
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
          className={`bg-blue-500 shadow-dark-lg text-white py-3 px-3 rounded-2xl transition-colors duration-300 ${hasChanges ? '' : 'cursor-not-allowed text-gray-300 bg-gray-500'}`}
          onClick={handleSave}
          disabled={!hasChanges}
        >
          Зберегти зміни
        </button>
      </td>
      <td className="text-center align-top">
        <button
          className="bg-red-500 shadow-dark-lg text-white py-3 px-3 rounded-2xl transition-colors duration-300"
          onClick={() => openModal(author._id)}
        >
          Видалити користувача
        </button>
      </td>
    </tr>
  );
};

export default AuthorRow;
