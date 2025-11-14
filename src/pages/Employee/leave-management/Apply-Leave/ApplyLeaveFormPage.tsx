import DashboardLayout from "../../dashboard/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ApplyLeaveFormPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    type: "",
    from: "",
    to: "",
    id: "",
    role: "",
    reason: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const calculateDuration = () => {
    if (!form.from || !form.to) return "";
    const start = new Date(form.from);
    const end = new Date(form.to);

    const diff = end.getTime() - start.getTime();
    const days = diff / (1000 * 3600 * 24) + 1;
    return days > 0 ? `${days} Days` : "";
  };

  const handleSubmit = () => {
    // Later this will POST to backend
    navigate("/leave-management/success");
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-3xl">
        <h2 className="text-xl font-semibold">Leave Application Form</h2>
        <p className="text-gray-500 text-sm mb-6">Leave manager / Apply for leave</p>

        <div className="flex flex-col gap-6">

          {/* Name */}
          <div>
            <label className="text-sm text-gray-600">Name</label>
            <input
              name="name"
              onChange={handleChange}
              className="p-3 w-full rounded-lg border border-gray-300
              focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none mt-1"
            />
          </div>

          {/* Leave Type */}
          <div>
            <label className="text-sm text-gray-600">Leave Type</label>
            <select
              name="type"
              onChange={handleChange}
              className="p-3 w-full rounded-lg border border-gray-300
              focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none mt-1"
            >
              <option value="">Select Leave Type</option>
              <option value="Annual Leave">Annual Leave</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Unpaid Leave">Unpaid Leave</option>
            </select>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">From Date</label>
              <input
                type="date"
                name="from"
                onChange={handleChange}
                className="p-3 w-full rounded-lg border border-gray-300
                focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none mt-1"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">To Date</label>
              <input
                type="date"
                name="to"
                onChange={handleChange}
                className="p-3 w-full rounded-lg border border-gray-300
                focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none mt-1"
              />
            </div>
          </div>

          {/* Auto Duration */}
          <div>
            <label className="text-sm text-gray-600">Duration</label>
            <input
              value={calculateDuration()}
              disabled
              className="p-3 w-full rounded-lg border border-gray-200
              bg-gray-100 text-gray-600 mt-1 cursor-not-allowed"
            />
          </div>

          {/* ID + Role */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">ID</label>
              <input
                name="id"
                onChange={handleChange}
                className="p-3 w-full rounded-lg border border-gray-300
                focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none mt-1"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Role</label>
              <input
                name="role"
                onChange={handleChange}
                className="p-3 w-full rounded-lg border border-gray-300
                focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none mt-1"
              />
            </div>
          </div>

          {/* Reason */}
          <div>
            <label className="text-sm text-gray-600">Reason</label>
            <textarea
              name="reason"
              rows={4}
              onChange={handleChange}
              className="p-3 w-full rounded-lg border border-gray-300
              focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none mt-1"
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            className="mt-2 w-fit bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Submit For Leave
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
