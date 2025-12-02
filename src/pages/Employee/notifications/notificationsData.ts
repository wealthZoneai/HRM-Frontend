import type { NotificationItem } from "../notifications/NotificationCard/types";

export const notificationsData: NotificationItem[] = [
  {
    id: "0",
    type: "hrms",
    title: "HRMS Portal",
    message: "Please record your Login Time",
    time: "Just now",
    isUnread: true
  },
  {
    id: "1",
    type: "acceptance",
    title: "Acceptance",
    message: "Your expense report for Client Meeting Lunch is awaiting approval.",
    time: "5m ago"
  },
  {
    id: "2",
    type: "system",
    title: "System Alert",
    message: "Scheduled system maintenance this Friday at 10 PM",
    time: "5m ago",
    actionText: "View Details",
    actionHref: "#"
  },
  {
    id: "3",
    type: "hrms",
    title: "HRMS",
    message: "Reminder: Project deadline is today",
    time: "Yesterday",
    actionText: "Read More",
    actionHref: "#"
  },
  {
    id: "4",
    type: "task",
    title: "Task Reminder",
    message: "Project Q4 Report deadline is tomorrow",
    time: "2day ago",
    actionText: "View Task",
    actionHref: "#"
  }
];
