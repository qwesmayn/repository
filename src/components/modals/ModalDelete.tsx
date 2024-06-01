import { FC, useState } from "react";
import Popup from "../Popup";

interface ModalDeleteProps {
  nameDel : string,
  description? : string 
  isModalOpen: boolean;
  closeModal: () => void;
  confirmDelete: () => void;
}

const ModalDelete: FC<ModalDeleteProps> = ({
  nameDel,
  description,
  isModalOpen,
  closeModal,
  confirmDelete,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    isModalOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-bg-blue-design p-6 rounded shadow-lg">
          <h2 className="text-lg">
            Ви точно бажаєте видалити {nameDel}?
          </h2>
          <h3 className="text-base mb-4 text-center text-red-600">{description}</h3>
          <div className="flex justify-end space-x-2">
            <button
              className="bg-bg-blue-design text-black px-4 py-2 rounded-2xl transition-colors duration-300 shadow-dark-lg"
              onClick={closeModal}
            >
              Ні
            </button>
            <button
              className="bg-bg-blue-design text-blacke px-4 py-2 rounded-2xl transition-colors duration-300 shadow-dark-lg"
              onClick={() => setIsPopupOpen(true)}
            >
              Так
            </button>
          </div>
        </div>
        {isPopupOpen && <Popup message="Успішно видален(а)" closeModal={confirmDelete}/>}
      </div>
    )
  );
};

export default ModalDelete;
