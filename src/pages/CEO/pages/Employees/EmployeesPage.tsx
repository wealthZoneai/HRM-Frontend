import React, { useState, useEffect } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from 'recharts';
import { FiUsers, FiTrendingUp, FiUserPlus, FiBriefcase, FiX, FiInfo, FiActivity } from 'react-icons/fi';

// Mock Data for Charts
const monthlyData = [
    { name: 'Feb 2026', count: 6 },
    { name: 'Apr 2026', count: 12 },
    { name: 'Jun 2026', count: 14 },
    { name: 'Aug 2026', count: 17 },
    { name: 'Oct 2026', count: 21 },
    { name: 'Dec 2026', count: 24 },
];

const deptData = [
    { name: 'Cyber Security', value: 400, color: '#3b82f6' },
    { name: 'Java', value: 300, color: '#ef4444' },
    { name: 'UI/UX', value: 300, color: '#a855f7' },
    { name: 'Aws', value: 200, color: '#0ea5e9' },
    { name: 'React', value: 278, color: '#f59e0b' },
    { name: 'Python', value: 189, color: '#22c55e' },
    { name: 'QA', value: 239, color: '#1e3a2e' },
];

const newJoinees = [
    { name: 'Sai ManiKrishna', dept: 'React.Js', designation: 'Full-Time', date: '10/20/25' },
    { name: 'Ravi Teja', dept: 'React.Js', designation: 'Full-Time', date: '10/20/25' },
    { name: 'Nikhil', dept: 'React.Js', designation: 'Full-Time', date: '10/21/25' },
    { name: 'Pervez Ahmmed', dept: 'React.Js', designation: 'Full-Time', date: '10/22/25' },
    { name: 'Dinesh', dept: 'Java', designation: 'Full-Time', date: '10/23/25' },
    { name: 'Raviteja', dept: 'Java', designation: 'Full-Time', date: '10/24/25' },
    { name: 'Revanth', dept: 'Python', designation: 'Full-Time', date: '10/25/25' },
    { name: 'Akshitha', dept: 'UI/UX', designation: 'Full-Time', date: '10/26/25' },
    { name: 'Harshini', dept: 'UI/UX', designation: 'Full-Time', date: '10/27/25' },
    { name: 'Lithesh', dept: 'UI/UX', designation: 'Full-Time', date: '10/28/25' },
    { name: 'Ramohan', dept: 'Python', designation: 'Full-Time', date: '10/28/25' },
];

const StatCard = ({ title, value, subtext, subtextColor, icon: Icon, onClick }: any) => (
    <div
        onClick={onClick}
        className="bg-white p-4 md:p-5 rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md hover:border-blue-200 cursor-pointer group"
    >
        <div className="flex justify-between items-start">
            <div>
                <p className="text-gray-900 font-bold text-[11px] md:text-[13px] mb-1 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{title}</p>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 tracking-tight">{value}</h3>
                <p className={`text-[9px] md:text-[11px] font-bold mt-1.5 md:mt-2 ${subtextColor}`}>
                    {subtext}
                </p>
            </div>
            <div className="bg-blue-50 p-2 md:p-2.5 rounded-lg flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Icon className="w-4 h-4 md:w-5 md:h-5 text-blue-700 group-hover:text-white" />
            </div>
        </div>
    </div>
);

