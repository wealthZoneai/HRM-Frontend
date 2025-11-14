import { CalendarDays, Clock } from "lucide-react";

export default function LeaveRequests() {
  const data = [
    { type: "Sick Leave", time: "2 hrs ago", status: "Pending" },
    { type: "Sick Leave", time: "13 days ago", status: "Approved" },
    { type: "Sick Leave", time: "2 days ago", status: "Rejected" },
  ];

  const statusStyle: Record<string, string> = {
    Pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
    Approved: "bg-green-100 text-green-700 border-green-300",
    Rejected: "bg-red-100 text-red-700 border-red-300",
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Leave Requests</h3>
      </div>

      <div className="space-y-3 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
        {data.map((req, i) => (
          <div
            key={i}
            className="flex justify-between items-center border rounded-lg p-3 hover:shadow-sm transition-all"
          >
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <CalendarDays className="w-4 h-4 text-gray-500" />
                <p className="font-medium">{req.type}</p>
              </div>
              <div className="flex items-center text-gray-500 text-xs space-x-1">
                <Clock className="w-3 h-3" />
                <span>{req.time}</span>
              </div>
            </div>

            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full border ${statusStyle[req.status]}`}
            >
              {req.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
