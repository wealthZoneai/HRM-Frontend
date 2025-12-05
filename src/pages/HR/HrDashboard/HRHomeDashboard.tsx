import { useMemo, useState } from "react";

import { FiUsers, FiBriefcase, FiHome, FiUserX } from "react-icons/fi";
import type { DeptDataItem } from "./DeptDonutChart";
import type { AnnouncementItem } from "./Announcements";
import type { InterviewItem } from "./InterviewTable";
import SummaryCard from "./SummaryCard";
import DeptDonutChart from "./DeptDonutChart";
import Announcements from "./Announcements";
import InterviewTable from "./InterviewTable";
import TimeCard from "../../Employee/dashboard/TimeCard";
import AttendanceStat from "../../Employee/dashboard/AttendanceStat";

// const initialDeptData: DeptDataItem[] = [
//   { name: "React Department", value: 30, color: "#81f172ff" },
//   { name: "Java Department", value: 25, color: "#FFD166" },
//   { name: "Digital Marketing", value: 30, color: "#9B72F1" },
//   { name: "UI/UX Department", value: 28, color: "#2B6EF6" },
//   { name: "Python Department", value: 18, color: "#3ABAB4" },
//   { name: "Testing Department", value: 12, color: "#FF8A65" },
//   { name: "HR Department", value: 30, color: "#9B72F1" },
//   { name: "Cyber Security", value: 30, color: "#9B72F1" },
//   { name: "BDMS", value: 30, color: "#9B72F1" },
//   { name: "SPA", value: 30, color: "#9B72F1" },
// ];

const initialAnnouncements: AnnouncementItem[] = [
  { id: "a1", title: "Company-Wide Meeting", date: "Mar 25", summary: "All hands meeting to discuss Q1 results", color: "bg-red-100 text-red-700" },
  { id: "a2", title: "New WFH Policy", date: "Mar 20", summary: "Updated policy for remote working", color: "bg-green-100 text-green-700" },
  { id: "a3", title: "Upcoming Holiday", date: "Mar 20", summary: "Office will be closed", color: "bg-blue-100 text-blue-700" },
  { id: "a3", title: "Upcoming Holiday", date: "Mar 20", summary: "Office will be closed", color: "bg-blue-100 text-blue-700" },
  { id: "a3", title: "Upcoming Holiday", date: "Mar 20", summary: "Office will be closed", color: "bg-blue-100 text-blue-700" },
  { id: "a3", title: "Upcoming Holiday", date: "Mar 20", summary: "Office will be closed", color: "bg-blue-100 text-blue-700" },
  { id: "a3", title: "Upcoming Holiday", date: "Mar 20", summary: "Office will be closed", color: "bg-blue-100 text-blue-700" },
  { id: "a3", title: "Upcoming Holiday", date: "Mar 20", summary: "Office will be closed", color: "bg-blue-100 text-blue-700" },
  { id: "a3", title: "Upcoming Holiday", date: "Mar 20", summary: "Office will be closed", color: "bg-blue-100 text-blue-700" },
  { id: "a3", title: "Upcoming Holiday", date: "Mar 20", summary: "Office will be closed", color: "bg-blue-100 text-blue-700" },
  { id: "a3", title: "Upcoming Holiday", date: "Mar 20", summary: "Office will be closed", color: "bg-blue-100 text-blue-700" },
  { id: "a3", title: "Upcoming Holiday", date: "Mar 20", summary: "Office will be closed", color: "bg-blue-100 text-blue-700" },
  { id: "a3", title: "Upcoming Holiday", date: "Mar 20", summary: "Office will be closed", color: "bg-blue-100 text-blue-700" },
  { id: "a3", title: "Upcoming Holiday", date: "Mar 20", summary: "Office will be closed", color: "bg-blue-100 text-blue-700" },
  { id: "a3", title: "Upcoming Holiday", date: "Mar 20", summary: "Office will be closed", color: "bg-blue-100 text-blue-700" },
  { id: "a3", title: "Upcoming Holiday", date: "Mar 20", summary: "Office will be closed", color: "bg-blue-100 text-blue-700" },
];

