import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline"; // Assuming you have Heroicons installed

interface Props {
  isOpen: boolean;
  data: any | null;
  onClose: () => void; // Added onClose to the component props
  onApprove: () => void;
  onDecline: () => void;
}

const LeaveViewModal: React.FC<Props> = ({
  isOpen,
  data,
  onClose, // Destructure onClose
  onApprove,
  onDecline,
}) => {
  // If not open or no data, return null
  if (!isOpen || !data) return null;

  return (
    // Modal background: fixed, covers whole screen, semi-transparent black, centered
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-center items-center">
      {/* Modal content container */}
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl p-6 relative">
        {/* Close button (X) in the top right corner */}
        <button
          onClick={onClose} // Call the onClose handler
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition duration-150"
          aria-label="Close"
        >
          {/* Using an X icon from Heroicons for better styling */}
          <XMarkIcon className="h-6 w-6" />
        </button>

        {/* Modal Header */}
        <h2 className="text-center font-semibold text-gray-800 text-lg mb-4">
          APPLICATION FOR MEDICAL LEAVE
        </h2>

        {/* Application Text/Content */}
        <p className="text-gray-700 leading-relaxed mb-4">
          {data.applicationText}
        </p>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onApprove}
            className="px-5 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
          >
            Approve
          </button>
          <button
            onClick={onDecline}
            className="px-5 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaveViewModal;