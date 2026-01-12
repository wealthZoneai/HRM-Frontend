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
  pending: {
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
    style: "bg-gray-50 text-gray-700 border-gray-200",
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

  return (
    <div className="h-[420px] bg-white rounded-2xl shadow-lg p-6 border border-gray-100 flex flex-col font-sans text-gray-800">

      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-lg font-semibold text-gray-800">Leave Requests</h1>
        <button className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-blue-600 transition-colors">
          <ArrowRight size={20} />
        </button>
      </div>

      {/* List Section */}
      <div className="flex-1 overflow-y-auto min-h-0 scrollbar-hide space-y-3">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Loader2 className="w-6 h-6 text-blue-600 animate-spin mb-2" />
            <p className="text-gray-400 text-sm">Loading...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <AlertCircle size={24} className="text-rose-400 mb-2" />
            <p className="text-gray-400 text-sm">Failed to load</p>
          </div>
        ) : leaves.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 text-sm px-6">
            <div className="p-3 rounded-full bg-gray-50 mb-3 text-gray-300">
              <CalendarDays size={24} />
            </div>
            <p>No leave requests found</p>
          </div>
        ) : (
          leaves.map((req) => {
            const config = getStatusConfig(req.status);
            const StatusIcon = config.icon;

            return (
              <div
                key={req.id}
                onClick={() => setSelectedLeave(req)}
                className="group flex items-center gap-3 p-3 rounded-md hover:bg-gray-50 cursor-pointer transition-all duration-300 border border-transparent hover:border-gray-100"
              >
                {/* Icon Box */}
                <div className="flex flex-col items-center justify-center w-12 min-w-12 h-12 rounded-lg bg-gray-50 text-gray-400 group-hover:bg-white group-hover:text-blue-600 group-hover:shadow-sm border border-transparent group-hover:border-gray-100 transition-all">
                  <CalendarDays size={20} strokeWidth={1.5} />
                </div>

                <div className="h-8 w-px bg-gray-200 hidden md:block mx-1"></div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-800 truncate pr-2">
                      {req.leave_type}
                    </h3>
                    <div className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase border ${config.style}`}>
                      {req.status}
                    </div>
                  </div>

                  <p className="text-xs text-gray-400 mt-0.5 truncate flex items-center gap-2">
                    <span>{formatDateShort(req.start_date)} - {formatDateShort(req.end_date)}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span>{req.days} {Number(req.days) > 1 ? 'Days' : 'Day'}</span>
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Detail Modal */}
      {createPortal(
        <AnimatePresence>
          {selectedLeave && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedLeave(null)}
              />

              <motion.div
                className="fixed top-1/2 left-1/2 z-101 w-[95%] max-w-2xl bg-white rounded-2xl shadow-2xl transform -translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
              >
                <div className="h-20 bg-gray-100 flex items-center justify-end px-4">
                  <button onClick={() => setSelectedLeave(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                    <X size={20} />
                  </button>
                </div>

                <div className="px-6 pb-6 -mt-8">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4">
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-xl font-bold text-gray-900">{selectedLeave.leave_type}</h2>
                      <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md border text-[10px] font-bold uppercase ${getStatusConfig(selectedLeave.status).style}`}>
                        {selectedLeave.status}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 font-medium">
                      {formatDateLong(selectedLeave.start_date)} - {formatDateLong(selectedLeave.end_date)}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="flex items-center gap-2 mb-1 text-xs font-bold text-gray-400 uppercase tracking-wider">
                        <FileText size={12} /> Reason
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {selectedLeave.reason || "No reason provided."}
                      </p>
                    </div>

                    <div className="flex justify-between items-center text-xs text-gray-400 pt-2 border-t border-gray-100">
                      <span>Applied on {selectedLeave.created_at ? formatDateLong(selectedLeave.created_at) : "---"}</span>
                      <span>{selectedLeave.days} Days</span>
                    </div>
                  </div>
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
