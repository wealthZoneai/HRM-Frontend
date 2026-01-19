import { Calendar, CalendarDays, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllCalendarEvents } from "../../../store/slice/calendarSlice";

export default function UpcomingHolidays() {
  const navigate = useNavigate();
  const allEvents = useSelector(selectAllCalendarEvents);

  const upcomingHolidays = allEvents
    .filter(e => new Date(e.date) >= new Date()) // Future only
    .filter(e => ["Federal", "Company", "Optional", "Holiday"].includes(e.type))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5)
    .map(e => {
      const d = new Date(e.date);
      return {
        name: e.title,
        date: d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }), // "Jan 1"
        rawDate: d,
        day: d.toLocaleDateString('en-US', { weekday: 'long' }),
        type: e.type === "Federal" ? "National" : e.type,
        month: d.toLocaleDateString('en-US', { month: 'short' }),
        dayNum: d.getDate().toString().padStart(2, '0')
      };
    });

  const handleClick = () => {
    navigate("/employee/calendar");
  }

  return (
    <div className="h-[420px] bg-white rounded-2xl shadow-lg p-6 border border-gray-100 flex flex-col font-sans text-gray-800">

      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-lg font-semibold text-gray-800">Upcoming Holidays</h1>
        </div>
        <button onClick={handleClick} className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-blue-600 transition-colors">
          <CalendarDays size={20} />
        </button>
      </div>

      {/* List Section */}
      <div className="flex-1 overflow-y-auto min-h-0 scrollbar-hide space-y-3">
        {upcomingHolidays.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 text-sm">
            <p>No upcoming holidays</p>
          </div>
        ) : (
          upcomingHolidays.map((h, i) => (
            <div
              key={i}
              className="group flex items-center gap-3 p-3 rounded-md hover:bg-gray-50 cursor-default transition-all duration-300"
            >
              {/* Date Box (Matches Announcements) */}
              <div className="flex flex-col items-center justify-center w-12 min-w-12">
                <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                  {h.month}
                </span>
                <span className="text-xl font-bold text-gray-800">{h.dayNum}</span>
              </div>

              <div className="h-8 w-px bg-gray-200 hidden md:block mx-1"></div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-gray-800 truncate pr-2">
                    {h.name}
                  </h3>
                  {/* Badge */}
                  <span className="text-[10px] px-2 py-0.5 rounded font-semibold uppercase tracking-wide bg-blue-50 text-blue-600 border border-blue-100 shrink-0">
                    {h.type}
                  </span>
                </div>

                <p className="text-xs text-gray-400 mt-0.5 truncate">
                  {h.day}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}