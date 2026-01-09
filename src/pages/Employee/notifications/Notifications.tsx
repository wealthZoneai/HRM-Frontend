import { useEffect, useState } from "react";
import NotificationTabs from "../notifications/NotificationTabs";
import NotificationsList from "../notifications/NotificationsList";
import NotificationDetailModal from "./NotificationDetailModal";
import type { NotificationItem } from "./NotificationCard/types";
import { getNotifications, markAllNotificationsRead } from "../../../Services/apiHelpers";

/* -------- Time Formatter -------- */
const timeAgo = (dateString: string) => {
  const now = new Date();
  const past = new Date(dateString);
  const diff = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} day ago`;

  return past.toLocaleDateString();
};

/* -------- API → UI Mapper -------- */
const mapNotification = (item: any): NotificationItem => ({
  id: String(item.id),
  type: item.notif_type === "announcement" ? "system" : "hrms",
  title: item.title,
  message: item.body,
  time: timeAgo(item.created_at),
  isUnread: !item.is_read,
});

export default function Notifications() {
  const [active, setActive] = useState("All");
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [selectedNotification, setSelectedNotification] =
    useState<NotificationItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await getNotifications();
        const formatted = res.data.data.map(mapNotification);
        setNotifications(formatted);

        // Mark all as read since the user is viewing the list
        await markAllNotificationsRead();

      } catch (err) {
        console.error("Failed to fetch notifications", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const filtered =
    active === "All"
      ? notifications
      : notifications.filter((n) => n.isUnread);

  const handleNotificationClick = (item: NotificationItem) => {
    setSelectedNotification(item);
    setIsModalOpen(true);

    setNotifications((prev) =>
      prev.map((n) =>
        n.id === item.id ? { ...n, isUnread: false } : n
      )
    );
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNotification(null);
  };

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-base sm:text-lg font-semibold mb-1">
        System Alerts
      </h2>

      <NotificationTabs active={active} onChange={setActive} />

      {loading ? (
        <p className="text-center text-gray-400 mt-20">
          Loading notifications…
        </p>
      ) : (
        <NotificationsList
          data={filtered}
          onNotificationClick={handleNotificationClick}
        />
      )}

      <NotificationDetailModal
        isOpen={isModalOpen}
        onClose={closeModal}
        notification={selectedNotification}
      />
    </div>
  );
}
