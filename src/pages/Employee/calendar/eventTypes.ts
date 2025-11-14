export type CalendarEventType =
  | "meeting"
  | "holiday"
  | "birthday"
  | "training"
  | "interview"
  | "leave";

export interface CalendarEvent {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  type: CalendarEventType;
}