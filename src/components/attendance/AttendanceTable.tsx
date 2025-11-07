import { attendanceRecords } from "./attendanceData";
import AttendanceRow from "./AttendanceRow";

export default function AttendanceTable() {
  return (
    <div className="border rounded-xl bg-white p-5 shadow-sm w-full">
      <h3 className="font-semibold mb-4">Attendance Table</h3>

      <table className="w-full text-sm text-gray-700">
        <thead className="bg-blue-100 text-gray-700 font-semibold">
          <tr>
            <th className="py-2 px-4 text-left">Date</th>
            <th className="py-2 px-4 text-left">Login</th>
            <th className="py-2 px-4 text-left">Logout</th>
            <th className="py-2 px-4 text-left">Hours</th>
            <th className="py-2 px-4 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.map((r, i) => (
            <AttendanceRow key={i} {...r} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
