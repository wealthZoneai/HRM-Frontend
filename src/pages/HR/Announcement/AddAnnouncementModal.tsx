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
    onSubmit: (form: AnnouncementFormData) => void;
}

const AddAnnouncementModal: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
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

    const handleSubmit = () => {
        if (!validate()) return;
        onSubmit(form);
        onClose();
        setForm({ // Reset form
            title: "",
            description: "",
            department: "",
            priority: "",
            date: "",
            time: "",
            location: "",
        })
        setErrors({});
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
            <div className="w-full max-w-2xl rounded-2xl shadow-2xl bg-white animate-zoomIn max-h-[90vh] overflow-y-auto custom-scrollbar">

                {/* Header Gradient */}
                <div className="bg-linear-to-r from-blue-600 to-indigo-600 p-5 text-white flex justify-between items-center sticky top-0 z-10">
                    <div>
                        <h2 className="text-2xl font-semibold">Add New Announcement</h2>
                        <p className="text-sm opacity-80">Send updates to the selected departments</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-white/20 transition-colors"
                    >
                        <FiX size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">

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
                                <option value="All Departments">All departments</option>
                                <option value="React">React</option>
                                <option value="Java">Java</option>
                                <option value="UI/UX">UI/UX</option>
                                <option value="Python">Python</option>
                                <option value="Testing">QA</option>
                                <option value="HR">HR</option>
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
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleSubmit}
                            className="px-6 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-md transition"
                        >
                            Send Announcement
                        </button>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default AddAnnouncementModal;
