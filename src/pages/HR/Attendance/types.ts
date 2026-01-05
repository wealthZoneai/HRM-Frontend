// types.ts

export type Status = "Present" | "Absent" | "On Leave" | "Working";

export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}

// Matches your API Response exactly
export interface AttendanceRecord {
  id: number;
  user: User;
  date: string;           // "2026-01-02"
  clock_in: string | null;
  clock_out: string | null;
  duration_time: string | null;
  status: string;         // "working", "absent", etc.
  created_at: string;
}

// Used for the Monthly View Table
export interface MonthlyAggregatedItem {
  id: string;
  employee: string;
  avatar: string;
  department: string;
  totalDays: number;
  present: number;
  absent: number;
  onLeave: number;
  month: string;
  logs: AttendanceRecord[];
}