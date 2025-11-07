import { useState } from "react";
import CheckoutSuccessModal from "./CheckoutSuccessModal";

interface CurrentShiftCardProps {
  onViewHistory: () => void;
}

export default function CurrentShiftCard({ onViewHistory }: CurrentShiftCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // mock data for now (replace later with real calculated times)
  const checkoutTime = "05:30:12 PM";
  const totalDuration = "8h 30m 12s";
  const date = "Monday, 01 January 2026";

  return (
    <>
      <div className="border rounded-xl bg-white p-5 shadow-sm flex justify-between items-center">
        <div>
          <p className="text-green-600 font-semibold">You are currently</p>
          <h2 className="text-2xl font-bold">11:25:48 AM</h2>
          <p className="text-gray-600 text-sm">Your Shift Started at 9:00 AM.</p>
        </div>

        <div className="text-right">
          <button
            className="bg-red-300 hover:bg-red-400 transition text-white px-4 py-2 rounded-md"
            onClick={() => setIsModalOpen(true)}
          >
            Check Out
          </button>
          <p className="mt-2 text-gray-600 text-sm">
            Total Duration: <span className="font-medium">2h 25m 48s</span>
          </p>
          <button
            onClick={onViewHistory}
            className="text-blue-600 hover:text-blue-800 text-sm mt-1"
          >
            View History
          </button>
        </div>
      </div>

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
