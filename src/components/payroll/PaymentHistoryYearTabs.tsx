export default function PaymentHistoryYearTabs({ years, active, onChange }: any) {
  return (
    <div className="flex gap-2">
      {years.map((year: string) => (
        <button
          key={year}
          onClick={() => onChange(year)}
          className={`px-3 py-1 rounded-md text-sm ${
            active === year ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"
          }`}
        >
          {year}
        </button>
      ))}
    </div>
  );
}
