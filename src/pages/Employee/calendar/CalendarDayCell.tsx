import type { CalendarEvent } from "./eventTypes";

interface Props {
  day: number | null;
  events: CalendarEvent[];
  isToday: boolean;
}

export default function CalendarDayCell({ day, events, isToday }: Props) {
  // Empty cell for days outside the current month
  if (!day) {
    return <div className="bg-gray-50 h-16 sm:h-24 md:h-32"></div>;
  }

  // Get color for the event dot
  const getEventDotColor = (type: string) => {
    switch (type) {
      case "meeting": return "bg-blue-500";
      case "holiday": return "bg-red-500";
      case "birthday": return "bg-purple-500";
      case "training": return "bg-yellow-500";
      case "interview": return "bg-green-500";
      case "leave": return "bg-orange-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="bg-white h-16 sm:h-24 md:h-32 p-1 sm:p-2 flex flex-col">
      {/* Day Number */}
      <div className="flex justify-end">
        <span
          className={`
            text-xs sm:text-sm font-medium w-5 h-5 sm:w-7 sm:h-7 flex items-center justify-center
            ${isToday ? "bg-blue-600 text-white rounded-full" : "text-gray-600"}
          `}
        >
          {day}
        </span>
      </div>

      {/* Events List */}
      <div className="mt-0.5 sm:mt-1 flex flex-col gap-0.5 sm:gap-1 overflow-hidden">
        {/* Show first 1 event on mobile, 2 on tablet/desktop */}
        {events.slice(0, 1).map((event) => (
          <div
            key={event.id}
            className="hidden sm:flex items-center gap-1.5 overflow-hidden"
          >
            <span
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${getEventDotColor(event.type)}`}
            ></span>
            <span className="text-xs text-gray-700 truncate">
              {event.title}
            </span>
          </div>
        ))}
        {events.slice(0, 1).map((event) => (
          <div
            key={event.id}
            className="sm:hidden flex items-center gap-1 overflow-hidden"
          >
            <span
              className={`w-1 h-1 rounded-full ${getEventDotColor(event.type)}`}
            ></span>
          </div>
        ))}
        {events.slice(1, 2).map((event) => (
          <div
            key={event.id}
            className="hidden sm:flex items-center gap-1.5 overflow-hidden"
          >
            <span
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${getEventDotColor(event.type)}`}
            ></span>
            <span className="text-xs text-gray-700 truncate">
              {event.title}
            </span>
          </div>
        ))}

        {/* Show "+X more" if there are more than 2 events (tablet/desktop only) */}
        {events.length > 2 && (
          <span className="hidden sm:block text-xs text-gray-500 mt-1">
            + {events.length - 2} more
          </span>
        )}
      </div>
    </div>
  );
}