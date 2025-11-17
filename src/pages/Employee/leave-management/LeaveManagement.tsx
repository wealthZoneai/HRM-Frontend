import LeaveBalances from "../leave-management/LeaveBalances";
import LeaveHistoryTable from "../leave-management/LeaveHistoryTable";
import { useNavigate } from "react-router-dom";
// Assuming this layout provides the light gray page background

export default function LeaveManagement() {
  const navigate = useNavigate();

  return (
      <div className="p-3 sm:p-6 md:p-8 max-w-7xl mx-auto">
        {/* === Header === */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-0 mb-6 sm:mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
              My Leave Management
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Dashboard / Leave Management
            </p>
          </div>
          <button
            onClick={() => navigate("/employee/leave-management/apply")}
            className="flex items-center gap-2 bg-blue-600 text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base
                       font-medium shadow-sm hover:bg-blue-700 transition-colors w-full sm:w-auto justify-center sm:justify-start"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Apply for Leave
          </button>
        </div>

        {/* === Leave Balances === */}
        <LeaveBalances />

        {/* === Request History === */}
        <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mt-8 sm:mt-10 mb-3 sm:mb-4">
          Request History
        </h3>
        <LeaveHistoryTable />
      </div>
  );
}