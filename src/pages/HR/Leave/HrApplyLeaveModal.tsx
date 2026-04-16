import React, { useState, useEffect } from "react";
import { FiX, FiUploadCloud } from "react-icons/fi";
import { GetMyProfile, ApplyLeave } from "../../../Services/apiHelpers";
import { showSuccess, showError } from "../../../utils/toast";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function HrApplyLeaveModal({ isOpen, onClose, onSuccess }: Props) {
  const [form, setForm] = useState({
    name: "Loading...",
    type: "",
    from: "",
    to: "",
    empId: "",
    role: "HR",
    reason: "",
    document: null as File | null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const fetchUserData = async () => {
        setIsLoading(true);
        try {
          const response = await GetMyProfile();
          const data = response.data;
          const user = data.user;
          const profile = data.profile;

          setForm((prev) => ({
            ...prev,
            name: `${user.first_name || ""} ${user.last_name || ""}`.trim() || user.username,
            empId: profile?.emp_id || "N/A",
            role: user.role.toUpperCase(),
          }));
        } catch (error) {
          console.error("Failed to fetch profile", error);
          showError("Failed to load user information.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchUserData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

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
    if (end < start) return "Invalid date range";
    const diff = end.getTime() - start.getTime();
    const days = Math.round(diff / (1000 * 3600 * 24)) + 1;
    return days > 0 ? `${days} Day(s)` : "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("leave_type", form.type);
      formData.append("start_date", form.from);
      formData.append("end_date", form.to);
      formData.append("reason", form.reason);
      if (form.document) {
        formData.append("document", form.document);
      }

      await ApplyLeave(formData);
      showSuccess("Leave application submitted successfully!");
      if (onSuccess) onSuccess();
      onClose();
    } catch (error: any) {
      console.error(error);
      const msg = error.response?.data?.detail || "Failed to submit leave application.";
      showError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const durationDays = (() => {
    if (!form.from || !form.to) return 0;
    const start = new Date(form.from);
    const end = new Date(form.to);
    if (end < start) return 0;
    const diff = end.getTime() - start.getTime();
    return Math.round(diff / (1000 * 3600 * 24)) + 1;
  })();

  const isDocumentRequired =
    (form.type === "SICK" && durationDays > 4) ||
    form.type === "MATERNITY" ||
    form.type === "PATERNITY";

  const showDocumentUpload =
    form.type === "SICK" ||
    form.type === "MATERNITY" ||
    form.type === "PATERNITY";

  const isFormValid =
    form.type !== "" &&
    form.from !== "" &&
    form.to !== "" &&
    form.reason !== "" &&
    durationDays > 0 &&
    (!isDocumentRequired || form.document !== null);

  const today = new Date().toISOString().split("T")[0];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl transform transition-all flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 rounded-t-2xl">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">Apply For Leave</h3>
                        <p className="text-sm text-gray-500">Submit your leave request</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500 hover:text-gray-700"
                    >
                        <FiX size={20} />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="p-6 overflow-y-auto custom-scrollbar">
                    {isLoading ? (
                        <div className="flex justify-center py-10">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            {/* Name */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Name</label>
                                <input
                                    name="name"
                                    value={form.name}
                                    disabled
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-600 font-medium text-sm"
                                />
                            </div>

                            {/* Role */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Role</label>
                                <input
                                    name="role"
                                    value={form.role}
                                    disabled
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-600 font-medium text-sm"
                                />
                            </div>

                            {/* Employee ID */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Employee ID</label>
                                <input
                                    type="text"
                                    name="empId"
                                    value={form.empId}
                                    disabled
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-600 font-medium text-sm"
                                />
                            </div>

                            {/* Leave Type */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Leave Type <span className="text-red-500">*</span></label>
                                <select
                                    name="type"
                                    value={form.type}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm bg-white"
                                    required
                                >
                                    <option value="">Select Category</option>
                                    <option value="CASUAL">Casual Leave</option>
                                    <option value="SICK">Sick Leave</option>
                                    <option value="MATERNITY">Maternity Leave</option>
                                    <option value="PATERNITY">Paternity Leave</option>
                                </select>
                            </div>

                            {/* Dates */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">From Date <span className="text-red-500">*</span></label>
                                <input
                                    type="date"
                                    name="from"
                                    min={today}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">To Date <span className="text-red-500">*</span></label>
                                <input
                                    type="date"
                                    name="to"
                                    min={form.from || today}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                                    required
                                />
                            </div>

                            {/* Duration */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Duration</label>
                                <input
                                    value={calculateDuration()}
                                    disabled
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-600 font-medium text-sm"
                                />
                            </div>

                            {/* Reason */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Reason <span className="text-red-500">*</span></label>
                                <textarea
                                    name="reason"
                                    rows={3}
                                    onChange={handleChange}
                                    placeholder="Please describe the reason for your leave..."
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm resize-none"
                                    required
                                />
                            </div>

                            {/* Document Upload */}
                            {showDocumentUpload && (
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Upload Document 
                                        {isDocumentRequired && <span className="text-red-500">*</span>}
                                    </label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition cursor-pointer relative">
                                        <input
                                            type="file"
                                            name="document"
                                            accept=".pdf,.jpg,.jpeg,.png"
                                            onChange={handleFileChange}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            required={isDocumentRequired}
                                        />
                                        <FiUploadCloud className="w-8 h-8 text-blue-500 mb-2" />
                                        <p className="text-sm font-medium text-gray-700">
                                            {form.document ? form.document.name : "Click to upload or drag and drop"}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </form>
                    )}
                </div>

                {/* Footer actions */}
                <div className="p-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50 rounded-b-2xl">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={!isFormValid || isSubmitting}
                        className={`px-6 py-2.5 rounded-lg text-sm font-medium text-white shadow-lg transition-all transform active:scale-95
                        ${!isFormValid || isSubmitting ? "bg-gray-400 cursor-not-allowed shadow-none" : "bg-blue-600 hover:bg-blue-700"}
                    `}
                    >
                        {isSubmitting ? "Submitting..." : "Submit Application"}
                    </button>
                </div>
            </div>
        </div>
    );
}