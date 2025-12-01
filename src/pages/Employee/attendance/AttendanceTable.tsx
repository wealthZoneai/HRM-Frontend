import { attendanceRecords } from "./attendanceData";
import AttendanceRow from "./AttendanceRow";

export default function AttendanceTable() {
  return (
    <>
      <h3 className="font-semibold mb-4 text-gray-900 text-base sm:text-lg">
        Attendance Table
      </h3>

      {/* Scrollable table wrapper */}
      <div className="overflow-y-auto overflow-x-auto max-h-80 -mx-4 sm:mx-0">
        <table className="min-w-[600px] sm:min-w-full text-sm text-gray-700 border-collapse">
          <thead className="bg-blue-100 text-gray-700 font-semibold text-xs sm:text-sm uppercase sticky top-0 z-10">
            <tr>
              <th className="py-2 px-3 sm:px-4 text-left whitespace-nowrap">Date</th>
              <th className="py-2 px-3 sm:px-4 text-left whitespace-nowrap">Login</th>
              <th className="py-2 px-3 sm:px-4 text-left whitespace-nowrap">Logout</th>
              <th className="py-2 px-3 sm:px-4 text-left whitespace-nowrap">Hours</th>
              <th className="py-2 px-3 sm:px-4 text-left whitespace-nowrap">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {attendanceRecords.map((r, i) => (
              <AttendanceRow key={i} {...r} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

