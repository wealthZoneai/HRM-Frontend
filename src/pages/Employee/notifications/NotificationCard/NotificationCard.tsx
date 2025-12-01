import type { NotificationItem } from "./types";
import NotificationActions from "./NotificationActions";
import { FiInfo } from "react-icons/fi";

export default function NotificationCard({ item }: { item: NotificationItem }) {
  return (
    <div className="bg-white shadow-sm border rounded-lg sm:rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
      {/* Main content */}
      <div className="flex gap-2 sm:gap-3 flex-1 min-w-0">
        <FiInfo className="text-blue-500 mt-0.5 sm:mt-1 shrink-0" size={16} />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm sm:text-base">{item.title}</p>
          <p className="text-gray-500 text-xs sm:text-sm wrap-break-words">{item.message}</p>
        </div>
      </div>

      {/* Actions and time */}
      <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 shrink-0">
        {item.actionText && (
          <NotificationActions text={item.actionText} href={item.actionHref!} />
        )}
        <span className="text-gray-400 text-xs whitespace-nowrap">{item.time}</span>
        {/* <button className="text-gray-400 hover:text-gray-600 text-sm sm:text-base p-1 min-w-[24px]">X</button> */}
      </div>
    </div>
  );
}
