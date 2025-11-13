import DashboardLayout from "../DashboardLayout";
import TimeCard from "../TimeCard";
import AttendanceStat from "../AttendanceStat";
import Announcements from "../Announcements";
import { UpcomingHolidays } from "../UpcomingHolidays";
import LeaveRequests from "../LeaveRequests";
import ProjectStatus from "../ProjectStatus";

export default function EmployeeDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* Time In/Out + Attendance Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TimeCard label="Time In" time="9:00 AM" actionLabel="Clock in" />
          <TimeCard label="Time Out" time="7:00 PM" actionLabel="Clock out" />

          <AttendanceStat title="Total Attendance" value={80} />
          {/* <AttendanceStat title="On Time %" value={95} /> */}
        </div>

        {/* Performance + Attendance Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ProjectStatus />
          {/* <Attendanc  eChart /> */}
          <Announcements />
        </div>

        {/* Bottom Grid: Announcements, Holidays, Leaves */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <LeaveRequests />
          <UpcomingHolidays />
        </div>

      </div>
    </DashboardLayout>
  );
}
