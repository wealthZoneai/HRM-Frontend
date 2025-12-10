import { useState } from "react";
import NotificationTabs from "../notifications/NotificationTabs";
import NotificationsList from "../notifications/NotificationsList";
import { notificationsData } from "../notifications/notificationsData";
import NotificationDetailModal from "./NotificationDetailModal";
import type { NotificationItem } from "./NotificationCard/types";

export default function Notifications() {
  const [active, setActive] = useState("All");
  const [selectedNotification, setSelectedNotification] = useState<NotificationItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filtering logic
  const filtered =
    active === "All"
      ? notificationsData
      : active === "Unread"
        ? notificationsData.filter((n) => n.isUnread)
        : [];

  const handleNotificationClick = (item: NotificationItem) => {
    setSelectedNotification(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNotification(null);
  };

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-base sm:text-lg font-semibold mb-1">System Alerts</h2>
      <NotificationTabs active={active} onChange={setActive} />
      <NotificationsList
        data={filtered}
        onNotificationClick={handleNotificationClick}
      />

      <NotificationDetailModal
        isOpen={isModalOpen}
        onClose={closeModal}
        notification={selectedNotification}
      />
    </div>
  );
}
