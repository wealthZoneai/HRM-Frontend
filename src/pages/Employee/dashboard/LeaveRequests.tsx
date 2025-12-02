import { useState } from "react";
import { CalendarDays, Clock, CheckCircle2, XCircle, AlertCircle, X, User, FileText, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Enhanced data with detailed information
const data = [
  {
    id: 1,
    type: "Sick Leave",
    time: "2 hrs ago",
    status: "Pending",
    date: "Oct 24 - Oct 25",
    startDate: "October 24, 2025",
    endDate: "October 25, 2025",
    days: 2,
    reason: "Suffering from viral fever and need rest as per doctor's advice.",
    appliedOn: "October 23, 2025",
    appliedBy: "John Doe",
    employeeId: "EMP001"
  },
  {
    id: 2,
    type: "Annual Leave",
    time: "13 days ago",
    status: "Approved",
    date: "Nov 01 - Nov 10",
    startDate: "November 01, 2025",
    endDate: "November 10, 2025",
    days: 10,
    reason: "Planning for family vacation and personal time off.",
    appliedOn: "October 15, 2025",
    appliedBy: "John Doe",
    employeeId: "EMP001",
    approvedBy: "Jane Smith (HR Manager)",
    approvedOn: "October 16, 2025"
  },
  {
    id: 3,
    type: "Remote Work",
    time: "2 days ago",
    status: "Rejected",
    date: "Oct 12",
    startDate: "October 12, 2025",
    endDate: "October 12, 2025",
    days: 1,
    reason: "Need to work from home due to personal commitments.",
    appliedOn: "October 10, 2025",
    appliedBy: "John Doe",
    employeeId: "EMP001",
    rejectedBy: "Jane Smith (HR Manager)",
    rejectedOn: "October 11, 2025",
    rejectionReason: "Team meeting scheduled on this date requiring in-person attendance."
  },
  {
    id: 4,
    type: "Sick Leave",
    time: "1 month ago",
    status: "Approved",
    date: "Sep 15",
    startDate: "September 15, 2025",
    endDate: "September 15, 2025",
    days: 1,
    reason: "Medical checkup and diagnostic tests.",
    appliedOn: "September 14, 2025",
    appliedBy: "John Doe",
    employeeId: "EMP001",
    approvedBy: "Jane Smith (HR Manager)",
    approvedOn: "September 14, 2025"
  },
];

const STATUS_CONFIG = {
  Pending: {
    style: "bg-amber-50 text-amber-700 border-amber-200",
    icon: AlertCircle
  },
  Approved: {
    style: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: CheckCircle2
  },
  Rejected: {
    style: "bg-rose-50 text-rose-700 border-rose-200",
    icon: XCircle
  },
};

import { createPortal } from "react-dom";

// ... (imports remain the same)

// ... (data and STATUS_CONFIG remain the same)

export default function LeaveRequests() {
  const [selectedLeave, setSelectedLeave] = useState<typeof data[0] | null>(null);

  return (
    <div className="max-h-[700px] bg-white flex items-center justify-center font-sans text-stone-800">

      {/* Main Card */}
      <div className="h-full w-full bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-100 overflow-hidden">
        {/* ... (Header and List Section remain the same) ... */}
        {/* Header */}
        <div className="px-6 pt-8 pb-6 flex justify-between items-start">
          <div>
            <h1 className="text-2xl md:text-xl font-bold text-stone-900 tracking-tight">Leave Requests</h1>
          </div>
        </div>

        {/* List Section */}
        <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
          <div className="space-y-1 px-4 pb-4">
            {data.map((req) => {
              const StatusIcon = STATUS_CONFIG[req.status as keyof typeof STATUS_CONFIG].icon;

              return (
                <div
                  key={req.id}
                  className="group flex items-center justify-between p-4 rounded-2xl hover:bg-stone-50 border border-transparent hover:border-stone-100 transition-all duration-300 cursor-default"
                >
                  {/* Left Info */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-stone-50 group-hover:bg-white group-hover:shadow-sm transition-all text-stone-400 group-hover:text-blue-900">
                      <CalendarDays size={20} />
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-stone-900 truncate pr-4 group-hover:text-blue-900 transition-colors">
                        {req.type}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-medium text-stone-500">{req.date}</span>
                        <span className="w-1 h-1 rounded-full bg-stone-300"></span>
                        <div className="flex items-center text-stone-400 text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>{req.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status Badge & Info */}
                  <div className="flex items-center gap-3">
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold tracking-wide uppercase ${STATUS_CONFIG[req.status as keyof typeof STATUS_CONFIG].style}`}>
                      <StatusIcon size={12} strokeWidth={3} />
                      {req.status}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedLeave(req);
                      }}
                      className="p-2 text-stone-300 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-300"
                    >
                      <Info size={20} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {createPortal(
        <AnimatePresence>
          {selectedLeave && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedLeave(null)}
              />

              {/* Modal */}
              <motion.div
                className="fixed top-1/2 left-1/2 z-101 w-[95%] max-w-2xl bg-white rounded-2xl shadow-2xl transform -translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                {/* Modal Header */}
                <div className="flex justify-between items-start p-6 border-b border-stone-100">
                  <div>
                    <h2 className="text-2xl font-bold text-stone-900">{selectedLeave.type}</h2>
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold tracking-wide uppercase mt-2 ${STATUS_CONFIG[selectedLeave.status as keyof typeof STATUS_CONFIG].style}`}>
                      {STATUS_CONFIG[selectedLeave.status as keyof typeof STATUS_CONFIG].icon && (
                        (() => {
                          const Icon = STATUS_CONFIG[selectedLeave.status as keyof typeof STATUS_CONFIG].icon;
                          return <Icon size={12} strokeWidth={3} />;
                        })()
                      )}
                      {selectedLeave.status}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedLeave(null)}
                    className="p-2 hover:bg-stone-100 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
                  {/* Applicant Info */}
                  <div className="flex items-start gap-3 p-4 bg-stone-50 rounded-xl">
                    <div className="p-2 bg-white rounded-lg">
                      <User size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-stone-500 uppercase tracking-wide">Applicant</p>
                      <p className="text-sm font-bold text-stone-900 mt-0.5">{selectedLeave.appliedBy}</p>
                      <p className="text-xs text-stone-500 mt-0.5">ID: {selectedLeave.employeeId}</p>
                    </div>
                  </div>

                  {/* Leave Duration */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                      <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">Start Date</p>
                      <p className="text-sm font-bold text-blue-900 mt-1">{selectedLeave.startDate}</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                      <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">End Date</p>
                      <p className="text-sm font-bold text-blue-900 mt-1">{selectedLeave.endDate}</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                      <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">Duration</p>
                      <p className="text-sm font-bold text-blue-900 mt-1">{selectedLeave.days} {selectedLeave.days > 1 ? 'Days' : 'Day'}</p>
                    </div>
                  </div>

                  {/* Reason */}
                  <div className="p-4 bg-stone-50 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText size={16} className="text-stone-600" />
                      <p className="text-xs font-medium text-stone-600 uppercase tracking-wide">Detailed Description</p>
                    </div>
                    <p className="text-sm text-stone-700 leading-relaxed">{selectedLeave.reason}</p>
                  </div>

                  {/* Application Details */}
                  <div className="p-4 bg-stone-50 rounded-xl space-y-2">
                    <p className="text-xs font-medium text-stone-600 uppercase tracking-wide mb-3">Application Details</p>
                    <div className="flex justify-between">
                      <span className="text-xs text-stone-500">Applied On:</span>
                      <span className="text-xs font-medium text-stone-900">{selectedLeave.appliedOn}</span>
                    </div>
                    {selectedLeave.status === "Approved" && selectedLeave.approvedBy && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-xs text-stone-500">Approved By:</span>
                          <span className="text-xs font-medium text-emerald-700">{selectedLeave.approvedBy}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-stone-500">Approved On:</span>
                          <span className="text-xs font-medium text-stone-900">{selectedLeave.approvedOn}</span>
                        </div>
                      </>
                    )}
                    {selectedLeave.status === "Rejected" && selectedLeave.rejectedBy && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-xs text-stone-500">Rejected By:</span>
                          <span className="text-xs font-medium text-rose-700">{selectedLeave.rejectedBy}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-stone-500">Rejected On:</span>
                          <span className="text-xs font-medium text-stone-900">{selectedLeave.rejectedOn}</span>
                        </div>
                        {selectedLeave.rejectionReason && (
                          <div className="mt-3 p-3 bg-rose-50 border border-rose-100 rounded-lg">
                            <p className="text-xs font-medium text-rose-600 mb-1">Rejection Reason:</p>
                            <p className="text-xs text-rose-700">{selectedLeave.rejectionReason}</p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-6 border-t border-stone-100 flex justify-end">
                  <button
                    onClick={() => setSelectedLeave(null)}
                    className="px-6 py-2 bg-stone-100 text-stone-700 rounded-lg hover:bg-stone-200 transition-colors font-medium"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}