import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import DashboardLayout from "../../dashboard/DashboardLayout"; // Already imported above

export default function ApplyLeaveFormPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "Raviteja",
    type: "",
    from: "",
    to: "",
    id: "WZG-AI-0029",
    role: "Employee",
    reason: "",
    document: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm({ ...form, document: e.target.files[0] });
    }
  };

  const calculateDuration = () => {
    if (!form.from || !form.to) return "";
    const start = new Date(form.from);
    const end = new Date(form.to);

    // Basic validation to prevent negative days
    if (end < start) return "Invalid date range";

    const diff = end.getTime() - start.getTime();
    const days = Math.round(diff / (1000 * 3600 * 24)) + 1;
    return days > 0 ? `${days} Day(s)` : "";
  };

  const handleSubmit = () => {
    // Later this will POST to backend
    console.log(form);
    navigate("/employee/leave-management/success");
  };

  const durationDays = (() => {
    if (!form.from || !form.to) return 0;
    const start = new Date(form.from);
    const end = new Date(form.to);
    if (end < start) return 0;
    const diff = end.getTime() - start.getTime();
    return Math.round(diff / (1000 * 3600 * 24)) + 1;
  })();

  // Document is required for:
  // 1. Sick leave longer than 4 days
  // 2. Maternity/Paternity leave (always required)
  const isDocumentRequired = 
    (form.type === "Sick Leave" && durationDays > 4) ||
    form.type === "Maternity Leave" ||
    form.type === "Paternity Leave";

  // Show document upload for any sick leave, but only require it for >4 days
  // const showDocumentUpload = 
  //   form.type === "Sick Leave" ||
  //   form.type === "Maternity Leave" ||
  //   form.type === "Paternity Leave";

  const isFormValid =
    form.type !== "" &&
    form.from !== "" &&
    form.to !== "" &&
    form.reason !== "" &&
    durationDays > 0 &&
    (!isDocumentRequired || form.document !== null);

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="p-3 sm:p-6 md:p-8 max-w-4xl mx-auto">
      {/* === Page Header === */}
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
          Leave Application Form
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Leave manager / Apply for leave
        </p>
      </div>

      {/* === Form Card === */}
      <div className="bg-white p-4 sm:p-6 md:p-8 border border-slate-200 rounded-lg sm:rounded-xl shadow-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-x-6 md:gap-y-6"
        >
          {/* --- Name --- */}
          <div className="md:col-span-1">
            <label
              htmlFor="name"
              className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-1.5"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              disabled
              className="block w-full py-2 sm:py-2.5 px-3 sm:px-3.5 rounded-lg border border-slate-200 text-sm
                         bg-slate-50 text-slate-600 cursor-not-allowed"
            />
          </div>

          {/* --- Leave Type --- */}
          <div className="md:col-span-1">
            <label
              htmlFor="type"
              className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-1.5"
            >
              Leave Type
            </label>
            <select
              id="type"
              name="type"
              onChange={handleChange}
              className="block w-full py-2 sm:py-2.5 px-3 sm:px-3.5 rounded-lg border border-slate-300 text-sm
                         focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none
                         transition-colors"
            >
              <option value="">Select Leave Type</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Maternity Leave">Maternity Leave</option>
              <option value="Paternity Leave">Paternity Leave</option>
              <option value="Unpaid Leave">Unpaid Leave</option>
            </select>
          </div>

          {/* --- From Date --- */}
          <div className="md:col-span-1">
            <label
              htmlFor="from"
              className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-1.5"
            >
              From Date
            </label>
            <input
              id="from"
              type="date"
              name="from"
              min={today}
              onChange={handleChange}
              className="block w-full py-2 sm:py-2.5 px-3 sm:px-3.5 rounded-lg border border-slate-300 text-sm
                         focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none
                         transition-colors"
            />
          </div>

          {/* --- To Date --- */}
          <div className="md:col-span-1">
            <label
              htmlFor="to"
              className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-1.5"
            >
              To Date
            </label>
            <input
              id="to"
              type="date"
              name="to"
              min={form.from || today}
              onChange={handleChange}
              className="block w-full py-2 sm:py-2.5 px-3 sm:px-3.5 rounded-lg border border-slate-300 text-sm
                         focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none
                         transition-colors"
            />
          </div>

          {/* --- Auto Duration --- */}
          <div className="md:col-span-2">
            <label
              htmlFor="duration"
              className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-1.5"
            >
              Duration
            </label>
            <input
              id="duration"
              value={calculateDuration()}
              disabled
              className="block w-full py-2 sm:py-2.5 px-3 sm:px-3.5 rounded-lg border border-slate-200 text-sm
                         bg-slate-50 text-slate-600 cursor-not-allowed"
            />
          </div>

          {/* --- ID --- */}
          <div className="md:col-span-1">
            <label
              htmlFor="id"
              className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-1.5"
            >
              Employee ID
            </label>
            <input
              id="id"
              name="id"
              value={form.id}
              disabled
              className="block w-full py-2 sm:py-2.5 px-3 sm:px-3.5 rounded-lg border border-slate-200 text-sm
                         bg-slate-50 text-slate-600 cursor-not-allowed"
            />
          </div>

          {/* --- Role --- */}
          <div className="md:col-span-1">
            <label
              htmlFor="role"
              className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-1.5"
            >
              Role
            </label>
            <input
              id="role"
              name="role"
              value={form.role}
              disabled
              className="block w-full py-2 sm:py-2.5 px-3 sm:px-3.5 rounded-lg border border-slate-200 text-sm
                         bg-slate-50 text-slate-600 cursor-not-allowed"
            />
          </div>

          {/* --- Reason --- */}
          <div className="md:col-span-2">
            <label
              htmlFor="reason"
              className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-1.5"
            >
              Reason
            </label>
            <textarea
              id="reason"
              name="reason"
              rows={4}
              onChange={handleChange}
              className="block w-full py-2 sm:py-2.5 px-3 sm:px-3.5 rounded-lg border border-slate-300 text-sm
                         focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none
                         transition-colors"
            />
          </div>

          {/* --- Document Upload (Conditional) --- */}
          {isDocumentRequired && (
            <div className="md:col-span-2">
              <label
                htmlFor="document"
                className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-1.5"
              >
                Upload Document (Required)
              </label>
              <input
                id="document"
                type="file"
                name="document"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100
                  cursor-pointer"
              />
              <p className="text-xs text-slate-500 mt-1">
                Please upload relevant documents (e.g. medical certificate, birth certificate) (PDF, JPG, PNG).
              </p>
            </div>
          )}

          {/* --- Submit --- */}
          <div className="md:col-span-2 flex justify-end mt-3 sm:mt-4">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium shadow-sm transition-colors w-full sm:w-auto
                ${!isFormValid ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}
              `}
            >
              Submit For Leave
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}