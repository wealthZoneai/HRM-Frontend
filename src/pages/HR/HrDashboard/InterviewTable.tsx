import React from "react";
import { Calendar, User, CheckCircle, XCircle, Clock } from "lucide-react";

export type InterviewItem = {
  id: string;
  candidate: string;
  interviewers: string;
  schedule: string;
  status: "Scheduled" | "Completed" | "Cancelled";
};

interface Props {
  items: InterviewItem[];
  onToggleComplete?: (id: string) => void;
}

const statusStyles = {
  Completed: "bg-green-100 text-green-700",
  Scheduled: "bg-blue-100 text-blue-700",
  Cancelled: "bg-red-100 text-red-700",
};

const statusIcon = {
  Completed: <CheckCircle size={14} />,
  Scheduled: <Clock size={14} />,
  Cancelled: <XCircle size={14} />,
};

const InterviewTable: React.FC<Props> = ({ items, onToggleComplete }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <h3 className="text-xl font-semibold mb-5 text-gray-800">
        Interview Schedule
      </h3>

      <div className="space-y-4">
        {items.map((it) => (
          <div
            key={it.id}
            className="
              grid grid-cols-1 sm:grid-cols-3 
              items-center gap-4
              bg-gray-50 hover:bg-gray-100 transition 
              p-4 rounded-lg shadow-sm border border-gray-200
            "
          >
            {/* ========== LEFT: Candidate ========== */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold shadow-sm">
                {it.candidate[0]}
              </div>

              <div>
                <p className="text-gray-800 font-medium">{it.candidate}</p>
                <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                  <User size={12} className="text-gray-400" />
                  {it.interviewers}
                </p>
              </div>
            </div>

            {/* ========== MIDDLE: Schedule (ALWAYS CENTER ALIGNED) ========== */}
            <div className="flex sm:justify-center">
              <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-gray-300 shadow-sm text-sm">
                <Calendar size={14} className="text-gray-500" />
                {it.schedule}
              </div>
            </div>

            {/* ========== RIGHT: Status + Action (ALWAYS RIGHT ALIGNED) ========== */}
            <div className="flex items-center justify-between sm:justify-end gap-3">
              <span
                className={`
                  flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full
                  ${statusStyles[it.status]}
                `}
              >
                {statusIcon[it.status]}
                {it.status}
              </span>

              {onToggleComplete && it.status !== "Completed" && (
                <button
                  onClick={() => onToggleComplete(it.id)}
                  className="
                    bg-blue-600 hover:bg-blue-700 
                    text-white text-xs px-3 py-1.5 rounded-lg shadow-md transition
                  "
                >
                  Complete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewTable;
