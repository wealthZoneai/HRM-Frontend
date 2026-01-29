import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../hooks/useAuth';
import { FiSave, FiArrowLeft } from "react-icons/fi";
import { showLoginSuccess, showLoginError } from "../../utils/toast";
import { CreateModule as ApiCreateModule, GetPMProjects, GetAllEmployes } from "../../Services/apiHelpers";

const CreateModule: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const role = user?.role || "dm";
    const routePrefix = role === "pm" ? "/pm" : "/dm";

    const [formData, setFormData] = useState({
        projectName: "", // This stores projectId
        moduleName: "",
        description: "",
        team_lead: "",
    });

    const [projects, setProjects] = useState<any[]>([]);
    const [teamLeads, setTeamLeads] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Fetch Projects for this PM
        GetPMProjects()
            .then((res) => {
                // Handle pagination if applicable
                const projectList = res.data.results || res.data;
                setProjects(projectList);
            })
            .catch((err) => console.error("Failed to fetch projects", err));

        // Fetch only Team Leads
        GetAllEmployes({ role: 'tl' })
            .then((res) => {
                const tls = res.data.results || res.data;
                setTeamLeads(tls);
            })
            .catch((err) => console.error("Failed to fetch team leads", err));
    }, []);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.projectName) {
            alert("Please select a project");
            return;
        }

        setIsLoading(true);

        try {
            const payload = {
                name: formData.moduleName,
                description: formData.description,
                team_lead: formData.team_lead,
                // STATUS defaults to 'assigned' in backend if omitted
            };

            await ApiCreateModule(formData.projectName, payload);

            showLoginSuccess("Module Created Successfully");
            navigate(`${routePrefix}/dashboard`);

        } catch (error: any) {
            console.error("Create Module Error:", error);
            showLoginError(error.response?.data?.detail || "Failed to create module");
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
                <h1 className="text-2xl font-bold text-gray-800">Create New Module</h1>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <form onSubmit={handleSubmit} className="space-y-6">

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Select Project</label>
                        <select
                            name="projectName" // Using projectName to store projectId as per original state
                            required
                            value={formData.projectName}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition bg-white"
                        >
                            <option value="">-- Select a Project --</option>
                            {projects.map((proj) => (
                                <option key={proj.id} value={proj.id}>
                                    {proj.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Module Name</label>
                        <input
                            type="text"
                            name="moduleName"
                            required
                            value={formData.moduleName}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                            placeholder="e.g. Authentication"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            name="description"
                            rows={4}
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                            placeholder="Module details..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Assign Team Lead</label>
                        <select
                            name="team_lead"
                            required
                            value={formData.team_lead}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition bg-white"
                        >
                            <option value="">-- Select Team Lead --</option>
                            {teamLeads.map((tl: any) => (
                                <option key={tl.id} value={tl.user?.id}>
                                    {tl.user?.username} ({tl.work_email})
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
                            className={`px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition flex items-center gap-2 shadow-lg shadow-indigo-500/30 ${isLoading ? 'opacity-70' : ''}`}
                        >
                            <FiSave /> {isLoading ? "Creating..." : "Create Module"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default CreateModule;
