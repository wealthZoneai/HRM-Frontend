import { useState } from "react";
import NotificationTabs from "../notifications/NotificationTabs";
import NotificationsList from "../notifications/NotificationsList";
import { notificationsData } from "../notifications/notificationsData";

export default function Notifications() {
  const [active, setActive] = useState("All");

  // Filtering logic can be extended later
  // Filtering logic
  const filtered =
    active === "All"
      ? notificationsData
      : active === "Unread"
        ? notificationsData.filter((n) => n.isUnread)
        : [];

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-base sm:text-lg font-semibold mb-1">System Alerts</h2>
      <NotificationTabs active={active} onChange={setActive} />
      <NotificationsList data={filtered} />
    </div>
  );
}
