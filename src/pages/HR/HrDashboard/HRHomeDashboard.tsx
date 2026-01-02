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
import { fetchTodayAttendance, clockIn, clockOut } from "../../../store/slice/attendanceSlice";
import { fetchHRDashboardStats } from "../../../store/slice/dashboardSlice";
import { showSuccess, showWarning } from "../../../utils/toast";

/* ✅ added import */
import { gettotalAttendance } from "../../../Services/apiHelpers";

/* ✅ added type */
type AttendanceRecord = {
  status: "present" | "absent" | "late";
};

/* ✅ added percentage calculation */
const calculateAttendancePercentage = (data: AttendanceRecord[]) => {
  if (!data.length) return 0;
  const presentDays = data.filter(d => d.status === "present").length;
  return Math.round((presentDays / data.length) * 100);
};



const initialInterviews: InterviewItem[] = [
  { id: "i1", candidate: "Rahul", interviewers: "Vivien", schedule: "2025-11-20", status: "Scheduled" },
  { id: "i2", candidate: "Maya", interviewers: "Arjun", schedule: "2025-11-22", status: "Scheduled" },
  { id: "i3", candidate: "John", interviewers: "Ravi", schedule: "2025-11-10", status: "Completed" }
];

const initialDeptData: DeptDataItem[] = [
  {
    name: "React Team",
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
    name: "Java Team",
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
    name: "UI/UX Team",
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
    name: "Python Team",
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
    name: "QA",
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
    name: "HR Team",
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
    name: "SAP",
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

  const dispatch = useDispatch<AppDispatch>();
  const { clockInTime, clockOutTime, status, loading } =
    useSelector((state: RootState) => state.attendance);
  const { hrStats } = useSelector((state: RootState) => state.dashboard);

  const [deptData] = useState<DeptDataItem[]>(initialDeptData);

  const [interviews, setInterviews] =
    useState<InterviewItem[]>(initialInterviews);

  /* ✅ added state */
  const [monthlyAttendance, setMonthlyAttendance] = useState<number>(0);

  useEffect(() => {
    dispatch(fetchTodayAttendance());
    dispatch(fetchHRDashboardStats());
  }, [dispatch]);

  /* ✅ fetch monthly attendance from API */
  useEffect(() => {
    const fetchMonthlyAttendance = async () => {
      try {
        const res = await gettotalAttendance();
        const percentage = calculateAttendancePercentage(res.data);
        setMonthlyAttendance(percentage);
      } catch (error) {
        console.error("Failed to load monthly attendance", error);
        setMonthlyAttendance(0);
      }
    };

    fetchMonthlyAttendance();
  }, []);

  const formatTime = (isoString: string | null) => {
    if (!isoString) return "--:--";
    return new Date(isoString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const displayClockIn = clockInTime ? formatTime(clockInTime) : "09:00 AM";
  const displayClockOut = clockOutTime ? formatTime(clockOutTime) : "07:00 PM";

  const handleClockIn = async () => {
    const result = await dispatch(clockIn());
    if (clockIn.fulfilled.match(result)) {
      showSuccess("Clock In Successful");
    } else {
      showWarning(result.payload as string || "Failed to Clock In");
    }
  };

  const handleClockOut = async () => {
    const result = await dispatch(clockOut());
    if (clockOut.fulfilled.match(result)) {
      showSuccess("Clock Out Successful");
    } else {
      showWarning(result.payload as string || "Failed to Clock Out");
    }
  };

  function markInterviewComplete(id: string) {
    setInterviews(prev =>
      prev.map(it =>
        it.id === id ? { ...it, status: "Completed" } : it
      )
    );
  }

  function handleReschedule(id: string, date: string) {
    setInterviews(prev =>
      prev.map(it =>
        it.id === id ? { ...it, schedule: date, status: "Rescheduled" } : it
      )
    );
  }

  return (
    <div className="p-6 space-y-6">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TimeCard
          label="Time In"
          time={displayClockIn}
          actionLabel="Clock in"
          onAction={handleClockIn}
          loading={loading && status !== "Working" && status !== "Completed"}
          disabled={status === "Working" || status === "Completed"}
        />

        <TimeCard
          label="Time Out"
          time={displayClockOut}
          actionLabel="Clock out"
          onAction={handleClockOut}
          loading={loading && status === "Working"}
          disabled={status !== "Working"}
        />

        {/* ✅ now uses live API value */}
        <AttendanceStat
          title="Monthly Attendance"
          value={monthlyAttendance}
        />
      </div>

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DeptDonutChart data={deptData} />
        <Announcements />
      </div>

      <InterviewTable
        items={interviews}
        onToggleComplete={markInterviewComplete}
        onReschedule={handleReschedule}
      />
    </div>
  );
}
