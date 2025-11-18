import React from "react";
import { FiBell, FiX } from "react-icons/fi";

interface NotificationItem {
  id: string;
  name: string;
  avatar: string;
  message: string;
}

interface Props {
  isOpen: boolean;
  data: NotificationItem[];
  onClose: () => void;
  onSelect: (item: NotificationItem) => void;
}

const LeaveNotificationPopup: React.FC<Props> = ({
  isOpen,
  data,
  onClose,
  onSelect,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* 🔥 BACKDROP BLACK GRADIENT */}
      <div
        className="
          fixed inset-0 
          bg-gradient-to-b from-black/40 to-black/20
          backdrop-blur-[1px]
          z-40
        "
        onClick={onClose} // click outside = close
      />

      {/* POPUP */}
      <div
        className="
          fixed top-24 right-6 
          w-80 bg-white 
          rounded-2xl shadow-xl 
          border border-gray-200 
          z-50 
          animate-fadeIn
        "
      >
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center">
              <FiBell size={18} />
            </div>
            <p className="font-semibold text-gray-800">Leave Requests</p>
          </div>

          <FiX
            onClick={onClose}
            className="cursor-pointer text-gray-500 hover:text-gray-700"
            size={18}
          />
        </div>

        {/* Notification List */}
        <div className="max-h-72 overflow-y-auto">
          {data.length === 0 && (
            <p className="text-center text-gray-500 py-6 text-sm">
              No new leave requests
            </p>
          )}

          {data.map((n) => (
            <div
              key={n.id}
              onClick={() => onSelect(n)}
              className="
                flex gap-3 items-start px-4 py-3 
                hover:bg-gray-50 
                cursor-pointer
                transition
              "
            >
              <img
                src={n.avatar}
                className="w-10 h-10 rounded-full border border-gray-200"
              />

              <div className="flex-1">
                <p className="font-medium text-gray-800">{n.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{n.message}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-4 py-2">
          <button className="w-full py-2 text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition">
            View All Requests
          </button>
        </div>

        
      </div>
    </>
  );
};

export default LeaveNotificationPopup;
