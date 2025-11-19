
import { Calendar, CalendarDays, } from "lucide-react";

const HOLIDAYS = [
  { name: "New Year Day", date: "1 Jan", day: "Monday", type: "Public" },
  { name: "Pongal", date: "14 Jan", day: "Sunday", type: "Regional" },
  { name: "Republic Day", date: "26 Jan", day: "Friday", type: "National" },
  { name: "Maha Shivaratri", date: "8 Mar", day: "Friday", type: "Optional" },
  { name: "Holi", date: "25 Mar", day: "Monday", type: "Public" },
];

export default function UpcomingHolidays() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center  font-sans text-stone-800" >

      {/* Main Card */}
      <div className="w-full max-w-2xl h-full bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-100 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 pt-8 pb-6 flex justify-between items-start">
          <div>
            {/* <h2 className="text-xs font-bold tracking-widest uppercase text-blue-900/60 mb-1">Calendar</h2> */}
            <h1 className="text-2xl font-bold text-stone-900 tracking-tight">Upcoming Holidays</h1>
          </div>
          <button className="p-2 rounded-full hover:bg-stone-50 text-stone-400 hover:text-blue-900 transition-colors">
            <CalendarDays size={20} />
          </button>
        </div>

        {/* List Section */}
        <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
          <ul className="divide-y divide-stone-50">
            {HOLIDAYS.map((h, i) => (
              <li 
                key={i} 
                className="group flex items-center justify-between p-6 hover:bg-stone-50 cursor-default transition-colors duration-200"
              >
                <div className="flex items-center gap-4">
                  {/* Icon Box */}
                  <div className="w-12 h-12 rounded-2xl bg-stone-50 flex items-center justify-center text-stone-400 group-hover:bg-white group-hover:text-blue-900 group-hover:shadow-sm transition-all duration-300 border border-transparent group-hover:border-stone-100">
                    <Calendar size={20} strokeWidth={2} />
                  </div>

                  {/* Text Content */}
                  <div>
                    <h3 className="font-bold text-stone-900 text-base group-hover:text-blue-900 transition-colors">
                      {h.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs font-semibold text-stone-500 uppercase tracking-wide">{h.day}</span>
                      <span className="w-1 h-1 rounded-full bg-stone-300"></span>
                      <span className="text-xs font-medium text-blue-900/70">{h.type}</span>
                    </div>
                  </div>
                </div>

                {/* Date Pill */}
                <div className="flex flex-col items-end">
                  <span className="text-lg font-bold text-stone-800 tabular-nums tracking-tight">
                    {h.date.split(' ')[0]}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                    {h.date.split(' ')[1]}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer Action */}
        {/* <div className="px-6 py-4 border-t border-stone-100 bg-stone-50/50 flex justify-center">
          <button className="text-sm font-semibold text-stone-500 hover:text-blue-900 flex items-center gap-2 transition-colors group">
            View Full 2025 Schedule
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div> */}

      </div>
    </div>
  );
}