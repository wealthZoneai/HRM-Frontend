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
    FiActivity,
    FiAlertTriangle
} from 'react-icons/fi';
import {
    GetAdminTotalEmployees,
    GetAdminNewJoinees,
    GetAdminDepartments,
    GetAdminMonthlyEmployees,
    GetAdminAttrition,
    GetAdminRiskAlerts,
    GetAdminClients,
    GetAdminOnLeave,
    GetAdminPendingRequests,
    GetAdminLateArrivals,
    GetAdminAttendanceTrend,
    GetAdminTotalPresent,
    GetAdminEmployeesOnLeaveDeptWise,
    GetAdminLeaveTypeBreakdown,
} from '../../../../Services/apiHelpers';

// Static payroll data (no backend API yet)
const payrollData = [
    { name: 'Mar 2025', value: 32 },
    { name: 'May 2025', value: 35 },
    { name: 'Jul 2025', value: 42 },
    { name: 'Sep 2025', value: 48 },
    { name: 'Nov 2025', value: 50 },
    { name: 'Jan 2026', value: 56 },
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
                            {data && data.map((item: any, idx: number) => (
                                <div key={idx} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-md">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-semibold text-sm shadow-sm">
                                            {(item.label || item.name || '?').charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="text-[15px] font-semibold text-gray-900 tracking-tight">{item.label || item.name}</p>
                                            <p className="text-[11px] text-gray-400 uppercase font-medium tracking-wider">{item.sub || item.dept || item.department || 'Active'}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[14px] font-semibold text-gray-900">{item.value || ''}</p>
                                        <p className="text-[11px] text-gray-400 font-medium">{item.date || item.date_of_joining || ''}</p>
                                    </div>
                                </div>
                            ))}
                            {(!data || data.length === 0) && (
                                <p className="text-center text-gray-400 text-sm py-8">No data available.</p>
                            )}
                        </div>
                    )}

                    {/* Breakdown View (Payroll, Attrition) */}
                    {type === 'breakdown' && (
                        <div className="space-y-6">
                            {data && data.map((item: any, idx: number) => (
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
                    {type === 'summary' && data && (
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
                                {data.metrics && data.metrics.map((metric: any, idx: number) => (
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

    // --- State ---
    const [totalEmployees, setTotalEmployees] = useState<any>({ value: '...', trend: 'Loading...', isPositive: true, fullTime: '—', contract: '—' });
    const [newJoinees, setNewJoinees] = useState<any>({ count: '...', employees: [] });
    const [clients, setClients] = useState<any[]>([]);
    const [attrition, setAttrition] = useState<any>({ rate: '...', thisMonth: 0 });
    const [hiringData, setHiringData] = useState<any[]>([]);
    const [departmentData, setDepartmentData] = useState<any[]>([]);
    const [riskAlerts, setRiskAlerts] = useState<any[]>([]);
    const [attendanceSummary, setAttendanceSummary] = useState<any>({ total_present: '...', total_employees: '...', departments: [] });
    const [onLeave, setOnLeave] = useState<any>({ current_total: '...', active_leave_requests: [] });
    const [pendingLeaves, setPendingLeaves] = useState<any>({ current_total: '...', pending_requests: [] });
    const [lateArrivals, setLateArrivals] = useState<any>({ current_total: '...', late_policy: '', late_employees_today: [] });
    const [attendanceTrend, setAttendanceTrend] = useState<any>({});
    const [leaveBreakdown, setLeaveBreakdown] = useState<any>({});
    const [leaveDeptWise, setLeaveDeptWise] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const [
                    empRes,
                    joineesRes,
                    deptRes,
                    monthlyRes,
                    attrRes,
                    alertsRes,
                    clientsRes,
                    totalPresentRes,
                    onLeaveRes,
                    pendingLeavesRes,
                    lateArrivalsRes,
                    attendanceTrendRes,
                    leaveBreakdownRes,
                    leaveDeptWiseRes,
                ] = await Promise.allSettled([
                    GetAdminTotalEmployees(),
                    GetAdminNewJoinees(),
                    GetAdminDepartments(),
                    GetAdminMonthlyEmployees(),
                    GetAdminAttrition(),
                    GetAdminRiskAlerts(),
                    GetAdminClients(),
                    GetAdminTotalPresent(),
                    GetAdminOnLeave(),
                    GetAdminPendingRequests(),
                    GetAdminLateArrivals(),
                    GetAdminAttendanceTrend(),
                    GetAdminLeaveTypeBreakdown(),
                    GetAdminEmployeesOnLeaveDeptWise(),
                ]);

                // Total Employees
                if (empRes.status === 'fulfilled' && empRes.value.data) {
                    const d = empRes.value.data;
                    setTotalEmployees({
                        value: d.total_employees ?? d.current_total ?? '—',
                        trend: 'Active workforce',
                        isPositive: true,
                        fullTime: d.full_time ?? '—',
                        contract: d.contract ?? '—',
                    });
                }

                // New Joinees
                if (joineesRes.status === 'fulfilled' && joineesRes.value.data) {
                    const d = joineesRes.value.data;
                    setNewJoinees({
                        count: d.count ?? (d.employees?.length ?? 0),
                        employees: (d.employees || []).map((e: any) => ({
                            name: e.name || `${e.first_name || ''} ${e.last_name || ''}`.trim(),
                            department: e.department || e.dept || '',
                            date_of_joining: e.date_of_joining ? new Date(e.date_of_joining).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '',
                        })),
                    });
                }

                // Departments
                if (deptRes.status === 'fulfilled' && deptRes.value.data) {
                    setDepartmentData(deptRes.value.data);
                }

                // Monthly Employees (for hiring chart)
                if (monthlyRes.status === 'fulfilled' && monthlyRes.value.data) {
                    const raw = monthlyRes.value.data as Array<{ month: string; count: number }>;
                    setHiringData(raw.map(item => ({ name: item.month, hiring: item.count, inactive: 0 })));
                }

                // Attrition
                if (attrRes.status === 'fulfilled' && attrRes.value.data) {
                    const d = attrRes.value.data;
                    setAttrition({
                        rate: `${d.current_attrition_rate ?? '—'}%`,
                        thisMonth: d.attrition_this_month ?? 0,
                        ytd: d.total_attrition_ytd ?? 0,
                        highestDept: d.highest_attrition_department?.department ?? '—',
                    });
                }

                // Risk Alerts
                if (alertsRes.status === 'fulfilled' && alertsRes.value.data) {
                    setRiskAlerts(alertsRes.value.data);
                }

                // Clients
                if (clientsRes.status === 'fulfilled' && clientsRes.value.data) {
                    setClients(clientsRes.value.data);
                }

                // Attendance summary (present / total)
                if (totalPresentRes.status === 'fulfilled' && totalPresentRes.value.data) {
                    setAttendanceSummary(totalPresentRes.value.data);
                }

                // On leave today
                if (onLeaveRes.status === 'fulfilled' && onLeaveRes.value.data) {
                    setOnLeave(onLeaveRes.value.data);
                }

                // Pending leave requests
                if (pendingLeavesRes.status === 'fulfilled' && pendingLeavesRes.value.data) {
                    setPendingLeaves(pendingLeavesRes.value.data);
                }

                // Late arrivals today
                if (lateArrivalsRes.status === 'fulfilled' && lateArrivalsRes.value.data) {
                    setLateArrivals(lateArrivalsRes.value.data);
                }

                // Attendance trend (monthly %)
                if (attendanceTrendRes.status === 'fulfilled' && attendanceTrendRes.value.data) {
                    setAttendanceTrend(attendanceTrendRes.value.data.attendance_trend_percentage || {});
                }

                // Leave type breakdown
                if (leaveBreakdownRes.status === 'fulfilled' && leaveBreakdownRes.value.data) {
                    setLeaveBreakdown(leaveBreakdownRes.value.data.leave_type_breakdown || {});
                }

                // Employees on leave department-wise
                if (leaveDeptWiseRes.status === 'fulfilled' && leaveDeptWiseRes.value.data) {
                    setLeaveDeptWise(leaveDeptWiseRes.value.data.employees_on_leave_dept_wise || []);
                }
            } catch (err) {
                console.error('CEO dashboard fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchAll();
    }, []);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const alertColors: Record<number, string> = {
        0: 'amber',
        1: 'rose',
        2: 'cyan',
    };

    return (
        <div className="space-y-6 md:space-y-8 animate-in fade-in duration-700 pb-10">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight px-1 lg:px-0">Dashboard</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-1 lg:px-0">
                {/* Total Employees */}
                <StatCard
                    title="Total Employees"
                    value={loading ? '...' : totalEmployees.value}
                    trend={totalEmployees.trend}
                    isPositive={totalEmployees.isPositive}
                    onClick={() => setSelectedStat({
                        isOpen: true,
                        title: 'Total Employees',
                        type: 'summary',
                        data: {
                            description: 'Workforce snapshot based on current active employee profiles.',
                            metrics: [
                                { label: 'Full Time', value: totalEmployees.fullTime },
                                { label: 'Contractors', value: totalEmployees.contract },
                            ]
                        }
                    })}
                />

                {/* New Joinees */}
                <StatCard
                    title="New Joinees"
                    value={loading ? '...' : newJoinees.count}
                    trend="This Month"
                    isPositive={undefined}
                    onClick={() => setSelectedStat({
                        isOpen: true,
                        title: 'New Joinees This Month',
                        type: 'list',
                        data: newJoinees.employees.map((e: any) => ({
                            name: e.name,
                            department: e.department,
                            date_of_joining: e.date_of_joining,
                        })),
                    })}
                />

                {/* Clients */}
                <StatCard
                    title="No. of Clients"
                    value={loading ? '...' : clients.length}
                    trend="Active Clients"
                    isPositive={undefined}
                    onClick={() => setSelectedStat({
                        isOpen: true,
                        title: 'Active Clients',
                        type: 'list',
                        data: clients.map((c: any) => ({
                            label: c.name,
                            sub: 'Client',
                        })),
                    })}
                />

                {/* Total Payroll (static — no API yet) */}
                <StatCard
                    title="Total Payroll"
                    value="—"
                    trend="API coming soon"
                    isPositive={undefined}
                    onClick={() => setSelectedStat({
                        isOpen: true,
                        title: 'Payroll Breakdown',
                        type: 'breakdown',
                        data: [
                            { name: 'Base Salaries', value: '—', percentage: '76%', color: 'bg-blue-600' },
                            { name: 'Bonuses & Incentives', value: '—', percentage: '16%', color: 'bg-green-500' },
                            { name: 'Benefits & Tax', value: '—', percentage: '8%', color: 'bg-amber-400' },
                        ]
                    })}
                />

                {/* Attrition Rate */}
                <StatCard
                    title="Attrition Rate"
                    value={loading ? '...' : attrition.rate}
                    trend={`${attrition.thisMonth ?? 0} resigned this month`}
                    isPositive={true}
                    onClick={() => setSelectedStat({
                        isOpen: true,
                        title: 'Attrition Analysis',
                        type: 'summary',
                        data: {
                            description: `Year-to-date attrition: ${attrition.ytd ?? '—'} employees. Highest in: ${attrition.highestDept ?? '—'} department.`,
                            metrics: [
                                { label: 'Resigned This Month', value: attrition.thisMonth ?? '—' },
                                { label: 'Total YTD', value: attrition.ytd ?? '—' },
                            ]
                        }
                    })}
                />

                {/* Present Today */}
                <StatCard
                    title="Present Today"
                    value={loading ? '...' : `${attendanceSummary.total_present ?? '—'} / ${attendanceSummary.total_employees ?? '—'}`}
                    trend="Current headcount"
                    isPositive={attendanceSummary.total_present > 0}
                    onClick={() => {
                        const total = Number(attendanceSummary.total_employees) || 0;
                        const present = Number(attendanceSummary.total_present) || 0;
                        const percent = total > 0 ? Math.round((present / total) * 100) : 0;
                        setSelectedStat({
                            isOpen: true,
                            title: 'Today Present',
                            type: 'summary',
                            data: {
                                description: 'Snapshot of employees checked in today and department-wise attendance.',
                                metrics: [
                                    { label: 'Present', value: present },
                                    { label: 'Total Employees', value: total },
                                    { label: 'Attendance %', value: `${percent}%` },
                                ]
                            }
                        });
                    }}
                />

                {/* On Leave Today */}
                <StatCard
                    title="On Leave Today"
                    value={loading ? '...' : onLeave.current_total}
                    trend="Active leave requests"
                    isPositive={undefined}
                    onClick={() => setSelectedStat({
                        isOpen: true,
                        title: 'On Leave Today',
                        type: 'list',
                        data: (onLeave.active_leave_requests || []).map((item: any) => ({
                            name: item.employee_name,
                            sub: item.leave_type,
                            value: item.days ? `${item.days} day${item.days === 1 ? '' : 's'}` : undefined,
                        })),
                    })}
                />

                {/* Pending Leaves */}
                <StatCard
                    title="Pending Leaves"
                    value={loading ? '...' : pendingLeaves.current_total}
                    trend="Awaiting approvals"
                    isPositive={undefined}
                    onClick={() => setSelectedStat({
                        isOpen: true,
                        title: 'Pending Leave Requests',
                        type: 'list',
                        data: (pendingLeaves.pending_requests || []).map((item: any) => ({
                            name: item.employee_name,
                            sub: item.leave_type,
                            date: item.applied_date ? new Date(item.applied_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : undefined,
                        })),
                    })}
                />

                {/* Leave Breakdown */}
                <StatCard
                    title="Leave Breakdown"
                    value={loading ? '...' : Object.values(leaveBreakdown).reduce((acc: number, v: any) => acc + (Number(v) || 0), 0)}
                    trend="By leave type"
                    isPositive={undefined}
                    onClick={() => setSelectedStat({
                        isOpen: true,
                        title: 'Leave Type Breakdown',
                        type: 'summary',
                        data: {
                            description: 'Breakdown of leave types across the organisation.',
                            metrics: Object.entries(leaveBreakdown || {}).map(([key, val]) => ({
                                label: key,
                                value: val,
                            })),
                        },
                    })}
                />

                {/* Leave Dept-wise */}
                <StatCard
                    title="Leave Dept-wise"
                    value={loading ? '...' : leaveDeptWise.reduce((acc: number, d: any) => acc + (d.total ?? 0), 0)}
                    trend="Current snapshot"
                    isPositive={undefined}
                    onClick={() => setSelectedStat({
                        isOpen: true,
                        title: 'Employees on Leave (Dept-wise)',
                        type: 'list',
                        data: (leaveDeptWise || []).map((item: any) => ({
                            name: item.department,
                            value: item.total,
                        })),
                    })}
                />

                {/* Late Arrivals */}
                <StatCard
                    title="Late Arrivals"
                    value={loading ? '...' : lateArrivals.current_total}
                    trend={lateArrivals.late_policy || 'Today'}
                    isPositive={lateArrivals.current_total === 0}
                    onClick={() => setSelectedStat({
                        isOpen: true,
                        title: 'Late Arrivals Today',
                        type: 'list',
                        data: (lateArrivals.late_employees_today || []).map((item: any) => ({
                            name: item.employee_name,
                            sub: item.department,
                            value: item.late_display,
                        })),
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
                {/* Hiring Trend (Monthly Employees) */}
                <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-100 shadow-sm">
                    <h3 className="text-md md:text-lg font-semibold text-gray-800 mb-6 md:mb-8 tracking-tight">Monthly Hiring Trend</h3>
                    <div className="h-56 md:h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={hiringData.length > 0 ? hiringData : [{ name: 'No data', hiring: 0 }]}>
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
                                    name="Joined"
                                    stroke="#166534"
                                    strokeWidth={2}
                                    dot={{ r: 3, fill: '#166534' }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Attendance Trend */}
                <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-100 shadow-sm">
                    <h3 className="text-md md:text-lg font-semibold text-gray-800 mb-6 md:mb-8 tracking-tight">Attendance Trend</h3>
                    <div className="h-56 md:h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={Object.keys(attendanceTrend).length > 0
                                    ? Object.entries(attendanceTrend).map(([month, value]) => ({ name: month, percent: value }))
                                    : [{ name: 'No data', percent: 0 }]}
                            >
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
                                    tickFormatter={(value) => `${value}%`}
                                />
                                <Tooltip formatter={(value: any) => `${value}%`} />
                                <Line
                                    type="monotone"
                                    dataKey="percent"
                                    name="Attendance"
                                    stroke="#1d4ed8"
                                    strokeWidth={2}
                                    dot={{ r: 3, fill: '#1d4ed8' }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-1 lg:px-0">
                {/* Department Snapshot Table */}
                <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <h3 className="text-md md:text-lg font-semibold text-gray-800 mb-4 md:mb-6 tracking-tight">Department Snapshot</h3>
                    <div className="overflow-x-auto -mx-6 md:mx-0">
                        <table className="w-full text-[12px] md:text-[13px] text-left min-w-[350px] md:min-w-full">
                            <thead>
                                <tr className="text-gray-400 border-b border-gray-100">
                                    <th className="pb-4 pl-6 md:pl-0 font-semibold">Department</th>
                                    <th className="pb-4 font-semibold text-center">Headcount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan={2} className="py-8 text-center text-gray-400">Loading...</td></tr>
                                ) : departmentData.length === 0 ? (
                                    <tr><td colSpan={2} className="py-8 text-center text-gray-400">No data available</td></tr>
                                ) : departmentData.map((dept: any, idx: number) => (
                                    <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                                        <td className="py-4 pl-6 md:pl-0 font-bold text-gray-700">{dept.department || dept.name}</td>
                                        <td className="py-4 text-center text-gray-600 font-medium">{dept.headcount ?? dept.count ?? 0}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Alerts & Red Flags */}
                <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-100 shadow-sm">
                    <h3 className="text-md md:text-lg font-semibold text-gray-800 mb-4 md:mb-6 tracking-tight">Alerts & Red Flags</h3>
                    <div className="space-y-3 md:space-y-4">
                        {loading ? (
                            <p className="text-gray-400 text-sm">Loading alerts...</p>
                        ) : riskAlerts.length === 0 ? (
                            <div className="p-3 md:p-4 bg-green-50 rounded-xl border border-green-100 flex gap-3 md:gap-4">
                                <div className="text-green-600 text-md md:text-lg flex-shrink-0 mt-0.5">✓</div>
                                <div>
                                    <p className="text-green-800 font-bold text-xs md:text-sm">No active alerts</p>
                                    <p className="text-green-600/60 text-[10px] md:text-[11px] font-bold mt-1">All systems healthy</p>
                                </div>
                            </div>
                        ) : riskAlerts.map((alert: any, idx: number) => {
                            const colorSet: Record<string, string> = {
                                HIGH: 'rose',
                                MEDIUM: 'amber',
                                LOW: 'cyan',
                            };
                            const severity = alert.severity || (idx === 0 ? 'MEDIUM' : idx === 1 ? 'HIGH' : 'LOW');
                            const color = colorSet[severity] || alertColors[idx % 3] || 'amber';
                            return (
                                <div key={idx} className={`p-3 md:p-4 bg-${color}-50 rounded-xl border border-${color}-100 flex gap-3 md:gap-4 transition-all hover:scale-[1.01]`}>
                                    <div className={`text-${color}-600 text-md md:text-lg flex-shrink-0 mt-0.5`}>
                                        <FiAlertTriangle />
                                    </div>
                                    <div>
                                        <p className={`text-${color}-800 font-bold text-xs md:text-sm leading-tight text-wrap`}>
                                            {alert.message || alert.title || alert.description || 'Risk Alert'}
                                        </p>
                                        <p className={`text-${color}-600/60 text-[10px] md:text-[11px] font-bold mt-1`}>
                                            {alert.created_at ? new Date(alert.created_at).toLocaleDateString('en-IN') : ''}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
