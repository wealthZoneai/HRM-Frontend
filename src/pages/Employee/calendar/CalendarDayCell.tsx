import type { CalendarEvent } from "./eventTypes";

interface Props {
  day: number | null;
  events: CalendarEvent[];
  isToday: boolean;
}

export default function CalendarDayCell({ day, events, isToday }: Props) {
  // Empty cell for days outside the current month
  if (!day) {
    return <div className="bg-gray-50 h-32"></div>;
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
    <div className="bg-white h-32 p-2 flex flex-col">
      {/* Day Number */}
      <div className="flex justify-end">
        <span
          className={`
            text-sm font-medium w-7 h-7 flex items-center justify-center
            ${isToday ? "bg-blue-600 text-white rounded-full" : "text-gray-600"}
          `}
        >
          {day}
        </span>
      </div>

      {/* Events List */}
      <div className="mt-1 flex flex-col gap-1 overflow-hidden">
        {/* Show first 2 events with dots */}
        {events.slice(0, 2).map((event) => (
          <div
            key={event.id}
            className="flex items-center gap-1.5 overflow-hidden"
          >
            <span
              className={`w-2 h-2 rounded-full ${getEventDotColor(event.type)}`}
            ></span>
            <span className="text-xs text-gray-700 truncate">
              {event.title}
            </span>
          </div>
        ))}

        {/* Show "+ X more" if there are more than 2 events */}
        {events.length > 2 && (
          <span className="text-xs text-gray-500 mt-1">
            + {events.length - 2} more
          </span>
        )}
      </div>
    </div>
  );
}