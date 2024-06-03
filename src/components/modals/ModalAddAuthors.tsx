import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../hooks/typeHooks";
import { createAuthors } from "../../store/action_creators/actionCreatos";
import { IDiscipline } from "../../models/IDiscipline";
import Popup from "../Popup";

interface FormData {
  fullName: string;
  position: string;
  disciplines: string[];
}

interface AddUserProps {
  isAddAuthorsModalOpen: boolean;
  closeAddModal: () => void;
  disciplines: IDiscipline[];
  nextId: number;
}

const ModalAddAuthors: FC<AddUserProps> = ({
  isAddAuthorsModalOpen,
  closeAddModal,
  nextId,
  disciplines,
}) => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const dispatch = useAppDispatch();
  const [selectedDisciplines, setSelectedDisciplines] = useState<string[]>([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>("");

  const closeModalAdd = () => {
    setSelectedDisciplines([]);
    closeAddModal();
  };

  const onSubmit = async (data: FormData) => {
    const authorData = { ...data, disciplines: selectedDisciplines };
    await dispatch(createAuthors(authorData));
    setShowSuccessPopup(true);
  };

  const handleDisciplineChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const disciplineId = event.target.value;
    if (disciplineId && !selectedDisciplines.includes(disciplineId)) {
      setSelectedDisciplines([...selectedDisciplines, disciplineId]);
      setSelectedDiscipline("");
    }
  };

  const toggleDiscipline = (disciplineId: string) => {
    setSelectedDisciplines((prevSelectedDisciplines) =>
      prevSelectedDisciplines.filter((id) => id !== disciplineId)
    );
    setSelectedDiscipline("");
  };

  const closePopup = () => {
    setShowSuccessPopup(false);
    closeModalAdd();
  };

  return (
    isAddAuthorsModalOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white shadow-dark-lg p-8">
          <h2 className="text-xl mb-4">Додати автора</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex">
            <div className="flex flex-col space-y-4 flex-grow">
              <div className="flex space-x-4 items-center">
                <input
                  type="text"
                  id="ID"
                  value={nextId}
                  readOnly
                  className="border border-gray-300 px-3 py-2 shadow-dark-lg w-12 text-center bg-bg-blue-design"
                  placeholder="ID"
                />
                <input
                  type="text"
                  id="fullName"
                  {...register("fullName", { required: true })}
                  className="border border-gray-300 px-3 py-2 shadow-dark-lg flex-grow bg-bg-blue-design"
                  placeholder="Ввод ПІБ"
                />
                <input
                  type="text"
                  id="position"
                  {...register("position", { required: true })}
                  className="border border-gray-300 px-3 py-2 shadow-dark-lg flex-grow bg-bg-blue-design"
                  placeholder="Посада/Звання"
                />
                <select
                  id="disciplines"
                  className="border border-gray-300 px-3 py-2 shadow-dark-lg bg-bg-blue-design"
                  value={selectedDiscipline}
                  onChange={handleDisciplineChange}
                >
                  <option value="" disabled>
                    Дисципліни ▼
                  </option>
                  {disciplines.map((discipline) => (
                    <option
                      key={discipline._id}
                      value={discipline._id}
                      disabled={selectedDisciplines.includes(discipline._id)}
                    >
                      {discipline.name}
                    </option>
                  ))}
                </select>

                <button
                  type="submit"
                  className="bg-bg-blue-design text-dark py-2 px-4 shadow-dark-lg transition duration-300 rounded-2xl"
                  disabled={!selectedDisciplines.length}
                >
                  Зберегти
                </button>
                <button
                  type="button"
                  className="bg-bg-blue-design text-black py-2 px-4 shadow-dark-lg transition duration-300 rounded-2xl"
                  onClick={closeModalAdd}
                >
                  Відмінити
                </button>
              </div>
              <div className="bg-bg-blue-design rounded-2xl border w-max border-gray-300 shadow-dark-lg p-4 overflow-hidden ml-auto">
                <h3 className="text-lg">Доданы дисципліни:</h3>
                <ul className="mt-2">
                  {selectedDisciplines.map((disciplineId) => {
                    const discipline = disciplines.find(
                      (d) => d._id === disciplineId
                    );
                    return (
                      <li
                        key={disciplineId}
                        className="flex justify-between items-center"
                      >
                        <span className="mr-5">{discipline?.name}</span>
                        <button
                          type="button"
                          className="text-red-500"
                          onClick={() => toggleDiscipline(disciplineId)}
                        >
                          Видалити
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </form>
        </div>
        {showSuccessPopup && (
          <Popup message="Вікладач успішно створеній" closeModal={closePopup} />
        )}
      </div>
    )
  );
};

export default ModalAddAuthors;
