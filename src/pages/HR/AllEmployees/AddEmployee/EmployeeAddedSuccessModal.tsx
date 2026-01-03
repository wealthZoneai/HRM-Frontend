import React from "react";
import { Check } from "lucide-react";

interface EmployeeAddedSuccessModalProps {
    isOpen: boolean;
    onNavigate: () => void;
    onClose: () => void;
}

const EmployeeAddedSuccessModal: React.FC<EmployeeAddedSuccessModalProps> = ({
    isOpen,
    onNavigate,
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
                        Employee added successfully.
                    </p>

                    {/* Action Button */}
                    <button
                        onClick={onNavigate}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-xl transition-colors shadow-sm active:scale-95"
                    >
                        Go to Employee List
                    </button>

                    {/* Secondary Action (Optional) */}
                    <button
                        onClick={onClose}
                        className="mt-3 text-sm text-gray-400 hover:text-gray-600 font-medium"
                    >
                        Stay on this page
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmployeeAddedSuccessModal;
