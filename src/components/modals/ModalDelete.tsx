import { FC } from "react";

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
  return (
    isModalOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded shadow-lg">
          <h2 className="text-lg">
            Ви точно бажаєте видалити {nameDel}?
          </h2>
          <h3 className="text-base mb-4 text-center text-red-600">{description}</h3>
          <div className="flex justify-end space-x-2">
            <button
              className="bg-gray-300 text-black px-4 py-2 rounded transition-colors duration-300"
              onClick={closeModal}
            >
              Ні
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded transition-colors duration-300"
              onClick={confirmDelete}
            >
              Так
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ModalDelete;
