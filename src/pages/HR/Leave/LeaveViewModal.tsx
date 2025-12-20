import React from "react";
import { XMarkIcon, CalendarIcon, ClockIcon, DocumentTextIcon, UserIcon } from "@heroicons/react/24/outline";

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
  onClose,
  onApprove,
  onDecline,
}) => {
  if (!isOpen || !data) return null;

  const isPending = data.status === "Pending";

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden relative">
        {/* Header */}
        <div className="bg-blue-600 px-6 py-4 flex justify-between items-center text-white">
          <h2 className="text-xl font-bold tracking-tight">Leave Application Details</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-blue-500 rounded-full transition-colors"
            aria-label="Close"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Employee Info */}
          <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <UserIcon className="h-7 w-7" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Employee Name</p>
              <h3 className="text-lg font-bold text-gray-800">{data.name}</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Leave Type */}
            <div className="flex items-start gap-3 p-3 rounded-lg border border-gray-100">
              <div className="mt-1 text-blue-500">
                <DocumentTextIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Leave Type</p>
                <p className="font-semibold text-gray-800">{data.type}</p>
              </div>
            </div>

            {/* Total Days */}
            <div className="flex items-start gap-3 p-3 rounded-lg border border-gray-100">
              <div className="mt-1 text-blue-500">
                <ClockIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Duration</p>
                <p className="font-semibold text-gray-800">{data.days} Day{data.days > 1 ? 's' : ''}</p>
              </div>
            </div>

            {/* From Date */}
            <div className="flex items-start gap-3 p-3 rounded-lg border border-gray-100">
              <div className="mt-1 text-blue-500">
                <CalendarIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">From Date</p>
                <p className="font-semibold text-gray-800">{data.from}</p>
              </div>
            </div>

            {/* To Date */}
            <div className="flex items-start gap-3 p-3 rounded-lg border border-gray-100">
              <div className="mt-1 text-blue-500">
                <CalendarIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">To Date</p>
                <p className="font-semibold text-gray-800">{data.to}</p>
              </div>
            </div>
          </div>

          {/* Leave Reason */}
          <div className="space-y-2">
            <p className="text-sm text-gray-500 font-bold uppercase tracking-wider flex items-center gap-2">
              <DocumentTextIcon className="h-4 w-4" />
              Reason for Leave
            </p>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 min-h-[100px]">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {data.reason || "No reason provided."}
              </p>
            </div>
          </div>

          {/* Status Badge */}
          {!isPending && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-500">Status:</span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide 
                ${data.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {data.status}
              </span>
            </div>
          )}

          {/* Action Buttons */}
          {isPending && (
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={onDecline}
                className="px-6 py-2.5 bg-white text-red-600 border border-red-200 font-bold rounded-xl hover:bg-red-50 transition-all duration-200"
              >
                Decline Request
              </button>
              <button
                onClick={onApprove}
                className="px-6 py-2.5 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 shadow-md shadow-green-200 hover:shadow-lg transition-all duration-200"
              >
                Approve Request
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaveViewModal;