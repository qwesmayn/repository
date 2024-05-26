import { FC, useState, useEffect } from "react";

interface ErrorAlertProps {
  error: string | null;
  clearError: () => void;
}

const ErrorAlert: FC<ErrorAlertProps> = ({ error, clearError }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (error) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        clearError(); // Очищаем ошибку после скрытия подсказки
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  return (
    <div className={`fixed top-4 left-4 z-50 p-6 bg-orange-100 text-orange-700 rounded-lg shadow-lg transform ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"} transition-transform duration-500 ease-in-out`}>
      <p className="font-bold">Warning</p>
      <p>{error}</p>
    </div>
  );
};

export default ErrorAlert;
