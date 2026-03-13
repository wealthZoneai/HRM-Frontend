import React, { useState, useEffect } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';
import {
    FiUsers,
    FiX,
    FiInfo,
    FiArrowUpRight,
    FiActivity
} from 'react-icons/fi';
import { GetAdminTotalEmployees } from '../../../../Services/apiHelpers';

// Mock Data for Charts
const hiringData = [
    { name: 'Feb 2026', hiring: 10, inactive: 7 },
    { name: 'Apr 2026', hiring: 13, inactive: 3 },
    { name: 'Jun 2026', hiring: 16, inactive: 3 },
    { name: 'Aug 2026', hiring: 19, inactive: 3 },
    { name: 'Oct 2026', hiring: 21, inactive: 3 },
    { name: 'Dec 2026', hiring: 23, inactive: 3 },
];

const payrollData = [
    { name: 'Mar 2025', value: 32 },
    { name: 'May 2025', value: 35 },
    { name: 'Jul 2025', value: 42 },
    { name: 'Sep 2025', value: 48 },
    { name: 'Nov 2025', value: 50 },
    { name: 'Jan 2026', value: 56 },
];

const departmentData = [
    { name: 'Python', headcount: 20, attrition: '4.2%', attendance: '95.8%' },
    { name: 'UI/UX', headcount: 5, attrition: '4.2%', attendance: '95.8%' },
    { name: 'React', headcount: 6, attrition: '4.2%', attendance: '95.8%' },
    { name: 'Java', headcount: 6, attrition: '4.2%', attendance: '95.8%' },
    { name: 'Testing', headcount: 2, attrition: '4.2%', attendance: '95.8%' },
    { name: 'Aws', headcount: 2, attrition: '5.2%', attendance: '95.8%' },
    { name: 'Cyber Security', headcount: 22, attrition: '5.2%', attendance: '95.8%' },
];

