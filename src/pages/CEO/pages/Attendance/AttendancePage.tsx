import React, { useState, useEffect } from 'react';
import {
    LineChart, Line, XAxis, YAxis, Tooltip,
    ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import {
    FiUsers, FiX, FiFileText,
    FiAlertCircle, FiClock, FiCalendar,
 FiUser
} from 'react-icons/fi';

/* ===================== DATA ===================== */

const statisticsData: Record<string, { value: string; change: string }> = {
    'Total Employees': { value: '81', change: '+2' },
    'Total Present': { value: '70', change: '+5' },
    'On Leave': { value: '02', change: '-1' },
    'Pending Requests': { value: '01', change: 'New' },
    'Long Leave': { value: '09', change: '+1' },
    'Late Arrivals': { value: '04', change: '-3' },
};

const leaveTypeData = [
    { name: 'Sick Leaves', value: 25, color: '#3b82f6' },
    { name: 'Casual Leaves', value: 50, color: '#22c55e' },
    { name: 'Earned Leaves', value: 15, color: '#f59e0b' },
    { name: 'Unpaid Leaves', value: 10, color: '#ef4444' },
];

const deptLeaveData = [
    { name: 'Python', value: 20, color: '#3b82f6' },
    { name: 'UI/UX', value: 15, color: '#ef4444' },
    { name: 'AWS', value: 15, color: '#0ea5e9' },
    { name: 'Java', value: 20, color: '#f59e0b' },
    { name: 'React', value: 15, color: '#22c55e' },
    { name: 'QA', value: 15, color: '#166534' },
];

const attendanceTrendData = [
    { name: 'Jan', value: 89 },
    { name: 'Feb', value: 91 },
    { name: 'Mar', value: 93 },
    { name: 'Apr', value: 92 },
    { name: 'May', value: 94 },
    { name: 'Jun', value: 95 },
    { name: 'Jul', value: 96 },
    { name: 'Aug', value: 97 },
    { name: 'Sep', value: 98 },
    { name: 'Oct', value: 99 },
];

// Detailed lists for modals
const employeeList = [
    { name: 'Sai ManiKrishna', dept: 'React.Js', status: 'Active', id: 'EMP001' },
    { name: 'Ravi Teja', dept: 'React.Js', status: 'Active', id: 'EMP002' },
    { name: 'Nikhil', dept: 'React.Js', status: 'On Leave', id: 'EMP003' },
    { name: 'Pervez Ahmmed', dept: 'React.Js', status: 'Active', id: 'EMP004' },
    { name: 'Dinesh', dept: 'Java', status: 'Active', id: 'EMP005' },
    { name: 'Raviteja', dept: 'Java', status: 'Active', id: 'EMP006' },
    { name: 'Revanth', dept: 'Python', status: 'Long Leave', id: 'EMP007' },
    { name: 'Akshitha', dept: 'UI/UX', status: 'Active', id: 'EMP008' },
    { name: 'Harshini', dept: 'UI/UX', status: 'Active', id: 'EMP009' },
    { name: 'Lithesh', dept: 'UI/UX', status: 'Active', id: 'EMP010' },
    { name: 'Ramohan', dept: 'Python', status: 'Active', id: 'EMP011' },
    { name: 'Sravani', dept: 'QA', status: 'Active', id: 'EMP012' },
    { name: 'Karthik', dept: 'AWS', status: 'Active', id: 'EMP013' },
    { name: 'Mounika', dept: 'React.Js', status: 'Active', id: 'EMP014' },
    { name: 'Prashanth', dept: 'Java', status: 'Active', id: 'EMP015' },
    { name: 'Deepika', dept: 'UI/UX', status: 'Active', id: 'EMP016' },
];

const onLeaveList = [
    { name: 'Nikhil', dept: 'React.Js', reason: 'Casual', duration: '2 Days' },
    { name: 'Anjali', dept: 'QA', reason: 'Sick', duration: '1 Day' },
];

const pendingList = [
    { name: 'Vikram', dept: 'DevOps', type: 'Earned Leave', date: 'Feb 14' },
];

const lateList = [
    { name: 'Rahul', dept: 'Java', time: '10:05 AM', delay: '20m' },
    { name: 'Kiran', dept: 'AWS', time: '10:20 AM', delay: '35m' },
    { name: 'Pooja', dept: 'UI/UX', time: '09:55 AM', delay: '10m' },
    { name: 'Arun', dept: 'QA', time: '10:10 AM', delay: '25m' },
];

/* ===================== STAT CARD ===================== */

const StatCard = ({ title, value, trend, trendColor, onClick, isMobile }: any) => {
    return (
        <div
            onClick={onClick}
            className={`
              bg-white rounded-2xl border border-gray-100 shadow-sm
              cursor-pointer transition-all active:scale-[0.97]
              ${isMobile ? 'p-4' : 'p-5 hover:shadow-lg hover:-translate-y-1'}
            `}
        >
            {isMobile ? (
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-[11px] font-semibold text-gray-500 uppercase">
                            {title}
                        </p>
                        <p className="text-3xl font-bold text-gray-900 mt-1">
                            {value}
                        </p>
                    </div>
                    <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold
                        ${trendColor?.includes('rose')
                                ? 'bg-rose-50 text-rose-600'
                                : 'bg-emerald-50 text-emerald-600'}`}
                    >
                        {trend}
                    </span>
                </div>
            ) : (
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-gray-500 font-semibold text-[13px] uppercase">
                            {title}
                        </p>
                        <h3 className="text-3xl font-bold text-gray-900">
                            {value}
                        </h3>
                        <p className={`text-[11px] mt-2 font-medium ${trendColor}`}>
                            {trend}
                        </p>
                    </div>
                    <div className="bg-[#f0f4ff] p-3 rounded-xl transition-colors group-hover:bg-indigo-600">
                        <FiUsers className="w-6 h-6 text-indigo-600 group-hover:text-white" />
                    </div>
                </div>
            )}
        </div>
    );
};

/* ===================== MODAL ===================== */

const StatModal = ({ isOpen, onClose, title, value, change }: any) => {
    if (!isOpen) return null;

    const isLongLeave = title === 'Long Leave';
    const isTotalEmployees = title === 'Total Employees';
    const isTotalPresent = title === 'Total Present';
    const isPending = title === 'Pending Requests';
    const isOnLeave = title === 'On Leave';
    const isLate = title === 'Late Arrivals';

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
                <div className="flex items-center justify-between p-6 md:p-8 border-b border-gray-100/50 bg-white/50 backdrop-blur-sm sticky top-0 z-20">
                    <div className="flex items-center gap-4 md:gap-5">
                        <div className={`w-12 h-12 md:w-14 md:h-14 rounded-[1.25rem] flex items-center justify-center text-white shadow-lg transform transition-transform duration-500 hover:rotate-6 ${isLongLeave ? 'bg-[#c0ca33]' :
                            isTotalPresent ? 'bg-emerald-500' :
                                isPending ? 'bg-rose-500' :
                                    isOnLeave ? 'bg-amber-500' :
                                        isLate ? 'bg-violet-600' : 'bg-indigo-600'
                            }`}>
                            {isLongLeave ? <FiFileText size={22} /> :
                                isPending ? <FiClock size={22} /> :
                                    isLate ? <FiAlertCircle size={22} /> :
                                        isOnLeave ? <FiCalendar size={22} /> : <FiUsers size={22} />}
                        </div>
                        <div>
                            <h2 className="text-lg md:text-2xl font-semibold text-gray-900 leading-tight tracking-tight">{title}</h2>
                            <p className="text-[10px] md:text-[12px] text-gray-400 font-medium uppercase tracking-[0.1em] md:tracking-[0.15em] mt-0.5">
                                {isLongLeave ? 'Detailed breakdown & Insights' : 'Analytics Dashboard'}
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 md:p-3 hover:bg-gray-100 rounded-2xl transition-all duration-300 text-gray-400 hover:text-gray-900 group">
                        <FiX size={20} className="group-hover:rotate-90 transition-transform duration-500" />
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-gradient-to-b from-white to-gray-50/30 custom-scrollbar">
                    {/* Overview Box */}
                    <div className={`${isLongLeave ? 'bg-gray-50' : 'bg-white'} rounded-3xl p-6 border border-gray-100 shadow-sm grid grid-cols-2 gap-4`}>
                        <div>
                            <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-widest mb-1">
                                {isLongLeave ? 'Overview' : 'Current'}
                            </p>
                            <div className="flex flex-col">
                                <span className={`${isLongLeave ? 'text-[10px]' : 'text-xs'} text-gray-400 font-medium uppercase`}>
                                    {isLongLeave ? 'Current Value' : 'Total'}
                                </span>
                                <span className="text-3xl md:text-4xl font-semibold text-gray-900">{value}</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-widest mb-1">
                                {isLongLeave ? 'Change' : 'Monthly Delta'}
                            </p>
                            <div className={`flex items-center gap-2 text-3xl font-semibold ${change?.startsWith('+') || change === 'New' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                {change || '0'}
                            </div>
                        </div>
                    </div>

                    {isTotalEmployees ? (
                        <div className="space-y-5">
                            <div className="flex items-center justify-between">
                                <h3 className="text-[18px] font-semibold text-gray-900 tracking-tight">Personnel Directory</h3>
                                <span className="text-[10px] bg-gray-100 px-2 py-1 rounded-lg font-semibold text-gray-500 uppercase">Live Data</span>
                            </div>
                            <div className="max-h-[350px] overflow-y-auto rounded-3xl border border-gray-100 bg-white shadow-sm custom-scrollbar relative">
                                <table className="w-full text-left border-collapse">
                                    <thead className="sticky top-0 z-30 bg-gray-50 shadow-sm">
                                        <tr>
                                            <th className="px-6 py-4 text-[10px] font-semibold text-gray-400 uppercase tracking-[0.2em]">Employee</th>
                                            <th className="px-6 py-4 text-[10px] font-semibold text-gray-400 uppercase tracking-[0.2em]">Dept</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {employeeList.map((emp, i) => (
                                            <tr key={i} className="hover:bg-blue-50/30 transition-colors duration-200">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[11px] font-semibold text-gray-500">
                                                            {emp.name.charAt(0)}
                                                        </div>
                                                        <span className="font-medium text-gray-700 text-[14px]">{emp.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="font-normal text-gray-500 text-[13px]">{emp.dept}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : isTotalPresent ? (
                        <div className="space-y-5">
                            <div className="flex items-center justify-between">
                                <h3 className="text-[18px] font-semibold text-gray-900 tracking-tight">Sectional Status</h3>
                                <span className="text-[10px] bg-emerald-50 px-2 py-1 rounded-lg font-semibold text-emerald-600 uppercase tracking-tighter">Real-time</span>
                            </div>
                            <div className="space-y-3">
                                {[
                                    { name: 'Python', color: 'bg-indigo-50 text-indigo-600', val: '22/25', letter: 'P' },
                                    { name: 'UI/UX', color: 'bg-emerald-50 text-emerald-600', val: '14/15', letter: 'U' },
                                    { name: 'Java', color: 'bg-rose-50 text-rose-600', val: '15/18', letter: 'J' },
                                    { name: 'Cyber Security', color: 'bg-amber-50 text-amber-600', val: '09/11', letter: 'C' },
                                    { name: 'Testing', color: 'bg-violet-50 text-violet-600', val: '05/07', letter: 'T' },
                                    { name: 'AWS', color: 'bg-sky-50 text-sky-600', val: '05/05', letter: 'A' },
                                ].map((dept, i) => (
                                    <div key={i} className="group flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-sm transition-all duration-300 hover:border-emerald-200 hover:shadow-md">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-semibold text-[14px] ${dept.color} shadow-sm transition-transform group-hover:scale-110`}>
                                                {dept.letter}
                                            </div>
                                            <span className="font-medium text-gray-700 tracking-tight text-[15px]">{dept.name}</span>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-gray-900 font-semibold tracking-tight text-[15px]">{dept.val}</span>
                                            <div className="w-20 h-1 bg-gray-100 rounded-full mt-1.5 overflow-hidden">
                                                <div
                                                    className="h-full bg-emerald-500 rounded-full"
                                                    style={{ width: `${(parseInt(dept.val.split('/')[0]) / parseInt(dept.val.split('/')[1])) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : isLongLeave ? (
                        <>
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900 tracking-tight">Department Status</h3>
                                <div className="space-y-2">
                                    {[
                                        { name: 'Medical Leave', count: 4, pct: '44%', color: 'bg-[#c0ca33]' },
                                        { name: 'Suspended', count: 4, pct: '44%', color: 'bg-[#c0ca33]' },
                                        { name: 'Maternity/Paternity', count: 4, pct: '44%', color: 'bg-[#c0ca33]' },
                                        { name: 'Personal Leave', count: 4, pct: '44%', color: 'bg-[#c0ca33]' },
                                    ].map((row, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-3 h-3 rounded-full ${row.color}`} />
                                                <span className="font-medium text-gray-700 text-[14px]">{row.name}</span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="text-gray-900 font-bold text-[16px]">{row.count}</span>
                                                <span className="text-gray-300 text-[11px] font-medium">{row.pct}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4 pt-2">
                                <h3 className="text-lg font-semibold text-gray-900 tracking-tight">Employees on Long Leave</h3>
                                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-full bg-[#c0ca33] flex items-center justify-center text-white font-semibold text-xl" />
                                            <div>
                                                <h4 className="font-bold text-gray-900 text-[16px] tracking-tight">Shiva</h4>
                                                <p className="text-[12px] font-medium text-gray-400">Python Developer</p>
                                            </div>
                                        </div>
                                        <div className="px-5 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg font-semibold text-[12px] border border-emerald-100">
                                            Approved
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 bg-gray-50 rounded-xl border border-transparent">
                                            <p className="text-[11px] font-medium text-gray-500 mb-1">Reason</p>
                                            <p className="text-[13px] font-bold text-gray-800">Medical Leave</p>
                                        </div>
                                        <div className="p-4 bg-gray-50 rounded-xl border border-transparent">
                                            <p className="text-[11px] font-medium text-gray-500 mb-1">Duration</p>
                                            <p className="text-[13px] font-bold text-gray-800">10</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-[11px] font-medium text-gray-500 mb-1">Start Date</p>
                                            <p className="text-[13px] font-bold text-gray-800">Feb 06, 2026</p>
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-medium text-gray-500 mb-1">End Date</p>
                                            <p className="text-[13px] font-bold text-gray-800">Feb 15, 2026</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4 pt-4 border-t border-gray-100">
                                        <div className="flex items-center gap-2 text-gray-900 font-bold">
                                            <FiFileText className="w-4 h-4 text-gray-900" />
                                            <span className="text-[12px]">Proof Documentation</span>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-50">
                                                <p className="text-[11px] font-bold text-blue-600 mb-1 leading-none uppercase tracking-tight">Document Type</p>
                                                <p className="text-[12px] font-medium text-blue-500">Medical Certificate</p>
                                            </div>
                                            <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-50 flex items-start gap-2">
                                                <FiAlertCircle className="w-4 h-4 text-amber-500 mt-0.5" />
                                                <div>
                                                    <p className="text-[11px] font-bold text-amber-600 mb-1 leading-none uppercase tracking-tight">Additional Note</p>
                                                    <p className="text-[12px] font-medium text-amber-500">Medical Certificate</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : isOnLeave ? (
                        <div className="space-y-5">
                            <h3 className="text-[18px] font-semibold text-gray-900 tracking-tight">Active Leave Requests</h3>
                            <div className="space-y-3">
                                {onLeaveList.map((emp, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center font-semibold">
                                                <FiUser size={18} />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-800 text-[14px]">{emp.name}</p>
                                                <p className="text-[11px] text-gray-400 font-medium uppercase">{emp.dept}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-gray-900 text-[13px]">{emp.reason}</p>
                                            <p className="text-[11px] text-amber-600 font-semibold">{emp.duration}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : isPending ? (
                        <div className="space-y-5">
                            <h3 className="text-[18px] font-semibold text-gray-900 tracking-tight">Awaiting Approval</h3>
                            <div className="space-y-3">
                                {pendingList.map((emp, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-rose-100 shadow-sm">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center font-semibold">
                                                <FiClock size={18} />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-800 text-[14px]">{emp.name}</p>
                                                <p className="text-[11px] text-gray-400 font-medium uppercase">{emp.dept}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-gray-900 text-[13px]">{emp.type}</p>
                                            <p className="text-[11px] text-gray-400 font-medium">{emp.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : isLate ? (
                        <div className="space-y-5">
                            <div className="flex items-center justify-between">
                                <h3 className="text-[18px] font-semibold text-gray-900 tracking-tight">Late Log-ins Today</h3>
                                <div className="text-right">
                                    <p className="text-[10px] text-rose-500 font-bold uppercase tracking-wider">Late Policy: After 09:45 AM</p>
                                    <p className="text-[9px] text-gray-400 font-medium">Strictly monitored log-ins</p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                {lateList.map((emp, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-rose-100 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-violet-50 text-violet-600 flex items-center justify-center font-semibold">
                                                <FiClock size={18} />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-800 text-[14px]">{emp.name}</p>
                                                <p className="text-[11px] text-gray-400 font-medium uppercase">{emp.dept}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-gray-900 text-[13px]">{emp.time}</p>
                                            <p className="text-[11px] text-rose-500 font-bold">{emp.delay} Late</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-10 opacity-40">
                            <FiAlertCircle size={48} className="text-gray-300 mb-4" />
                            <p className="text-sm font-bold uppercase tracking-widest">No detailed breakdowns available</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

/* ===================== PAGE ===================== */

const AttendancePage: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [selectedStat, setSelectedStat] = useState<any>(null);

    useEffect(() => {
        const resize = () => setIsMobile(window.innerWidth < 768);
        resize();
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    return (
        <div className="max-w-[1400px] mx-auto space-y-8 pb-20 animate-in fade-in duration-700">
            <header className="px-1 lg:px-0">
                <h1 className="text-2xl font-bold text-gray-900">Attendance Insights</h1>
                <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-widest mt-1">
                    Organization Overview
                </p>
            </header>

            {/* STATS */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 px-1 lg:px-0">
                {Object.entries(statisticsData).map(([key, s]) => (
                    <StatCard
                        key={key}
                        title={key}
                        value={s.value}
                        trend={s.change}
                        isMobile={isMobile}
                        trendColor={s.change.startsWith('-') || s.change === 'New' ? 'text-rose-500' : 'text-green-500'}
                        onClick={() => setSelectedStat({ title: key, ...s })}
                    />
                ))}
            </div>

            {/* PIE CHARTS */}
            <div className="grid lg:grid-cols-2 gap-8 px-1 lg:px-0">
                {[
                    { title: 'Leave Type Breakdown (This Month)', data: leaveTypeData, type: 'donut' },
                    { title: 'Employees on leave (Department Wise )', data: deptLeaveData, type: 'pie' }
                ].map((c) => (
                    <div key={c.title} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm md:h-[450px] h-[400px] flex flex-col hover:shadow-md transition-shadow">
                        <h3 className="text-[17px] font-bold text-gray-800 mb-6 tracking-tight">
                            {c.title}
                        </h3>
                        <div className="flex-1 min-h-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={c.data}
                                        innerRadius={c.type === 'donut' ? (isMobile ? 50 : 70) : 0}
                                        outerRadius={isMobile ? 80 : 105}
                                        paddingAngle={c.type === 'donut' ? 4 : 0}
                                        dataKey="value"
                                        cx={isMobile ? "50%" : "35%"}
                                        cy="50%"
                                        stroke="none"
                                    >
                                        {c.data.map((d, i) => (
                                            <Cell key={i} fill={d.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            borderRadius: '12px',
                                            border: 'none',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                            fontSize: '12px'
                                        }}
                                    />
                                    <Legend
                                        layout="vertical"
                                        align="right"
                                        verticalAlign="middle"
                                        iconType="square"
                                        iconSize={12}
                                        formatter={(value) => (
                                            <span className="text-gray-600 font-medium ml-2">{value}</span>
                                        )}
                                        wrapperStyle={{
                                            paddingLeft: '20px',
                                            fontSize: '13px'
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                ))}
            </div>

            {/* ATTENDANCE TREND */}
            <div className="bg-white p-6 md:p-10 rounded-2xl border border-gray-100 shadow-sm h-[400px] md:h-[500px] px-1 lg:px-0 flex flex-col">
                <h3 className="text-[15px] font-black text-gray-800 uppercase mb-8 md:mb-10 tracking-tight ml-2">
                    Attendance Trend
                </h3>
                <div className="flex-1 min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={attendanceTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                            <XAxis
                                dataKey="name"
                                tick={{ fontSize: isMobile ? 10 : 12, fill: '#64748b', fontWeight: 700 }}
                                axisLine={{ stroke: '#f1f5f9' }}
                                tickLine={false}
                                dy={15}
                                interval={isMobile ? 1 : 0}
                            />
                            <YAxis
                                domain={[85, 100]}
                                ticks={[85, 90, 95, 100]}
                                tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 700 }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip
                                contentStyle={{
                                    borderRadius: '16px',
                                    border: 'none',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                                    fontWeight: '900'
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#16a34a"
                                strokeWidth={isMobile ? 3 : 4}
                                dot={{ r: isMobile ? 4 : 6, fill: '#16a34a', stroke: '#fff', strokeWidth: 2 }}
                                activeDot={{ r: 8, strokeWidth: 0 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* MODAL */}
            <StatModal
                isOpen={!!selectedStat}
                title={selectedStat?.title}
                value={selectedStat?.value}
                change={selectedStat?.change}
                onClose={() => setSelectedStat(null)}
            />
        </div>
    );
};

export default AttendancePage;
