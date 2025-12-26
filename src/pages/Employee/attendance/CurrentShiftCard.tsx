import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import SubmitTimesheetModal from "./SubmitTimesheetModal";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";

interface CurrentShiftCardProps {
  onViewHistory?: () => void;
}

export default function CurrentShiftCard({ }: CurrentShiftCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [duration, setDuration] = useState("00:00:00");

  const { clockInTime, status, totalHours } = useSelector((state: RootState) => state.attendance);

  // Helper to convert decimal hours (e.g. 8.5) to HH:MM:SS
  const formatTotalHours = (val: number | null) => {
    if (!val) return "00:00:00";
    const h = Math.floor(val);
    const m = Math.floor((val - h) * 60);
    const s = Math.floor(((val - h) * 60 - m) * 60);
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    let timer: any;

    if (status === 'Working' && clockInTime) {
      const parsedClockInTime = new Date(clockInTime);
      if (isNaN(parsedClockInTime.getTime())) {
        console.error("Invalid clockInTime received:", clockInTime);
        setDuration("00:00:00");
      } else {
        const updateTimer = () => {
          const now = new Date();
          const diff = now.getTime() - parsedClockInTime.getTime();

          if (diff > 0) {
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setDuration(
              `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
            );
          }
        };
        updateTimer();
        timer = setInterval(updateTimer, 1000);
      }
    } else if (status === 'Completed' && totalHours !== null) {
      setDuration(formatTotalHours(totalHours));
    } else {
      setDuration("00:00:00");
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [status, clockInTime, totalHours]);

  const submitTime = "05:30:12 PM"; // Placeholder for modal
  const totalDuration = "8h 30m 12s"; // Placeholder for modal
  const date = "Monday, 01 January 2026"; // Placeholder for modal

  const startDisplay = clockInTime
    ? new Date(clockInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : "--:--";

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.01, y: -2 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative overflow-hidden border border-blue-100/50 rounded-3xl bg-linear-to-br from-white via-blue-50/30 to-indigo-50/40 p-8 shadow-lg hover:shadow-2xl transition-all duration-500"
      >
        {/* Animated Background Accents */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl opacity-50 -translate-y-32 translate-x-24 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-linear-to-tr from-purple-300/15 to-pink-300/15 rounded-full blur-2xl opacity-40 translate-y-20 -translate-x-16"></div>

        {/* Content */}
        <div className="relative flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6">
          {/* Left Side - Shift Info */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100/60 rounded-full mb-4">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
              <p className="text-blue-700 font-semibold text-sm flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {status === 'Not Started' ? 'Not Started' : status === 'Working' ? 'Currently Working' : 'Shift Completed'}
              </p>
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
              Shift started at{" "}
              <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {startDisplay}
              </span>
            </h2>

            <p className="text-gray-500 text-sm mt-3 font-medium">
              Scheduled Shift: <span className="font-bold text-gray-700">9 Hrs</span>
            </p>
          </div>

          {/* Right Side - Live Clock */}
          <div className="flex flex-col items-center md:items-end">
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="absolute inset-0 bg-linear-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl blur-xl"></div>
              <div className="relative bg-white/80 backdrop-blur-sm px-8 py-4 rounded-2xl border border-blue-200/50 shadow-xl">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Work Duration</p>
                <h2 className="text-xl md:text-3xl font-bold bg-linear-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent tabular-nums">
                  {duration}
                </h2>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      <SubmitTimesheetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        submitTime={submitTime}
        duration={totalDuration}
        date={date}
      />
    </>
  );
}
