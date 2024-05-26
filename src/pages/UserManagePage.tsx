import { FC, useEffect, useMemo, useState } from "react";
import UsersTable from "../components/UsersTable";
import AuthorsTable from "../components/AuthorsTable";
import { useAppDispatch, useAppSelector } from "../hooks/typeHooks";
import {
  getAuthors,
  getDisciplines,
  getGroups,
  getStudents,
} from "../store/action_creators/actionCreatos";
import GroupFilter from "../components/GroupFilter";
import DisciplinesFilter from "../components/DisciplinesFilter";
import AddUser from "../components/modals/ModalAddUser";
import Loading from "../components/Loadind";
import ModalAddAuthors from "../components/modals/ModalAddAuthors";

const UserManagePage: FC = () => {
  const [view, setView] = useState<"users" | "authors">("users");
  const [selectedGroup, setSelectedGroup] = useState<string>("all");
  const [selectedDiscipline, setselectedDiscipline] = useState<string>("all");
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState<boolean>(false);
  const [isAddAuthorsModalOpen, setIsAddAuthorsModalOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { students, authors, isLoading } = useAppSelector(
    (state) => state.userManageReducer
  );
  const {groups} = useAppSelector((state) => state.groupReducer)
  const {disciplines} = useAppSelector((state) => state.disciplineReducer)

  useEffect(() => {
    Promise.all([dispatch(getStudents()), dispatch(getAuthors()), dispatch(getGroups()), dispatch(getDisciplines())]);
  }, [dispatch]);

  const handleGroupChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGroup(event.target.value);
  };

  const handleDisciplineChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setselectedDiscipline(event.target.value);
  };

  const handleCloseAddUserModal = () =>{
    setIsAddUserModalOpen(false)
  }

  const handleCloseAuthorsAddModal = () =>{
    setIsAddAuthorsModalOpen(false)
  }

  const filteredStudents = useMemo(() => {
    return selectedGroup === "all"
      ? students
      : students.filter((student) => student.group?.name === selectedGroup);
  }, [selectedGroup, students]);

  const filteredAuthors = useMemo(() => {
    return selectedDiscipline === "all"
      ? authors
      : authors.filter((author) =>
          author.disciplines?.some((discipline) => discipline.name === selectedDiscipline)
        );
  }, [selectedDiscipline, authors]);

  const nextIdUsers = students.length + 1;
  const nextIdAuthors = authors.length + 1

  return isLoading ? (
    <Loading />
  ) : (
    <div className="p-4">
      <div className="mb-7 flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-40">
            <button
              className={`px-4 py-2 mr-2 shadow-xl ${
                view === "users" ? "bg-blue-600 text-white" : "bg-gray-200"
              } transition-colors duration-300`}
              onClick={() => setView("users")}
            >
              Користувачі
            </button>
            <button
              className={`px-4 py-2 shadow-xl ${
                view === "authors" ? "bg-blue-600 text-white" : "bg-gray-200"
              } transition-colors duration-300`}
              onClick={() => setView("authors")}
            >
              Автори
            </button>
          </div>
          <div>
            {view === "users" && (
              <GroupFilter
                selectedGroup={selectedGroup}
                handleGroupChange={handleGroupChange}
                groups={students.map((student) => student.group?.name)}
              />
            )}
            {view === "authors" && (
              <DisciplinesFilter
                selectedDiscipline={selectedDiscipline}
                handleDisciplineChange={handleDisciplineChange}
                disciplines={Array.from(
                  new Set(
                    authors.flatMap((author) =>
                      author.disciplines.map((discipline) => discipline.name)
                    )
                  )
                ).filter((disciplineName) => disciplineName)}
              />
            )}
          </div>
        </div>
        <div>
          {view === "users" && (
            <button className="bg-white text-black px-6 py-2 shadow-xl rounded transition-colors duration-300" onClick={() => setIsAddUserModalOpen(true)}>
              Додати користувача
            </button>
          )}
          {view === "authors" && (
            <button className="bg-white text-black px-6 py-2 shadow-xl rounded transition-colors duration-300" onClick={() => setIsAddAuthorsModalOpen(true)}>
              Додати автора
            </button>
          )}
        </div>
      </div>
      <div>
        {view === "users" && <UsersTable students={filteredStudents} groups={groups}/>}
        {view === "authors" && <AuthorsTable authors={filteredAuthors} disciplines = {disciplines}/>}
      </div>
      <AddUser isAddUserModalOpen={isAddUserModalOpen} closeAddModal={handleCloseAddUserModal} nextId={nextIdUsers} groups = {groups}/>
      <ModalAddAuthors isAddAuthorsModalOpen = {isAddAuthorsModalOpen} closeAddModal={handleCloseAuthorsAddModal} nextId={nextIdAuthors} disciplines={disciplines}/>
    </div>
  );
};

export default UserManagePage;
