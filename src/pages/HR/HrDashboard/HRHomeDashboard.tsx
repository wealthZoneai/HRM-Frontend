import { useMemo, useState } from "react";

import { FiUsers, FiBriefcase, FiHome } from "react-icons/fi";
import type { DeptDataItem } from "./DeptDonutChart";
import type { AnnouncementItem } from "./Announcements";
import type { InterviewItem } from "./InterviewTable";
import SummaryCard from "./SummaryCard";
import DeptDonutChart from "./DeptDonutChart";
import Announcements from "./Announcements";
import InterviewTable from "./InterviewTable";

const initialDeptData: DeptDataItem[] = [
  { name: "UI/UX", value: 28, color: "#2B6EF6" },
  { name: "Python", value: 18, color: "#3ABAB4" },
  { name: "Java", value: 25, color: "#FFD166" },
  { name: "Testing", value: 12, color: "#FF8A65" },
  { name: "React", value: 30, color: "#9B72F1" },
];

const initialAnnouncements: AnnouncementItem[] = [
  { id: "a1", title: "Company-Wide Meeting", date: "Mar 25", summary: "All hands meeting to discuss Q1 results", color: "bg-red-100 text-red-700" },
  { id: "a2", title: "New WFH Policy", date: "Mar 20", summary: "Updated policy for remote working", color: "bg-green-100 text-green-700" },
  { id: "a3", title: "Upcoming Holiday", date: "Mar 20", summary: "Office will be closed", color: "bg-blue-100 text-blue-700" },
];

const initialInterviews: InterviewItem[] = [
  { id: "i1", candidate: "Rahul", interviewers: "Vivien", schedule: "2025-11-20", status: "Scheduled" },
  { id: "i2", candidate: "Maya", interviewers: "Arjun", schedule: "2025-11-22", status: "Scheduled" },
  { id: "i3", candidate: "John", interviewers: "Ravi", schedule: "2025-11-10", status: "Completed" },
];

export default function HRDashboardPage() {
  const [deptData] = useState<DeptDataItem[]>(initialDeptData);
  const [announcements] = useState<AnnouncementItem[]>(initialAnnouncements);
  const [interviews, setInterviews] = useState<InterviewItem[]>(initialInterviews);

  // derived metrics
  const totalEmployees = useMemo(() => deptData.reduce((s, d) => s + d.value, 0), [deptData]);
  const presentEmployees = Math.max(0, Math.round(totalEmployees * 0.9)); // sample
  const wfh = Math.round(totalEmployees * 0.06);

  function markInterviewComplete(id: string) {
    setInterviews(prev => prev.map(it => it.id === id ? { ...it, status: "Completed" } : it));
  }

  return (
    <div className="p-6 space-y-6">
      {/* top summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SummaryCard title="Total Employees Count" value={totalEmployees} subtitle="Employees" icon={<FiUsers size={22} />} />
        <SummaryCard title="Present Employees" value={presentEmployees} subtitle="Employees" icon={<FiHome size={22} />} />
        <SummaryCard title="Work From Home" value={wfh} subtitle="Employees" icon={<FiBriefcase size={22} />} />
      </div>

      {/* middle section: chart + announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
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
