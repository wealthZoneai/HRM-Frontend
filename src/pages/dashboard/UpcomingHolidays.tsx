import { CalendarDays } from "lucide-react";

export function UpcomingHolidays() {
  const holidays = [
    { name: "New Year Day", date: "1 Jan, Monday" },
    { name: "Pongal", date: "14 Jan, Sunday" },
    { name: "Republic Day", date: "26 Jan, Friday" },
    { name: "Maha Shivaratri", date: "8 Mar, Friday" },
    { name: "Holi", date: "25 Mar, Monday" },
  ];

  return (
    <div className="bg-white p-5 rounded-xl shadow w-full">
      <h3 className="font-semibold text-lg mb-4">Upcoming Holidays</h3>

      <div className="space-y-4 max-h-56 overflow-y-auto custom-scrollbar pr-2">
        {holidays.map((h, i) => (
          <div key={i} className="group">
            <div className="flex justify-between items-center">
              {/* Left – Date */}
              <div className="flex items-center space-x-3">
                <div className="bg-gray-100 rounded-md px-3 py-2 text-center leading-tight group-hover:bg-gray-200 transition-colors">
                  <CalendarDays className="w-4 h-4 text-gray-600 mx-auto" />
                </div>
                <div>
                  <p className="font-medium">{h.name}</p>
                  <p className="text-blue-600 text-xs">{h.date}</p>
                </div>
              </div>
            </div>

            {/* Elegant divider */}
            {i !== holidays.length - 1 && <div className="border-b mt-3" />}
          </div>
        ))}
      </div>
    </div>
  );
}
