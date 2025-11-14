import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface SubmitTimesheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  submitTime: string;
  duration: string;
  date: string;
}

export default function SubmitTimesheetModal({
  isOpen,
  onClose,
  submitTime,
  duration,
  date,
}: SubmitTimesheetModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-sm w-full"
          >
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Timesheet Submitted!</h2>
            <p className="text-gray-600 mb-6">Your work hours have been successfully recorded.</p>

            <div className="text-sm text-gray-500 space-y-1 mb-6">
              <p><strong>Date:</strong> {date}</p>
              <p><strong>Submitted at:</strong> {submitTime}</p>
              <p><strong>Total Duration:</strong> {duration}</p>
            </div>

            <button
              onClick={onClose}
              className="bg-indigo-500 hover:bg-indigo-600 transition text-white px-5 py-2.5 rounded-lg font-medium shadow-md"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
