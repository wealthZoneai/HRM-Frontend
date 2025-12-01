
import { useState } from "react";
import PaymentHistoryYearTabs from "./PaymentHistoryYearTabs";
import PaymentHistoryItem from "./PaymentHistoryItem";
import { History } from "lucide-react";

export default function PaymentHistory({ history, isVisible }: any) {
  const years = Object.keys(history);
  const [activeYear, setActiveYear] = useState(years[0]);

  return (
    <div className="w-full bg-white shadow-sm border border-gray-200 rounded-2xl p-6 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <History size={20} className="text-gray-400" />
        <h3 className="text-lg font-bold text-gray-900">
          Payment History
        </h3>
      </div>

      <PaymentHistoryYearTabs
        years={years}
        active={activeYear}
        onChange={setActiveYear}
      />

      <div className="mt-6 space-y-3 flex-1 overflow-auto">
        {history[activeYear].length ? (
          history[activeYear].map((item: any, i: number) => (
            <PaymentHistoryItem key={i} item={item} isVisible={isVisible} />
          ))
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <p className="text-gray-400 text-sm">No records found for {activeYear}</p>
          </div>
        )}
      </div>
    </div>
  );
}