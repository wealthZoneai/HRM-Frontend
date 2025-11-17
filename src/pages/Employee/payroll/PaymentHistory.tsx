import { useState } from "react";
import PaymentHistoryYearTabs from "./PaymentHistoryYearTabs";
import PaymentHistoryItem from "./PaymentHistoryItem";

export default function PaymentHistory({ history }: any) {
  const years = Object.keys(history);
  const [activeYear, setActiveYear] = useState(years[0]);

  return (
    // Wider, more padding, and softer shadow/border
    <div className="w-full lg:max-w-md bg-white shadow-xl rounded-2xl p-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        Payment History
      </h3>

      <PaymentHistoryYearTabs
        years={years}
        active={activeYear}
        onChange={setActiveYear}
      />

      <div className="mt-6 space-y-4">
        {history[activeYear].length ? (
          history[activeYear].map((item: any, i: number) => (
            <PaymentHistoryItem key={i} item={item} />
          ))
        ) : (
          <p className="text-gray-400 text-sm text-center py-4">
            No records for this year.
          </p>
        )}
      </div>
    </div>
  );
}