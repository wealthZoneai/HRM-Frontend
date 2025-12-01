import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";

interface Props {
  month: number;
  year: number;
  onNextMonth: () => void;
  onPrevMonth: () => void;
  onSetToday: () => void;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
}

export default function CalendarHeader({
  month,
  year,
  onNextMonth,
  onPrevMonth,
  onSetToday,
  onMonthChange,
  onYearChange,
}: Props) {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

  return (
    <div className="flex flex-col gap-4">
      {/* Title and Month/Year Selectors */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h2 className="text-xl md:text-md font-bold text-gray-900">
          {monthNames[month]} {year}
        </h2>

        {/* Month/Year Dropdowns */}
        <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-lg border border-gray-200">
          <select
            value={month}
            onChange={(e) => onMonthChange(Number(e.target.value))}
            className="bg-transparent text-sm text-gray-600 focus:outline-none cursor-pointer py-1 px-2"
            aria-label="Select Month"
          >
            {monthNames.map((m, idx) => (
              <option key={idx} value={idx}>{m.slice(0, 3)}</option>
            ))}
          </select>
          <div className="w-px h-4 bg-gray-300"></div>
          <select
            value={year}
            onChange={(e) => onYearChange(Number(e.target.value))}
            className="bg-transparent text-sm text-gray-600 focus:outline-none cursor-pointer py-1 px-2"
            aria-label="Select Year"
          >
            {yearOptions.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={onSetToday}
          className="flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-blue-600 transition-colors shadow-sm"
        >
          <CalendarIcon size={16} />
          <span className="hidden sm:inline">Today</span>
          <span className="sm:hidden">Today</span>
        </button>

        <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-sm ml-auto">
          <button
            onClick={onPrevMonth}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-l-lg transition-colors border-r border-gray-200"
            aria-label="Previous month"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={onNextMonth}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-r-lg transition-colors"
            aria-label="Next month"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}