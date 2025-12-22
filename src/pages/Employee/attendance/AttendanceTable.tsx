import { useEffect, useState } from "react";
import AttendanceRow from "./AttendanceRow";
import { gettotalAttendance } from "../../../Services/apiHelpers";

interface AttendanceRowData {
  date: string;
  login: string;
  logout: string;
  hours: string;
  status: string;
}

const formatTime = (dateTime: string | null) => {
  if (!dateTime) return "--";
  return new Date(dateTime).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function AttendanceTable() {

  const [attendanceRecords, setAttendanceRecords] = useState<
    AttendanceRowData[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await gettotalAttendance();

        // API may return object or array → handle both
        const dataArray = Array.isArray(res.data)
          ? res.data
          : [res.data];

        const formatted = dataArray.map((item: any) => ({
          date: item.date,
          login: formatTime(item.clock_in),
          logout: formatTime(item.clock_out),
          hours: item.duration_time ?? "--",
          status: item.status,
        }));

        setAttendanceRecords(formatted);
      } catch (err) {
        console.error("Attendance fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  return (
    <>
      <h3 className="font-semibold mb-4 text-gray-900 text-base sm:text-lg">
        Attendance Table
      </h3>

      <div className="overflow-y-auto overflow-x-auto max-h-80 -mx-4 sm:mx-0">
        <table className="min-w-[600px] sm:min-w-full text-sm text-gray-700 border-collapse">
          <thead className="bg-blue-100 text-gray-700 font-semibold text-xs sm:text-sm uppercase sticky top-0 z-10">
            <tr>
              <th className="py-2 px-3 sm:px-4 text-left">Date</th>
              <th className="py-2 px-3 sm:px-4 text-left">Login</th>
              <th className="py-2 px-3 sm:px-4 text-left">Logout</th>
              <th className="py-2 px-3 sm:px-4 text-left">Hours</th>
              <th className="py-2 px-3 sm:px-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : attendanceRecords.length > 0 ? (
              attendanceRecords.map((row, index) => (
                <AttendanceRow key={index} {...row} />
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  No attendance found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
