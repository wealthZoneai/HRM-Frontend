import React from "react";

export type LeaveStatus = "Approved" | "Declined" | "Pending";

export interface LeaveRow {
  id: string;
  name: string;
  type: string;
  from: string;
  to: string;
  days: number;
  reason: string;
  status: LeaveStatus;
  // optional fields you might add later:
  // avatar?: string;
  // employeeId?: string;
  // department?: string;
}

interface Props {
  data: LeaveRow[];
  onView: (row: LeaveRow) => void;
}

const statusColors: Record<LeaveStatus, string> = {
  Approved: "bg-green-100 text-green-700 border border-green-200",
  Declined: "bg-red-100 text-red-700 border border-red-200",
  Pending: "bg-yellow-100 text-yellow-700 border border-yellow-200",
};

const LeaveTableResponsive: React.FC<Props> = ({ data, onView }) => {
  return (
    <div className="space-y-4 overflow-y-auto max-h-[50vh] no-scrollbar">
      {/* ------------------ DESKTOP / TABLET TABLE (md+) ------------------ */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm">
                <th className="px-5 py-3 font-semibold text-left">Employee</th>
                <th className="px-5 py-3 font-semibold text-left">Leave Type</th>
                <th className="px-5 py-3 font-semibold text-left">From</th>
                <th className="px-5 py-3 font-semibold text-left">To</th>
                <th className="px-5 py-3 font-semibold text-center">Days</th>
                <th className="px-5 py-3 font-semibold text-left">Reason</th>
                <th className="px-5 py-3 font-semibold text-center">Status</th>
              </tr>
            </thead>

            <tbody className="text-gray-800">
              {data.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-gray-500 italic">
                    No leave requests found.
                  </td>
                </tr>
              ) : (
                data.map((row, index) => (
                  <tr
                    key={row.id}
                    onClick={() => onView(row)}
                    className={`group cursor-pointer transition 
                      ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50`}
                  >
                    <td className="px-5 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                          {row.name.charAt(0)}
                        </div>
                        <span className="font-medium">{row.name}</span>
                      </div>
                    </td>

                    <td className="px-5 py-3">{row.type}</td>
                    <td className="px-5 py-3">{row.from}</td>
                    <td className="px-5 py-3">{row.to}</td>

                    <td className="px-5 py-3 text-center font-semibold text-gray-700">
                      {row.days}
                    </td>

                    <td className="px-5 py-3">{row.reason}</td>

                    <td className="px-5 py-3 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[row.status]}`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ------------------ MOBILE CARD LIST (< md) ------------------ */}
      <div className="md:hidden flex flex-col gap-3">
        {data.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-500 italic">
            No leave requests found.
          </div>
        ) : (
          data.map((row) => (
            <button
              key={row.id}
              onClick={() => onView(row)}
              className="w-full text-left bg-white rounded-xl border border-gray-200 shadow-sm p-4 hover:shadow-md transition"
              aria-label={`View leave request for ${row.name}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium text-base">
                    {row.name.charAt(0)}
                  </div>

                  <div className="min-w-0">
                    <p className="font-medium text-gray-800 truncate">{row.name}</p>
                    <p className="text-xs text-gray-500 truncate">{row.type} • {row.days} day{row.days > 1 ? "s" : ""}</p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className="text-sm text-gray-600">{row.from}</div>
                  <span className={`text-xs px-3 py-1 rounded-full ${statusColors[row.status]}`}>
                    {row.status}
                  </span>
                </div>
              </div>

              {/* Reason & To-date shown beneath on mobile */}
              <div className="mt-3 text-sm text-gray-600">
                <div><strong>To:</strong> {row.to}</div>
                <div className="mt-1 truncate"><strong>Reason:</strong> {row.reason}</div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default LeaveTableResponsive;
