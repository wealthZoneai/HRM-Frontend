import React, { useState } from 'react';
import { FiAlertTriangle, FiAlertCircle, FiChevronDown } from 'react-icons/fi';

const ReportsPage: React.FC = () => {
    const [selectedClient, setSelectedClient] = useState('');
    const [selectedProject, setSelectedProject] = useState('');
    const [selectedManager, setSelectedManager] = useState('');

    const projects = [
        {
            client: 'Benjour',
            project: 'Benjour Mobile App',
            manager: 'Nishant',
            timeline: 'May 2025-June 2026',
            completion: 80,
            status: 'At Risk',
            statusColor: 'bg-rose-100 text-rose-600'
        },
        {
            client: 'HRMS',
            project: 'HRMS Portal',
            manager: 'Nishant',
            timeline: 'May 2025-June 2026',
            completion: 90,
            status: 'At Risk',
            statusColor: 'bg-amber-100 text-amber-600'
        },
        {
            client: 'Internship',
            project: 'Internship Website',
            manager: 'Nishant',
            timeline: 'May 2025-June 2026',
            completion: 100,
            status: 'Healthy',
            statusColor: 'bg-emerald-100 text-emerald-600'
        }
    ];

    const filteredProjects = projects.filter(p => {
        return (selectedClient === '' || p.client === selectedClient) &&
            (selectedProject === '' || p.project === selectedProject) &&
            (selectedManager === '' || p.manager === selectedManager);
    });

    const modules = [
        { name: 'UI/ Design & Prototyping', progress: 95 },
        { name: 'API Development', progress: 45 },
        { name: 'Database Architecture', progress: 50 },
        { name: 'QA & UAT', progress: 20 },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-700 pb-10">
            {/* Filters Row */}
            <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-stretch md:items-end gap-5 md:gap-8 px-6 lg:px-8">
                <div className="flex-1 space-y-2.5">
                    <label className="text-[13px] md:text-sm font-bold text-gray-900 tracking-tight">Client Name</label>
                    <div className="relative group">
                        <select
                            value={selectedClient}
                            onChange={(e) => setSelectedClient(e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-xl py-3 px-5 appearance-none font-medium text-gray-600 outline-none hover:border-blue-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 transition-all text-xs md:text-sm cursor-pointer shadow-sm"
                        >
                            <option value="">All Clients</option>
                            {[...new Set(projects.map(p => p.client))].map(client => (
                                <option key={client} value={client}>{client}</option>
                            ))}
                        </select>
                        <FiChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-blue-500 transition-colors" />
                    </div>
                </div>
                <div className="flex-1 space-y-2.5">
                    <label className="text-[13px] md:text-sm font-bold text-gray-900 tracking-tight">Project</label>
                    <div className="relative group">
                        <select
                            value={selectedProject}
                            onChange={(e) => setSelectedProject(e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-xl py-3 px-5 appearance-none font-medium text-gray-600 outline-none hover:border-blue-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 transition-all text-xs md:text-sm cursor-pointer shadow-sm"
                        >
                            <option value="">All Projects</option>
                            {[...new Set(projects.map(p => p.project))].map(project => (
                                <option key={project} value={project}>{project}</option>
                            ))}
                        </select>
                        <FiChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-blue-500 transition-colors" />
                    </div>
                </div>
                <div className="flex-1 space-y-2.5">
                    <label className="text-[13px] md:text-sm font-bold text-gray-900 tracking-tight">Delivery Manager</label>
                    <div className="relative group">
                        <select
                            value={selectedManager}
                            onChange={(e) => setSelectedManager(e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-xl py-3 px-5 appearance-none font-medium text-gray-600 outline-none hover:border-blue-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 transition-all text-xs md:text-sm cursor-pointer shadow-sm"
                        >
                            <option value="">All Managers</option>
                            {[...new Set(projects.map(p => p.manager))].map(manager => (
                                <option key={manager} value={manager}>{manager}</option>
                            ))}
                        </select>
                        <FiChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-blue-500 transition-colors" />
                    </div>
                </div>
                <button
                    onClick={() => {
                        setSelectedClient('');
                        setSelectedProject('');
                        setSelectedManager('');
                    }}
                    className="w-12 h-12 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-200 transition-all flex items-center justify-center group flex-shrink-0 mb-0.5"
                >
                    <div className="flex flex-col items-center gap-[3px]">
                        <div className="w-5 h-[2px] bg-gray-700 rounded-full group-hover:bg-blue-600 transition-colors"></div>
                        <div className="w-3.5 h-[2px] bg-gray-700 rounded-full group-hover:bg-blue-600 transition-colors delay-75"></div>
                        <div className="w-2 h-[2px] bg-gray-700 rounded-full group-hover:bg-blue-600 transition-colors delay-150"></div>
                    </div>
                </button>
            </div>

            {/* Active Project Summary - Full Width */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm overflow-hidden px-1 lg:px-6">
                <h3 className="text-md md:text-lg font-bold text-gray-900 mb-6 tracking-tight">Active Project Summary</h3>
                <div className="overflow-x-auto -mx-6 md:mx-0">
                    <table className="w-full min-w-[720px] md:min-w-full text-xs md:text-sm text-left">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th className="py-4 pl-6 md:pl-8 font-bold uppercase text-[10px] md:text-[11px] tracking-wider text-gray-400">Client Name</th>
                                <th className="py-4 px-4 font-bold uppercase text-[10px] md:text-[11px] tracking-wider text-gray-400">Project</th>
                                <th className="py-4 px-4 font-bold uppercase text-[10px] md:text-[11px] tracking-wider text-gray-400">Delivery Manager</th>
                                <th className="py-4 px-4 font-bold uppercase text-[10px] md:text-[11px] tracking-wider text-gray-400">Timeline</th>
                                <th className="py-4 px-4 font-bold uppercase text-[10px] md:text-[11px] tracking-wider text-gray-400 text-center">Completion</th>
                                <th className="py-4 pr-6 md:pr-8 font-bold uppercase text-[10px] md:text-[11px] tracking-wider text-gray-400 text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredProjects.map((p, i) => (
                                <tr key={i} className="group hover:bg-gray-50/50 transition-all duration-300 border-b border-gray-50 last:border-0">
                                    <td className="py-6 pl-6 md:pl-8">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-gray-900 text-sm md:text-base">{p.client}</span>
                                        </div>
                                    </td>
                                    <td className="py-6 px-4 font-bold text-gray-700 text-sm md:text-[15px]">{p.project}</td>
                                    <td className="py-6 px-4 text-gray-500 font-bold text-sm">{p.manager}</td>
                                    <td className="py-6 px-4">
                                        <div className="flex flex-col gap-2">
                                            <span className="text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-tighter">{p.timeline.toUpperCase()}</span>
                                            <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-[#004aad] rounded-full transition-all duration-1000"
                                                    style={{ width: `${p.completion}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-6 px-4">
                                        <div className="flex items-center justify-center">
                                            <div className="relative w-11 h-11">
                                                <svg className="w-full h-full transform -rotate-90">
                                                    <circle
                                                        cx="22"
                                                        cy="22"
                                                        r="18"
                                                        fill="transparent"
                                                        stroke="#f3f4f6"
                                                        strokeWidth="3.5"
                                                    />
                                                    <circle
                                                        cx="22"
                                                        cy="22"
                                                        r="18"
                                                        fill="transparent"
                                                        stroke="#004aad"
                                                        strokeWidth="3.5"
                                                        strokeDasharray={113}
                                                        strokeDashoffset={113 - (113 * p.completion) / 100}
                                                        strokeLinecap="round"
                                                        className="transition-all duration-1000"
                                                    />
                                                </svg>
                                                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-gray-700">
                                                    {p.completion}%
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-6 pr-6 md:pr-8 text-right">
                                        <span className={`px-5 py-2 rounded-lg text-[10px] font-black tracking-[0.1em] shadow-sm ${p.statusColor}`}>
                                            {p.status.toUpperCase()}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-1 lg:px-0">
                {/* Module-Wise Progress */}
                <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <h3 className="text-md md:text-lg font-bold text-gray-900 mb-6 md:mb-8 tracking-tight">Module-Wise progress</h3>
                    <div className="space-y-6">
                        {modules.map((m, i) => (
                            <div key={i} className="space-y-2 md:space-y-3">
                                <div className="flex justify-between items-center text-xs md:text-sm font-bold text-gray-500">
                                    <span>{m.name}</span>
                                    <span>{m.progress}%</span>
                                </div>
                                <div className="h-1.5 md:h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-[#004aad] rounded-full transition-all duration-1000"
                                        style={{ width: `${m.progress}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Risk Alert */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col">
                    <div className="flex justify-between items-center mb-6 md:mb-10">
                        <h3 className="text-md md:text-lg font-bold text-gray-900 tracking-tight">Risk Alert</h3>
                        <span className="bg-rose-100 text-rose-500 text-[9px] md:text-[10px] font-bold px-3 md:px-4 py-1 rounded-lg uppercase tracking-widest">Critical</span>
                    </div>
                    <div className="space-y-3 md:space-y-4">
                        <div className="p-4 md:p-5 bg-rose-50 rounded-xl border border-rose-100 flex items-center gap-4 md:gap-5 group hover:shadow-md transition-all">
                            <div className="w-8 h-8 md:w-10 md:h-10 bg-rose-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <FiAlertTriangle className="text-rose-600 w-4 md:w-5 h-4 md:h-5" />
                            </div>
                            <p className="text-xs md:text-sm font-bold text-rose-900 flex-1 leading-snug">
                                Timeline Breach: Benjour Mobile Application
                            </p>
                        </div>
                        <div className="p-4 md:p-5 bg-amber-50 rounded-xl border border-amber-100 flex items-center gap-4 md:gap-5 group hover:shadow-md transition-all">
                            <div className="w-8 h-8 md:w-10 md:h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <FiAlertCircle className="text-amber-600 w-4 md:w-5 h-4 md:h-5" />
                            </div>
                            <p className="text-xs md:text-sm font-bold text-amber-900 flex-1 leading-snug">
                                Resource shortage: cloud arch
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportsPage;
