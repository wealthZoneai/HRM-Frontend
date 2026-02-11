import React from "react";
import { FiX } from "react-icons/fi";

interface AnnouncementFormData {
    title: string;
    description: string;
    department: string;
    priority: string;
    date: string;
    time: string;
    location: string;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (form: AnnouncementFormData) => Promise<void> | void;
    initialData?: AnnouncementFormData | null;
}

const AddAnnouncementModal: React.FC<Props> = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [form, setForm] = React.useState<AnnouncementFormData>({
        title: "",
        description: "",
        department: "",
        priority: "",
        date: "",
        time: "",
        location: "",
    });

    const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    React.useEffect(() => {
        if (isOpen && initialData) {
            setForm(initialData);
        } else if (isOpen && !initialData) {
            setForm({
                title: "",
                description: "",
                department: "",
                priority: "",
                date: "",
                time: "",
                location: "",
            });
        }
    }, [isOpen, initialData]);

    if (!isOpen) return null;

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        // Clear error when user types
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: "" });
        }
    };

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!form.title.trim()) newErrors.title = "Title is required";
        if (!form.description.trim()) newErrors.description = "Description is required";
        if (!form.department) newErrors.department = "Department is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        setIsSubmitting(true);
        try {
            await onSubmit(form);
            // Don't close here, let parent handle closing on success
            // But reset form if needed? Parent usually closes modal, so reset happens on next open.
            setErrors({});
        } catch (error) {
            console.error("Error submitting form", error);
            // Keep modal open so user can retry
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <style>
                {`
                    .custom-scrollbar::-webkit-scrollbar {
                        width: 6px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-track {
                        background: transparent;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                        background-color: rgba(156, 163, 175, 0.5);
                        border-radius: 20px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                        background-color: rgba(156, 163, 175, 0.8);
                    }
                `}
            </style>

            {/* Modal Box */}
            <div className="w-full max-w-2xl rounded-2xl shadow-2xl bg-white animate-zoomIn max-h-[90vh] flex flex-col overflow-hidden">

                {/* Header Gradient - Fixed at top */}
                <div className="bg-linear-to-r from-blue-600 to-indigo-600 p-5 text-white flex justify-between items-center shrink-0 z-10">
                    <div>
                        <h2 className="text-2xl font-semibold">{initialData ? "Edit Announcement" : "Add New Announcement"}</h2>
                        <p className="text-sm opacity-80">{initialData ? "Update the announcement details below" : "Send updates to the selected departments"}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-white/20 transition-colors"
                        disabled={isSubmitting}
                    >
                        <FiX size={24} />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="p-6 overflow-y-auto custom-scrollbar">

                    {/* Title */}
                    <div className="mb-5">
                        <label className="text-sm font-medium text-gray-700">Announcement Title <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Enter announcement title"
                            className={`mt-2 w-full px-4 py-2.5 rounded-xl border ${errors.title ? 'border-red-500' : 'bg-gray-50'} focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
                        />
                        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                    </div>

                    {/* Description */}
                    <div className="mb-5">
                        <label className="text-sm font-medium text-gray-700">Description <span className="text-red-500">*</span></label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Enter announcement description"
                            className={`mt-2 w-full px-4 py-3 rounded-xl border ${errors.description ? 'border-red-500' : 'bg-gray-50'} h-28 resize-none focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
                        />
                        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                    </div>

                    {/* Grid Inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

                        {/* Department */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">Department <span className="text-red-500">*</span></label>
                            <select
                                name="department"
                                value={form.department}
                                onChange={handleChange}
                                className={`mt-2 w-full px-4 py-2.5 rounded-xl border ${errors.department ? 'border-red-500' : 'bg-gray-50'} focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
                            >
                                <option value="">Select department</option>
                                <option value="EMP">All Employees</option>
                                <option value="IT">IT Department</option>
                                <option value="HR">HR</option>
                                <option value="TL">Team Leads</option>
                                <option value="FIN">Finance</option>
                                <option value="MKT">Marketing</option>
                            </select>
                            {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
                        </div>

                        {/* Priority */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">Priority</label>
                            <select
                                name="priority"
                                value={form.priority}
                                onChange={handleChange}
                                className="mt-2 w-full px-4 py-2.5 rounded-xl border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            >
                                <option value="">Select Priority</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>

                    </div>

                    {/* Grid Inputs - Row 2 (Date & Time) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                        {/* Date */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">Date</label>
                            <input
                                type="date"
                                name="date"
                                value={form.date}
                                onChange={handleChange}
                                className="mt-2 w-full px-4 py-2.5 rounded-xl border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            />
                        </div>

                        {/* Time */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">Time</label>
                            <input
                                type="time"
                                name="time"
                                value={form.time}
                                onChange={handleChange}
                                className="mt-2 w-full px-4 py-2.5 rounded-xl border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Location */}
                    <div className="mb-6">
                        <label className="text-sm font-medium text-gray-700">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            placeholder="Enter location (e.g., Conference Room A / Remote)"
                            className="mt-2 w-full px-4 py-2.5 rounded-xl border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                    </div>

                    {/* Footer Buttons */}
                    <div className="flex justify-end gap-3 pt-2">

                        <button
                            onClick={onClose}
                            className="px-5 py-2 rounded-xl border text-gray-700 bg-gray-100 hover:bg-gray-200 transition"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className={`px-6 py-2 rounded-xl text-white shadow-md transition flex items-center justify-center min-w-[140px] ${isSubmitting
                                    ? "bg-blue-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700 transform active:scale-95"
                                }`}
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </>
                            ) : (
                                initialData ? "Update" : "Send Announcement"
                            )}
                        </button>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default AddAnnouncementModal;

