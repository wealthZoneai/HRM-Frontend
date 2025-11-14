import type { NotificationItem } from "./types";
import NotificationActions from "./NotificationActions";
import { FiInfo } from "react-icons/fi";

export default function NotificationCard({ item }: { item: NotificationItem }) {
  return (
    <div className="bg-white shadow-sm border rounded-xl p-4 flex justify-between items-start">
      <div className="flex gap-3">
        <FiInfo className="text-blue-500 mt-1" size={18} />
        <div>
          <p className="font-semibold">{item.title}</p>
          <p className="text-gray-500 text-sm">{item.message}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {item.actionText && (
          <NotificationActions text={item.actionText} href={item.actionHref!} />
        )}
        <span className="text-gray-400 text-xs">{item.time}</span>
        <button className="text-gray-400 hover:text-gray-600 text-sm">X</button>
      </div>
    </div>
  );
}
