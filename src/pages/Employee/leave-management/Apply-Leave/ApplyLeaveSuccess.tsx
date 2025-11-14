import DashboardLayout from "../../dashboard/DashboardLayout";
import { useNavigate } from "react-router-dom";

export default function ApplyLeaveSuccess() {
  const navigate = useNavigate();
  return (
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <img src="https://img.icons8.com/emoji/96/00A3FF/thumbs-up-emoji.png" alt="thumb" />
        <p className="text-blue-600 text-lg mt-4">Your leave application would be reviewed by the admin.</p>
        <button onClick={() => navigate("/employee")} className="mt-6 bg-blue-600 text-white px-8 py-2 rounded-lg">
          Close
        </button>
      </div>
  );
}