const StatCard = ({ title, value, trend, isPositive, secondaryLabel, onClick }: any) => (
    <div
        onClick={onClick}
        className="bg-white p-5 md:p-6 rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md hover:border-blue-200 cursor-pointer group relative overflow-hidden"
    >
        <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <FiArrowUpRight className="text-blue-400 w-4 h-4" />
        </div>
        <div className="flex justify-between items-start">
            <div>
                <p className="text-gray-900 font-bold text-xs md:text-sm mb-1 uppercase tracking-tight group-hover:text-blue-600 transition-colors">{title}</p>
                <h3 className="text-xl md:text-xl text-gray-900 tracking-tight">{value}</h3>
                <p className={`text-[12px] md:text-[13px] font-bold mt-2 ${isPositive === undefined
                    ? 'text-gray-400'
                    : isPositive ? 'text-green-500' : 'text-rose-500'
                    }`}>
                    {trend} <span className="text-gray-400 font-medium ml-1">{secondaryLabel || ''}</span>
                </p>
            </div>
            <div className="bg-blue-50 p-2 md:p-2.5 rounded-lg group-hover:bg-blue-600 transition-all">
                <FiUsers className="w-5 h-5 md:w-6 md:h-6 text-blue-700 group-hover:text-white" />
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
                <div className="flex items-center justify-between p-8 border-b border-gray-100/50 bg-white/50 backdrop-blur-sm sticky top-0 z-20">
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-[1.25rem] flex items-center justify-center text-white bg-blue-600 shadow-lg transform transition-transform duration-500 hover:rotate-6">
                            <FiInfo size={26} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 leading-tight tracking-tight">{title}</h2>
                            <p className="text-[12px] text-gray-400 font-medium uppercase tracking-[0.15em] mt-0.5">Detailed Analytics</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-3 hover:bg-gray-100 rounded-2xl transition-all duration-300 text-gray-400 hover:text-gray-900 group">
                        <FiX size={24} className="group-hover:rotate-90 transition-transform duration-500" />
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-gradient-to-b from-white to-gray-50/30 custom-scrollbar">
                    {/* List View (Clients, Joinees) */}
                    {type === 'list' && (
                        <div className="space-y-4">
                            {data.map((item: any, idx: number) => (
                                <div key={idx} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-md">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-semibold text-sm shadow-sm">
                                            {item.label ? item.label.charAt(0) : item.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-[15px] font-semibold text-gray-900 tracking-tight">{item.label || item.name}</p>
                                            <p className="text-[11px] text-gray-400 uppercase font-medium tracking-wider">{item.sub || item.dept || 'Active'}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[14px] font-semibold text-gray-900">{item.value || ''}</p>
                                        <p className="text-[11px] text-gray-400 font-medium">{item.date || ''}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Breakdown View (Payroll, Attrition) */}
                    {type === 'breakdown' && (
                        <div className="space-y-6">
                            {data.map((item: any, idx: number) => (
                                <div key={idx} className="space-y-3">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600 font-semibold">{item.name}</span>
                                        <span className="text-gray-900 font-bold">{item.value}</span>
                                    </div>
                                    <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-1000 ${item.color || 'bg-blue-500'}`}
                                            style={{ width: item.percentage }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Summary View (Attendance, Growth) */}
                    {type === 'summary' && (
                        <div className="space-y-8">
                            <div className="p-6 rounded-3xl bg-blue-50/50 border border-blue-100 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-16 h-16 bg-blue-200/20 rounded-full -mr-8 -mt-8" />
                                <p className="text-sm font-semibold text-blue-800 flex items-center gap-2 relative z-10">
                                    <FiActivity className="animate-pulse" /> Live Insight
                                </p>
                                <p className="text-[13px] text-blue-700/80 mt-3 leading-relaxed font-medium relative z-10">
                                    {data.description}
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {data.metrics.map((metric: any, idx: number) => (
                                    <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-1">{metric.label}</p>
                                        <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const Dashboard: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [selectedStat, setSelectedStat] = useState<{ isOpen: boolean; title: string; data: any; type: string }>({
        isOpen: false,
        title: '',
        data: null,
        type: ''
    });

    const [totalEmployees, setTotalEmployees] = useState<{ value: string | number; trend: string; isPositive: boolean }>({
        value: '...',
        trend: 'Loading...',
        isPositive: true
    });

    useEffect(() => {
        const fetchTotalEmployees = async () => {
            try {
                const res = await GetAdminTotalEmployees();
                if (res.data) {
                    setTotalEmployees({
                        value: res.data.total_employees || '0',
                        trend: res.data.trend || 'Updated just now',
                        isPositive: res.data.is_positive !== false
                    });
                }
            } catch (error) {
                console.error("Failed to fetch total employees:", error);
                setTotalEmployees({
                    value: 'N/A',
                    trend: 'Error fetching data',
                    isPositive: false
                });
            }
        };

        fetchTotalEmployees();
    }, []);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div className="space-y-6 md:space-y-8 animate-in fade-in duration-700 pb-10">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight px-1 lg:px-0">Dashboard</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-1 lg:px-0">
                <StatCard
                    title="Total Employees"
                    value={totalEmployees.value}
                    trend={totalEmployees.trend}
                    isPositive={totalEmployees.isPositive}
                    onClick={() => setSelectedStat({
                        isOpen: true,
                        title: 'Total Employees',
                        type: 'summary',
                        data: {
                            description: 'Workforce remains stable with a healthy growth trend. Hiring velocity is optimized for Q1 targets.',
                            metrics: [
                                { label: 'Full Time', value: '45' },
                                { label: 'Contractors', value: '25' }
                            ]
                        }
                    })}
                />
                <StatCard
                    title="New Joinees"
                    value="4"
                    trend="This Month"
                    isPositive={undefined}
                    onClick={() => setSelectedStat({
                        isOpen: true,
                        title: 'New Joinees',
                        type: 'list',
                        data: [
                            { name: 'Sai ManiKrishna', dept: 'React.Js', date: 'Feb 02, 2026' },
                            { name: 'Ravi Teja', dept: 'React.Js', date: 'Feb 05, 2026' },
                            { name: 'Nikhil', dept: 'React.Js', date: 'Feb 08, 2026' },
                            { name: 'Dinesh', dept: 'UI/UX', date: 'Feb 10, 2026' }
                        ]
                    })}
                />
                <StatCard
                    title="No.of Clients"
                    value="5"
                    trend="This Month"
                    isPositive={undefined}
                    onClick={() => setSelectedStat({
                        isOpen: true,
                        title: 'Active Clients',
                        type: 'list',
                        data: [
                            { label: 'Cyber Ark Sol.', sub: 'Enterprise', value: '7 Projects' },
                            { label: 'Tech Mahindra', sub: 'Consulting', value: '3 Projects' },
                            { label: 'Wipro Digital', sub: 'Outsourcing', value: '12 Projects' },
                            { label: 'Amazon AWS', sub: 'Cloud', value: '5 Projects' },
                            { label: 'Cloud Nine', sub: 'Healthcare', value: '2 Projects' }
                        ]
                    })}
                />
                <StatCard
                    title="Total Payroll"
                    value="50.20L"
                    trend="+2.1% from last month"
                    isPositive={false}
                    onClick={() => setSelectedStat({
                        isOpen: true,
                        title: 'Payroll Breakdown',
                        type: 'breakdown',
                        data: [
                            { name: 'Base Salaries', value: '38.50L', percentage: '76%', color: 'bg-blue-600' },
                            { name: 'Bonuses & Incentives', value: '8.20L', percentage: '16%', color: 'bg-green-500' },
                            { name: 'Benefits & Tax', value: '3.50L', percentage: '8%', color: 'bg-amber-400' }
                        ]
                    })}
                />
                <StatCard
                    title="Attrition Rate"
                    value="4.6%"
                    trend="-0.3% from last month"
                    isPositive={true}
                    onClick={() => setSelectedStat({
                        isOpen: true,
                        title: 'Attrition Analysis',
                        type: 'summary',
                        data: {
                            description: 'Attrition has dropped significantly compared to last quarter. Focused on keeping Cyber Security and Java talent.',
                            metrics: [
                                { label: 'Resignations', value: '3' },
                                { label: 'Retention Score', value: '92/100' }
                            ]
                        }
                    })}
                />
                <StatCard
                    title="Attendance"
                    value="94.8%"
                    trend="+0.9% from last month"
                    isPositive={true}
                    onClick={() => setSelectedStat({
                        isOpen: true,
                        title: 'Attendance Status',
                        type: 'summary',
                        data: {
                            description: 'Overall attendance is excellent. Minor dip observed in the UI/UX team due to seasonal leave.',
                            metrics: [
                                { label: 'On Leave Today', value: '2' },
                                { label: 'Remote Active', value: '12' }
                            ]
                        }
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
                <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-100 shadow-sm">
                    <h3 className="text-md md:text-lg font-semibold text-gray-800 mb-6 md:mb-8 tracking-tight">Hiring VS Inactive Trend</h3>
                    <div className="h-56 md:h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={hiringData}>
                                <XAxis
                                    dataKey="name"
                                    tick={{ fontSize: isMobile ? 9 : 11, fill: '#64748b', fontWeight: 600 }}
                                    axisLine={false}
                                    tickLine={false}
                                    dy={10}
                                    interval={isMobile ? 1 : 0}
                                />
                                <YAxis
                                    tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="hiring"
                                    stroke="#166534"
                                    strokeWidth={2}
                                    dot={{ r: 3, fill: '#166534' }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="inactive"
                                    stroke="#dc2626"
                                    strokeWidth={2}
                                    dot={{ r: 3, fill: '#dc2626' }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-100 shadow-sm">
                    <h3 className="text-md md:text-lg font-semibold text-gray-800 mb-6 md:mb-8 tracking-tight">Payroll Trend</h3>
                    <div className="h-56 md:h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={payrollData}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="name"
                                    tick={{ fontSize: isMobile ? 9 : 11, fill: '#64748b', fontWeight: 600 }}
                                    axisLine={false}
                                    tickLine={false}
                                    dy={10}
                                    interval={isMobile ? 1 : 0}
                                />
                                <YAxis
                                    tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }}
                                    axisLine={false}
                                    tickLine={false}
                                    tickFormatter={(value) => `${value}L`}
                                />
                                <Tooltip />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorValue)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-1 lg:px-0">
                {/* table */}
                <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <h3 className="text-md md:text-lg font-semibold text-gray-800 mb-4 md:mb-6 tracking-tight">Department Snapshot</h3>
                    <div className="overflow-x-auto -mx-6 md:mx-0">
                        <table className="w-full text-[12px] md:text-[13px] text-left min-w-[450px] md:min-w-full">
                            <thead>
                                <tr className="text-gray-400 border-b border-gray-100">
                                    <th className="pb-4 pl-6 md:pl-0 font-semibold">Department</th>
                                    <th className="pb-4 font-semibold text-center">Headcount</th>
                                    <th className="pb-4 font-semibold text-center">Attrition</th>
                                    <th className="pb-4 pr-6 md:pr-0 font-semibold text-center">Attendance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {departmentData.map((dept, idx) => (
                                    <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                                        <td className="py-4 pl-6 md:pl-0 font-bold text-gray-700">{dept.name}</td>
                                        <td className="py-4 text-center text-gray-600 font-medium">{dept.headcount}</td>
                                        <td className="py-4 text-center text-gray-600 font-medium">{dept.attrition}</td>
                                        <td className="py-4 pr-6 md:pr-0 text-center text-gray-600 font-medium">{dept.attendance}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* alerts */}
                <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-100 shadow-sm">
                    <h3 className="text-md md:text-lg font-semibold text-gray-800 mb-4 md:mb-6 tracking-tight">Alerts & Red Flags</h3>
                    <div className="space-y-3 md:space-y-4">
                        <div className="p-3 md:p-4 bg-amber-50 rounded-xl border border-amber-100 flex gap-3 md:gap-4 transition-all hover:scale-[1.01]">
                            <div className="text-amber-600 text-md md:text-lg flex-shrink-0 mt-0.5">⚠</div>
                            <div>
                                <p className="text-amber-800 font-bold text-xs md:text-sm leading-tight text-wrap">Java department attrition increased by 2.3% this month</p>
                                <p className="text-amber-600/60 text-[10px] md:text-[11px] font-bold mt-1">26-01-2025</p>
                            </div>
                        </div>

                        <div className="p-3 md:p-4 bg-rose-50 rounded-xl border border-rose-100 flex gap-3 md:gap-4 transition-all hover:scale-[1.01]">
                            <div className="text-rose-600 text-md md:text-lg flex-shrink-0 mt-0.5">⚠</div>
                            <div>
                                <p className="text-rose-800 font-bold text-xs md:text-sm leading-tight text-wrap">5 Employees on unapproved leave in Operations</p>
                                <p className="text-rose-600/60 text-[10px] md:text-[11px] font-bold mt-1">26-01-2025</p>
                            </div>
                        </div>

                        <div className="p-3 md:p-4 bg-cyan-50 rounded-xl border border-cyan-100 flex gap-3 md:gap-4 transition-all hover:scale-[1.01]">
                            <div className="text-cyan-600 text-md md:text-lg flex-shrink-0 mt-0.5">▲</div>
                            <div>
                                <p className="text-cyan-800 font-bold text-xs md:text-sm leading-tight text-wrap">Payroll processing deadline: Feb 5, 2026</p>
                                <p className="text-cyan-600/60 text-[10px] md:text-[11px] font-bold mt-1">26-01-2025</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
