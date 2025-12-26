import CalendarDayCell from "./CalendarDayCell";
import type { CalendarEvent } from "./eventTypes";
import { getDaysInMonth, getFirstDayOfMonth, formatDate } from "./calendarUtils";

interface Props {
  month: number;
  year: number;
  events: CalendarEvent[];
}

export default function CalendarGrid({ month, year, events }: Props) {
  const daysInMonth = getDaysInMonth(year, month);
  const startDay = (getFirstDayOfMonth(year, month) + 6) % 7; // Adjust for Monday start

  const today = new Date();
  const todayKey = formatDate(today.getFullYear(), today.getMonth(), today.getDate());

  const grid: (number | null)[] = [];

  // Add empty cells for the start of the month
  for (let i = 0; i < startDay; i++) grid.push(null);
  // Add day cells
  for (let d = 1; d <= daysInMonth; d++) grid.push(d);

  return (
    <div>
      {/* Day of the Week Headers */}
      <div className="grid grid-cols-7 mb-2">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <div key={d} className="text-xs font-semibold text-gray-400 uppercase tracking-wider text-center py-2">
            <span className="hidden sm:block">{d}</span>
            <span className="sm:hidden">{d.charAt(0)}</span>
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-px bg-gray-200 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        {grid.map((day, i) => {
          const dateKey = day ? formatDate(year, month, day) : null;
          const dayEvents = Array.isArray(events) ? events.filter((e) => e.date === dateKey) : [];

          return (
            <CalendarDayCell
              key={i}
              day={day}
              isToday={dateKey === todayKey}
              events={dayEvents}
            />
          );
        })}
      </div>
    </div>
  );
}