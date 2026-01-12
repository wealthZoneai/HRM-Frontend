import { useState, useEffect } from "react";
import { CalendarDays, Clock, CheckCircle2, XCircle, AlertCircle, X, FileText, Info, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store";
import { fetchMyLeaves } from "../../../store/slice/leaveSlice";
import { createPortal } from "react-dom";

const STATUS_CONFIG = {
  Pending: {
    style: "bg-amber-50 text-amber-700 border-amber-200",
    icon: AlertCircle
  },
  pending: { // Handle lowercase variations from backend
    style: "bg-amber-50 text-amber-700 border-amber-200",
    icon: AlertCircle
  },
  Approved: {
    style: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: CheckCircle2
  },
  approved: {
    style: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: CheckCircle2
  },
  Rejected: {
    style: "bg-rose-50 text-rose-700 border-rose-200",
    icon: XCircle
  },
  rejected: {
    style: "bg-rose-50 text-rose-700 border-rose-200",
    icon: XCircle
  },
};

const getStatusConfig = (status: string) => {
  return STATUS_CONFIG[status as keyof typeof STATUS_CONFIG] || {
    style: "bg-stone-50 text-stone-700 border-stone-200",
    icon: Info
  };
};

export default function LeaveRequests() {
  const dispatch = useDispatch<AppDispatch>();
  const { leaves, loading, error } = useSelector((state: RootState) => state.leave);
  const [selectedLeave, setSelectedLeave] = useState<any | null>(null);

  useEffect(() => {
    dispatch(fetchMyLeaves());
  }, [dispatch]);

  const formatDateShort = (dateStr: string) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  const formatDateLong = (dateStr: string) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const getTimeAgo = (dateStr: string) => {
    if (!dateStr) return "";
    const now = new Date();
    const past = new Date(dateStr);
    const diffInMs = now.getTime() - past.getTime();
    const diffInMins = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMins / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0) return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
    if (diffInHours > 0) return `${diffInHours} ${diffInHours === 1 ? 'hr' : 'hrs'} ago`;
    if (diffInMins > 0) return `${diffInMins} ${diffInMins === 1 ? 'min' : 'mins'} ago`;
    return "just now";
  };

  return (
    <div className="max-h-[700px] h-full bg-white flex items-center justify-center font-sans text-stone-800">

      {/* Main Card */}
      <div className="h-full w-full bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-100 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 pt-8 pb-6 flex justify-between items-start">
          <div>
            <h1 className="text-2xl md:text-xl font-bold text-stone-900 tracking-tight">Leave Requests</h1>
          </div>
        </div>

        {/* List Section */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="space-y-1 px-4 pb-4">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-4" />
                <p className="text-stone-500 font-medium">Loading leaves...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                <AlertCircle size={32} className="text-rose-500 mb-4" />
                <h3 className="text-lg font-medium text-stone-900">Failed to load leaves</h3>
                <p className="text-sm text-stone-500 mt-1">{error}</p>
              </div>
            ) : leaves.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                <div className="p-4 rounded-full bg-stone-50 mb-4">
                  <CalendarDays size={32} className="text-stone-300" />
                </div>
                <h3 className="text-lg font-medium text-stone-900">No leave requests</h3>
                <p className="text-sm text-stone-500 mt-1">You haven't applied for any leaves recently.</p>
              </div>
            ) : (
              leaves.map((req) => {
                const config = getStatusConfig(req.status);
                const StatusIcon = config.icon;

                return (
                  <div
                    key={req.id}
                    className="group flex items-center justify-between p-4 rounded-2xl hover:bg-stone-50 border border-transparent hover:border-stone-100 transition-all duration-300 cursor-default"
                  >
                    {/* Left Info */}
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <div className="p-3 rounded-xl bg-stone-50 group-hover:bg-white group-hover:shadow-sm transition-all text-stone-400 group-hover:text-blue-900 shrink-0">
                        <CalendarDays size={20} />
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-lg font-medium text-stone-900 truncate group-hover:text-blue-900 transition-colors">
                          {req.leave_type}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-medium text-stone-500 whitespace-nowrap">
                            {formatDateShort(req.start_date)} - {formatDateShort(req.end_date)}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-stone-300 shrink-0"></span>
                          <div className="flex items-center text-stone-400 text-xs truncate">
                            <Clock className="w-3 h-3 mr-1 shrink-0" />
                            <span>{req.created_at ? getTimeAgo(req.created_at) : "---"}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Status Badge & Info */}
                    <div className="flex items-center gap-3 shrink-0 ml-4">
                      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-bold tracking-wide uppercase ${config.style}`}>
                        <StatusIcon size={12} strokeWidth={3} />
                        {req.status}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedLeave(req);
                        }}
                        className="p-2 text-stone-300 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-300 whitespace-nowrap"
                      >
                        <Info size={20} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
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
                    <h2 className="text-2xl font-bold text-stone-900">{selectedLeave.leave_type}</h2>
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold tracking-wide uppercase mt-2 ${getStatusConfig(selectedLeave.status).style}`}>
                      {getStatusConfig(selectedLeave.status).icon && (
                        (() => {
                          const Icon = getStatusConfig(selectedLeave.status).icon;
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
                <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
                  {/* Leave Duration */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                      <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">Start Date</p>
                      <p className="text-sm font-bold text-blue-900 mt-1">{formatDateLong(selectedLeave.start_date)}</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                      <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">End Date</p>
                      <p className="text-sm font-bold text-blue-900 mt-1">{formatDateLong(selectedLeave.end_date)}</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                      <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">Duration</p>
                      <p className="text-sm font-bold text-blue-900 mt-1">{selectedLeave.days} {Number(selectedLeave.days) > 1 ? 'Days' : 'Day'}</p>
                    </div>
                  </div>

                  {/* Reason */}
                  <div className="p-4 bg-stone-50 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText size={16} className="text-stone-600" />
                      <p className="text-xs font-medium text-stone-600 uppercase tracking-wide">Detailed Reason</p>
                    </div>
                    <p className="text-sm text-stone-700 leading-relaxed">{selectedLeave.reason || "No reason provided."}</p>
                  </div>

                  {/* Application Details */}
                  <div className="p-4 bg-stone-50 rounded-xl space-y-2">
                    <p className="text-xs font-medium text-stone-600 uppercase tracking-wide mb-3">Application Details</p>
                    <div className="flex justify-between">
                      <span className="text-xs text-stone-500">Applied On:</span>
                      <span className="text-xs font-medium text-stone-900">{selectedLeave.created_at ? formatDateLong(selectedLeave.created_at) : "---"}</span>
                    </div>
                    {/* Note: The backend schema for MyLeaves might not return HR details in the same way as HRLeaves. 
                        Usually, an employee sees their own leave status. If HR adds remarks, we could show them here. */}
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
