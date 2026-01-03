import React from "react";
import { Check } from "lucide-react";

interface AnnouncementSuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AnnouncementSuccessModal: React.FC<AnnouncementSuccessModalProps> = ({
    isOpen,
    onClose,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6 transform transition-all scale-100">
                <div className="flex flex-col items-center text-center">
                    {/* Success Icon */}
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <Check className="w-8 h-8 text-green-600" strokeWidth={3} />
                    </div>

                    {/* Text Content */}
                    <h2 className="text-xl font-bold text-gray-800 mb-2">
                        Success!
                    </h2>
                    <p className="text-gray-500 mb-6">
                        Announcement created successfully.
                    </p>

                    {/* Action Button */}
                    <button
                        onClick={onClose}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-xl transition-colors shadow-sm active:scale-95"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AnnouncementSuccessModal;
