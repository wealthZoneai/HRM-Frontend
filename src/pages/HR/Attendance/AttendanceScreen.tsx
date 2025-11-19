import React, { useState } from "react";
import { FiSearch, FiCalendar } from "react-icons/fi";

type Status = "Present" | "Absent" | "On Leave";

// --- INTERFACE DEFINITIONS ---
interface DailyViewItem {
  id: string;
  employee: string;
  empId: string;
  avatar: string;
  checkIn: string;
  checkOut: string;
  status: Status;
  department: string;
}

interface MonthlySummaryItem {
  id: string;
  employee: string;
  avatar: string;
  totalDays: number;
  present: number;
  absent: number;
  onLeave: number;
}

interface AttendanceRecord extends DailyViewItem {}

// --- DYNAMIC DATA (Same as before) ---
const dailyData: DailyViewItem[] = [
  { id: "1", employee: "Clement Mendie", empId: "EMP01", avatar: "https://i.pravatar.cc/40?img=1", checkIn: "09:00 AM", checkOut: "05:00 PM", status: "Present", department: "UI/UX" },
  { id: "2", employee: "Alice Johnson", empId: "EMP02", avatar: "https://i.pravatar.cc/40?img=2", checkIn: "-", checkOut: "-", status: "Absent", department: "Java Backend" },
  { id: "3", employee: "Chris Evans", empId: "EMP03", avatar: "https://i.pravatar.cc/40?img=3", checkIn: "09:30 AM", checkOut: "—", status: "On Leave", department: "Marketing" },
  { id: "4", employee: "Diana Prince", empId: "EMP04", avatar: "https://i.pravatar.cc/40?img=4", checkIn: "08:45 AM", checkOut: "05:15 PM", status: "Present", department: "UI/UX" },
  { id: "4", employee: "Diana Prince", empId: "EMP04", avatar: "https://i.pravatar.cc/40?img=4", checkIn: "08:45 AM", checkOut: "05:15 PM", status: "Present", department: "UI/UX" },
  { id: "4", employee: "Diana Prince", empId: "EMP04", avatar: "https://i.pravatar.cc/40?img=4", checkIn: "08:45 AM", checkOut: "05:15 PM", status: "Present", department: "UI/UX" },
  { id: "4", employee: "Diana Prince", empId: "EMP04", avatar: "https://i.pravatar.cc/40?img=4", checkIn: "08:45 AM", checkOut: "05:15 PM", status: "Present", department: "UI/UX" },
  { id: "4", employee: "Diana Prince", empId: "EMP04", avatar: "https://i.pravatar.cc/40?img=4", checkIn: "08:45 AM", checkOut: "05:15 PM", status: "Present", department: "UI/UX" },
];

const monthlyData: MonthlySummaryItem[] = [
  { id: "1", employee: "Clement Mendie", avatar: "https://i.pravatar.cc/40?img=1", totalDays: 22, present: 20, absent: 1, onLeave: 1, },
  { id: "2", employee: "Alice Johnson", avatar: "https://i.pravatar.cc/40?img=2", totalDays: 22, present: 18, absent: 3, onLeave: 1, },
  { id: "3", employee: "Chris Evans", avatar: "https://i.pravatar.cc/40?img=3", totalDays: 22, present: 15, absent: 5, onLeave: 2, },
  { id: "4", employee: "Diana Prince", avatar: "https://i.pravatar.cc/40?img=4", totalDays: 22, present: 22, absent: 0, onLeave: 0, },
  { id: "4", employee: "Diana Prince", avatar: "https://i.pravatar.cc/40?img=4", totalDays: 22, present: 22, absent: 0, onLeave: 0, },
  { id: "4", employee: "Diana Prince", avatar: "https://i.pravatar.cc/40?img=4", totalDays: 22, present: 22, absent: 0, onLeave: 0, },
  { id: "4", employee: "Diana Prince", avatar: "https://i.pravatar.cc/40?img=4", totalDays: 22, present: 22, absent: 0, onLeave: 0, },
  { id: "4", employee: "Diana Prince", avatar: "https://i.pravatar.cc/40?img=4", totalDays: 22, present: 22, absent: 0, onLeave: 0, },
];

