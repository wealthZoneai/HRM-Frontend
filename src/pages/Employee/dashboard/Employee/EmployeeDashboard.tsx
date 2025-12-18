import { useEffect } from "react";
import TimeCard from "../TimeCard";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../store";
import { fetchTodayAttendance, clockIn, clockOut } from "../../../../store/slice/attendanceSlice";
import AttendanceStat from "../AttendanceStat";
import Announcements from "../Announcements";
import UpcomingHolidays from "../UpcomingHolidays";
import LeaveRequests from "../LeaveRequests";
import ProjectStatus from "../ProjectStatus";
import { showSuccess, showWarning } from "../../../../utils/toast";

export default function EmployeeDashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const { clockInTime, clockOutTime, status, loading } = useSelector((state: RootState) => state.attendance);

  useEffect(() => {
    dispatch(fetchTodayAttendance());
  }, [dispatch]);

  // Format helpers
  const formatTime = (isoString: string | null) => {
    if (!isoString) return "--:--";
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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

  return (
    <div className="space-y-6">

      {/* Time In/Out + Attendance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TimeCard
          label="Time In"
          time={displayClockIn}
          actionLabel="Clock in"
          onAction={handleClockIn}
          loading={loading && status !== 'Working' && status !== 'Completed'}
          disabled={!!clockInTime}
        />
        <TimeCard
          label="Time Out"
          time={displayClockOut}
          actionLabel="Clock out"
          onAction={handleClockOut}
          loading={loading && status === 'Working'}
          disabled={!clockInTime || !!clockOutTime}
        />

        <AttendanceStat title="Monthly Attendance" value={80} />
        {/* <AttendanceStat title="On Time %" value={95} /> */}
      </div>

      {/* Performance + Attendance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ProjectStatus />
        <Announcements />
      </div>

      {/* Bottom Grid: Announcements, Holidays, Leaves */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <LeaveRequests />
        <UpcomingHolidays />
      </div>

    </div>
  );
}
