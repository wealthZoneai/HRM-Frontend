import React from "react";

interface AnnouncementFormData {
    title: string;
    description: string;
    department: string;
    priority: string;
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
    });

    if (!isOpen) return null;

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        onSubmit(form);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">

            {/* Modal Box */}
            <div className="w-full max-w-2xl rounded-2xl shadow-2xl bg-white overflow-hidden animate-zoomIn">

                {/* Header Gradient */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-5 text-white">
                    <h2 className="text-2xl font-semibold">Add New Announcement</h2>
                    <p className="text-sm opacity-80">Send updates to the selected departments</p>
                </div>

                {/* Content */}
                <div className="p-6">

                    {/* Title */}
                    <div className="mb-5">
                        <label className="text-sm font-medium text-gray-700">Announcement Title</label>
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Enter announcement title"
                            className="mt-2 w-full px-4 py-2.5 rounded-xl border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                    </div>

                    {/* Description */}
                    <div className="mb-5">
                        <label className="text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Enter announcement description"
                            className="mt-2 w-full px-4 py-3 rounded-xl border bg-gray-50 h-28 resize-none focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                    </div>

                    {/* Grid Inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

                        {/* Department */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">Department</label>
                            <select
                                name="department"
                                value={form.department}
                                onChange={handleChange}
                                className="mt-2 w-full px-4 py-2.5 rounded-xl border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            >
                                <option value="">Select department</option>
                                <option value="React">React</option>
                                <option value="Java">Java</option>
                                <option value="UI/UX">UI/UX</option>
                                <option value="Python">Python</option>
                                <option value="Testing">Testing</option>
                                <option value="HR">HR</option>
                            </select>
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
                                <option value="Normal">Normal</option>
                                <option value="High">High</option>
                                <option value="Urgent">Urgent</option>
                            </select>
                        </div>

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
