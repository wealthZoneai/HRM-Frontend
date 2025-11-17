export default function LeaveBalances() {
  const balances = [
    {
      label: "Annual Leave",
      days: 14,
      icon: "https://img.icons8.com/fluency-systems-regular/48/00A3FF/calendar-week.png",
    },
    {
      label: "Sick Leave",
      days: 8,
      icon: "https://img.icons8.com/fluency-systems-regular/48/00A3FF/plus-medical.png",
    },
    {
      label: "Unpaid Leaves",
      days: 2,
      icon: "https://img.icons8.com/fluency-systems-regular/48/00A3FF/data-in-transit.png",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
      {balances.map((b) => (
        <div
          key={b.label}
          className="flex items-center p-3 sm:p-4 md:p-6 bg-white border border-slate-200 rounded-lg sm:rounded-xl shadow-sm"
        >
          <img
            src={b.icon}
            alt={b.label}
            className="w-8 sm:w-10 h-8 sm:h-10 mr-3 sm:mr-5 opacity-80 shrink-0"
          />
          <div className="min-w-0">
            <p className="font-medium text-slate-600 text-xs sm:text-sm">{b.label}</p>
            <p className="text-blue-600 text-xl sm:text-2xl md:text-3xl font-bold mt-1">
              {b.days}
            </p>
            <p className="text-xs sm:text-sm text-slate-500">Days</p>
          </div>
        </div>
      ))}
    </div>
  );
}