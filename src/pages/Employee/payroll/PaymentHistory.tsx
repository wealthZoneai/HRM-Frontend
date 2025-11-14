import { useState } from "react";
import PaymentHistoryYearTabs from "./PaymentHistoryYearTabs";
import PaymentHistoryItem from "./PaymentHistoryItem";

export default function PaymentHistory({ history }: any) {
  const years = Object.keys(history);
  const [activeYear, setActiveYear] = useState(years[0]);

  return (
    <div className="w-full lg:w-80 bg-white shadow-md rounded-xl p-6">
      <h3 className="font-semibold mb-4">Payment History</h3>

      <PaymentHistoryYearTabs
        years={years}
        active={activeYear}
        onChange={setActiveYear}
      />

      <div className="mt-4 space-y-3">
        {history[activeYear].length ? (
          history[activeYear].map((item: any, i: number) => (
            <PaymentHistoryItem key={i} item={item} />
          ))
        ) : (
          <p className="text-gray-400 text-sm">No records for this year.</p>
        )}
      </div>
    </div>
  );
}
