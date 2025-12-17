import type { NotificationItem } from "./types";
import { FiInfo } from "react-icons/fi";

interface NotificationCardProps {
  item: NotificationItem;
  onClick: (item: NotificationItem) => void;
}

export default function NotificationCard({ item, onClick }: NotificationCardProps) {
  return (
    <div
      onClick={() => onClick(item)}
      className="bg-white shadow-sm border rounded-lg sm:rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 cursor-pointer hover:shadow-md transition-shadow"
    >
      {/* Main content */}
      <div className="flex gap-2 sm:gap-3 flex-1 min-w-0">
        <FiInfo className="text-blue-500 mt-0.5 sm:mt-1 shrink-0" size={16} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className={`font-semibold text-sm sm:text-base ${item.isUnread ? "text-gray-900" : "text-gray-600"}`}>
              {item.title}
            </p>
            {item.isUnread && (
              <span className="w-2 h-2 bg-blue-600 rounded-full shrink-0 animate-pulse" />
            )}
          </div>
          <p className={`text-xs sm:text-sm wrap-break-words mt-0.5 ${item.isUnread ? "text-gray-800 font-medium" : "text-gray-500"}`}>
            {item.message}
          </p>
        </div>
      </div>

      {/* Actions and time */}
      <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 shrink-0">
        <span className="text-gray-400 text-xs whitespace-nowrap">{item.time}</span>
      </div>
    </div>
  );
}
