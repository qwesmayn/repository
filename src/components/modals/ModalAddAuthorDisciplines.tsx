import { FC, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { IDiscipline } from "../../models/IDiscipline";

interface ModalAddAuthorDisciplineProps {
  isModalOpen: boolean;
  closeModal: () => void;
  saveDisciplines: (selectedDisciplines: string[]) => void;
  disciplines: IDiscipline[];
}

const ModalAddAuthorDiscipline: FC<ModalAddAuthorDisciplineProps> = ({ isModalOpen, closeModal, saveDisciplines, disciplines }) => {
  const [selectedDisciplines, setSelectedDisciplines] = useState<string[]>([]);
  const [isDisciplineListOpen, setIsDisciplineListOpen] = useState<boolean>(false);

  const toggleDisciplineList = () => {
    setIsDisciplineListOpen(!isDisciplineListOpen);
  };

  const handleSave = () => {
    saveDisciplines(selectedDisciplines);
    closeModal();
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 shadow-lg w-max">
        <div className="flex justify-end">
          <button className="text-gray-600 hover:text-gray-800" onClick={closeModal}>
            <XMarkIcon className="w-6" />
          </button>
        </div>
        <h2 className="text-xl mb-4">Выбрать дисциплины</h2>
        <div className="flex space-x-4">
          <div className="flex-grow relative">
            <div className=" flex items-center mb-2">
            <button
              className="border mr-5 border-gray-300 rounded-lg px-3 py-2 w-64 transition duration-500 ease-in-out"
              onClick={toggleDisciplineList}
            >
              Дисципліна ▼
            </button>
            <div className="flex">
            <button
            className={`bg-blue-500 mr-5 text-white px-4 py-2 rounded-lg hover:bg-blue-600 ${
              selectedDisciplines.length === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleSave}
            disabled={selectedDisciplines.length === 0}
          >
            Зберегти
          </button>
            <button className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400" onClick={closeModal}>
            Відмінити
          </button>
            </div>
            </div>

          <div className="flex">
          <ul
              className={`border border-gray-300 w-64 rounded-lg p-2 max-h-60 overflow-y-auto transition-all duration-500 mr-5 ${
                isDisciplineListOpen ? "max-h-60 visible opacity-100" : "max-h-0 invisible opacity-0"
              }`}
            >
              {disciplines.map((discipline) => (
                <li key={discipline._id}>
                  <button
                    className={`w-full text-left py-2 rounded-lg ${
                      selectedDisciplines.includes(discipline._id) ? "bg-blue-500 mb-2 text-center text-white" : "bg-white mb-2 text-black text-center"
                    }`}
                    onClick={() => {
                      const updatedDisciplines = selectedDisciplines.includes(discipline._id)
                        ? selectedDisciplines.filter((id) => id !== discipline._id)
                        : [...selectedDisciplines, discipline._id];
                      setSelectedDisciplines(updatedDisciplines);
                    }}
                  >
                    {discipline.name}
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex-grow border border-gray-300 rounded-lg p-4">
            <h3 className="text-lg">Выбранные дисциплины:</h3>
            <ul className="mt-2">
              {selectedDisciplines.map((selectedDiscipline) => (
                <li key={selectedDiscipline} className="flex justify-between items-center">
                  <span>{disciplines.find((discipline) => discipline._id === selectedDiscipline)?.name}</span>
                </li>
              ))}
            </ul>
          </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAddAuthorDiscipline;
