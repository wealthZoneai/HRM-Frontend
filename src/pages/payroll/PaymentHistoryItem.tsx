import { FiDownload } from "react-icons/fi";

export default function PaymentHistoryItem({ item }: any) {
  return (
    <div className="p-3 bg-gray-50 rounded-lg flex justify-between items-center hover:bg-gray-100 cursor-pointer">
      <div>
        <p className="font-medium">{item.date}</p>
        <p className="text-sm text-gray-600">₹{item.net}.00 Net pay</p>
      </div>
      <FiDownload className="text-blue-600" />
    </div>
  );
}
