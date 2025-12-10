import React from "react";
import { FiX, FiInfo } from "react-icons/fi";
import type { NotificationItem } from "./NotificationCard/types";

interface NotificationDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    notification: NotificationItem | null;
}

const NotificationDetailModal: React.FC<NotificationDetailModalProps> = ({
    isOpen,
    onClose,
    notification,
}) => {
    if (!isOpen || !notification) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] px-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 relative animate-slideUp">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
                >
                    <FiX size={20} />
                </button>

                {/* Icon */}
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center shadow-inner">
                        <FiInfo size={32} className="text-blue-600" />
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-center text-gray-800 mb-2">
                    {notification.title}
                </h2>

                {/* Time */}
                <p className="text-center text-xs text-gray-400 mb-4">
                    {notification.time}
                </p>

                {/* Description */}
                <div className="max-h-[60vh] overflow-y-auto">
                    <p className="text-gray-600 mb-6 whitespace-pre-wrap text-justify leading-relaxed">
                        {notification.message}
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex justify-center">
                    <button
                        onClick={onClose}
                        className="
              px-6 py-2 rounded-xl bg-blue-600 
              text-white font-semibold shadow hover:bg-blue-700 
              transition
            "
                    >
                        Close
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

export default NotificationDetailModal;
