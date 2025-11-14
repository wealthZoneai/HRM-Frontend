export default function LeaveHistoryTable() {
  type Status = 'Approved' | 'Rejected' | 'Pending';

  type LeaveItem = {
    type: string;
    date: string;
    duration: string;
    submitted: string;
    status: Status;
  };

  const data: LeaveItem[] = [
    { type: "Annual Leave", date: "Dec02,2024-Dec06,2024", duration: "7 Days", submitted: "Nov 25,2024", status: "Approved" },
    { type: "Sick Leave", date: "Dec02,2024-Dec06,2024", duration: "2 Days", submitted: "Nov 25,2024", status: "Rejected" },
    { type: "Annual Leave", date: "Dec02,2024-Dec06,2024", duration: "7 Days", submitted: "Nov 25,2024", status: "Pending" }
  ];

  const statusStyle: Record<Status, string> = {
    Approved: "text-green-600 bg-green-100",
    Rejected: "text-red-600 bg-red-100",
    Pending: "text-yellow-600 bg-yellow-100",
  };

  return (
    <table className="w-full bg-white shadow-md rounded-xl overflow-hidden">
      <thead className="bg-gray-100 text-gray-600 text-sm">
        <tr>
          <th className="p-3 text-left">Type</th>
          <th className="p-3 text-left">Date</th>
          <th className="p-3 text-left">Duration</th>
          <th className="p-3 text-left">Submission Date</th>
          <th className="p-3 text-left">Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, i) => (
          <tr key={i} className="border-t">
            <td className="p-3">{item.type}</td>
            <td className="p-3">{item.date}</td>
            <td className="p-3">{item.duration}</td>
            <td className="p-3">{item.submitted}</td>
            <td className="p-3">
              <span className={`px-3 py-1 text-xs rounded-lg ${statusStyle[item.status]}`}>
                {item.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
