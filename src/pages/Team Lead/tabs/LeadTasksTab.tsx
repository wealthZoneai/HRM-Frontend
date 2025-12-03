import React from "react";
import { FiFilter, FiPlus, FiCheck, FiMessageSquare } from "react-icons/fi";

const LeadTasksTab: React.FC = () => {
    const tasks = [
        { id: 1, name: "Finalize Q3 Marketing report", user: "Akshitha", avatar: "", date: "Nov 18, 2025", status: "Pending" },
        { id: 2, name: "User authentication flow mockups", user: "Liam", avatar: "", date: "Nov 19, 2025", status: "In Progress" },
        { id: 3, name: "Fix navigation bug on mobile", user: "Ethan", avatar: "", date: "Nov 20, 2025", status: "Completed" },
        { id: 4, name: "Update API documentation", user: "Chloe", avatar: "", date: "Nov 21, 2025", status: "Pending" },
    ];

    return (
        <div className="space-y-6">
            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex space-x-3">
                    <FilterButton label="Sort By Employee" />
                    <FilterButton label="Status" />
                    <FilterButton label="Priority" />
                </div>
                <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition shadow-sm">
                    <FiPlus className="mr-2" /> Create Task
                </button>
            </div>

            {/* Task Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                            <th className="p-4">Task Name</th>
                            <th className="p-4">Submitted by</th>
                            <th className="p-4">Submission Date</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {tasks.map((task) => (
                            <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4 font-medium text-gray-800">{task.name}</td>
                                <td className="p-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                                            {task.user.charAt(0)}
                                        </div>
                                        <span className="text-sm text-gray-600">{task.user}</span>
                                    </div>
                                </td>
                                <td className="p-4 text-sm text-gray-500">{task.date}</td>
                                <td className="p-4">
                                    <div className="flex items-center justify-end space-x-2">
                                        <button className="flex items-center px-3 py-1.5 text-xs font-medium text-blue-600 border border-blue-200 rounded-md hover:bg-blue-50 transition">
                                            <FiMessageSquare className="mr-1.5" /> Mention
                                        </button>
                                        <button className="flex items-center px-3 py-1.5 text-xs font-medium text-white bg-green-500 rounded-md hover:bg-green-600 transition shadow-sm">
                                            <FiCheck className="mr-1.5" /> Approve
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const FilterButton = ({ label }: { label: string }) => (
    <button className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-50 transition shadow-sm">
        {label} <FiFilter className="ml-2 text-gray-400" size={14} />
    </button>
);

export default LeadTasksTab;
