import { motion } from "framer-motion";
import { attendanceSummary } from "./attendanceData";
import { FiClock } from "react-icons/fi";
import { BiTimeFive } from "react-icons/bi";
import { FaBellSlash } from "react-icons/fa";
import { IoCalendarNumberOutline } from "react-icons/io5";

export default function MonthSummaryCard() {
  const stats = [
    {
      label: "Total Hours",
      value: attendanceSummary.totalHours,
      icon: <FiClock />,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      label: "Total Overtime",
      value: attendanceSummary.overtime,
      icon: <BiTimeFive />,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      label: "Late Arrivals",
      value: attendanceSummary.lateArrivals,
      icon: <FaBellSlash />,
      color: "text-red-600",
      bg: "bg-red-100",
    },
    {
      label: "Leave Balance",
      value: attendanceSummary.leaveBalance,
      icon: <IoCalendarNumberOutline />,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
  ];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
      className="relative overflow-hidden border border-gray-100 rounded-2xl bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col"
    >
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-300/30 rounded-full blur-3xl opacity-40 translate-x-16 -translate-y-16"></div>

      <h3 className="text-lg font-semibold mb-6 text-gray-900 relative z-10">
        {new Date().toLocaleString('default', { month: 'long' })}'s Summary
      </h3>

      <div className="space-y-5 relative z-10">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center justify-between text-sm bg-white/60 backdrop-blur-md border border-gray-100 rounded-xl px-4 py-3 hover:bg-white/80 hover:shadow-sm transition-all"
          >
            <div className="flex items-center gap-3 text-gray-700">
              <div className={`p-2 rounded-full ${s.bg} ${s.color}`}>
                <span className="text-base">{s.icon}</span>
              </div>
              <span className="font-medium">{s.label}</span>
            </div>
            <span className="font-semibold text-gray-900">{s.value}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
