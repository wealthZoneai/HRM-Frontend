import React, { useState } from "react";
import { FiX } from "react-icons/fi";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSend: (text: string) => void;
}

const LeaveDeclineModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSend,
}) => {
  const [text, setText] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-center items-center">
      <div className="bg-white w-full max-w-lg rounded-xl p-6 shadow-lg">

        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-800 text-lg">
            Reason for Leave Decline
          </h3>
          <FiX onClick={onClose} className="cursor-pointer" />
        </div>

        <textarea
          placeholder="Type here…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-32 border rounded-lg p-3 outline-none"
        />

        <button
          onClick={() => onSend(text)}
          className="w-full mt-4 py-2 bg-blue-600 text-white rounded-lg font-medium"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default LeaveDeclineModal;
