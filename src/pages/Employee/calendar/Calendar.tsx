import HolidayWidget from "../../HR/HrDashboard/HolidayWidget";

export default function Calendar() {
  return (
    <div className="max-w-6xl mx-auto p-1 sm:p-2 space-y-2">
      <div className="flex flex-col gap-0.5">
        <h2 className="text-md font-bold text-gray-900 tracking-tight">
          Calendar
        </h2>
        <p className="text-[10px] text-gray-500">
          Your schedule and events
        </p>
      </div>
      <HolidayWidget />
    </div>
  );
}