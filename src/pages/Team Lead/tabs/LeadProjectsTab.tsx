import React from "react";
import { FiPlus, FiUsers, FiCalendar } from "react-icons/fi";

const LeadProjectsTab: React.FC = () => {
    const projects = [
        { id: 1, title: "Nova web Platform", status: "In Progress", progress: 75, members: 5, date: "Dec 25, 2025", color: "bg-teal-100 text-teal-700" },
        { id: 2, title: "Mobile App Refresh", status: "On Track", progress: 50, members: 3, date: "Jan 10, 2026", color: "bg-blue-100 text-blue-700" },
        { id: 3, title: "Marketing Campaign", status: "Completed", progress: 100, members: 8, date: "Nov 30, 2025", color: "bg-gray-100 text-gray-700" },
        { id: 4, title: "Internal Dashboard", status: "In Progress", progress: 30, members: 4, date: "Feb 15, 2026", color: "bg-yellow-100 text-yellow-700" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Current Projects</h2>
                <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition shadow-sm">
                    <FiPlus className="mr-2" /> New Project
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {projects.map((project) => (
                    <div key={project.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="font-bold text-gray-800 text-lg">{project.title}</h3>
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${project.color}`}>
                                {project.status}
                            </span>
                        </div>

                        <div className="mb-6">
                            <div className="flex justify-between text-sm text-gray-500 mb-1">
                                <span>Progress</span>
                                <span className="font-medium text-gray-700">{project.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2">
                                <div
                                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${project.progress}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-50 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                                <FiUsers size={14} />
                                <span>{project.members} Members</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <FiCalendar size={14} />
                                <span>{project.date}</span>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Create New Project Card */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-dashed border-blue-200 flex flex-col items-center justify-center text-center hover:bg-blue-50/30 transition cursor-pointer group">
                    <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <FiPlus className="text-blue-600 text-2xl" />
                    </div>
                    <h3 className="font-bold text-gray-800 text-lg mb-1">Create a New Project</h3>
                    <p className="text-sm text-gray-500 mb-4">Get started by adding your next big project.</p>
                    <button className="text-blue-600 font-medium text-sm hover:underline">
                        + New project
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LeadProjectsTab;
