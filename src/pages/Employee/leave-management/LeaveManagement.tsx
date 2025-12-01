import LeaveBalances from "../leave-management/LeaveBalances";
import LeaveHistoryTable from "../leave-management/LeaveHistoryTable";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

export default function LeaveManagement() {
  const navigate = useNavigate();

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* === Header === */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl md:text-md font-bold text-gray-900 tracking-tight">
            Leave Management
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Track your leave balances and manage requests
          </p>
        </div>

        <button
          onClick={() => navigate("/employee/leave-management/apply")}
          className="group flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-blue-300 transition-all w-full sm:w-auto justify-center"
        >
          <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
          Apply for Leave
        </button>
      </div>

      {/* === Leave Balances === */}
      <section>
        <LeaveBalances />
      </section>

      {/* === Request History === */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Leave History
          </h3>
        </div>
        <LeaveHistoryTable />
      </section>
    </div>
  );
}