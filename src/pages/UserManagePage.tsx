import { FC, useEffect, useState } from "react";
import UsersTable from "../components/UsersTable";
import AuthorsTable from "../components/AuthorsTable";
import { useAppDispatch, useAppSelector } from "../hooks/typeHooks";
import { getAuthors, getStudents } from "../store/action_creators/actionCreatos";
import Loading from "../components/Loadind";

const UserManagePage: FC = () => {
  const [view, setView] = useState<"users" | "authors">("users");
  const dispatch = useAppDispatch()
  const {students, authors, isLoading} = useAppSelector((state) => state.userManageReducer)

  useEffect(() =>{
    Promise.all([
      dispatch(getStudents()),
      dispatch(getAuthors()),
    ])
  }, [])

  return (
    isLoading ? <Loading /> : <div className="p-4">
    <div className="mb-4">
      <button
        className={`px-4 py-2 mr-2 ${view === "users" ? "bg-blue-600 text-white" : "bg-gray-200"} transition-colors duration-300`}
        onClick={() => setView("users")}
      >
        Користувачі
      </button>
      <button
        className={`px-4 py-2 ${view === "authors" ? "bg-blue-600 text-white" : "bg-gray-200"} transition-colors duration-300`}
        onClick={() => setView("authors")}
      >
        Автори
      </button>
    </div>
    <div>
      {view === "users" && <UsersTable students = {students}/>}
      {view === "authors" && <AuthorsTable authors = {authors}/>}
    </div>
  </div>
    
  );
};



export default UserManagePage;
