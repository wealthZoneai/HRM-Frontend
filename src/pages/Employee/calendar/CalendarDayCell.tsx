import type { CalendarEvent } from "./eventTypes";

interface Props {
  day: number | null;
  events: CalendarEvent[];
  isToday: boolean;
}

export default function CalendarDayCell({ day, events, isToday }: Props) {
  // Empty cell for days outside the current month
  if (!day) {
    return <div className="bg-gray-50/50 h-10 sm:h-12 md:h-14"></div>;
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
    <div className={`h-10 sm:h-12 md:h-14 p-0.5 sm:p-1 flex flex-col transition-colors hover:bg-gray-50 
      ${isToday ? 'bg-blue-50/30' : 'bg-white'}
    `}>
      {/* Day Number */}
      <div className="flex justify-between items-start">
        <span
          className={`
            text-[9px] sm:text-[10px] font-medium w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full
            ${isToday ? "bg-blue-600 text-white shadow-sm" : "text-gray-700"}
          `}
        >
          {day}
        </span>
      </div>

      {/* Events List */}
      <div className="mt-0.5 flex flex-col gap-0.5 overflow-hidden flex-1">
        {events.slice(0, 1).map((event) => (
          <div
            key={event.id}
            className={`
              hidden sm:block px-1 py-0 text-[8px] font-medium rounded border truncate
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
        {events.length > 1 && (
          <span className="hidden sm:block text-[8px] text-gray-400 font-medium pl-1">
            +{events.length - 1} more
          </span>
        )}
      </div>
    </div>
  );
}