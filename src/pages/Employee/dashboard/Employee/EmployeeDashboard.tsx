import { useEffect, useState } from "react";
import TimeCard from "../TimeCard";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../store";
import {
  fetchTodayAttendance,
  clockIn,
  clockOut
} from "../../../../store/slice/attendanceSlice";
import AttendanceStat from "../AttendanceStat";
import Announcements from "../Announcements";
import UpcomingHolidays from "../UpcomingHolidays";
import LeaveRequests from "../LeaveRequests";
import ProjectStatus from "../ProjectStatus";
import { showSuccess, showWarning } from "../../../../utils/toast";
import { gettotalAttendance } from "../../../../Services/apiHelpers";

/* ---------------- Attendance Percentage Logic ---------------- */
type AttendanceRecord = {
  status: "present" | "absent" | "late";
};

const calculateAttendancePercentage = (data: AttendanceRecord[]) => {
  if (!data.length) return 0;
  const presentDays = data.filter(d => d.status === "present").length;
  return Math.round((presentDays / data.length) * 100);
};

export default function EmployeeDashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const { clockInTime, clockOutTime, status, loading } =
    useSelector((state: RootState) => state.attendance);

  const [monthlyAttendance, setMonthlyAttendance] = useState<number>(0);

  /* ---------------- TODAY ATTENDANCE ---------------- */
  useEffect(() => {
    dispatch(fetchTodayAttendance());
  }, [dispatch]);

  /* ---------------- MONTHLY ATTENDANCE ---------------- */
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

  /* ---------------- AUTO CHECKOUT AFTER 12 HOURS ---------------- */
  useEffect(() => {
    // Only proceed if clocked in but not yet clocked out
    if (!clockInTime || clockOutTime) return;

    const checkAndAutoCheckout = async () => {
      try {
        const clockInDate = new Date(clockInTime);
        const now = new Date();
        const elapsedMilliseconds = now.getTime() - clockInDate.getTime();
        const elapsedHours = elapsedMilliseconds / (1000 * 60 * 60);

        // Auto-checkout if more than 12 hours and not already loading
        if (elapsedHours > 12 && !loading) {
          console.warn(`Auto-checkout triggered: ${elapsedHours.toFixed(2)} hours elapsed`);
          showWarning(
            "You have been clocked in for more than 12 hours. Auto-checking you out for safety."
          );
          await handleClockOut();
        }
      } catch (error) {
        console.error("Error during auto-checkout check:", error);
      }
    };

    // Check immediately and then every minute
    checkAndAutoCheckout();
    const autoCheckoutInterval = setInterval(checkAndAutoCheckout, 60000); // Check every 1 minute

    return () => clearInterval(autoCheckoutInterval);
  }, [clockInTime, clockOutTime, loading, dispatch]);

  /* ---------------- HELPERS ---------------- */
  const formatTime = (isoString: string | null) => {
    if (!isoString) return "--:--";
    try {
      return new Date(isoString).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return "--:--";
    }
  };

  const displayClockIn = clockInTime ? formatTime(clockInTime) : "00:00";
  const displayClockOut = clockOutTime ? formatTime(clockOutTime) : "00:00";

  const handleClockIn = async () => {
    const result = await dispatch(clockIn());
    if (clockIn.fulfilled.match(result)) {
      showSuccess("Clock In Successful");
    } else {
      showWarning((result.payload as string) || "Failed to Clock In");
    }
  };

  const handleClockOut = async () => {
    const result = await dispatch(clockOut());
    if (clockOut.fulfilled.match(result)) {
      showSuccess("Clock Out Successful");
    } else {
      showWarning((result.payload as string) || "Failed to Clock Out");
    }
  };

  // Determine if buttons should be disabled based on persisted state
  const isClockInDisabled = !!clockInTime;
  const isClockOutDisabled = !clockInTime || !!clockOutTime;

  return (
    <div className="space-y-6">

      {/* Time In/Out + Attendance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TimeCard
          label="Time In"
          time={displayClockIn}
          actionLabel="Clock in"
          onAction={handleClockIn}
          loading={loading && status !== "Working" && status !== "Completed"}
          disabled={isClockInDisabled}
        />

        <TimeCard
          label="Time Out"
          time={displayClockOut}
          actionLabel="Clock out"
          onAction={handleClockOut}
          loading={loading && status === "Working"}
          disabled={isClockOutDisabled}
        />

        <AttendanceStat
          title="Monthly Attendance"
          value={monthlyAttendance}
        />
      </div>

      {/* Performance + Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ProjectStatus />
        <Announcements />
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <LeaveRequests />
        <UpcomingHolidays />
      </div>
    </div>
  );
}
