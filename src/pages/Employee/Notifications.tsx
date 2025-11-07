import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { useState } from "react";
import NotificationTabs from "../../components/notifications/NotificationTabs";
import NotificationsList from "../../components/notifications/NotificationsList";
import { notificationsData } from "../../components/notifications/notificationsData";

export default function Notifications() {
  const [active, setActive] = useState("All");

  // Filtering logic can be extended later
  const filtered = active === "All" ? notificationsData : [];

  return (
    <DashboardLayout>
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-1">System Alerts</h2>
        <NotificationTabs active={active} onChange={setActive} />
        <NotificationsList data={filtered} />
      </div>
    </DashboardLayout>
  );
}
