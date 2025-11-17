import { FiDownload } from "react-icons/fi";

export default function PaymentHistoryItem({ item }: any) {
  return (
    // Added 'group' for hover effects and subtle transition
    <div className="group p-4 bg-gray-50 rounded-xl flex justify-between items-center hover:bg-blue-50 cursor-pointer transition-all duration-300 ease-in-out">
      <div>
        <p className="font-semibold text-gray-800">{item.date}</p>
        <p className="text-sm text-gray-600">
          ₹{item.net.toLocaleString()}.00 Net pay
        </p>
      </div>
      {/* Icon now changes color on 'group-hover' */}
      <FiDownload className="text-gray-400 group-hover:text-blue-600 transition-colors" />
    </div>
  );
}