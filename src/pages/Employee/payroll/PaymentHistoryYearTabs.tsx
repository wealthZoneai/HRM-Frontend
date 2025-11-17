export default function PaymentHistoryYearTabs({ years, active, onChange }: any) {
  return (
    // Modern "underline" tab style
    <div className="flex gap-4 border-b border-gray-200">
      {years.map((year: string) => (
        <button
          key={year}
          onClick={() => onChange(year)}
          className={`px-1 py-2 font-medium text-sm transition-all duration-200
            ${
              active === year
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 border-b-2 border-transparent hover:text-gray-800"
            }
          `}
        >
          {year}
        </button>
      ))}
    </div>
  );
}