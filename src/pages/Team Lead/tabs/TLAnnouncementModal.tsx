import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";

interface TLAnnouncementFormData {
    title: string;
    description: string;
    date: string;
    time: string;
    priority: string;
    show_in_calendar: boolean;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (form: TLAnnouncementFormData) => void;
}

const TLAnnouncementModal: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
    const [form, setForm] = useState<TLAnnouncementFormData>({
        title: "",
        description: "",
        date: "",
        time: "",
        priority: "Medium",
        show_in_calendar: true,
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Reset form when modal opens
    useEffect(() => {
        if (isOpen) {
            setForm({
                title: "",
                description: "",
                date: "",
                time: "",
                priority: "Medium",
                show_in_calendar: true,
            });
            setErrors({});
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

        setForm({ ...form, [name]: val });

        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    };

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        const today = new Date().toISOString().split("T")[0];
        const now = new Date().toTimeString().substring(0, 5); // HH:MM

        if (!form.title.trim()) newErrors.title = "Title is required";
        if (!form.description.trim()) newErrors.description = "Description is required";
        if (!form.date) newErrors.date = "Date is required";
        if (!form.time) newErrors.time = "Time is required";

        if (form.date && form.date < today) {
            newErrors.date = "Past dates are not allowed.";
        }

        if (form.date === today && form.time && form.time <= now) {
            newErrors.time = "Past time is not allowed for today's date.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) return;
        onSubmit(form);
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden animate-zoomIn">

                {/* Header */}
                <div className="bg-linear-to-r from-blue-600 to-indigo-600 p-5 text-white flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold">New Announcement</h2>
                        <p className="text-sm opacity-90">Send an update to your team</p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-white/20 transition-colors">
                        <FiX size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-4">

                    {/* Title */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">Title <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Announcement title"
                            className={`w-full px-4 py-2 rounded-lg border ${errors.title ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                        />
                        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">Description <span className="text-red-500">*</span></label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Write your message..."
                            className={`w-full px-4 py-2 rounded-lg border ${errors.description ? 'border-red-500' : 'border-gray-300'} h-24 resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                        />
                        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                    </div>

                    {/* Date & Time */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-1">Date <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <input
                                    type="date"
                                    name="date"
                                    value={form.date}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 rounded-lg border ${errors.date ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
                                />
                            </div>
                            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-1">Time <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <input
                                    type="time"
                                    name="time"
                                    value={form.time}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 rounded-lg border ${errors.time ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
                                />
                            </div>
                            {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
                        </div>
                    </div>

                    {/* Priority & Calendar */}
                    <div className="grid grid-cols-2 gap-4 items-center">
                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-1">Priority</label>
                            <select
                                name="priority"
                                value={form.priority}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>

                        <div className="flex items-center space-x-2 mt-6">
                            <input
                                type="checkbox"
                                id="show_in_calendar"
                                name="show_in_calendar"
                                checked={form.show_in_calendar}
                                onChange={handleChange}
                                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                            />
                            <label htmlFor="show_in_calendar" className="text-sm text-gray-700 cursor-pointer select-none">Show in Calendar</label>
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-100">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-5 py-2 text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700 hover:shadow-md transition-all transform active:scale-95"
                    >
                        Post Announcement
                    </button>
                </div>

            </div>
        </div>
    );
};

export default TLAnnouncementModal;
