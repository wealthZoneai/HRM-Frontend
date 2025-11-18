import React from "react";

interface Props {
  isOpen: boolean;
  data: any | null;
  onClose: () => void;
  onApprove: () => void;
  onDecline: () => void;
}

const LeaveViewModal: React.FC<Props> = ({
  isOpen,
  data,
  onApprove,
  onDecline,
}) => {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-center items-center">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl p-6">

        <h2 className="text-center font-semibold text-gray-800 text-lg mb-4">
          APPLICATION FOR MEDICAL LEAVE
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          {data.applicationText}
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onApprove}
            className="px-5 py-2 bg-green-600 text-white rounded-lg"
          >
            Approve
          </button>
          <button
            onClick={onDecline}
            className="px-5 py-2 bg-red-600 text-white rounded-lg"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaveViewModal;
