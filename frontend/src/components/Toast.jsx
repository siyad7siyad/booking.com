import { useEffect } from "react";

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  const baseStyles = `fixed top-4 right-4 z-50 p-4 rounded-lg text-white max-w-md shadow-lg transition-transform transform`;
  const typeStyles =
  type === "SUCCESS"
    ? "bg-green-600 animate-slide-in fade-in"
    : "bg-red-600 animate-slide-in fade-in";


  return (
    <div className={`${baseStyles} ${typeStyles}`}>
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold">{message}</span>
        <button
          className="ml-4 text-white focus:outline-none"
          onClick={onClose}
        >
          ✖
        </button>
      </div>
    </div>
  );
};

export default Toast;
