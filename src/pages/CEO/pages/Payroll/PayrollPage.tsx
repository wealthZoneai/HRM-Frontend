import React, { useState, useEffect } from 'react';
import {
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
    AreaChart,
    Area
} from 'recharts';
import { FiTrendingUp, FiUsers } from 'react-icons/fi';

// Mock Data for Charts
const payrollTrendData = [
    { name: 'Mar 2025', value: 32 },
    { name: 'May 2025', value: 35 },
    { name: 'Jul 2025', value: 40 },
    { name: 'Sep 2025', value: 45 },
    { name: 'Nov 2025', value: 50 },
    { name: 'Jan 2026', value: 54 },
];

const deptDistribution = [
    { name: 'Cyber Security', value: 400, color: '#3b82f6' },
    { name: 'Java', value: 300, color: '#ef4444' },
    { name: 'UI/UX', value: 300, color: '#a855f7' },
    { name: 'Aws', value: 200, color: '#0ea5e9' },
    { name: 'React', value: 278, color: '#f59e0b' },
    { name: 'Python', value: 189, color: '#22c55e' },
    { name: 'QA', value: 239, color: '#1e3a2e' },
];

const StatCard = ({ title, value, subtext, subtextColor, icon: Icon }: any) => (
    <div className="bg-white p-5 md:p-6 rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-gray-500 font-bold text-[12px] md:text-[13px] mb-1">{title}</p>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">{value}</h3>
                <p className={`text-[10px] md:text-[11px] font-bold mt-2 ${subtextColor || 'text-gray-400'}`}>
                    {subtext}
                </p>
            </div>
            <div className="bg-blue-50 p-2 md:p-2.5 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-blue-700" />
            </div>
        </div>
    </div>
);

const PayrollPage: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);

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
            <div className="px-1 lg:px-0">
                <h1 className="text-xl md:text-xl font-bold text-gray-900 tracking-tight">Payroll Insights</h1>
                <p className="text-gray-500 font-normal text-xs md:text-sm mt-1">Monitor payroll costs and trends</p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-1 lg:px-0">
                <StatCard
                    title="Total Payroll"
                    value="₹50.20L"
                    subtext="+14 From Last Month"
                    subtextColor="text-rose-500"
                    icon={FiUsers}
                />
                <StatCard
                    title="Monthly Growth"
                    value="+1.5%"
                    subtext="month over month"
                    subtextColor="text-gray-400"
                    icon={FiTrendingUp}
                />
                <StatCard
                    title="Cost per Employee"
                    value="₹25,000"
                    subtext="Average month"
                    subtextColor="text-gray-400"
                    icon={FiUsers}
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-1 lg:px-0">
                <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-100 shadow-sm flex flex-col h-[350px] md:h-[450px]">
                    <h3 className="text-md md:text-xl font-semibold text-gray-800 mb-6 md:mb-8 tracking-tight">Monthly Payroll Trend</h3>
                    <div className="flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={payrollTrendData}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="name"
                                    tick={{ fontSize: isMobile ? 8 : 10, fill: '#64748b', fontWeight: 600 }}
                                    axisLine={false}
                                    tickLine={false}
                                    dy={10}
                                    interval={isMobile ? 1 : 0}
                                />
                                <YAxis
                                    ticks={[0, 15, 30, 45, 60]}
                                    tickFormatter={(value) => `${value}L`}
                                    tick={{ fontSize: 10, fill: '#64748b', fontWeight: 600 }}
                                    axisLine={false}
                                    tickLine={false}
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

                <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-100 shadow-sm flex flex-col h-[400px] md:h-[450px]">
                    <h3 className="text-md md:text-xl font-semibold text-gray-800 mb-6 md:mb-8 tracking-tight text-center lg:text-left">Department-wise Payroll Distribution</h3>
                    <div className="flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={deptDistribution}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={isMobile ? 40 : 0}
                                    outerRadius={isMobile ? 90 : 120}
                                    dataKey="value"
                                >
                                    {deptDistribution.map((entry, index) => (
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
        </div>
    );
};

export default PayrollPage;
