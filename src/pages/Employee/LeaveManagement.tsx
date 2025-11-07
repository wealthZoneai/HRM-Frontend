import DashboardLayout from "../../components/dashboard/DashboardLayout";
import LeaveBalances from "../../components/leave-management/LeaveBalances";
import LeaveHistoryTable from "../../components/leave-management/LeaveHistoryTable";
import { useNavigate } from "react-router-dom";

export default function LeaveManagement() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="p-6">
        <h2 className="text-xl font-semibold">My Leave Management</h2>
        <p className="text-gray-500 text-sm mb-4">Dashboard / Leave Management</p>

        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate("/leave-management/apply")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Apply for Leave +
          </button>
        </div>

        <LeaveBalances />

        <h3 className="text-lg font-semibold mt-10 mb-3">Request History</h3>
        <LeaveHistoryTable />
      </div>
    </DashboardLayout>
  );
}
