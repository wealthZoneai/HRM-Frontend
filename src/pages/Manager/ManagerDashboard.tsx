import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { GetDMProjects, GetPMProjects } from '../../Services/apiHelpers';

const ManagerDashboard: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                let res;
                if (user?.role === 'dm' || user?.role === 'management') {
                    res = await GetDMProjects();
                } else if (user?.role === 'pm') {
                    res = await GetPMProjects();
                }

                if (res) {
                    setProjects(res.data);
                }
            } catch (err) {
                console.error("Failed to fetch projects", err);
            } finally {
                setIsLoading(false);
            }
        };

        if (user) {
            fetchProjects();
        }
    }, [user]);

    return (
        <div className="p-6">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    Welcome, {user?.username} ({user?.role?.toUpperCase()})
                </h1>
                <p className="text-gray-600 mt-2">Manage your projects and teams effectively.</p>
            </header>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {(user?.role === 'dm' || user?.role === 'management') && (
                    <button
                        onClick={() => navigate('/dm/create-project')}
                        className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg text-white hover:shadow-xl transition transform hover:-translate-y-1"
                    >
                        <div className="text-xl font-bold mb-2">+ New Project</div>
                        <p className="opacity-90 text-sm">Create and assign new projects</p>
                    </button>
                )}

                {user?.role === 'pm' && (
                    <button
                        onClick={() => navigate('/pm/create-module')}
                        className="p-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg text-white hover:shadow-xl transition transform hover:-translate-y-1"
                    >
                        <div className="text-xl font-bold mb-2">+ New Module</div>
                        <p className="opacity-90 text-sm">Add modules to your projects</p>
                    </button>
                )}
            </div>

            {/* Project List */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">Your Projects</h2>
                </div>

                {isLoading ? (
                    <div className="p-8 text-center text-gray-500">Loading projects...</div>
                ) : projects.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No projects found.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-3 font-medium">Project</th>
                                    {/* DM sees 'Project Manager', PM sees 'Created By' or similar context */}
                                    <th className="px-6 py-3 font-medium">
                                        {user?.role === 'dm' || user?.role === 'management' ? 'Assigned To' : 'Created By'}
                                    </th>
                                    {(user?.role === 'dm' || user?.role === 'management') && (
                                        <th className="px-6 py-3 font-medium">Created By</th>
                                    )}
                                    <th className="px-6 py-3 font-medium">Status</th>
                                    <th className="px-6 py-3 font-medium">Start Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {projects.map((proj: any) => (
                                    <tr key={proj.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            <div className="text-sm font-bold text-indigo-700">{proj.name}</div>
                                            {proj.description && (
                                                <div className="text-xs text-gray-500 mt-1 line-clamp-2">{proj.description}</div>
                                            )}
                                            {proj.modules && proj.modules.length > 0 && (
                                                <div className="mt-3 flex flex-col gap-1 pl-3 border-l-2 border-indigo-100">
                                                    {proj.modules.map((mod: any) => (
                                                        <div key={mod.id} className="text-xs text-gray-600 flex items-center gap-2">
                                                            <span className={`w-1.5 h-1.5 rounded-full ${mod.status === 'completed' ? 'bg-green-500' : mod.status === 'in_progress' ? 'bg-blue-500' : 'bg-gray-300'}`}></span>
                                                            {mod.name}
                                                            <span className="text-[10px] bg-gray-100 px-1 py-0.5 rounded text-gray-500 uppercase">{mod.status}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </td>

                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {user?.role === 'dm' || user?.role === 'management' ? (
                                                proj.project_manager || <span className="text-orange-500 italic">Unassigned</span>
                                            ) : (
                                                proj.delivery_manager || 'Admin'
                                            )}
                                        </td>

                                        {(user?.role === 'dm' || user?.role === 'management') && (
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {proj.delivery_manager}
                                            </td>
                                        )}

                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold 
                                                ${proj.status === 'completed' ? 'bg-green-100 text-green-700' :
                                                    proj.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                                                        proj.status === 'at_risk' ? 'bg-red-100 text-red-700' :
                                                            'bg-gray-100 text-gray-700'}`}>
                                                {proj.status.replace('_', ' ').toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(proj.created_at).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManagerDashboard;
