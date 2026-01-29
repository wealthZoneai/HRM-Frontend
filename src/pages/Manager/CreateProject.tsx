import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../hooks/useAuth';
import { FiSave, FiArrowLeft } from "react-icons/fi";
import { showLoginSuccess, showWarning, showLoginError } from "../../utils/toast";
import { CreateProject as ApiCreateProject, GetAllEmployes } from "../../Services/apiHelpers";

const CreateProject: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const role = user?.role || "dm";
    const routePrefix = role === "pm" ? "/pm" : "/dm";

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        project_manager: "", // User ID
    });

    const [managers, setManagers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Fetch only Project Managers directly from backend
        GetAllEmployes({ role: 'pm' })
            .then((res) => {
                // Paginated response contains .results, flat list is .data
                const pms = res.data.results || res.data;
                setManagers(pms);
            })
            .catch((err) => console.error("Failed to fetch project managers", err));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const payload = {
                name: formData.name,
                description: formData.description,
                // Only include PM if selected (it's optional in model)
                ...(formData.project_manager ? { project_manager: formData.project_manager } : {}),
                status: 'draft'
            };

            await ApiCreateProject(payload);
            showLoginSuccess("Project Created Successfully");
            navigate(`${routePrefix}/dashboard`);

        } catch (error: any) {
            console.error("Create Project Error:", error);
            showLoginError(error.response?.data?.detail || "Failed to create project");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6 flex items-center gap-3">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 hover:bg-gray-200 rounded-full transition"
                >
                    <FiArrowLeft size={20} />
                </button>
                <h1 className="text-2xl font-bold text-gray-800">Create New Project</h1>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <form onSubmit={handleSubmit} className="space-y-6">

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                            placeholder="e.g. HRMS Revamp"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            name="description"
                            rows={4}
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                            placeholder="Project details..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Assign Project Manager</label>
                        <select
                            name="project_manager"
                            value={formData.project_manager}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-white"
                        >
                            <option value="">-- Select Project Manager (Optional) --</option>
                            {managers.map((pm: any) => (
                                <option key={pm.id} value={pm.user?.username}>
                                    {pm.user?.username} ({pm.work_email})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="px-6 py-2.5 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition flex items-center gap-2 shadow-lg shadow-blue-500/30 ${isLoading ? 'opacity-70' : ''}`}
                        >
                            <FiSave /> {isLoading ? "Creating..." : "Create Project"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default CreateProject;
