interface CheckoutSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  checkoutTime: string;
  duration: string;
  date: string;
}

export default function CheckoutSuccessModal({
  isOpen,
  onClose,
  checkoutTime,
  duration,
  date,
}: CheckoutSuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg text-center">

        <div className="bg-green-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-green-600 text-3xl">✔</span>
        </div>

        <h2 className="font-semibold text-lg mb-1">You have successfully checked Out!</h2>
        <p className="text-gray-500 mb-5">Have a great rest of your day, {localStorage.getItem("userName")?.split('.')[0] || "Employee"}.</p>

        <div className="border rounded-xl overflow-hidden text-sm text-left mb-5">
          <div className="flex justify-between px-4 py-3 border-b">
            <span>↪ Check out time</span>
            <span className="font-semibold">{checkoutTime}</span>
          </div>
          <div className="flex justify-between px-4 py-3 border-b">
            <span>⏱ Total Duration</span>
            <span className="font-semibold">{duration}</span>
          </div>
          <div className="flex justify-between px-4 py-3">
            <span>📅 Date</span>
            <span className="font-semibold">{date}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            className="flex-1 bg-gray-200 py-2 rounded-md text-gray-700"
            onClick={() => console.log("Navigate to Attendance history")}
          >
            View attendance history
          </button>

          <button
            className="flex-1 bg-blue-600 py-2 rounded-md text-white"
            onClick={onClose}
          >
            Back to dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
