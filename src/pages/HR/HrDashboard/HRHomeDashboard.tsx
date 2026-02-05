import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiUsers, FiBriefcase, FiUserX } from "react-icons/fi";

import type { DeptDataItem } from "./DeptDonutChart";
import type { InterviewItem } from "./InterviewTable";

import SummaryCard from "./SummaryCard";
import DeptDonutChart from "./DeptDonutChart";
import Announcements from "./Announcements";
import InterviewTable from "./InterviewTable";
import TimeCard from "../../Employee/dashboard/TimeCard";
import AttendanceStat from "../../Employee/dashboard/AttendanceStat";

import type { AppDispatch, RootState } from "../../../store";
import {
  fetchTodayAttendance,
  clockIn,
  clockOut,
} from "../../../store/slice/attendanceSlice";
import { fetchHRDashboardStats } from "../../../store/slice/dashboardSlice";

import { showSuccess, showWarning } from "../../../utils/toast";
import { gettotalAttendance, GetAllEmployes } from "../../../Services/apiHelpers";

/* ----------------------------------------------------
   TYPES
---------------------------------------------------- */

type AttendanceRecord = {
  status: "present" | "absent" | "late";
};

type Employee = {
  department: string | null;
  job_title: string | null;
  role: string;
};

/* ----------------------------------------------------
   HELPERS
---------------------------------------------------- */

const calculateAttendancePercentage = (data: AttendanceRecord[]) => {
  if (!data.length) return 0;
  const presentDays = data.filter(d => d.status === "present").length;
  return Math.round((presentDays / data.length) * 100);
};

function buildDeptData(employees: Employee[]): DeptDataItem[] {
  const map: Record<string, DeptDataItem> = {};

  employees.forEach(emp => {
    const deptName = emp.department || "Unassigned";

    if (!map[deptName]) {
      map[deptName] = {
        name: deptName,
        value: 0,
        interns: 0,
        juniors: 0,
        seniors: 0,
        leads: 0,
        productivityData: [],
        attendanceData: [],
      };
    }

    map[deptName].value += 1;

    const title = emp.job_title?.toLowerCase() || "";

    if (title.includes("intern")) map[deptName].interns += 1;
    else if (title.includes("lead")) map[deptName].leads += 1;
    else if (title.includes("senior")) map[deptName].seniors += 1;
    else map[deptName].juniors += 1;
  });

  return Object.values(map);
}

/* ----------------------------------------------------
   MOCK INTERVIEWS
---------------------------------------------------- */

const initialInterviews: InterviewItem[] = [
  { id: "i1", candidate: "Rahul", interviewers: "Vivien", schedule: "2025-11-20", status: "Scheduled" },
  { id: "i2", candidate: "Maya", interviewers: "Arjun", schedule: "2025-11-22", status: "Scheduled" },
  { id: "i3", candidate: "John", interviewers: "Ravi", schedule: "2025-11-10", status: "Completed" },
];

/* ----------------------------------------------------
   COMPONENT
---------------------------------------------------- */

export default function HRHomeDashboard() {
  const dispatch = useDispatch<AppDispatch>();

  const { clockInTime, clockOutTime, status, loading } =
    useSelector((state: RootState) => state.attendance);

  const { hrStats } = useSelector((state: RootState) => state.dashboard);

  const [deptData, setDeptData] = useState<DeptDataItem[]>([]);
  const [interviews, setInterviews] =
    useState<InterviewItem[]>(initialInterviews);
  const [monthlyAttendance, setMonthlyAttendance] = useState<number>(0);

  /* ---------------------------
     INITIAL LOAD
  ---------------------------- */

  useEffect(() => {
    dispatch(fetchTodayAttendance());
    dispatch(fetchHRDashboardStats());
  }, [dispatch]);

  /* ---------------------------
     MONTHLY ATTENDANCE
  ---------------------------- */

  useEffect(() => {
    const fetchMonthlyAttendance = async () => {
      try {
        const res = await gettotalAttendance();
        setMonthlyAttendance(calculateAttendancePercentage(res.data));
      } catch {
        setMonthlyAttendance(0);
      }
    };

    fetchMonthlyAttendance();
  }, []);

  /* ---------------------------
     EMPLOYEE → DEPT CHART
  ---------------------------- */

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await GetAllEmployes();

        // ✅ FIX: Django paginated response
        const employees: Employee[] = res.data?.results || [];

        const formatted = buildDeptData(employees);
        setDeptData(formatted);
      } catch (error) {
        console.error("Employee chart load failed", error);
        setDeptData([]);
      }
    };

    fetchEmployees();
  }, []);

  /* ---------------------------
     TIME FORMATTERS
  ---------------------------- */

  const formatTime = (iso: string | null) =>
    iso
      ? new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : "--:--";

  const displayClockIn = clockInTime ? formatTime(clockInTime) : "00:00";
  const displayClockOut = clockOutTime ? formatTime(clockOutTime) : "00:00";

  /* ---------------------------
     ACTIONS
  ---------------------------- */

  const handleClockIn = async () => {
    const result = await dispatch(clockIn());
    result.type.endsWith("fulfilled")
      ? showSuccess("Clock In Successful")
      : showWarning("Clock In Failed");
  };

  const handleClockOut = async () => {
    const result = await dispatch(clockOut());
    result.type.endsWith("fulfilled")
      ? showSuccess("Clock Out Successful")
      : showWarning("Clock Out Failed");
  };

  const markInterviewComplete = (id: string) => {
    setInterviews(prev =>
      prev.map(i => (i.id === id ? { ...i, status: "Completed" } : i))
    );
  };

  const handleReschedule = (id: string, date: string) => {
    setInterviews(prev =>
      prev.map(i =>
        i.id === id ? { ...i, schedule: date, status: "Rescheduled" } : i
      )
    );
  };

  /* ---------------------------
     RENDER
  ---------------------------- */

  return (
    <div className="p-6 space-y-6">
      {/* Time Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TimeCard
          label="Time In"
          time={displayClockIn}
          actionLabel="Clock in"
          onAction={handleClockIn}
          loading={loading && status !== "Working"}
          disabled={status === "Working"}
        />

        <TimeCard
          label="Time Out"
          time={displayClockOut}
          actionLabel="Clock out"
          onAction={handleClockOut}
          loading={loading && status === "Working"}
          disabled={status !== "Working"}
        />

        <AttendanceStat title="Monthly Attendance" value={monthlyAttendance} />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <SummaryCard
          title="Total Employees"
          value={hrStats?.total_employees ?? 0}
          subtitle="Employees"
          icon={<FiUsers size={22} />}
        />
        <SummaryCard
          title="Present Employees"
          value={hrStats?.present_employees ?? 0}
          subtitle="Employees"
          icon={<FiBriefcase size={22} />}
        />
        <SummaryCard
          title="On Leave Employees"
          value={hrStats?.on_leave_employees ?? 0}
          subtitle="Employees"
          icon={<FiUserX size={22} />}
        />
      </div>

      {/* Chart + Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DeptDonutChart data={deptData} />
        <Announcements />
      </div>

      {/* Interviews */}
      {/* <InterviewTable
        items={interviews}
        onToggleComplete={markInterviewComplete}
        onReschedule={handleReschedule}
      /> */}
    </div>
  );
}
