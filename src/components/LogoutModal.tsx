import React from "react";
import { FiLogOut, FiX } from "react-icons/fi";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-999 px-4">

      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-6 relative animate-slideUp">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
        >
          <FiX size={20} />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center shadow-inner">
            <FiLogOut size={32} className="text-red-600" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-center text-gray-800 mb-2">
          Logout Confirmation
        </h2>

        {/* Description */}
        <p className="text-center text-gray-600 mb-6">
          Are you sure you want to logout?  
          You will be redirected to the login page.
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="
              flex-1 py-2 rounded-xl border border-gray-300 text-gray-700 
              font-semibold hover:bg-gray-100 transition
            "
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="
              flex-1 py-2 rounded-xl bg-linear-to-r from-red-500 to-red-600 
              text-white font-semibold shadow hover:from-red-600 hover:to-red-700 
              transition
            "
          >
            Logout
          </button>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slideUp {
          animation: slideUp 0.25s ease-out;
        }
      `}</style>

    </div>
  );
};

export default LogoutModal;
