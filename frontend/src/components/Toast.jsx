import { useEffect } from 'react';
import { FiCheckCircle, FiX } from 'react-icons/fi';

function Toast({ message, show, onClose, duration = 3000 }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  return (
    <div className="fixed top-24 right-6 z-[60] animate-slideInRight">
      <div className="bg-white rounded-2xl shadow-2xl border-2 border-green-200 p-4 pr-12 min-w-[300px] max-w-md relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
            <FiCheckCircle className="text-white text-xl" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900">{message}</p>
            <p className="text-sm text-gray-600">Check your cart to proceed</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <FiX className="text-xl" />
        </button>
      </div>
    </div>
  );
}

export default Toast;
