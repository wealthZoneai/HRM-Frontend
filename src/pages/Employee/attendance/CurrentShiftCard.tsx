import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, FileCheck } from "lucide-react";
import SubmitTimesheetModal from "./SubmitTimesheetModal";

interface CurrentShiftCardProps {
  onViewHistory: () => void;
}

export default function CurrentShiftCard({ onViewHistory }: CurrentShiftCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>("");

  // Live clock updater
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("en-US"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const submitTime = "05:30:12 PM";
  const totalDuration = "8h 30m 12s";
  const date = "Monday, 01 January 2026";

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="relative overflow-hidden border border-gray-100 rounded-2xl bg-white p-6 shadow-md hover:shadow-xl transition-all duration-300"
      >
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-300/30 rounded-full blur-3xl opacity-40 -translate-y-24 translate-x-16"></div>

        {/* Content */}
        <div className="relative flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          {/* Left Side - Current Time */}
          <div className="mb-6 md:mb-0">
            <p className="text-blue-600 font-semibold mb-1 flex justify-center md:justify-start items-center gap-2">
              <Clock className="w-4 h-4" /> You are currently working
            </p>
            <h2 className="text-4xl font-bold text-gray-900">{currentTime}</h2>
            <p className="text-gray-500 text-sm mt-1">
              Shift started at <span className="font-medium text-gray-700">9:00 AM</span>
            </p>
          </div>

          {/* Right Side - Actions */}
          <div className="flex flex-col items-center md:items-end space-y-2">
            <button
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 transition text-white px-5 py-2.5 rounded-lg shadow-md w-full sm:w-auto"
              onClick={() => setIsModalOpen(true)}
            >
              <FileCheck size={18} /> Submit Timesheet
            </button>

            <p className="text-gray-600 text-sm">
              Total Duration: <span className="font-semibold text-gray-800">{totalDuration}</span>
            </p>

            <button
              onClick={onViewHistory}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium underline underline-offset-2"
            >
              View History
            </button>
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
