import { Download, CheckCircle2 } from "lucide-react";

export default function PaymentHistoryItem({ item, isVisible }: any) {
  return (
    <div className="group p-4 bg-gray-50 border border-gray-100 rounded-xl flex justify-between items-center hover:bg-blue-50 hover:border-blue-100 cursor-pointer transition-all duration-200">
      <div className="flex items-start gap-3">
        <div className="mt-1">
          <CheckCircle2 size={16} className="text-green-500" />
        </div>
        <div>
          <p className="font-semibold text-gray-900 text-sm">{item.date}</p>
          <p className="text-xs text-gray-500 mt-0.5">
            Pay Slip: <span className="font-medium text-gray-700">{isVisible ? `₹${item.net.toLocaleString()}` : "••••"}</span>
          </p>
        </div>
      </div>

      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
        <Download size={18} />
      </button>
    </div>
  );
}