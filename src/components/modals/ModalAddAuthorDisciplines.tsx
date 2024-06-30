import { FC, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { IDiscipline } from "../../models/IDiscipline";
import i18n from "../../i18n";

interface ModalAddAuthorDisciplineProps {
  isModalOpen: boolean;
  closeModal: () => void;
  saveDisciplines: (selectedDisciplines: string[]) => void;
  disciplines: IDiscipline[];
}

const ModalAddAuthorDiscipline: FC<ModalAddAuthorDisciplineProps> = ({
  isModalOpen,
  closeModal,
  saveDisciplines,
  disciplines,
}) => {
  const [selectedDisciplines, setSelectedDisciplines] = useState<string[]>([]);
  const [isDisciplineListOpen, setIsDisciplineListOpen] =
    useState<boolean>(false);

  const toggleDisciplineList = () => {
    setIsDisciplineListOpen(!isDisciplineListOpen);
  };

  const handleSave = () => {
    saveDisciplines(selectedDisciplines);
    closeModal();
  };

  const handleClose = () => {
    setSelectedDisciplines([])
    closeModal()
  }

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 shadow-lg w-max">
        <div className="flex justify-end">
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={closeModal}
          >
            <XMarkIcon className="w-6" />
          </button>
        </div>
        <h2 className="text-xl mb-4">
          {i18n.t("userManage.selectedDiscipline")}
        </h2>
        <div className="flex space-x-4">
          <div className="flex-grow relative">
            <div className=" flex items-center mb-2">
              <button
                className="bg-bg-blue-design border mr-5 border-gray-300 rounded-lg px-3 py-2 w-64 transition duration-500 ease-in-out shadow-dark-lg"
                onClick={toggleDisciplineList}
              >
                {i18n.t("userManage.discipline")}
              </button>
              <div className="flex ">
                <button
                  className={`bg-bg-blue-design mr-5 text-black px-4 py-2 rounded-lg shadow-dark-lg ${
                    selectedDisciplines.length === 0
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  onClick={handleSave}
                  disabled={selectedDisciplines.length === 0}
                >
                  {i18n.t("userManage.buttonSave")}
                </button>
                <button
                  className="bg-bg-blue-design text-black px-4 py-2 rounded-lg shadow-dark-lg"
                  onClick={handleClose}
                >
                  {i18n.t("userManage.buttonCancel")}
                </button>
              </div>
            </div>

            <div className="flex ">
              <ul
                className={`border border-gray-300 w-64 rounded-lg p-2 max-h-60 overflow-y-auto transition-all duration-500 mr-5 ${
                  isDisciplineListOpen
                    ? "max-h-60 visible opacity-100"
                    : "max-h-0 invisible opacity-0"
                }`}
              >
                {disciplines.map((discipline) => (
                  <li key={discipline._id}>
                    <button
                      className={`w-full text-left py-2 rounded-lg ${
                        selectedDisciplines.includes(discipline._id)
                          ? "bg-blue-500 mb-2 text-center text-white"
                          : "bg-white mb-2 text-black text-center"
                      }`}
                      onClick={() => {
                        const updatedDisciplines = selectedDisciplines.includes(
                          discipline._id
                        )
                          ? selectedDisciplines.filter(
                              (id) => id !== discipline._id
                            )
                          : [...selectedDisciplines, discipline._id];
                        setSelectedDisciplines(updatedDisciplines);
                      }}
                    >
                      {discipline.name}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="flex-grow border border-gray-300 rounded-lg p-4 bg-bg-blue-design shadow-dark-lg">
                <h3 className="text-lg">
                  {i18n.t("userManage.selectedDiscipline")}
                </h3>
                <ul className="mt-2 ">
                  {selectedDisciplines.map((selectedDiscipline) => (
                    <li
                      key={selectedDiscipline}
                      className="flex justify-between items-center"
                    >
                      <span>
                        {
                          disciplines.find(
                            (discipline) =>
                              discipline._id === selectedDiscipline
                          )?.name
                        }
                      </span>
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
