import React from "react";
import { AddEmployeeProvider } from "./AddEmployee/AddEmployeeContext";
import WizardInner from "./AddEmployee/AddEmployeeWizard";

interface Props {
  open: boolean;
  onClose: () => void;
  editData?: any;
  onSuccess?: () => void;
}

const AddEmployeeModal: React.FC<Props> = ({ open, onClose, editData, onSuccess }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center">

      {/* Overlay (UNIC Blur Effect) */}
      <div
        className="
          absolute inset-0 bg-black/50
          backdrop-blur-xs
          transition-opacity
        "
        onClick={onClose}
      />

      {/* UNIC Modal Container */}
      <div
        className="
          relative w-full max-w-5xl mx-auto 
          rounded-2xl overflow-hidden shadow-2xl
          bg-linear-to-br from-white via-white/90 to-gray-100
          border border-gray-200
          transform transition-all
          animate-[fadeIn_0.25s_ease-out]
          max-h-[95vh] flex flex-col
        "
      >
        {/* Header (UNIC STYLE) */}
        <div className="
          px-6 py-4 border-b
          bg-white/80 backdrop-blur-xl
          flex justify-between items-center 
          shadow-sm
        ">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 tracking-wide">
            {editData ? "Edit Employee" : "Add New Employee"}
          </h2>

          <button
            onClick={onClose}
            className="
              text-gray-500 hover:text-gray-800 
              text-3xl leading-none 
              transition-all
            "
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 bg-white/40 no-scrollbar">
          <AddEmployeeProvider>
            <WizardInner editData={editData} onSuccess={onSuccess} />
          </AddEmployeeProvider>
        </div>

      </div>
    </div>
  );
};

export default AddEmployeeModal;
