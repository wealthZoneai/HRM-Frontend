import React from "react";
import { FiAlertTriangle, FiX } from "react-icons/fi";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  loading?: boolean;
}

const DeleteConfirmationModal: React.FC<Props> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Delete Policy", 
  message,
  loading 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[2000] p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all scale-100">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-red-100 rounded-full text-red-600">
              <FiAlertTriangle size={24} />
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <FiX size={20} />
            </button>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-500 leading-relaxed">{message || "Are you sure you want to delete this policy? This action cannot be undone."}</p>
        </div>

        <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row-reverse gap-3">
          <button
            onClick={onConfirm}
            disabled={loading}
            className="w-full sm:w-auto px-6 py-2.5 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 shadow-lg shadow-red-500/20 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Deleting...
              </>
            ) : "Yes, Delete"}
          </button>
          <button
            onClick={onClose}
            disabled={loading}
            className="w-full sm:w-auto px-6 py-2.5 bg-white text-gray-700 font-semibold rounded-xl border border-gray-300 hover:bg-gray-100 transition-all disabled:opacity-70"
          >
            No, Keep it
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;