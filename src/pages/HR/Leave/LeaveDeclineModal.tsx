import React, { useState } from "react";
import { FiX, FiSend } from "react-icons/fi";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSend: (text: string) => void;
}

const LeaveDeclineModal: React.FC<Props> = ({ isOpen, onClose, onSend }) => {
  const [text, setText] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center p-4">

      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">

        {/* 🌈 UNIQUE TOP HEADER BAR */}
        <div className="bg-gradient-to-r from-red-500 via-red-400 to-pink-500 p-4 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-white">
            Decline Leave Request
          </h3>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-6">

          <p className="text-gray-600 mb-2 font-medium">
            Please provide a reason:
          </p>

          {/* 📝 Modern Glass Textarea */}
          <textarea
            placeholder="Write your reason for declining the request..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="
              w-full h-36 p-4 rounded-xl bg-gray-50 border border-gray-200
              focus:border-red-400 focus:ring-2 focus:ring-red-200 outline-none
              transition shadow-inner resize-none
            "
          />

          {/* SEND BUTTON */}
          <button
            onClick={() => onSend(text)}
            className="
              w-full mt-5 py-3 bg-gradient-to-r from-red-500 to-red-600 
              hover:from-red-600 hover:to-red-700 text-white rounded-xl 
              font-semibold flex items-center justify-center gap-2 
              shadow-lg hover:shadow-red-300 transition-all
            "
          >
            <FiSend size={18} />
            Send Reason
          </button>
        </div>
      </div>

      {/* FADE IN ANIMATION */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LeaveDeclineModal;
