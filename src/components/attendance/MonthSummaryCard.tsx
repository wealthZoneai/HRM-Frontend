import { attendanceSummary } from "./attendanceData";
import { FiClock } from "react-icons/fi";
import { BiTimeFive } from "react-icons/bi";
import { FaBellSlash } from "react-icons/fa";
import { IoCalendarNumberOutline } from "react-icons/io5";

export default function MonthSummaryCard() {
  const stats = [
    { label: "Total Hours", value: attendanceSummary.totalHours, icon: <FiClock /> },
    { label: "Total Overtime", value: attendanceSummary.overtime, icon: <BiTimeFive /> },
    { label: "Late Arrivals", value: attendanceSummary.lateArrivals, icon: <FaBellSlash /> },
    { label: "Leave Balance", value: attendanceSummary.leaveBalance, icon: <IoCalendarNumberOutline /> },
  ];

  return (
    <div className="border rounded-xl bg-white p-5 shadow-sm">
      <h3 className="font-semibold mb-4">This Month’s Summary</h3>
      <div className="space-y-4">
        {stats.map((s, i) => (
          <div key={i} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-3 text-gray-600">
              <span className="text-lg text-blue-600">{s.icon}</span>
              <span>{s.label}</span>
            </div>
            <span className="font-semibold">{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
