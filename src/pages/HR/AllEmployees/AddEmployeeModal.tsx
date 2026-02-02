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
          bg-white
          border border-gray-200
          transform transition-all
          animate-[fadeIn_0.25s_ease-out]
          max-h-[95vh] flex flex-col
        "
      >
        {/* Header */}
        <div className="
          px-6 py-4 border-b
          bg-white
          flex justify-between items-center 
          shadow-sm z-10
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

        {/* Body - REMOVED PADDING HERE to fix gaps */}
        <div className="flex-1 overflow-y-auto bg-gray-50 no-scrollbar p-0">
          <AddEmployeeProvider>
            <WizardInner editData={editData} onSuccess={onSuccess} />
          </AddEmployeeProvider>
        </div>

      </div>
    </div>
  );
};

export default AddEmployeeModal;