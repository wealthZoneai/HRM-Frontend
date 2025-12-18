import { useState, useEffect } from "react";
import LeaveDetailsModal from "./LeaveDetailsModal";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store";
import { fetchMyLeaves } from "../../../store/slice/leaveSlice";

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

  /* REMOVED DUMMY DATA */

  const dispatch = useDispatch<AppDispatch>();
  const { leaves } = useSelector((state: RootState) => state.leave);

  useEffect(() => {
    dispatch(fetchMyLeaves());
  }, [dispatch]);

  // Map Redux state to component's LeaveItem format
  const data: LeaveItem[] = leaves.map((leave: any) => ({
    type: leave.leave_type, // Assuming API returns 'leave_type'
    date: `${new Date(leave.start_date).toLocaleDateString()} - ${new Date(leave.end_date).toLocaleDateString()}`,
    duration: `${leave.days} Day${leave.days > 1 ? 's' : ''}`,
    submitted: new Date(leave.created_at || Date.now()).toLocaleDateString(), // Fallback if created_at missing
    status: leave.status === "hr_approved" || leave.status === "completed" ? "Approved" :
      leave.status === "hr_rejected" || leave.status === "tl_rejected" ? "Rejected" : "Pending",
    reason: leave.reason,
  }));

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
              {data.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500 italic">
                    No leave applications found.
                  </td>
                </tr>
              ) : (
                data.map((item, i) => (
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
                ))
              )}
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
