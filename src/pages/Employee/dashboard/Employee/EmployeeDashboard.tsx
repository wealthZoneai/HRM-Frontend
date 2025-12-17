import { useState } from "react";
import TimeCard from "../TimeCard";
import { ClockIn, ClockOut } from "../../../../Services/apiHelpers";
import AttendanceStat from "../AttendanceStat";
import Announcements from "../Announcements";
import UpcomingHolidays from "../UpcomingHolidays";
import LeaveRequests from "../LeaveRequests";
import ProjectStatus from "../ProjectStatus";

export default function EmployeeDashboard() {
  const [loadingIn, setLoadingIn] = useState(false);
  const [loadingOut, setLoadingOut] = useState(false);

  const handleClockIn = async () => {
    try {
      setLoadingIn(true);
      const res = await ClockIn();
      console.log("Clock In Success:", res.data);
      alert("Clock In Successful at " + res.data.clock_in);
    } catch (err) {
      console.error(err);
      alert("Failed to Clock In");
    } finally {
      setLoadingIn(false);
    }
  };

  const handleClockOut = async () => {
    try {
      setLoadingOut(true);
      const res = await ClockOut();
      console.log("Clock Out Success:", res.data);
      alert("Clock Out Successful at " + res.data.clock_out);
    } catch (err) {
      console.error(err);
      alert("Failed to Clock Out");
    } finally {
      setLoadingOut(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* Time In/Out + Attendance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TimeCard
          label="Time In"
          time="9:00 AM"
          actionLabel="Clock in"
          onAction={handleClockIn}
          loading={loadingIn}
        />
        <TimeCard
          label="Time Out"
          time="7:00 PM"
          actionLabel="Clock out"
          onAction={handleClockOut}
          loading={loadingOut}
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
