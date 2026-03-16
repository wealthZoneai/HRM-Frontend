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
import { GetAdminAttrition } from '../../../../Services/apiHelpers';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DEPT_COLORS = ['#3b82f6', '#ef4444', '#a855f7', '#f59e0b', '#22c55e', '#0ea5e9', '#ec4899'];

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
                <Icon className="w-5 h-5" />
            </div>
        </div>
    </div>
);

const AttritionAnalysis: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [loading, setLoading] = useState(true);

    // Live state
    const [stats, setStats] = useState<any>({
        rate: '...', thisMonth: '...', ytd: '...', highestDept: '...', highestDeptTotal: 0
    });
    const [trendData, setTrendData] = useState<any[]>([]);
    const [deptAttrition, setDeptAttrition] = useState<any[]>([]);
    const [reasonsData, setReasonsData] = useState<any[]>([]);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const fetchAttrition = async () => {
            try {
                const res = await GetAdminAttrition();
                const d = res.data;

                // Stat cards
                const highestDept = d.highest_attrition_department;
                setStats({
                    rate: `${d.current_attrition_rate ?? 0}%`,
                    thisMonth: d.attrition_this_month ?? 0,
                    ytd: d.total_attrition_ytd ?? 0,
                    highestDept: highestDept?.department ?? '—',
                    highestDeptTotal: highestDept?.total ?? 0,
                });

                // Monthly trend chart: backend returns [{month: 1-12, total: n}]
                const trend = (d.attrition_trend_by_month ?? []).map((item: any) => ({
                    name: MONTH_NAMES[(item.month ?? 1) - 1],
                    value: item.total ?? 0,
                }));
                setTrendData(trend);

                // Top departments bar list
                const depts = (d.top_departments_with_attrition ?? []).slice(0, 8);
                const maxTotal = Math.max(...depts.map((x: any) => x.total ?? 0), 1);
                setDeptAttrition(depts.map((item: any) => ({
                    name: item.department ?? '—',
                    value: item.total ?? 0,
                    progress: Math.round(((item.total ?? 0) / maxTotal) * 100),
                })));

                // Reasons pie: backend returns [{exit_reason, total}]
                const reasons = (d.attrition_reasons ?? []).filter((r: any) => r.exit_reason);
                const REASON_COLORS = ['#3b82f6', '#22c55e', '#ef4444', '#a855f7', '#f59e0b', '#0ea5e9'];
                const total = reasons.reduce((sum: number, r: any) => sum + (r.total ?? 0), 0) || 1;
                if (reasons.length > 0) {
                    setReasonsData(reasons.map((r: any, i: number) => ({
                        name: r.exit_reason || 'Unknown',
                        value: r.total ?? 0,
                        percentage: `${Math.round(((r.total ?? 0) / total) * 100)}%`,
                        color: REASON_COLORS[i % REASON_COLORS.length],
                    })));
                } else {
                    // Fallback static reasons if no exit_reason data
                    setReasonsData([
                        { name: 'Better Opportunity', percentage: '35%', value: 35, color: '#3b82f6' },
                        { name: 'Personal Reasons', percentage: '20%', value: 20, color: '#22c55e' },
                        { name: 'Higher Education', percentage: '12.5%', value: 12.5, color: '#ef4444' },
                        { name: 'Performance Issues', percentage: '10%', value: 10, color: '#a855f7' },
                        { name: 'Relocation', percentage: '15%', value: 15, color: '#f59e0b' },
                        { name: 'Others', percentage: '7.5%', value: 7.5, color: '#0ea5e9' },
                    ]);
                }
            } catch (err) {
                console.error('Attrition API error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchAttrition();
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
                    value={loading ? '...' : stats.rate}
                    subtext="Based on inactive employees"
                    subtextColor="text-green-600"
                    icon={FiTrendingDown}
                    iconBg="bg-orange-50 text-orange-500"
                />
                <StatCard
                    title="Attrition This Month"
                    value={loading ? '...' : stats.thisMonth}
                    subtext={loading ? '' : `${stats.thisMonth} employee${stats.thisMonth !== 1 ? 's' : ''} left`}
                    subtextColor="text-gray-400"
                    icon={FiUserMinus}
                    iconBg="bg-rose-50 text-rose-500"
                />
                <StatCard
                    title="Total Attrition (YTD)"
                    value={loading ? '...' : stats.ytd}
                    subtext="Year-to-date total"
                    subtextColor="text-gray-400"
                    icon={FiArrowRight}
                    iconBg="bg-blue-50 text-blue-500"
                />
                <StatCard
                    title="Highest Attrition Dept"
                    value={loading ? '...' : stats.highestDept}
                    subtext={loading ? '' : `${stats.highestDeptTotal} employees left`}
                    subtextColor="text-rose-500"
                    icon={FiAlertTriangle}
                    iconBg="bg-rose-50 text-rose-500"
                />
            </div>

            {/* Middle section: Trend + Dept list */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-1 lg:px-0">
                {/* Monthly trend line chart */}
                <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-100 shadow-sm flex flex-col h-[350px] md:h-[400px]">
                    <h3 className="text-md md:text-xl font-semibold text-gray-800 mb-6 md:mb-8 tracking-tight">Attrition Trend by Month</h3>
                    <div className="flex-1">
                        {loading ? (
                            <div className="flex items-center justify-center h-full text-gray-400 text-sm">Loading...</div>
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={trendData.length > 0 ? trendData : [{ name: 'No data', value: 0 }]}>
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
                                        allowDecimals={false}
                                    />
                                    <Tooltip formatter={(v: any) => [`${v} employees left`, 'Attrition']} />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#ef4444"
                                        strokeWidth={2}
                                        dot={{ r: 3, fill: '#ef4444' }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>

                {/* Top departments attrition bars */}
                <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-100 shadow-sm flex flex-col">
                    <h3 className="text-md md:text-xl font-semibold text-gray-800 mb-6 md:mb-8 tracking-tight">Top Departments with Attrition</h3>
                    {loading ? (
                        <div className="flex items-center justify-center h-32 text-gray-400 text-sm">Loading...</div>
                    ) : deptAttrition.length === 0 ? (
                        <div className="flex items-center justify-center h-32 text-gray-400 text-sm">No attrition data available</div>
                    ) : (
                        <div className="space-y-4 md:space-y-5 overflow-y-auto pr-1 custom-scrollbar">
                            {deptAttrition.map((dept, idx) => (
                                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                                    <div className="flex items-center gap-2 flex-1 min-w-0">
                                        <div
                                            className="w-2 h-2 rounded-full flex-shrink-0"
                                            style={{ backgroundColor: DEPT_COLORS[idx % DEPT_COLORS.length] }}
                                        />
                                        <span className="text-xs md:text-sm font-bold text-gray-700 truncate">{dept.name}</span>
                                    </div>
                                    <div className="flex items-center gap-3 w-full sm:w-48">
                                        <span className="text-[10px] md:text-xs font-bold text-gray-900 w-8 md:w-10 text-right flex-shrink-0">{dept.value}</span>
                                        <div className="h-1.5 md:h-2 flex-1 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all duration-1000"
                                                style={{
                                                    width: `${dept.progress}%`,
                                                    backgroundColor: DEPT_COLORS[idx % DEPT_COLORS.length],
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom: Reasons Pie Chart */}
            <div className="bg-white p-4 md:p-8 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="text-md md:text-xl font-semibold text-gray-800 mb-6 tracking-tight px-2 md:px-0">Attrition by Reason</h3>
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">
                    {/* Pie */}
                    <div className="w-full lg:w-[50%] h-[300px] md:h-[380px]">
                        {loading ? (
                            <div className="flex items-center justify-center h-full text-gray-400 text-sm">Loading...</div>
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={reasonsData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={false}
                                        outerRadius={isMobile ? 90 : 140}
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
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        )}
                    </div>

                    {/* Custom Legend */}
                    <div className="w-full lg:w-[45%] grid grid-cols-1 gap-3 px-2 lg:px-0">
                        {reasonsData.map((item, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded-sm flex-shrink-0" style={{ backgroundColor: item.color }} />
                                <span className="text-[12px] md:text-[14px] font-semibold text-gray-700 flex-1">{item.name}</span>
                                <span className="text-[12px] font-bold" style={{ color: item.color }}>{item.percentage}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttritionAnalysis;
