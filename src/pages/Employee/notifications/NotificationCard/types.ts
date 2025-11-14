export type NotificationType = "acceptance" | "system" | "hrms" | "task";

export interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  actionText?: string;
  actionLink?: string;
  // optional alias for actionLink (some files use `actionHref`)
  actionHref?: string;
  isUnread?: boolean;
}
