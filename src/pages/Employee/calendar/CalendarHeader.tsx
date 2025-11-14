import CustomSelect from "./CustomSelect"; // <-- Import the new component

interface Props {
  month: number;
  year: number;
  onNextMonth: () => void;
  onPrevMonth: () => void;
  onSetToday: () => void;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
}

// SVG Icon for the arrows
const ChevronIcon = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={`w-5 h-5 ${className}`}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

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

  // --- Create options arrays for the custom select ---
  const monthOptions = monthNames.map((m, idx) => ({
    value: idx,
    label: m,
  }));

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i).map(
    (y) => ({ value: y, label: String(y) })
  );
  // ----------------------------------------------------

  return (
    <div className="flex items-center justify-between mb-4">
      {/* --- UPDATED: Replaced <select> with <CustomSelect> --- */}
      <div className="flex items-center gap-3">
        <CustomSelect
          value={month}
          onChange={(value) => onMonthChange(Number(value))}
          options={monthOptions}
        />
        <CustomSelect
          value={year}
          onChange={(value) => onYearChange(Number(value))}
          options={yearOptions}
        />
      </div>
      {/* -------------------------------------------------- */}

      {/* Navigation */}
      <div className="flex items-center gap-2">
        <button
          onClick={onSetToday}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50"
        >
          Today
        </button>

        {/* Prev/Next Buttons */}
        <button
          onClick={onPrevMonth}
          className="p-2 text-gray-500 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-50"
          aria-label="Previous month"
        >
          <ChevronIcon className="transform" />
        </button>
        <button
          onClick={onNextMonth}
          className="p-2 text-gray-500 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-50"
          aria-label="Next month"
        >
          <ChevronIcon className="transform rotate-180" />
        </button>
      </div>
    </div>
  );
}