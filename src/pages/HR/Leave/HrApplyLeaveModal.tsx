import React, { useState } from "react";
import { FiX, FiUploadCloud } from "react-icons/fi";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export default function HrApplyLeaveModal({ isOpen, onClose }: Props) {
    const [form, setForm] = useState({
        name: "HR Manager", // Default or fetched from user context
        type: "",
        from: "",
        to: "",
        empId: "", // New field for employee ID
        id: "HR-001",
        role: "HR",
        reason: "",
        document: null as File | null,
    });

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // API call logic here
        console.log("Submitting Leave Application:", form);
        alert("Leave application submitted successfully!");
        onClose();
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
    const showDocumentUpload = 
        form.type === "Sick Leave" ||
        form.type === "Maternity Leave" ||
        form.type === "Paternity Leave";

    const isFormValid =
        form.type !== "" &&
        form.from !== "" &&
        form.to !== "" &&
        form.empId !== "" &&
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
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Employee ID <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="empId"
                                value={form.empId}
                                onChange={handleChange}
                                placeholder="Enter employee ID"
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                                required
                            />
                        </div>

                        {/* Leave Type */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Leave Type <span className="text-red-500">*</span></label>
                            <select
                                name="type"
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm bg-white"
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="Casual Leave">Casual Leave</option>
                                <option value="Sick Leave">Sick Leave</option>
                                <option value="Maternity Leave">Maternity Leave</option>
                                <option value="Paternity Leave">Paternity Leave</option>
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

                        {/* Duration (Read-only) */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Duration</label>
                            <input
                                value={calculateDuration()}
                                disabled
                                placeholder="Select dates to calculate duration"
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
                                    {form.type === "Sick Leave" && !isDocumentRequired && (
                                        <span className="text-xs text-gray-500 ml-1">(Optional for 4 days or less)</span>
                                    )}
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
                                    <p className="text-xs text-gray-500 mt-1">
                                        {isDocumentRequired 
                                            ? "Document is required for this leave type" 
                                            : form.type === "Sick Leave"
                                                ? "Document is optional (recommended)"
                                                : "Document is required"}
                                    </p>
                                </div>
                            </div>
                        )}
                    </form>
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
                        onClick={handleSubmit as any}
                        disabled={!isFormValid}
                        className={`px-6 py-2.5 rounded-lg text-sm font-medium text-white shadow-lg shadow-blue-500/30 transition-all transform active:scale-95
                    ${!isFormValid ? "bg-gray-400 cursor-not-allowed shadow-none" : "bg-blue-600 hover:bg-blue-700"}
                `}
                    >
                        Submit Application
                    </button>
                </div>

            </div>
        </div>
    );
}
