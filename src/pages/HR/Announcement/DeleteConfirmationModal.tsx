import React from "react";
import { FiTrash2, FiAlertTriangle, FiX } from "react-icons/fi";

interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
    isDeleting?: boolean;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Delete Announcement",
    message = "Are you sure you want to delete this announcement? This action cannot be undone.",
    isDeleting = false
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 transform transition-all scale-100 animate-fadeIn">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <FiX size={20} />
                </button>

                <div className="flex flex-col items-center text-center">
                    {/* Warning Icon */}
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-5 ring-4 ring-red-50/50">
                        <FiTrash2 className="w-8 h-8 text-red-500" strokeWidth={2} />
                    </div>

                    {/* Text Content */}
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                        {title}
                    </h2>
                    <p className="text-gray-500 mb-8 text-sm leading-relaxed">
                        {message}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex gap-3 w-full">
                        <button
                            onClick={onClose}
                            disabled={isDeleting}
                            className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={isDeleting}
                            className="flex-1 px-4 py-2.5 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors shadow-sm shadow-red-200 disabled:opacity-70 flex justify-center items-center gap-2"
                        >
                            {isDeleting ? "Deleting..." : "Delete"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
