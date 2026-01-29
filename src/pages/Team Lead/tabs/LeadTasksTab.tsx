import React, { useState, useEffect } from "react";
import { FiPlus, FiCheck, FiMessageSquare, FiList } from "react-icons/fi";
import { GetTLModules, CreateTask, GetAllEmployes } from "../../../Services/apiHelpers";
import { showLoginSuccess, showLoginError } from "../../../utils/toast";

const LeadTasksTab: React.FC = () => {
    const [modules, setModules] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Modal State
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [selectedModuleId, setSelectedModuleId] = useState<string | number | null>(null);
    const [employees, setEmployees] = useState<any[]>([]);

    // Task Form State
    const [taskForm, setTaskForm] = useState({
        title: "",
        description: "",
        assigned_to: ""
    });

    const fetchModules = async () => {
        setIsLoading(true);
        try {
            const res = await GetTLModules();
            setModules(res.data || []);
        } catch (err) {
            console.error("Failed to fetch modules", err);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchEmployees = async () => {
        try {
            // Fetch all employees or filter by department/team if needed (backend support required)
            // For now, fetching all 'employee' role users as potential assignees
            const res = await GetAllEmployes({ role: 'employee' });
            setEmployees(res.data.results || res.data);
        } catch (err) {
            console.error("Failed to fetch employees", err);
        }
    };

    useEffect(() => {
        fetchModules();
        fetchEmployees();
    }, []);

    const openTaskModal = (moduleId: string | number) => {
        setSelectedModuleId(moduleId);
        setTaskForm({ title: "", description: "", assigned_to: "" });
        setIsTaskModalOpen(true);
    };

    const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setTaskForm({ ...taskForm, [e.target.name]: e.target.value });
    };

    const handleCreateTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedModuleId) return;

        try {
            await CreateTask(selectedModuleId, taskForm);
            showLoginSuccess("Task created successfully");
            setIsTaskModalOpen(false);
            fetchModules(); // Refresh list to maybe show task counts or similar updates
        } catch (error: any) {
            console.error("Create task error", error);
            showLoginError(error.response?.data?.detail || "Failed to create task");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
                {/* Header or Filter if needed */}
                <h2 className="text-xl font-semibold text-gray-700">My Modules</h2>
            </div>

            {/* Modules Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                            <th className="p-4">Module Name</th>
                            <th className="p-4">Description</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {isLoading ? (
                            <tr><td colSpan={4} className="p-6 text-center text-gray-500">Loading modules...</td></tr>
                        ) : modules.length === 0 ? (
                            <tr><td colSpan={4} className="p-6 text-center text-gray-500">No modules assigned yet.</td></tr>
                        ) : (
                            modules.map((mod: any) => (
                                <tr key={mod.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4 font-medium text-gray-800">
                                        <div className="flex items-center gap-2">
                                            <FiList className="text-blue-500" />
                                            {mod.name}
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm text-gray-600 max-w-xs truncate" title={mod.description}>
                                        {mod.description || "No description"}
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold 
                                            ${mod.status === 'completed' ? 'bg-green-100 text-green-700' :
                                                mod.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-gray-100 text-gray-700'}`}>
                                            {mod.status.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button
                                            onClick={() => openTaskModal(mod.id)}
                                            className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 transition shadow-sm inline-flex items-center gap-1"
                                        >
                                            <FiPlus /> Add Task
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Create Task Modal */}
            {isTaskModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Create New Task</h3>
                        <form onSubmit={handleCreateTask} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    required
                                    value={taskForm.title}
                                    onChange={handleTaskChange}
                                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    name="description"
                                    rows={3}
                                    value={taskForm.description}
                                    onChange={handleTaskChange}
                                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Assign To</label>
                                <select
                                    name="assigned_to"
                                    required
                                    value={taskForm.assigned_to}
                                    onChange={handleTaskChange}
                                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                                >
                                    <option value="">-- Select Employee --</option>
                                    {employees.map((emp: any) => (
                                        <option key={emp.id} value={emp.user.id}>
                                            {emp.user.username} ({emp.work_email})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsTaskModalOpen(false)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                >
                                    Create Task
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LeadTasksTab;
