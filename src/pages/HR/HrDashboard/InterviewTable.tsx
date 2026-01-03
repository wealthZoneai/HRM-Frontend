import React from "react";
import { Calendar, User, CheckCircle, XCircle, Clock, RefreshCw } from "lucide-react";

export type InterviewItem = {
  id: string;
  candidate: string;
  interviewers: string;
  schedule: string;
  status: "Scheduled" | "Completed" | "Cancelled" | "Rescheduled";
};

interface Props {
  items: InterviewItem[];
  onToggleComplete?: (id: string) => void;
  onReschedule?: (id: string, date: string) => void;
}

const statusStyles = {
  Completed: "bg-green-100 text-green-700",
  Scheduled: "bg-blue-100 text-blue-700",
  Cancelled: "bg-red-100 text-red-700",
  Rescheduled: "bg-amber-100 text-amber-700",
};

const statusIcon = {
  Completed: <CheckCircle size={14} />,
  Scheduled: <Clock size={14} />,
  Cancelled: <XCircle size={14} />,
  Rescheduled: <RefreshCw size={14} />,
};

const InterviewTable: React.FC<Props> = ({ items, onToggleComplete, onReschedule }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-100">
      <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-5 text-gray-800">
        Interview Schedule
      </h3>

      <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
        {items.map((it) => (
          <div
            key={it.id}
            className="
              grid grid-cols-1 md:grid-cols-3 
              items-center gap-3 sm:gap-4
              bg-gray-50 hover:bg-gray-100 transition 
              p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200
            "
          >
            {/* ========== LEFT: Candidate ========== */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold shadow-sm text-sm sm:text-base">
                {it.candidate[0]}
              </div>

              <div className="min-w-0">
                <p className="text-gray-800 font-medium text-sm sm:text-base truncate">{it.candidate}</p>
                <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5 sm:mt-1 truncate">
                  <User size={12} className="text-gray-400" />
                  {it.interviewers}
                </p>
              </div>
            </div>

            {/* ========== MIDDLE: Schedule ========== */}
            <div className="flex justify-start md:justify-center">
              <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-gray-300 shadow-sm text-xs sm:text-sm">
                <Calendar size={14} className="text-gray-500" />
                {it.schedule}
              </div>
            </div>

            {/* ========== RIGHT: Status + Action ========== */}
            <div className="flex items-center justify-between md:justify-end gap-3 flex-wrap sm:flex-nowrap">
              <span
                className={`
                  flex items-center gap-1 text-[10px] sm:text-xs font-medium px-2 sm:px-3 py-1 rounded-full whitespace-nowrap
                  ${statusStyles[it.status]}
                `}
              >
                {statusIcon[it.status]}
                {it.status}
              </span>

              {onToggleComplete && it.status !== "Completed" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => onToggleComplete(it.id)}
                    className="
                      bg-blue-600 hover:bg-blue-700 
                      text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1.5 rounded-lg shadow-md transition whitespace-nowrap
                    "
                  >
                    Complete
                  </button>

                  {onReschedule && (
                    <div className="relative">
                      <input
                        type="date"
                        id={`date-${it.id}`}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        onChange={(e) => {
                          if (e.target.value) onReschedule(it.id, e.target.value)
                        }}
                      />
                      <button
                        className="
                          bg-amber-100 hover:bg-amber-200 
                          text-amber-700 px-2 sm:px-3 py-1.5 rounded-lg shadow-sm transition
                          border border-amber-200
                          flex items-center gap-2
                        "
                        title="Re-Schedule"
                      >
                        <RefreshCw size={14} />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewTable;
