import { useNavigate } from "react-router-dom";
// import DashboardLayout from "../../dashboard/DashboardLayout"; // Already imported above

export default function ApplyLeaveSuccess() {
  const navigate = useNavigate();
  
  return (
      <div className="flex items-center justify-center min-h-[calc(100vh-100px)] p-4">
        <div
          className="flex flex-col items-center justify-center 
                       bg-white p-6 sm:p-8 md:p-12 border border-slate-200 rounded-lg sm:rounded-xl shadow-sm max-w-sm mx-auto"
        >
          <img
            src="https://img.icons8.com/fluency/96/00A3FF/task-completed.png"
            alt="Success"
            className="w-16 sm:w-20 h-16 sm:h-20"
          />
          <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mt-4 sm:mt-6">
            Application Submitted
          </h3>
          <p className="text-slate-500 text-xs sm:text-sm mt-2 max-w-xs text-center">
            Your leave application has been submitted and will be reviewed by the
            admin.
          </p>
          <button
            onClick={() => navigate("/employee/leave-management")} // Navigate back to main page
            className="mt-6 sm:mt-8 bg-blue-600 text-white px-6 sm:px-8 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base
                       font-medium shadow-sm hover:bg-blue-700 transition-colors w-full sm:w-auto"
          >
            Close
          </button>
        </div>
      </div>
  );
}