const initialInterviews: InterviewItem[] = [
  { id: "i1", candidate: "Rahul", interviewers: "Vivien", schedule: "2025-11-20", status: "Scheduled" },
  { id: "i2", candidate: "Maya", interviewers: "Arjun", schedule: "2025-11-22", status: "Scheduled" },
  { id: "i3", candidate: "John", interviewers: "Ravi", schedule: "2025-11-10", status: "Completed" },
  { id: "i3", candidate: "John", interviewers: "Ravi", schedule: "2025-11-10", status: "Completed" },
  { id: "i3", candidate: "John", interviewers: "Ravi", schedule: "2025-11-10", status: "Completed" },
  { id: "i3", candidate: "John", interviewers: "Ravi", schedule: "2025-11-10", status: "Completed" },
  { id: "i3", candidate: "John", interviewers: "Ravi", schedule: "2025-11-10", status: "Completed" },
  { id: "i3", candidate: "John", interviewers: "Ravi", schedule: "2025-11-10", status: "Completed" },
  { id: "i3", candidate: "John", interviewers: "Ravi", schedule: "2025-11-10", status: "Completed" },
  { id: "i3", candidate: "John", interviewers: "Ravi", schedule: "2025-11-10", status: "Completed" },
  { id: "i3", candidate: "John", interviewers: "Ravi", schedule: "2025-11-10", status: "Completed" },
];
const initialDeptData: DeptDataItem[] = [
  {
    name: "React Department",
    value: 30,
    interns: 4,
    juniors: 10,
    seniors: 12,
    leads: 4,

    productivityData: [
      { month: "Jan", score: 70 },
      { month: "Feb", score: 82 },
      { month: "Mar", score: 78 },
      { month: "Apr", score: 85 },
    ],

    attendanceData: [
      { day: "Mon", present: 25 },
      { day: "Tue", present: 27 },
      { day: "Wed", present: 26 },
      { day: "Thu", present: 28 },
      { day: "Fri", present: 24 },
    ],
  },

  {
    name: "Java Department",
    value: 25,
    interns: 3,
    juniors: 8,
    seniors: 10,
    leads: 4,

    productivityData: [
      { month: "Jan", score: 60 },
      { month: "Feb", score: 73 },
      { month: "Mar", score: 69 },
      { month: "Apr", score: 75 },
    ],

    attendanceData: [
      { day: "Mon", present: 21 },
      { day: "Tue", present: 20 },
      { day: "Wed", present: 23 },
      { day: "Thu", present: 22 },
      { day: "Fri", present: 19 },
    ],
  },

  {
    name: "Digital Marketing",
    value: 30,
    interns: 6,
    juniors: 12,
    seniors: 8,
    leads: 4,

    productivityData: [
      { month: "Jan", score: 75 },
      { month: "Feb", score: 80 },
      { month: "Mar", score: 85 },
      { month: "Apr", score: 90 },
    ],

    attendanceData: [
      { day: "Mon", present: 28 },
      { day: "Tue", present: 27 },
      { day: "Wed", present: 29 },
      { day: "Thu", present: 28 },
      { day: "Fri", present: 26 },
    ],
  },

  {
    name: "UI/UX Department",
    value: 28,
    interns: 5,
    juniors: 10,
    seniors: 9,
    leads: 4,

    productivityData: [
      { month: "Jan", score: 65 },
      { month: "Feb", score: 70 },
      { month: "Mar", score: 72 },
      { month: "Apr", score: 80 },
    ],

    attendanceData: [
      { day: "Mon", present: 22 },
      { day: "Tue", present: 24 },
      { day: "Wed", present: 25 },
      { day: "Thu", present: 23 },
      { day: "Fri", present: 21 },
    ],
  },

  {
    name: "Python Department",
    value: 18,
    interns: 2,
    juniors: 6,
    seniors: 7,
    leads: 3,

    productivityData: [
      { month: "Jan", score: 62 },
      { month: "Feb", score: 70 },
      { month: "Mar", score: 68 },
      { month: "Apr", score: 75 },
    ],

    attendanceData: [
      { day: "Mon", present: 14 },
      { day: "Tue", present: 15 },
      { day: "Wed", present: 13 },
      { day: "Thu", present: 14 },
      { day: "Fri", present: 12 },
    ],
  },

  {
    name: "Testing Department",
    value: 12,
    interns: 1,
    juniors: 4,
    seniors: 6,
    leads: 1,

    productivityData: [
      { month: "Jan", score: 55 },
      { month: "Feb", score: 60 },
      { month: "Mar", score: 57 },
      { month: "Apr", score: 62 },
    ],

    attendanceData: [
      { day: "Mon", present: 9 },
      { day: "Tue", present: 10 },
      { day: "Wed", present: 11 },
      { day: "Thu", present: 9 },
      { day: "Fri", present: 8 },
    ],
  },

  {
    name: "HR Department",
    value: 20,
    interns: 1,
    juniors: 6,
    seniors: 10,
    leads: 3,

    productivityData: [
      { month: "Jan", score: 72 },
      { month: "Feb", score: 78 },
      { month: "Mar", score: 80 },
      { month: "Apr", score: 88 },
    ],

    attendanceData: [
      { day: "Mon", present: 18 },
      { day: "Tue", present: 17 },
      { day: "Wed", present: 19 },
      { day: "Thu", present: 18 },
      { day: "Fri", present: 16 },
    ],
  },
  {
    name: "Cyber Security",
    value: 20,
    interns: 1,
    juniors: 6,
    seniors: 10,
    leads: 3,

    productivityData: [
      { month: "Jan", score: 72 },
      { month: "Feb", score: 78 },
      { month: "Mar", score: 80 },
      { month: "Apr", score: 88 },
    ],

    attendanceData: [
      { day: "Mon", present: 18 },
      { day: "Tue", present: 17 },
      { day: "Wed", present: 19 },
      { day: "Thu", present: 18 },
      { day: "Fri", present: 16 },
    ],
  },
  {
    name: "BDMS",
    value: 20,
    interns: 1,
    juniors: 6,
    seniors: 10,
    leads: 3,

    productivityData: [
      { month: "Jan", score: 72 },
      { month: "Feb", score: 78 },
      { month: "Mar", score: 80 },
      { month: "Apr", score: 88 },
    ],

    attendanceData: [
      { day: "Mon", present: 18 },
      { day: "Tue", present: 17 },
      { day: "Wed", present: 19 },
      { day: "Thu", present: 18 },
      { day: "Fri", present: 16 },
    ],
  },
  {
    name: "SPA",
    value: 20,
    interns: 1,
    juniors: 6,
    seniors: 10,
    leads: 3,

    productivityData: [
      { month: "Jan", score: 72 },
      { month: "Feb", score: 78 },
      { month: "Mar", score: 80 },
      { month: "Apr", score: 88 },
    ],

    attendanceData: [
      { day: "Mon", present: 18 },
      { day: "Tue", present: 17 },
      { day: "Wed", present: 19 },
      { day: "Thu", present: 18 },
      { day: "Fri", present: 16 },
    ],
  },
];

