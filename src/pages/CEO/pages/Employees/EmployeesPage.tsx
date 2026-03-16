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
} from 'recharts';
import { FiUsers, FiTrendingUp, FiUserPlus, FiBriefcase, FiX, FiInfo, FiActivity } from 'react-icons/fi';
import {
    GetAdminTotalEmployees,
    GetAdminNewJoinees,
    GetAdminDepartments,
    GetAdminMonthlyEmployees,
    GetAdminAnnualGrowth,
} from '../../../../Services/apiHelpers';

// Pie chart color palette
const PIE_COLORS = ['#3b82f6', '#ef4444', '#a855f7', '#0ea5e9', '#f59e0b', '#22c55e', '#1e3a2e', '#ec4899', '#14b8a6'];

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

                <div className="flex-1 overflow-y-auto p-5 md:p-8 space-y-6 md:space-y-8 bg-gradient-to-b from-white to-gray-50/30 custom-scrollbar">
                    {type === 'list' && (
                        <div className="space-y-4">
                            {data && data.length > 0 ? data.map((item: any, idx: number) => (
                                <div key={idx} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-md">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-semibold text-sm shadow-sm">
                                            {(item.name || '?').charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="text-[15px] font-semibold text-gray-900 tracking-tight">{item.name}</p>
                                            <p className="text-[11px] text-gray-400 uppercase font-medium tracking-wider">{item.department || item.dept}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">{item.employment_type || item.designation || 'Employee'}</span>
                                        <span className="text-[11px] text-gray-400 mt-1 font-medium">{item.date_of_joining || item.date || 'Active'}</span>
                                    </div>
                                </div>
                            )) : (
                                <p className="text-center text-gray-400 text-sm py-8">No data available.</p>
                            )}
                        </div>
                    )}

                    {type === 'summary' && data && (
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
                                {data.metrics && data.metrics.map((metric: any, idx: number) => (
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
                            {data && data.map((dept: any, idx: number) => (
                                <div key={idx} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-blue-100 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-3.5 h-3.5 rounded-full shadow-sm" style={{ backgroundColor: dept.color || PIE_COLORS[idx % PIE_COLORS.length] }} />
                                        <p className="text-[14px] font-semibold text-gray-700 tracking-tight">{dept.name || dept.department}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[16px] font-bold text-gray-900 tracking-tight">{dept.value ?? dept.headcount ?? dept.count}</p>
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

    // --- Live State ---
    const [totalEmp, setTotalEmp] = useState<any>({ total: '...', fullTime: '—', contract: '—' });
    const [growth, setGrowth] = useState<any>({ rate: '...', currentYear: '—', lastYear: '—' });
    const [joinees, setJoinees] = useState<any[]>([]);
    const [deptData, setDeptData] = useState<any[]>([]);
    const [monthlyData, setMonthlyData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAll = async () => {
            const [empRes, joineesRes, deptRes, monthlyRes, growthRes] = await Promise.allSettled([
                GetAdminTotalEmployees(),
                GetAdminNewJoinees(),
                GetAdminDepartments(),
                GetAdminMonthlyEmployees(),
                GetAdminAnnualGrowth(),
            ]);

            // Total employees
            if (empRes.status === 'fulfilled' && empRes.value.data) {
                const d = empRes.value.data;
                setTotalEmp({
                    total: d.total_employees ?? d.current_total ?? '—',
                    fullTime: d.full_time ?? '—',
                    contract: d.contract ?? '—',
                });
            }

            // New Joinees
            if (joineesRes.status === 'fulfilled' && joineesRes.value.data) {
                const d = joineesRes.value.data;
                const list = (d.employees || []).map((e: any) => ({
                    name: e.name || `${e.first_name || ''} ${e.last_name || ''}`.trim(),
                    department: e.department || '',
                    employment_type: e.employment_type || e.designation || 'Employee',
                    date_of_joining: e.date_of_joining
                        ? new Date(e.date_of_joining).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
                        : '',
                }));
                setJoinees(list);
            }

            // Departments (pie chart + modal)
            if (deptRes.status === 'fulfilled' && deptRes.value.data) {
                const raw = deptRes.value.data as Array<{ department: string; headcount: number }>;
                setDeptData(raw.map((d, i) => ({
                    name: d.department,
                    value: d.headcount,
                    color: PIE_COLORS[i % PIE_COLORS.length],
                })));
            }

            // Monthly chart
            if (monthlyRes.status === 'fulfilled' && monthlyRes.value.data) {
                const raw = monthlyRes.value.data as Array<{ month: string; count: number }>;
                setMonthlyData(raw.map(item => ({ name: item.month, count: item.count })));
            }

            // Annual Growth
            if (growthRes.status === 'fulfilled' && growthRes.value.data) {
                const d = growthRes.value.data;
                setGrowth({
                    rate: `${d.growth_percentage ?? 0}%`,
                    currentYear: d.current_year ?? '—',
                    lastYear: d.last_year ?? '—',
                });
            }

            setLoading(false);
        };

        fetchAll();
    }, []);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
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
                {/* Total Employees */}
                <StatCard
                    title="Total Employees"
                    value={loading ? '...' : totalEmp.total}
                    subtext={loading ? 'Loading...' : `${totalEmp.fullTime} Full-Time, ${totalEmp.contract} Contract`}
                    subtextColor="text-green-600"
                    icon={FiUsers}
                    onClick={() => setSelectedStat({
                        isOpen: true,
                        title: 'Total Employees',
                        type: 'summary',
                        data: {
                            description: 'Workforce demographics based on current active employee profiles.',
                            metrics: [
                                { label: 'Full-Time', value: totalEmp.fullTime },
                                { label: 'Contract', value: totalEmp.contract },
                            ]
                        }
                    })}
                />

                {/* Annual Growth */}
                <StatCard
                    title="Annual Growth"
                    value={loading ? '...' : growth.rate}
                    subtext="Year over Year"
                    subtextColor={parseFloat(growth.rate) >= 0 ? 'text-green-600' : 'text-rose-500'}
                    icon={FiTrendingUp}
                    onClick={() => setSelectedStat({
                        isOpen: true,
                        title: 'Annual Growth',
                        type: 'summary',
                        data: {
                            description: `Employee growth trend comparing current year against the previous year.`,
                            metrics: [
                                { label: 'Joined This Year', value: growth.currentYear },
                                { label: 'Joined Last Year', value: growth.lastYear },
                            ]
                        }
                    })}
                />

                {/* New Joinees This Month */}
                <StatCard
                    title="New Joinees"
                    value={loading ? '...' : joinees.length}
                    subtext="This Month"
                    subtextColor="text-green-600"
                    icon={FiUserPlus}
                    onClick={() => setSelectedStat({
                        isOpen: true,
                        title: 'New Joinees This Month',
                        type: 'list',
                        data: joinees
                    })}
                />

                {/* Departments */}
                <StatCard
                    title="Departments"
                    value={loading ? '...' : deptData.length}
                    subtext="Active Departments"
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

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-1 lg:px-0">
                {/* Monthly Line Chart */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-[350px] md:h-[400px] flex flex-col">
                    <h3 className="text-md md:text-xl font-semibold text-gray-800 mb-6 tracking-tight">Monthly Wise (Employee Count)</h3>
                    <div className="flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={monthlyData.length > 0 ? monthlyData : [{ name: 'No data', count: 0 }]}>
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
                                    name="Employees Joined"
                                    stroke="#166534"
                                    strokeWidth={2}
                                    dot={{ r: 3, fill: '#166534' }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Department Pie Chart */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col">
                    <h3 className="text-md md:text-xl font-semibold text-gray-800 mb-4 tracking-tight">Department-wise Employees</h3>
                    {loading ? (
                        <div className="flex items-center justify-center h-48 text-gray-400 text-sm">Loading...</div>
                    ) : deptData.length === 0 ? (
                        <div className="flex items-center justify-center h-48 text-gray-400 text-sm">No department data</div>
                    ) : (
                        <>
                            {/* Pie */}
                            <div className="h-[220px] md:h-[260px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={deptData}
                                            innerRadius={isMobile ? 50 : 65}
                                            outerRadius={isMobile ? 80 : 105}
                                            paddingAngle={2}
                                            dataKey="value"
                                            cx="50%"
                                            cy="50%"
                                        >
                                            {deptData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value, name) => [`${value} employees`, name]} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            {/* Custom scrollable legend */}
                            <div className="mt-4 max-h-[160px] overflow-y-auto custom-scrollbar pr-1">
                                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                    {deptData.map((d, i) => (
                                        <div key={i} className="flex items-center gap-2 min-w-0">
                                            <span className="flex-shrink-0 w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                                            <span className="text-[11px] text-gray-600 font-medium truncate">{d.name}</span>
                                            <span className="ml-auto flex-shrink-0 text-[11px] font-bold text-gray-800">{d.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* New Joinees Table */}
            <div className="bg-white p-4 md:p-8 rounded-[1.5rem] md:rounded-xl border border-gray-100 shadow-sm px-1 lg:px-0">
                <div className="flex items-center justify-between mb-6 md:mb-8 px-2 md:px-4">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 tracking-tight">New Joinees This Month</h3>
                    <span className="text-[10px] md:text-sm font-bold text-blue-600">{joinees.length} total</span>
                </div>

                {loading ? (
                    <p className="text-center text-gray-400 py-8">Loading...</p>
                ) : joinees.length === 0 ? (
                    <p className="text-center text-gray-400 py-8">No new joinees this month.</p>
                ) : isMobile ? (
                    <div className="space-y-3 px-1">
                        {joinees.map((item, idx) => (
                            <div key={idx} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between animate-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: `${idx * 50}ms` }}>
                                <div className="flex items-center gap-4">
                                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-blue-100">
                                        {(item.name || '?').charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-[14px] font-bold text-gray-900 tracking-tight">{item.name}</p>
                                        <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">{item.department}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md text-[9px] font-bold uppercase mb-1">
                                        {item.employment_type}
                                    </span>
                                    <p className="text-[10px] text-gray-400 font-medium">{item.date_of_joining}</p>
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
                                    <th className="p-3 md:p-4 bg-gray-100 text-center text-[10px] md:text-xs uppercase tracking-wider border-b border-gray-300">Employment Type</th>
                                    <th className="p-3 md:p-4 bg-gray-100 text-center text-[10px] md:text-xs uppercase tracking-wider border-b border-gray-300">Joining Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {joinees.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 font-medium text-center">
                                        <td className="p-3 md:p-4 border border-gray-100 text-gray-700">{item.name}</td>
                                        <td className="p-3 md:p-4 border border-gray-100 text-gray-700">{item.department}</td>
                                        <td className="p-3 md:p-4 border border-gray-100 text-gray-700">{item.employment_type}</td>
                                        <td className="p-3 md:p-4 border border-gray-100 text-gray-700">{item.date_of_joining}</td>
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

export default EmployeesPage;