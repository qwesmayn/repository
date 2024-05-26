import { FC, useState } from "react";
import { useAppDispatch } from "../hooks/typeHooks";
import {
  getAuthors,
  deleteAuthors,
  changeAuthors,
} from "../store/action_creators/actionCreatos";
import { IAuthors } from "../models/IAuthors";
import ModalDelete from "./modals/ModalDelete";
import ModalAddAuthorDiscipline from "./modals/ModalAddAuthorDisciplines";
import { IDiscipline } from "../models/IDiscipline";


interface authorsTableProps {
  authors: IAuthors[];
  disciplines : IDiscipline[];
}

const AuthorsTable: FC<authorsTableProps> = ({ authors, disciplines }) => {
  const dispatch = useAppDispatch();
  const [selectedAuthorId, setSelectedAuthorId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [authorsToDelete, setAuthorsToDelete] = useState<string | null>(null);
  const [isAddDisciplineModalOpen, setIsAddDisciplineModalOpen] = useState<boolean>(false);
  const [authorToAddDiscipline, setAuthorToAddDiscipline] = useState<string | null>(null);

  const openModal = (id: string) => {
    setAuthorsToDelete(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setAuthorsToDelete(null);
    setIsModalOpen(false);
  };

  const changeDiscAuthors = async (authorId: string, disciplineIdToDelete: string | null) => {
    const updatedAuthors = authors.map((author) => {
      if (author._id === authorId) {
        const updatedDisciplines = author.disciplines.filter(discipline => discipline._id !== disciplineIdToDelete);
        return { ...author, disciplines: updatedDisciplines };
      }
      return author;
    });
  
    await dispatch(changeAuthors({ id: authorId, change: { disciplines: updatedAuthors.find(author => author._id === authorId)?.disciplines } }));
    await dispatch(getAuthors());
  };
  

  const openAddDisciplineModal = (id: string) => {
    setAuthorToAddDiscipline(id);
    setIsAddDisciplineModalOpen(true);
  };

  const closeAddDisciplineModal = () => {
    setAuthorToAddDiscipline(null);
    setIsAddDisciplineModalOpen(false);
  };

  const saveDiscipline = async (discplines: string[]) => {
    if (authorToAddDiscipline) {
      await dispatch(changeAuthors({ id: authorToAddDiscipline, change: { disciplines: discplines } }));
      await dispatch(getAuthors());
      closeAddDisciplineModal();
    }
  };
  

  const confirmDelete = async () => {
    if (authorsToDelete) {
      await dispatch(deleteAuthors(authorsToDelete));
      await dispatch(getAuthors());
      closeModal();
    }
  };

  const toggleSelectedAuthor = (id: string) => {
    setSelectedAuthorId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border-separate border-spacing-5">
        <tbody>
          {authors.map((author, index) => (
            <tr
              key={author._id}
              className="hover:bg-gray-100 transition-all duration-300"
            >
              <td className="text-center align-top shadow-xl px-2">{index + 1}</td>
              <td className="text-center align-top shadow-xl">{author.fullName}</td>
              <td className="text-center align-top shadow-xl">{author.position}</td>
              <td className="text-center align-top">
                <div>
                  <button
                    className="bg-white shadow-xl text-black px-5 py-1 rounded transition-colors duration-300"
                    onClick={() => toggleSelectedAuthor(author._id)}
                  >
                    Дисципліни ▼
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-700 ${
                      selectedAuthorId === author._id
                        ? "max-h-screen"
                        : "max-h-0"
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
                        <button className="text-blue-500 transition-colors duration-300" onClick={() => openAddDisciplineModal(author._id)}>
                          Додати дисципліну
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </td>
              <td className="text-center align-top">
                <div className="flex justify-center space-x-2">
                  <button className="bg-blue-500 shadow-xl text-white px-2 py-1 rounded transition-colors duration-300">
                    Save
                  </button>
                  <button
                    className="bg-red-500 shadow-xl text-white px-2 py-1 rounded transition-colors duration-300"
                    onClick={() => openModal(author._id)}
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
        nameDel="автора"
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        confirmDelete={confirmDelete}
      />
      <ModalAddAuthorDiscipline isModalOpen = {isAddDisciplineModalOpen} closeModal={closeAddDisciplineModal} saveDisciplines={saveDiscipline} disciplines={disciplines}/>
    </div>
  );
};

export default AuthorsTable;
