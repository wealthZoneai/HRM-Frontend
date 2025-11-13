import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, LogOut } from "lucide-react";
import CheckoutSuccessModal from "./CheckoutSuccessModal";

interface CurrentShiftCardProps {
  onViewHistory: () => void;
}

export default function CurrentShiftCard({ onViewHistory }: CurrentShiftCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>("");

  // Live clock
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("en-US"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const checkoutTime = "05:30:12 PM";
  const totalDuration = "8h 30m 12s";
  const date = "Monday, 01 January 2026";

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="relative overflow-hidden border border-gray-100 rounded-2xl bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300"
      >
        {/* Decorative gradient blob */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-300/30 rounded-full blur-3xl opacity-40 -translate-y-20 translate-x-20"></div>

        {/* Main Content */}
        <div className="relative flex flex-col md:flex-row justify-between items-center md:items-center text-center md:text-left">
          {/* Left Side */}
          <div className="mb-6 md:mb-0">
            <p className="text-blue-600 font-semibold mb-1 flex justify-center md:justify-start items-center gap-2">
              <Clock className="w-4 h-4" /> You are currently
            </p>
            <h2 className="text-4xl font-bold text-gray-900">{currentTime || "11:25:48 AM"}</h2>
            <p className="text-gray-500 text-sm mt-1">
              Shift started at <span className="font-medium text-gray-700">9:00 AM</span>
            </p>
          </div>

          {/* Right Side */}
          <div className="flex flex-col items-center md:items-end space-y-2">
            <button
              className="flex items-center justify-center gap-2 bg-linear-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 transition text-white px-5 py-2.5 rounded-lg shadow-md w-full sm:w-auto"
              onClick={() => setIsModalOpen(true)}
            >
              <LogOut size={18} /> Check Out
            </button>

            <p className="text-gray-600 text-sm">
              Total Duration: <span className="font-semibold text-gray-800">2h 25m 48s</span>
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

      <CheckoutSuccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        checkoutTime={checkoutTime}
        duration={totalDuration}
        date={date}
      />
    </>
  );
}
