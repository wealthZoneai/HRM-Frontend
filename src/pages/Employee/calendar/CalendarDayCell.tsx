import type { CalendarEvent } from "./eventTypes";

interface Props {
  day: number | null;
  events: CalendarEvent[];
  isToday: boolean;
}

export default function CalendarDayCell({ day, events, isToday }: Props) {
  // Empty cell for days outside the current month
  if (!day) {
    return <div className="bg-gray-50/50 h-20 sm:h-28 md:h-36"></div>;
  }

  // Get color styles for the event badge
  const getEventStyles = (type: string) => {
    switch (type) {
      case "meeting": return "bg-blue-50 text-blue-700 border-blue-100";
      case "holiday": return "bg-red-50 text-red-700 border-red-100";
      case "birthday": return "bg-purple-50 text-purple-700 border-purple-100";
      case "training": return "bg-amber-50 text-amber-700 border-amber-100";
      case "interview": return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "leave": return "bg-orange-50 text-orange-700 border-orange-100";
      default: return "bg-gray-50 text-gray-700 border-gray-100";
    }
  };

  return (
    <div className={`bg-white h-20 sm:h-28 md:h-36 p-1 sm:p-2 flex flex-col transition-colors hover:bg-gray-50 ${isToday ? 'bg-blue-50/30' : ''}`}>
      {/* Day Number */}
      <div className="flex justify-between items-start">
        <span
          className={`
            text-xs sm:text-sm font-medium w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full
            ${isToday ? "bg-blue-600 text-white shadow-sm" : "text-gray-700"}
          `}
        >
          {day}
        </span>
      </div>

      {/* Events List */}
      <div className="mt-1 sm:mt-2 flex flex-col gap-1 overflow-hidden flex-1">
        {events.slice(0, 3).map((event) => (
          <div
            key={event.id}
            className={`
              hidden sm:block px-1.5 py-0.5 text-[10px] sm:text-xs font-medium rounded border truncate
              ${getEventStyles(event.type)}
            `}
            title={event.title}
          >
            {event.title}
          </div>
        ))}

        {/* Mobile Dots */}
        <div className="sm:hidden flex flex-wrap gap-1 content-start">
          {events.slice(0, 4).map((event) => (
            <div
              key={event.id}
              className={`w-1.5 h-1.5 rounded-full ${getEventStyles(event.type).split(' ')[0].replace('bg-', 'bg-').replace('-50', '-500')}`}
            />
          ))}
        </div>

        {/* Show "+X more" */}
        {events.length > 3 && (
          <span className="hidden sm:block text-[10px] text-gray-400 font-medium pl-1">
            +{events.length - 3} more
          </span>
        )}
      </div>
    </div>
  );
}