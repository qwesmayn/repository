import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { IGroups } from "../../models/IGroups";
import { useAppDispatch } from "../../hooks/typeHooks";
import { createStudent, getStudents } from "../../store/action_creators/actionCreatos";
import Popup from "../Popup";

interface FormData {
  fullName: string;
  group: string;
  login: string;
  password: string;
}

interface AddUserProps {
  isAddUserModalOpen: boolean;
  closeAddModal: () => void;
  groups : IGroups[];
  nextId: number;
}

const AddUser: FC<AddUserProps> = ({ isAddUserModalOpen, closeAddModal, nextId, groups }) => {
  const { register, handleSubmit } = useForm<FormData>();
  const dispatch = useAppDispatch()
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const onSubmit = async (data: FormData) => {
    await dispatch(createStudent(data))
    setShowSuccessPopup(true);
  };

  const closePopup =  () => {
    setShowSuccessPopup(false);
    closeAddModal();
  }

  return (
    isAddUserModalOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white shadow-dark-lg p-8 w-max">
          <h2 className="text-xl mb-4">Додаті корістувача</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex space-x-4">
              <input
                type="text"
                id="ID"
                value={nextId}
                readOnly
                className="bg-bg-blue-design border border-gray-300 px-3 py-2 shadow-dark-lg flex-grow w-12 text-center"
                placeholder="ID"
              />
              <input
                type="text"
                id="fullName"
                {...register("fullName", { required: true })}
                className="bg-bg-blue-design border border-gray-300 px-3 py-2 shadow-dark-lg flex-grow"
                placeholder="ФИО"
              />
              <select
                id="group"
                {...register("group", { required: true })}
                className="bg-bg-blue-design border border-gray-300 px-3 py-2 shadow-dark-lg flex-grow"
              >
                {groups.map((group) => (
                  <option key={group._id} value={group._id}>
                    {group.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                id="login"
                {...register("login", { required: true })}
                className="bg-bg-blue-design border border-gray-300 px-3 py-2 shadow-dark-lg flex-grow"
                placeholder="Логин"
              />
              <input
                id="password"
                {...register("password", { required: true })}
                className="bg-bg-blue-design border border-gray-300 px-3 py-2 shadow-dark-lg flex-grow"
                placeholder="Пароль"
              />
              <button
                type="submit"
                className="bg-bg-blue-design text-black py-2 px-4 rounded-2xl shadow-dark-lg  transition duration-300"
              >
                Зберегти
              </button>

                <button className="bg-bg-blue-design text-black px-4 py-2 rounded-2xl shadow-dark-lg" onClick={closeAddModal}>
              Відмінити
            </button>
            </div>
          </form>
        </div>
        {showSuccessPopup && (
          <Popup message="Корістувачі успішно створений" closeModal={closePopup} />
        )}
      </div>
    )
  );
};

export default AddUser;