export default function HRDashboardPage() {
  const [deptData] = useState<DeptDataItem[]>(initialDeptData);
  const [announcements] = useState<AnnouncementItem[]>(initialAnnouncements);
  const [interviews, setInterviews] = useState<InterviewItem[]>(initialInterviews);

  // derived metrics
  const totalEmployees = useMemo(() => deptData.reduce((s, d) => s + d.value, 0), [deptData]);
  const presentEmployees = Math.max(0, Math.round(totalEmployees * 0.9)); // sample
  const wfh = Math.round(totalEmployees * 0.06);
  const absentees = totalEmployees - presentEmployees - wfh;

  function markInterviewComplete(id: string) {
    setInterviews(prev => prev.map(it => it.id === id ? { ...it, status: "Completed" } : it));
  }

  return (
    <div className="p-6 space-y-6">
      {/* Top Section: Time & Attendance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TimeCard label="Time In" time="9:00 AM" actionLabel="Clock in" />
        <TimeCard label="Time Out" time="7:00 PM" actionLabel="Clock out" />
        <AttendanceStat title="Monthly Attendance" value={80} />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard title="Total Employees Count" value={totalEmployees} subtitle="Employees" icon={<FiUsers size={22} />} />
        <SummaryCard title="Present Employees" value={presentEmployees} subtitle="Employees" icon={<FiHome size={22} />} />
        <SummaryCard title="Work From Home" value={wfh} subtitle="Employees" icon={<FiBriefcase size={22} />} />
        <SummaryCard title="Absentees" value={absentees} subtitle="Employees" icon={<FiUserX size={22} />} trend="down" />
      </div>

      {/* middle section: chart + announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div >
          <DeptDonutChart data={deptData} />
        </div>

        <div>
          <Announcements items={announcements} />
        </div>
      </div>

      {/* bottom: charts + interview table */}
      <div className="grid grid-cols-1 gap-6">
        <div>
          <InterviewTable items={interviews} onToggleComplete={markInterviewComplete} />
        </div>
      </div>
    </div>
  );
}