const recordData: AttendanceRecord[] = [
  ...dailyData.map(d => ({ ...d, department: d.department + " Department" })),
];

// --- STYLING CONSTANTS ---

const badge = {
  Present: "bg-green-100 text-green-700 font-medium",
  Absent: "bg-red-100 text-red-700 font-medium",
  "On Leave": "bg-yellow-100 text-yellow-700 font-medium",
};


// --- MAIN COMPONENT ---

const AttendanceScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"daily" | "monthly" | "records">("daily");
  const [search, setSearch] = useState("");


  const TabButton: React.FC<{ k: string, label: string }> = ({ k, label }) => (
    <button
      onClick={() => setActiveTab(k as any)}
      className={`pb-3 text-base transition-colors ${
        activeTab === k
          ? "border-b-2 border-blue-600 font-bold text-blue-600"
          : "text-gray-600 hover:text-gray-800"
      }`}
    >
      {label}
    </button>
  );

  // --- RENDERING TABS ---

  const renderDailyView = () => (
    <div className="space-y-6">
      {/* 1. Daily Attendance Table (DESIGN IMPROVEMENT APPLIED HERE) */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <h3 className="text-xl font-semibold text-gray-800 p-6 pb-0">Today's Log ({new Date().toLocaleDateString()})</h3>
       <div className="overflow-x-auto md:max-h-none">
          <table className="w-full text-sm min-w-[600px] mt-4">
            <thead className="text-gray-700 uppercase bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="py-3 px-6 text-left">Employee</th>
                <th className="py-3 px-6 text-center">Check In</th>
                <th className="py-3 px-6 text-center">Check Out</th>
                <th className="py-3 px-6 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {dailyData.map((d, index) => (
                <tr 
                  key={d.id} 
                  className={`border-b border-gray-100 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50/50`}
                >
                  <td className="py-3 px-6 flex items-center gap-3">
                    <img src={d.avatar} alt={d.employee} className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-100" />
                    <div>
                      <p className="font-medium text-gray-800">{d.employee}</p>
                      <p className="text-xs text-gray-500">{d.department} ({d.empId})</p>
                    </div>
                  </td>
                  <td className={`text-center font-semibold text-base ${d.checkIn === '-' ? 'text-gray-400' : 'text-green-600'}`}>
                    {d.checkIn}
                  </td>
                  <td className={`text-center font-semibold text-base ${d.checkOut === '-' || d.checkOut === '—' ? 'text-gray-400' : 'text-red-600'}`}>
                    {d.checkOut}
                  </td>
                  <td className="text-center">
                    <span className={`px-3 py-1 rounded-full text-xs ${badge[d.status]}`}>
                      {d.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderMonthlySummary = () => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 overflow-hidden">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Monthly Summary Overview</h3>

      {/* Filters Row */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select className="border border-gray-300 px-3 py-2 rounded-lg text-gray-700 bg-white shadow-sm">
          <option>All Department</option>
          <option>UI/UX</option>
          <option>Java Backend</option>
        </select>

        <div className="relative">
          <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <select className="border border-gray-300 pl-10 pr-3 py-2 rounded-lg text-gray-700 bg-white shadow-sm appearance-none">
            <option>March 2025</option>
            <option>February 2025</option>
          </select>
        </div>
      </div>

      {/* Monthly Summary Table (DESIGN IMPROVEMENT APPLIED HERE) */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead className="text-gray-700 uppercase bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="py-3 px-6 text-left">Employee</th>
              <th className="py-3 px-6">Total Days</th>
              <th className="py-3 px-6">Present (%)</th>
              <th className="py-3 px-6">Absent (%)</th>
              <th className="py-3 px-6">On Leave (%)</th>
              <th className="py-3 px-6">Action</th>
            </tr>
          </thead>
          <tbody>
            {monthlyData.map((m, index) => {
              const presentPct = ((m.present / m.totalDays) * 100).toFixed(1);
              const absentPct = ((m.absent / m.totalDays) * 100).toFixed(1);
              const onLeavePct = ((m.onLeave / m.totalDays) * 100).toFixed(1);

              return (
                <tr 
                  key={m.id} 
                  className={`border-b border-gray-100 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50/50`}
                >
                  <td className="py-3 px-6 flex items-center gap-3 font-medium text-gray-800">
                    <img src={m.avatar} alt={m.employee} className="w-9 h-9 rounded-full object-cover" />
                    {m.employee}
                  </td>
                  <td className="text-center font-bold text-gray-700">{m.totalDays}</td>
                  <td className="text-center text-green-600 font-bold">
                    {m.present} <span className="text-xs font-normal text-gray-500">({presentPct}%)</span>
                  </td>
                  <td className="text-center text-red-600 font-bold">
                    {m.absent} <span className="text-xs font-normal text-gray-500">({absentPct}%)</span>
                  </td>
                  <td className="text-center text-yellow-600 font-bold">
                    {m.onLeave} <span className="text-xs font-normal text-gray-500">({onLeavePct}%)</span>
                  </td>
                  <td className="text-center">
                    <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition">
                      View Log
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderAttendanceRecords = () => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
      
      {/* Header and Filters */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <h3 className="text-xl font-semibold text-gray-800">Full Attendance Records</h3>

        <div className="flex flex-wrap gap-3">
          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search Employee"
              className="pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Date Range Filter (Enhanced) */}
          <div className="relative">
            <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="date"
              defaultValue="2025-05-03" // Mock date
              className="pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none"
            />
          </div>
        </div>
      </div>

      {/* Attendance Records Table (DESIGN IMPROVEMENT APPLIED HERE) */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[800px]">
          <thead className="text-gray-700 uppercase bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="py-3 px-6 text-left">Employee</th>
              <th className="py-3 px-6">Employee ID</th>
              <th className="py-3 px-6">Department</th>
              <th className="py-3 px-6">Check In</th>
              <th className="py-3 px-6">Check Out</th>
              <th className="py-3 px-6">Status</th>
            </tr>
          </thead>
          <tbody>
            {recordData.filter(r => r.employee.toLowerCase().includes(search.toLowerCase())).map((r, index) => (
              <tr 
                key={r.id} 
                className={`border-b border-gray-100 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50/50`}
              >
                <td className="py-3 px-6 flex items-center gap-3 font-medium text-gray-800">
                  <img src={r.avatar} alt={r.employee} className="w-9 h-9 rounded-full object-cover" />
                  {r.employee}
                </td>
                <td className="text-center text-gray-600">{r.empId}</td>
                <td className="text-center text-gray-600">{r.department}</td>
                <td className="text-center font-bold text-gray-700">{r.checkIn}</td>
                <td className="text-center font-bold text-gray-700">{r.checkOut}</td>
                <td className="text-center">
                  <span className={`px-3 py-1 rounded-full text-xs ${badge[r.status]}`}>
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">

      {/* Page Title */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Attendance Overview</h2>

      {/* TABS */}
      <div className="flex gap-8 border-b border-gray-200 mb-8 overflow-x-auto whitespace-nowrap">
        <TabButton k="daily" label="Daily View" />
        <TabButton k="monthly" label="Monthly Summary" />
        <TabButton k="records" label="Attendance Records" />
      </div>

      {/* CONTENT */}
      <div className="max-w-full mx-auto overflow-hidden overflow-y-auto max-h-[60vh] no-scrollbar">
        {activeTab === "daily" && renderDailyView()}
        {activeTab === "monthly" && renderMonthlySummary()}
        {activeTab === "records" && renderAttendanceRecords()}
      </div>

    </div>
  );
};

export default AttendanceScreen;