// Stat Detail Modal Component
const StatModal = ({ isOpen, onClose, title, data, type }: any) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6">
            <div
                className="absolute inset-0 bg-gray-900/40 backdrop-blur-md animate-in fade-in duration-500"
                onClick={onClose}
            ></div>

            <div
                className="relative z-10 bg-white rounded-[2.5rem] shadow-[0_30px_90px_-15px_rgba(0,0,0,0.3)] w-full max-w-lg max-h-[85vh] overflow-hidden animate-in zoom-in-95 duration-500 flex flex-col border border-white/40"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header Section */}
                <div className="flex items-center justify-between p-5 md:p-8 border-b border-gray-100/50 bg-white/50 backdrop-blur-sm sticky top-0 z-20">
                    <div className="flex items-center gap-3 md:gap-5">
                        <div className="w-11 h-11 md:w-14 md:h-14 rounded-xl md:rounded-[1.25rem] flex items-center justify-center text-white bg-blue-600 shadow-lg transform transition-transform duration-500 hover:rotate-6">
                            <FiInfo className="w-5 h-5 md:w-7 md:h-7" />
                        </div>
                        <div>
                            <h2 className="text-lg md:text-2xl font-semibold text-gray-900 leading-tight tracking-tight">{title}</h2>
                            <p className="text-[10px] md:text-[12px] text-gray-400 font-medium uppercase tracking-[0.1em] md:tracking-[0.15em] mt-0.5">Workforce Insight</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 md:p-3 hover:bg-gray-100 rounded-xl md:rounded-2xl transition-all duration-300 text-gray-400 hover:text-gray-900 group">
                        <FiX className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-90 transition-transform duration-500" />
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-5 md:p-8 space-y-6 md:space-y-8 bg-gradient-to-b from-white to-gray-50/30 custom-scrollbar">
                    {type === 'list' && (
                        <div className="space-y-4">
                            {data.map((item: any, idx: number) => (
                                <div key={idx} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-md">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-semibold text-sm shadow-sm">
                                            {item.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-[15px] font-semibold text-gray-900 tracking-tight">{item.name}</p>
                                            <p className="text-[11px] text-gray-400 uppercase font-medium tracking-wider">{item.dept}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">{item.designation}</span>
                                        <span className="text-[11px] text-gray-400 mt-1 font-medium">{item.date || 'Active'}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {type === 'summary' && (
                        <div className="space-y-6 md:space-y-8">
                            <div className="p-4 md:p-6 rounded-3xl bg-blue-50/50 border border-blue-100 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-16 h-16 bg-blue-200/20 rounded-full -mr-8 -mt-8" />
                                <p className="text-sm font-semibold text-blue-800 flex items-center gap-2 relative z-10">
                                    <FiActivity className="animate-pulse" /> Live Analysis
                                </p>
                                <p className="text-[12px] md:text-[13px] text-blue-700/80 mt-2 md:mt-3 leading-relaxed font-medium relative z-10">
                                    {data.description}
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-3 md:gap-4">
                                {data.metrics.map((metric: any, idx: number) => (
                                    <div key={idx} className="bg-white p-4 md:p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                        <p className="text-[10px] md:text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-1">{metric.label}</p>
                                        <p className="text-xl md:text-2xl font-semibold text-gray-900">{metric.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {type === 'depts' && (
                        <div className="space-y-4">
                            {data.map((dept: any, idx: number) => (
                                <div key={idx} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-blue-100 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-3.5 h-3.5 rounded-full shadow-sm" style={{ backgroundColor: dept.color }} />
                                        <p className="text-[14px] font-semibold text-gray-700 tracking-tight">{dept.name}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[16px] font-bold text-gray-900 tracking-tight">{dept.value}</p>
                                        <p className="text-[10px] font-semibold text-gray-400 uppercase">Headcount</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const EmployeesPage: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [selectedStat, setSelectedStat] = useState<{ isOpen: boolean; title: string; data: any; type: string }>({
        isOpen: false,
        title: '',
        data: null,
        type: ''
    });

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div className="space-y-6 md:space-y-8 animate-in fade-in duration-700">
            <div className="px-1 lg:px-0">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">Total Employees</h1>
                <p className="text-gray-500 font-normal text-xs md:text-sm mt-1">Workforce tracking over time</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 px-1 lg:px-0">
                <StatCard
                    title="Total Employees"
                    value="70"
                    subtext="+70 Last Year"
                    subtextColor="text-green-600"
                    icon={FiUsers}
                    onClick={() => setSelectedStat({
                        isOpen: true,
                        title: 'Total Employees',
                        type: 'summary',
                        data: {
                            description: 'Workforce demographics show high balance across experience levels. Hiring velocity is set at 4.5/mo.',
                            metrics: [
                                { label: 'Full-Time', value: '42' },
                                { label: 'Contract', value: '28' }
                            ]
                        }
                    })}
                />
                <StatCard
                    title="Annual Growth"
                    value="15.0%"
                    subtext="Over Year"
                    subtextColor="text-green-600"
                    icon={FiTrendingUp}
                    onClick={() => setSelectedStat({
                        isOpen: true,
                        title: 'Annual Growth',
                        type: 'summary',
                        data: {
                            description: 'Our team has expanded significantly across all core departments. Technical talent retention is at an all-time high.',
                            metrics: [
                                { label: 'Revenue Growth', value: '22%' },
                                { label: 'Retention Rate', value: '94%' }
                            ]
                        }
                    })}
                />
                <StatCard
                    title="New Joinees"
                    value={newJoinees.length}
                    subtext="October - present"
                    subtextColor="text-green-600"
                    icon={FiUserPlus}
                    onClick={() => setSelectedStat({
                        isOpen: true,
                        title: 'New Joinees',
                        type: 'list',
                        data: newJoinees
                    })}
                />
                <StatCard
                    title="Departments"
                    value={deptData.length}
                    subtext="Active Department"
                    subtextColor="text-green-600"
                    icon={FiBriefcase}
                    onClick={() => setSelectedStat({
                        isOpen: true,
                        title: 'Departments',
                        type: 'depts',
                        data: deptData
                    })}
                />
            </div>

            <StatModal
                isOpen={selectedStat.isOpen}
                onClose={() => setSelectedStat({ ...selectedStat, isOpen: false })}
                title={selectedStat.title}
                data={selectedStat.data}
                type={selectedStat.type}
            />

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-1 lg:px-0">
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-[350px] md:h-[400px] flex flex-col">
                    <h3 className="text-md md:text-xl font-semibold text-gray-800 mb-6 tracking-tight">Monthly Wise( Employee Count)</h3>
                    <div className="flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={monthlyData}>
                                <XAxis
                                    dataKey="name"
                                    tick={{ fontSize: isMobile ? 8 : 10, fill: '#64748b', fontWeight: 600 }}
                                    axisLine={false}
                                    tickLine={false}
                                    interval={isMobile ? 1 : 0}
                                />
                                <YAxis
                                    tick={{ fontSize: 10, fill: '#64748b', fontWeight: 600 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="count"
                                    stroke="#166534"
                                    strokeWidth={2}
                                    dot={{ r: 3, fill: '#166534' }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-[400px] flex flex-col">
                    <h3 className="text-md md:text-xl font-semibold text-gray-800 mb-6 tracking-tight text-center lg:text-left">Department-wise Employees</h3>
                    <div className="flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={deptData}
                                    innerRadius={isMobile ? 50 : 60}
                                    outerRadius={isMobile ? 80 : 100}
                                    paddingAngle={2}
                                    dataKey="value"
                                    cx="50%"
                                    cy="50%"
                                >
                                    {deptData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend
                                    layout={isMobile ? "horizontal" : "vertical"}
                                    align={isMobile ? "center" : "right"}
                                    verticalAlign={isMobile ? "bottom" : "middle"}
                                    iconType="circle"
                                    wrapperStyle={isMobile ? { paddingTop: '20px', fontSize: '10px' } : undefined}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* New Joinees Table / Mobile Card List */}
            <div className="bg-white p-4 md:p-8 rounded-[1.5rem] md:rounded-xl border border-gray-100 shadow-sm px-1 lg:px-0">
                <div className="flex items-center justify-between mb-6 md:mb-8 px-2 md:px-4">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 tracking-tight">New Joinees This Month</h3>
                    <button className="text-[10px] md:text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">View All</button>
                </div>

                {isMobile ? (
                    <div className="space-y-3 px-1">
                        {newJoinees.map((item, idx) => (
                            <div key={idx} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between animate-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: `${idx * 50}ms` }}>
                                <div className="flex items-center gap-4">
                                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-blue-100">
                                        {item.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-[14px] font-bold text-gray-900 tracking-tight">{item.name}</p>
                                        <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">{item.dept}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md text-[9px] font-bold uppercase mb-1">
                                        {item.designation}
                                    </span>
                                    <p className="text-[10px] text-gray-400 font-medium">{item.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="overflow-x-auto overflow-y-auto max-h-[450px] custom-scrollbar -mx-1 lg:mx-0 rounded-lg border border-gray-200">
                        <table className="w-full text-xs md:text-sm text-left border-separate border-spacing-0 min-w-[500px] lg:min-w-full">
                            <thead className="sticky top-0 z-30 shadow-md">
                                <tr className="text-gray-900 font-bold">
                                    <th className="p-3 md:p-4 bg-gray-100 text-center text-[10px] md:text-xs uppercase tracking-wider border-b border-gray-300">Name</th>
                                    <th className="p-3 md:p-4 bg-gray-100 text-center text-[10px] md:text-xs uppercase tracking-wider border-b border-gray-300">Department</th>
                                    <th className="p-3 md:p-4 bg-gray-100 text-center text-[10px] md:text-xs uppercase tracking-wider border-b border-gray-300">Designation</th>
                                    <th className="p-3 md:p-4 bg-gray-100 text-center text-[10px] md:text-xs uppercase tracking-wider border-b border-gray-300">Joining Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {newJoinees.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 font-medium text-center">
                                        <td className="p-3 md:p-4 border border-gray-100 text-gray-700">{item.name}</td>
                                        <td className="p-3 md:p-4 border border-gray-100 text-gray-700">{item.dept}</td>
                                        <td className="p-3 md:p-4 border border-gray-100 text-gray-700">{item.designation}</td>
                                        <td className="p-3 md:p-4 border border-gray-100 text-gray-700">{item.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {!isMobile && (
                    <p className="mt-4 text-[10px] text-gray-400 font-bold lg:hidden text-center uppercase tracking-widest">Swipe left to view full table</p>
                )}
            </div>
        </div>
    );
};

export default EmployeesPage;