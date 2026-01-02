import type { DailyViewItem, MonthlySummaryItem, AttendanceRecord, Status } from "./types";
// --- CONSTANTS ---
export const DEPARTMENTS = [
  "Teams", "AWS", "Cyber Security", "Java", "Python", "QA", "React", "UI/UX",
];

export const MONTHS = [
  { label: "December 2025", value: "2025-12" },
  { label: "November 2025", value: "2025-11" },
  { label: "October 2025", value: "2025-10" },
  { label: "September 2025", value: "2025-09" },
  { label: "August 2025", value: "2025-08" },
  { label: "July 2025", value: "2025-07" },
  { label: "June 2025", value: "2025-06" },
  { label: "May 2025", value: "2025-05" },
  { label: "April 2025", value: "2025-04" },
  { label: "March 2025", value: "2025-03" },
  { label: "February 2025", value: "2025-02" },
  { label: "January 2025", value: "2025-01" },
];

export const BADGE_STYLES = {
  Present: "bg-green-100 text-green-700 font-medium",
  Absent: "bg-red-100 text-red-700 font-medium",
  "On Leave": "bg-yellow-100 text-yellow-700 font-medium",
};

// --- DATA ---
export const dailyData: DailyViewItem[] = [
  { id: "1", employee: "Clement Mendie", empId: "EMP001", avatar: "https://i.pravatar.cc/40?img=1", checkIn: "09:00 AM", checkOut: "05:00 PM", status: "Present", department: "UI/UX" },
  { id: "2", employee: "Alice Johnson", empId: "EMP002", avatar: "https://i.pravatar.cc/40?img=2", checkIn: "-", checkOut: "-", status: "Absent", department: "Java" },
  { id: "3", employee: "Chris Evans", empId: "EMP003", avatar: "https://i.pravatar.cc/40?img=3", checkIn: "09:30 AM", checkOut: "—", status: "On Leave", department: "Python" },
  { id: "4", employee: "Diana Prince", empId: "EMP004", avatar: "https://i.pravatar.cc/40?img=4", checkIn: "08:45 AM", checkOut: "05:15 PM", status: "Present", department: "UI/UX" },
  { id: "5", employee: "Ethan Hunt", empId: "EMP005", avatar: "https://i.pravatar.cc/40?img=5", checkIn: "09:10 AM", checkOut: "05:05 PM", status: "Present", department: "AWS" },
  { id: "6", employee: "Fiona Glenn", empId: "EMP006", avatar: "https://i.pravatar.cc/40?img=6", checkIn: "09:05 AM", checkOut: "-", status: "Present", department: "Cyber Security" },
  { id: "7", employee: "George Blake", empId: "EMP007", avatar: "https://i.pravatar.cc/40?img=7", checkIn: "-", checkOut: "-", status: "Absent", department: "React" },
  { id: "8", employee: "Holly Tate", empId: "EMP008", avatar: "https://i.pravatar.cc/40?img=8", checkIn: "08:50 AM", checkOut: "05:10 PM", status: "Present", department: "QA" },
];

export const monthlyData: MonthlySummaryItem[] = [
  { id: "1", employee: "Clement Mendie", avatar: "https://i.pravatar.cc/40?img=1", department: "UI/UX", totalDays: 22, present: 20, absent: 1, onLeave: 1, month: "2025-03" },
  { id: "2", employee: "Alice Johnson", avatar: "https://i.pravatar.cc/40?img=2", department: "Java", totalDays: 22, present: 18, absent: 3, onLeave: 1, month: "2025-03" },
  { id: "3", employee: "Chris Evans", avatar: "https://i.pravatar.cc/40?img=3", department: "Python", totalDays: 22, present: 15, absent: 5, onLeave: 2, month: "2025-03" },
  { id: "4", employee: "Diana Prince", avatar: "https://i.pravatar.cc/40?img=4", department: "UI/UX", totalDays: 22, present: 22, absent: 0, onLeave: 0, month: "2025-03" },
  { id: "5", employee: "Ethan Hunt", avatar: "https://i.pravatar.cc/40?img=5", department: "AWS", totalDays: 22, present: 21, absent: 0, onLeave: 1, month: "2025-03" },
  { id: "6", employee: "Fiona Glenn", avatar: "https://i.pravatar.cc/40?img=6", department: "Cyber Security", totalDays: 22, present: 19, absent: 2, onLeave: 1, month: "2025-03" },
  { id: "7", employee: "George Blake", avatar: "https://i.pravatar.cc/40?img=7", department: "React", totalDays: 20, present: 10, absent: 5, onLeave: 5, month: "2025-02" },
  { id: "8", employee: "Holly Tate", avatar: "https://i.pravatar.cc/40?img=8", department: "QA", totalDays: 20, present: 20, absent: 0, onLeave: 0, month: "2025-02" },
  { id: "9", employee: "Clement Mendie", avatar: "https://i.pravatar.cc/40?img=1", department: "UI/UX", totalDays: 20, present: 15, absent: 3, onLeave: 2, month: "2025-02" },
];

const generateMockRecords = (): AttendanceRecord[] => {
  const records: AttendanceRecord[] = [];
  const employees = dailyData;
  for (let i = 0; i < 30; i++) {
    const date = new Date("2025-03-31");
    date.setDate(date.getDate() - i);
    const dateString = date.toISOString().split('T')[0];
    employees.forEach(emp => {
      const rand = Math.random();
      let status: Status = "Present";
      let checkIn = "09:00 AM";
      let checkOut = "05:00 PM";
      if (rand > 0.8) { status = "Absent"; checkIn = "-"; checkOut = "-"; } 
      else if (rand > 0.7) { status = "On Leave"; checkIn = "—"; checkOut = "—"; }
      records.push({ ...emp, id: `${emp.id}-${dateString}`, department: emp.department + " Department", date: dateString, status, checkIn, checkOut });
    });
  }
  return records;
};

export const recordData: AttendanceRecord[] = generateMockRecords();