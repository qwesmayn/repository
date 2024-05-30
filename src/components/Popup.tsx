import { FC, useEffect, useState } from "react";

interface PopupProps {
  closeModal: () => void;
  message: string;
  duration?: number;
}

const Popup: FC<PopupProps> = ({ message, duration = 1000, closeModal }) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
      closeModal();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <div className="bg-gray-800 text-white p-4 rounded-md shadow-lg">
        <p>{message}</p>
      </div>
    </div>
  ) : null;
};

export default Popup;
