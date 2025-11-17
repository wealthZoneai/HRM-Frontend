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
  const startDay = getFirstDayOfMonth(year, month); // 0 = Sunday

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
      <div className="grid grid-cols-7 mb-1 md:mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="hidden sm:block text-xs sm:text-sm font-medium text-gray-500 text-center mb-2">
            {d}
          </div>
        ))}
        {/* Mobile: Show abbreviated day names */}
        {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
          <div key={d} className="sm:hidden text-xs font-medium text-gray-500 text-center mb-2">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-px bg-gray-200 border border-gray-200 rounded-lg overflow-hidden">
        {grid.map((day, i) => {
          const dateKey = day ? formatDate(year, month, day) : null;
          const dayEvents = events.filter((e) => e.date === dateKey);

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