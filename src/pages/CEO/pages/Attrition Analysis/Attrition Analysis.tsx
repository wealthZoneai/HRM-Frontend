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
    Cell
} from 'recharts';
import { FiTrendingDown, FiUserMinus, FiArrowRight, FiAlertTriangle } from 'react-icons/fi';

const trendData = [
    { name: 'Jan', value: 4.5 },
    { name: 'Feb', value: 4.5 },
    { name: 'Mar', value: 4.6 },
    { name: 'Apr', value: 4.4 },
    { name: 'May', value: 4.3 },
    { name: 'June', value: 4.3 },
    { name: 'July', value: 4.0 },
    { name: 'Aug', value: 3.8 },
    { name: 'Sep', value: 3.5 },
    { name: 'Oct', value: 3.2 },
    { name: 'Nov', value: 2.8 },
    { name: 'Dec', value: 2.5 },
];

const deptAttrition = [
    { name: 'UI/UX', value: 6.8, progress: 68 },
    { name: 'Python', value: 5.5, progress: 55 },
    { name: 'Java', value: 4.8, progress: 48 },
    { name: 'React', value: 4.2, progress: 42 },
    { name: 'QA (Testing)', value: 4.8, progress: 48 },
    { name: 'Cyber Security', value: 3.8, progress: 38 },
];

const reasonsData = [
    { name: 'Better Opportunity', percentage: '35%', value: 35, color: '#3b82f6' },
    { name: 'Personal Reasons', percentage: '20%', value: 20, color: '#22c55e' },
    { name: 'Higher Education', percentage: '12.5%', value: 12.5, color: '#ef4444' },
    { name: 'Performance Issues', percentage: '10%', value: 10, color: '#a855f7' },
    { name: 'Relocation', percentage: '15%', value: 15, color: '#f59e0b' },
    { name: 'Others', percentage: '7.5%', value: 7.5, color: '#0ea5e9' },
];

const StatCard = ({ title, value, subtext, subtextColor, icon: Icon, iconBg }: any) => (
    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-gray-500 font-bold text-[13px] mb-1">{title}</p>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">{value}</h3>
                <p className={`text-[11px] font-bold mt-2 ${subtextColor || 'text-gray-400'}`}>
                    {subtext}
                </p>
            </div>
            <div className={`${iconBg || 'bg-blue-50'} p-2 md:p-2.5 rounded-lg flex items-center justify-center`}>
                <Icon className="w-5 h-5" style={{ color: iconBg ? 'currentColor' : '#1d4ed8' }} />
            </div>
        </div>
    </div>
);

const AttritionAnalysis: React.FC = () => {
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
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">Attrition Analysis</h1>
                <p className="text-gray-500 font-normal text-xs md:text-sm mt-1">Understanding where and why employees leave</p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-1 lg:px-0">
                <StatCard
                    title="Current Attrition Rate"
                    value="4.6 %"
                    subtext="-0.3% from last month"
                    subtextColor="text-green-600"
                    icon={FiTrendingDown}
                    iconBg="bg-orange-50 text-orange-500"
                />
                <StatCard
                    title="Attrition This Month"
                    value="2"
                    subtext="2 employees left"
                    subtextColor="text-gray-400"
                    icon={FiUserMinus}
                    iconBg="bg-rose-50 text-rose-500"
                />
                <StatCard
                    title="Total Attrition (YTD)"
                    value="20"
                    subtext="12-month total"
                    subtextColor="text-gray-400"
                    icon={FiArrowRight}
                    iconBg="bg-blue-50 text-blue-500"
                />
                <StatCard
                    title="Highest Attrition Dept"
                    value="Java"
                    subtext="6.8% attrition rate"
                    subtextColor="text-rose-500"
                    icon={FiAlertTriangle}
                    iconBg="bg-rose-50 text-rose-500"
                />
            </div>

            {/* Middle section: Trend and Dept list */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-1 lg:px-0">
                <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-100 shadow-sm flex flex-col h-[350px] md:h-[400px]">
                    <h3 className="text-md md:text-xl font-semibold text-gray-800 mb-6 md:mb-8 tracking-tight">Attrition Trend by Month</h3>
                    <div className="flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={trendData}>
                                <XAxis
                                    dataKey="name"
                                    tick={{ fontSize: isMobile ? 8 : 10, fill: '#64748b', fontWeight: 600 }}
                                    axisLine={false}
                                    tickLine={false}
                                    interval={isMobile ? 1 : 0}
                                />
                                <YAxis
                                    domain={[0, 12]}
                                    ticks={[0, 4, 8, 12]}
                                    tick={{ fontSize: 10, fill: '#64748b', fontWeight: 600 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#166534"
                                    strokeWidth={2}
                                    dot={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-100 shadow-sm flex flex-col h-[400px]">
                    <h3 className="text-md md:text-xl font-semibold text-gray-800 mb-6 md:mb-8 tracking-tight">Top Departments with Attrition</h3>
                    <div className="space-y-4 md:space-y-6 flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200">
                        {deptAttrition.map((dept, idx) => (
                            <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                                <div className="flex items-center gap-2 flex-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-gray-900"></div>
                                    <span className="text-xs md:text-sm font-bold text-gray-700">{dept.name}</span>
                                </div>
                                <div className="flex items-center gap-3 w-full sm:w-48">
                                    <span className="text-[10px] md:text-xs font-bold text-gray-900 w-8 md:w-10 text-right">{dept.value}%</span>
                                    <div className="h-1.5 md:h-2 flex-1 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-orange-500 rounded-full transition-all duration-1000"
                                            style={{ width: `${dept.progress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom section: Pie Chart Updated to match image */}
            <div className="bg-white p-4 md:p-8 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">
                    {/* Pie Chart with Labels */}
                    <div className="w-full lg:w-[50%] h-[300px] md:h-[450px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={reasonsData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={false}
                                    outerRadius={isMobile ? 90 : 160}
                                    dataKey="value"
                                >
                                    {reasonsData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value: any, name: any) => [`${value}%`, name]}
                                    contentStyle={{
                                        borderRadius: '12px',
                                        border: 'none',
                                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                        padding: '8px 12px',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        color: '#1f2937'
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Custom Legend to match image */}
                    <div className="w-full lg:w-[45%] flex flex-col items-center lg:items-start gap-3 px-4 lg:pl-32">
                        <div className="flex flex-col gap-3">
                            {reasonsData.map((item, index) => (
                                <div key={index} className="flex items-center gap-4">
                                    <div className="w-4 h-4 rounded-sm flex-shrink-0" style={{ backgroundColor: item.color }}></div>
                                    <span className="text-[12px] md:text-[14px] font-bold text-[#3b82f6] whitespace-nowrap" style={{ color: item.color }}>
                                        {item.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttritionAnalysis;
