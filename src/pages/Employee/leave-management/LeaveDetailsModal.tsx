import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface LeaveData {
    type: string;
    date: string;
    duration: string;
    submitted: string;
    status: string;
    reason?: string; // Optional since it might not be in the current data model yet
}

interface Props {
    isOpen: boolean;
    data: LeaveData | null;
    onClose: () => void;
}

const LeaveDetailsModal: React.FC<Props> = ({ isOpen, data, onClose }) => {
    if (!isOpen || !data) return null;

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-center items-center p-4">
            <div className="w-full max-w-lg bg-white rounded-xl shadow-xl overflow-hidden relative animate-in fade-in zoom-in duration-200">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
                    <h2 className="text-lg font-bold text-gray-800">Leave Details</h2>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                        <XMarkIcon className="h-5 w-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Type</p>
                            <p className="font-semibold text-gray-900 mt-1">{data.type}</p>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Status</p>
                            <span
                                className={`inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-full ${data.status === "Approved"
                                        ? "bg-green-100 text-green-700"
                                        : data.status === "Rejected"
                                            ? "bg-red-100 text-red-700"
                                            : "bg-amber-100 text-amber-700"
                                    }`}
                            >
                                {data.status}
                            </span>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Duration</p>
                            <p className="font-medium text-gray-800 mt-1">{data.duration}</p>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Date Range</p>
                            <p className="font-medium text-gray-800 mt-1">{data.date}</p>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Submitted On</p>
                            <p className="font-medium text-gray-800 mt-1">{data.submitted}</p>
                        </div>
                    </div>

                    {/* Reason Section (Mocked if missing) */}
                    <div className="pt-2">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Reason / Description</p>
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-sm text-gray-600">
                            {data.reason || "No description provided for this leave request."}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium text-sm rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LeaveDetailsModal;
