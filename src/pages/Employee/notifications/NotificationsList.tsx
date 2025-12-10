import NotificationCard from "./NotificationCard/NotificationCard";
import type { NotificationItem } from "./NotificationCard/types";

export default function NotificationsList({
  data,
  onNotificationClick
}: {
  data: NotificationItem[];
  onNotificationClick: (item: NotificationItem) => void;
}) {
  if (data.length === 0)
    return (
      <div className="text-center mt-20 text-gray-400">
        <p className="text-xl mb-2">You’re all caught up!</p>
        <p className="text-sm">There are no new notifications right now.</p>
      </div>
    );

  return (
    <div className="flex flex-col gap-3 mt-4">
      {data.map((item) => (
        <NotificationCard
          key={item.id}
          item={item}
          onClick={onNotificationClick}
        />
      ))}
    </div>
  );
}
