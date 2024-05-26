import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../hooks/typeHooks";
import {
  createAuthors,
  getAuthors,
} from "../../store/action_creators/actionCreatos";
import { IDiscipline } from "../../models/IDiscipline";

interface FormData {
  fullName: string;
  position: string;
  disciplines: string[]; // Array of discipline IDs
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
  const { register, handleSubmit } = useForm<FormData>();
  const dispatch = useAppDispatch();
  const [selectedDisciplines, setSelectedDisciplines] = useState<IDiscipline[]>(
    []
  );

  const closeModalAdd = () => {
    setSelectedDisciplines([])
    closeAddModal();
  }

  const onSubmit = async (data: FormData) => {
    const disciplineIds = selectedDisciplines.map(
      (discipline) => discipline._id
    );
    const authorData = { ...data, disciplines: disciplineIds };
    await dispatch(createAuthors(authorData));
    await dispatch(getAuthors());
    closeModalAdd();
  };

  const handleDisciplineChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedId = event.target.value;
    const selectedDiscipline = disciplines.find(
      (discipline) => discipline._id === selectedId
    );

    if (
      selectedDiscipline &&
      !selectedDisciplines.some((discipline) => discipline._id === selectedId)
    ) {
      setSelectedDisciplines([...selectedDisciplines, selectedDiscipline]);
    }
  };

  const removeDiscipline = (disciplineId: string) => {
    setSelectedDisciplines(
      selectedDisciplines.filter(
        (discipline) => discipline._id !== disciplineId
      )
    );
  };

  return (
    isAddAuthorsModalOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white rounded-lg p-8 shadow-lg">
          <h2 className="text-xl mb-4">Додати автора</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex">
            <div className="flex flex-col space-y-4 flex-grow">
            <div className="flex space-x-4 items-center">
                <input
                  type="text"
                  id="ID"
                  value={nextId}
                  readOnly
                  className="border border-gray-300 px-3 py-2 rounded-lg w-12 text-center"
                  placeholder="ID"
                />
                <input
                  type="text"
                  id="fullName"
                  {...register("fullName", { required: true })}
                  className="border border-gray-300 px-3 py-2 rounded-lg flex-grow"
                  placeholder="Ввод ПІБ"
                />
                <input
                  type="text"
                  id="position"
                  {...register("position", { required: true })}
                  className="border border-gray-300 px-3 py-2 rounded-lg flex-grow"
                  placeholder="Посада/Звання"
                />
                <select
                  id="disciplines"
                  onChange={handleDisciplineChange}
                  className="border border-gray-300 px-3 py-2 rounded-lg"
                  defaultValue=""
                >
                  <option value="" disabled>
                  Дисципліни ▼
                  </option>
                  {disciplines.map((discipline) => (
                    <option key={discipline._id} value={discipline._id}>
                      {discipline.name}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Зберегти
                </button>
                <button
                  type="button"
                  className="bg-gray-300 text-black py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-300"
                  onClick={closeModalAdd}
                >
                  Відмінити
                </button>
              </div>
              <div className="border w-max border-gray-300 rounded-lg p-4 overflow-hidden ml-auto">
                <h3 className="text-lg">Доданы дисципліни:</h3>
                <ul className="mt-2">
                  {selectedDisciplines.map((discipline) => (
                    <li
                      key={discipline._id}
                      className="flex justify-between items-center"
                    >
                      <span className="mr-5">{discipline.name}</span>
                      <button
                        type="button"
                        className="text-red-500"
                        onClick={() => removeDiscipline(discipline._id)}
                      >
                        Видалити
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default ModalAddAuthors;
