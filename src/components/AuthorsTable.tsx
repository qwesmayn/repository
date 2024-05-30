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
import AuthorRow from "./AuthorRow";

interface AuthorsTableProps {
  authors: IAuthors[];
  disciplines: IDiscipline[];
}

const AuthorsTable: FC<AuthorsTableProps> = ({ authors, disciplines }) => {
  const dispatch = useAppDispatch();
  const [selectedAuthorId, setSelectedAuthorId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [authorsToDelete, setAuthorsToDelete] = useState<string | null>(null);
  const [isAddDisciplineModalOpen, setIsAddDisciplineModalOpen] =
    useState<boolean>(false);
  const [authorToAddDiscipline, setAuthorToAddDiscipline] = useState<string | null>(
    null
  );

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

  const saveDiscipline = async (disciplines: string[]) => {
    if (authorToAddDiscipline) {
      await dispatch(changeAuthors({ id: authorToAddDiscipline, change: { disciplines: disciplines } }));
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

  const saveAuthorChanges = async (id: string, changes: { [key: string]: any }) => {
    await dispatch(changeAuthors({ id, change: changes }));
    await dispatch(getAuthors());
  };

  return (
    <div className="overflow-x-auto">
      <div className="grid grid-row-6 gap-4 p-7 border-[3px] border-black">
        {authors.map((author, index) => (
          <AuthorRow
            key={author._id}
            author={author}
            index={index}
            selectedAuthorId={selectedAuthorId}
            toggleSelectedAuthor={toggleSelectedAuthor}
            changeDiscAuthors={changeDiscAuthors}
            openAddDisciplineModal={openAddDisciplineModal}
            openModal={openModal}
            saveAuthorChanges={saveAuthorChanges}
          />
        ))}
      </div>

      <ModalDelete
        nameDel="автора"
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        confirmDelete={confirmDelete}
      />
      <ModalAddAuthorDiscipline isModalOpen={isAddDisciplineModalOpen} closeModal={closeAddDisciplineModal} saveDisciplines={saveDiscipline} disciplines={disciplines} />
    </div>
  );
};

export default AuthorsTable;
