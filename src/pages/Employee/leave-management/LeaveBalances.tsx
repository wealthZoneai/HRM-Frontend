import { Calendar, Activity } from "lucide-react";

export default function LeaveBalances() {
  const balances = [
    {
      label: "Casual Leave",
      days: 12,
      total: 12,
      icon: Calendar,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
    },
    {
      label: "Sick Leave",
      days: 8,
      total: 12,
      icon: Activity,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
      {balances.map((b) => (
        <div
          key={b.label}
          className={`relative overflow-hidden p-6 bg-white border ${b.border} rounded-2xl shadow-sm hover:shadow-md transition-shadow group`}
        >
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl ${b.bg} ${b.color}`}>
              <b.icon size={24} />
            </div>
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Available</span>
          </div>

          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-gray-900">{b.days}</span>
              <span className="text-sm text-gray-500 font-medium">Days</span>
            </div>
            <p className="text-sm text-gray-500 mt-1 font-medium">{b.label}</p>
          </div>

          {/* Decorative background circle */}
          <div className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full ${b.bg} opacity-50 group-hover:scale-110 transition-transform duration-500`} />
        </div>
      ))}
    </div>
  );
}