import React from "react";
import { FiX, FiClock } from "react-icons/fi";


// --- HELPER: Format Time (ISO to 12h format) ---
const formatTime = (isoString: string | null) => {
  if (!isoString) return "-";
  return new Date(isoString).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
};

// --- HELPER: Format Duration (e.g. "09:30:00" -> "9h 30m") ---
const formatDuration = (durationStr: string | null) => {
  if (!durationStr) return "-";
  // Assuming API returns "HH:MM:SS.ms" or "HH:MM:SS"
  const parts = durationStr.split(":");
  if (parts.length < 2) return durationStr;
  return `${parseInt(parts[0])}h ${parseInt(parts[1])}m`;
};

interface ViewLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  employeeName: string;
  month: string;
  logs: any[]; // Receive the real logs here
}

const ViewLogModal: React.FC<ViewLogModalProps> = ({ isOpen, onClose, employeeName, month, logs }) => {
  if (!isOpen) return null;

  // Sort logs by date (descending or ascending as preferred)
  const sortedLogs = [...logs].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-blue-600 p-4 flex justify-between items-center text-white">
          <div>
            <h3 className="text-lg font-bold">Attendance Log</h3>
            <p className="text-blue-100 text-sm capitalize">{employeeName} • {month}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <FiX size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-0 max-h-[60vh] overflow-y-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 uppercase font-medium border-b border-gray-100 sticky top-0">
              <tr>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Login</th>
                <th className="px-6 py-3">Logout</th>
                <th className="px-6 py-3">Duration</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sortedLogs.length > 0 ? sortedLogs.map((log, idx) => (
                <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                  <td className="px-6 py-3 font-medium text-gray-700">{log.date}</td>
                  <td className={`px-6 py-3 ${log.clock_in ? 'text-gray-700' : 'text-gray-400'}`}>
                    {formatTime(log.clock_in)}
                  </td>
                  <td className={`px-6 py-3 ${log.clock_out ? 'text-gray-700' : 'text-gray-400'}`}>
                    {formatTime(log.clock_out)}
                  </td>
                  <td className="px-6 py-3 text-gray-600 flex items-center gap-1">
                    <FiClock size={14} className="text-blue-500" /> 
                    {formatDuration(log.duration_time)}
                  </td>
                  <td className="px-6 py-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold capitalize 
                      ${log.status === 'working' || log.status === 'present' ? "bg-green-100 text-green-700" 
                      : log.status === 'absent' ? "bg-red-100 text-red-700" 
                      : "bg-yellow-100 text-yellow-700"}`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                   <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No logs found for this month.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewLogModal;