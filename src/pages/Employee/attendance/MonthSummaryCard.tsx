import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiClock } from "react-icons/fi";
import { BiTimeFive } from "react-icons/bi";
import { FaBellSlash } from "react-icons/fa";
import { IoCalendarNumberOutline } from "react-icons/io5";

import {
  gettotalAttendance,
  secondsToHHMM,
  timeStringToSeconds,
} from "../../../Services/apiHelpers";

/* ---------------- TYPES ---------------- */
interface AttendanceItem {
  duration_seconds: number | null;
  overtime: string;
  late_arrivals: number;
}

/* ---------------- COMPONENT ---------------- */
export default function MonthSummaryCard() {
  const [summary, setSummary] = useState({
    totalHours: "00:00",
    overtime: "00:00",
    lateArrivals: 0,
    leaveBalance: "--",
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await gettotalAttendance();
        const data: AttendanceItem[] = Array.isArray(res.data)
          ? res.data
          : [];

        /* ---- CALCULATIONS ---- */
        const totalSeconds = data.reduce(
          (sum, item) => sum + (item.duration_seconds || 0),
          0
        );

        const overtimeSeconds = data.reduce(
          (sum, item) => sum + timeStringToSeconds(item.overtime),
          0
        );

        const lateArrivals = data.reduce(
          (sum, item) => sum + (item.late_arrivals || 0),
          0
        );

        setSummary({
          totalHours: secondsToHHMM(totalSeconds),
          overtime: secondsToHHMM(overtimeSeconds),
          lateArrivals,
          leaveBalance: "--", // depends on backend
        });
      } catch (error) {
        console.error("Attendance summary fetch failed:", error);
      }
    };

    fetchSummary();
  }, []);

  const stats = [
    {
      label: "Total Hours",
      value: summary.totalHours,
      icon: <FiClock />,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      label: "Total Overtime",
      value: summary.overtime,
      icon: <BiTimeFive />,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      label: "Late Arrivals",
      value: summary.lateArrivals,
      icon: <FaBellSlash />,
      color: "text-red-600",
      bg: "bg-red-100",
    },
    {
      label: "Leave Balance",
      value: summary.leaveBalance,
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
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-300/30 rounded-full blur-3xl opacity-40 translate-x-16 -translate-y-16" />

      <h3 className="text-lg font-semibold mb-6 text-gray-900 relative z-10">
        {new Date().toLocaleString("default", { month: "long" })}'s Summary
      </h3>

      <div className="space-y-5 relative z-10">
        {stats.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between text-sm bg-white/60 backdrop-blur-md border border-gray-100 rounded-xl px-4 py-3 hover:bg-white/80 hover:shadow-sm transition-all"
          >
            <div className="flex items-center gap-3 text-gray-700">
              <div className={`p-2 rounded-full ${item.bg} ${item.color}`}>
                <span className="text-base">{item.icon}</span>
              </div>
              <span className="font-medium">{item.label}</span>
            </div>
            <span className="font-semibold text-gray-900">
              {item.value}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
