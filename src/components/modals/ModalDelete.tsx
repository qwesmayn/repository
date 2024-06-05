import { FC, useState } from "react";
import Popup from "../Popup";
import i18n from "../../i18n";

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

  const handleConfirmDelete = () => {
    setIsPopupOpen(false);
    confirmDelete();  
    closeModal();
  };

  return (
    isModalOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-bg-blue-design p-6 rounded shadow-lg">
          <h2 className="text-lg">
            {i18n.t('material.deleteMessage')} {nameDel}?
          </h2>
          <h3 className="text-base mb-4 text-center text-red-600">{description}</h3>
          <div className="flex justify-end space-x-2">
            <button
              className="bg-bg-blue-design text-black px-4 py-2 rounded-2xl transition-colors duration-300 shadow-dark-lg"
              onClick={closeModal}
            >
              {i18n.t('material.deleteNo')}
            </button>
            <button
              className="bg-bg-blue-design text-blacke px-4 py-2 rounded-2xl transition-colors duration-300 shadow-dark-lg"
              onClick={() => setIsPopupOpen(true)}
            >
              {i18n.t('material.deleteYes')}
            </button>
          </div>
        </div>
        {isPopupOpen && <Popup message={i18n.t('material.succesDelete')} closeModal={handleConfirmDelete}/>}
      </div>
    )
  );
};

export default ModalDelete;
