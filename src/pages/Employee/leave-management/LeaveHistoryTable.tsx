import { useState } from "react";
import LeaveDetailsModal from "./LeaveDetailsModal";

export default function LeaveHistoryTable() {
  type Status = "Approved" | "Rejected" | "Pending";

  type LeaveItem = {
    type: string;
    date: string;
    duration: string;
    submitted: string;
    status: Status;
    reason?: string; // Added optional reason field
  };

  const data: LeaveItem[] = [
    {
      type: "Annual Leave",
      date: "Dec 02, 2024 - Dec 06, 2024",
      duration: "7 Days",
      submitted: "Nov 25, 2024",
      status: "Approved",
      reason: "Family vacation to Bali. Will have limited connectivity.",
    },
    {
      type: "Sick Leave",
      date: "Nov 15, 2024 - Nov 16, 2024",
      duration: "2 Days",
      submitted: "Nov 14, 2024",
      status: "Rejected",
      reason: "Feeling unwell due to seasonal flu.",
    },
    {
      type: "Annual Leave",
      date: "Oct 10, 2024 - Oct 10, 2024",
      duration: "1 Day",
      submitted: "Oct 09, 2024",
      status: "Pending",
      reason: "Personal urgent work.",
    },
  ];

  const [selectedLeave, setSelectedLeave] = useState<LeaveItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowClick = (item: LeaveItem) => {
    setSelectedLeave(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLeave(null);
  };

  // Refined, softer styles for status pills
  const statusStyle: Record<Status, string> = {
    Approved: "text-green-700 bg-green-50",
    Rejected: "text-red-700 bg-red-50",
    Pending: "text-amber-700 bg-amber-50",
  };

  return (
    <>
      <div className="w-full bg-white shadow-sm border border-slate-200 rounded-lg sm:rounded-xl overflow-x-auto">
        <div className="min-w-full overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase hidden sm:table-header-group">
              <tr>
                <th className="p-2 sm:p-4 text-left font-semibold tracking-wider text-xs">Type</th>
                <th className="p-2 sm:p-4 text-left font-semibold tracking-wider text-xs">Date</th>
                <th className="p-2 sm:p-4 text-left font-semibold tracking-wider text-xs">Duration</th>
                <th className="p-2 sm:p-4 text-left font-semibold tracking-wider text-xs">Submission</th>
                <th className="p-2 sm:p-4 text-left font-semibold tracking-wider text-xs">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {data.map((item, i) => (
                <tr
                  key={i}
                  onClick={() => handleRowClick(item)}
                  className="text-xs sm:text-sm text-slate-700 block sm:table-row mb-4 sm:mb-0 border border-slate-200 sm:border-0 rounded-lg sm:rounded-none p-2 sm:p-0 cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <td className="block sm:table-cell p-2 sm:p-4 before:content-['Type'] before:font-bold before:text-slate-600 before:mr-2 sm:before:content-none">
                    <span className="font-medium">{item.type}</span>
                  </td>
                  <td className="block sm:table-cell p-2 sm:p-4 before:content-['Date'] before:font-bold before:text-slate-600 before:mr-2 sm:before:content-none">
                    <span className="text-xs">{item.date}</span>
                  </td>
                  <td className="block sm:table-cell p-2 sm:p-4 before:content-['Duration'] before:font-bold before:text-slate-600 before:mr-2 sm:before:content-none">
                    {item.duration}
                  </td>
                  <td className="block sm:table-cell p-2 sm:p-4 before:content-['Submitted'] before:font-bold before:text-slate-600 before:mr-2 sm:before:content-none">
                    <span className="text-xs">{item.submitted}</span>
                  </td>
                  <td className="block sm:table-cell p-2 sm:p-4 before:content-['Status'] before:font-bold before:text-slate-600 before:mr-2 sm:before:content-none">
                    <span
                      className={`px-2 sm:px-3 py-1 text-xs rounded-full font-medium inline-block ${statusStyle[item.status]
                        }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <LeaveDetailsModal
        isOpen={isModalOpen}
        data={selectedLeave}
        onClose={closeModal}
      />
    </>
  );
}
