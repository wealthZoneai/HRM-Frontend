export type Status = "Present" | "Absent" | "On Leave";

export interface DailyViewItem {
  id: string;
  employee: string;
  empId: string;
  avatar: string;
  checkIn: string;
  checkOut: string;
  status: Status;
  department: string;
}

export interface MonthlySummaryItem {
  id: string;
  employee: string;
  avatar: string;
  department: string;
  totalDays: number;
  present: number;
  absent: number;
  onLeave: number;
  month: string;
}

export interface AttendanceRecord extends DailyViewItem {
  date: string; // YYYY-MM-DD
}

export interface LogEntry {
  date: string;
  loginTime: string;
  logoutTime: string;
  duration: string;
  status: Status;
}