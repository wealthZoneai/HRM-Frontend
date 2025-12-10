import React, { useState, useMemo } from "react";
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
  department: string; // Added to dailyData
}

interface MonthlySummaryItem {
  id: string;
  employee: string;
  avatar: string;
  department: string; // <-- New property for filtering
  totalDays: number;
  present: number;
  absent: number;
  onLeave: number;
  month: string;
}

interface AttendanceRecord extends DailyViewItem { }

// --- DEPARTMENTS LIST ---
const DEPARTMENTS = [
  "All Department",
  "AWS",
  "Cyber Security",
  "Java",
  "Python",
  "QA",
  "React",
  "UI/UX",
];

// --- MONTHS LIST (For Filter Dropdown) ---
const MONTHS = [
  { label: "December 2025", value: "2025-12" },
  { label: "November 2025", value: "2025-11" },
  { label: "October 2025", value: "2025-10" },
  { label: "September 2025", value: "2025-09" },
  { label: "August 2025", value: "2025-08" },
  { label: "July 2025", value: "2025-07" },
  { label: "June 2025", value: "2025-06" },
  { label: "May 2025", value: "2025-05" },
  { label: "April 2025", value: "2025-04" },
  { label: "March 2025", value: "2025-03" },
  { label: "February 2025", value: "2025-02" },
  { label: "January 2025", value: "2025-01" },
];


// --- DYNAMIC DATA (Updated to use your departments) ---
const dailyData: DailyViewItem[] = [
  { id: "1", employee: "Clement Mendie", empId: "EMP001", avatar: "https://i.pravatar.cc/40?img=1", checkIn: "09:00 AM", checkOut: "05:00 PM", status: "Present", department: "UI/UX" },
  { id: "2", employee: "Alice Johnson", empId: "EMP002", avatar: "https://i.pravatar.cc/40?img=2", checkIn: "-", checkOut: "-", status: "Absent", department: "Java" },
  { id: "3", employee: "Chris Evans", empId: "EMP003", avatar: "https://i.pravatar.cc/40?img=3", checkIn: "09:30 AM", checkOut: "—", status: "On Leave", department: "Python" },
  { id: "4", employee: "Diana Prince", empId: "EMP004", avatar: "https://i.pravatar.cc/40?img=4", checkIn: "08:45 AM", checkOut: "05:15 PM", status: "Present", department: "UI/UX" },
  { id: "5", employee: "Ethan Hunt", empId: "EMP005", avatar: "https://i.pravatar.cc/40?img=5", checkIn: "09:10 AM", checkOut: "05:05 PM", status: "Present", department: "AWS" },
  { id: "6", employee: "Fiona Glenn", empId: "EMP006", avatar: "https://i.pravatar.cc/40?img=6", checkIn: "09:05 AM", checkOut: "-", status: "Present", department: "Cyber Security" },
  { id: "7", employee: "George Blake", empId: "EMP007", avatar: "https://i.pravatar.cc/40?img=7", checkIn: "-", checkOut: "-", status: "Absent", department: "React" },
  { id: "8", employee: "Holly Tate", empId: "EMP008", avatar: "https://i.pravatar.cc/40?img=8", checkIn: "08:50 AM", checkOut: "05:10 PM", status: "Present", department: "QA" },
];

const monthlyData: MonthlySummaryItem[] = [
  // March Data
  { id: "1", employee: "Clement Mendie", avatar: "https://i.pravatar.cc/40?img=1", department: "UI/UX", totalDays: 22, present: 20, absent: 1, onLeave: 1, month: "2025-03" },
  { id: "2", employee: "Alice Johnson", avatar: "https://i.pravatar.cc/40?img=2", department: "Java", totalDays: 22, present: 18, absent: 3, onLeave: 1, month: "2025-03" },
  { id: "3", employee: "Chris Evans", avatar: "https://i.pravatar.cc/40?img=3", department: "Python", totalDays: 22, present: 15, absent: 5, onLeave: 2, month: "2025-03" },
  { id: "4", employee: "Diana Prince", avatar: "https://i.pravatar.cc/40?img=4", department: "UI/UX", totalDays: 22, present: 22, absent: 0, onLeave: 0, month: "2025-03" },
  { id: "5", employee: "Ethan Hunt", avatar: "https://i.pravatar.cc/40?img=5", department: "AWS", totalDays: 22, present: 21, absent: 0, onLeave: 1, month: "2025-03" },
  { id: "6", employee: "Fiona Glenn", avatar: "https://i.pravatar.cc/40?img=6", department: "Cyber Security", totalDays: 22, present: 19, absent: 2, onLeave: 1, month: "2025-03" },
  // February Data (Different stats/departments to show filtering)
  { id: "7", employee: "George Blake", avatar: "https://i.pravatar.cc/40?img=7", department: "React", totalDays: 20, present: 10, absent: 5, onLeave: 5, month: "2025-02" },
  { id: "8", employee: "Holly Tate", avatar: "https://i.pravatar.cc/40?img=8", department: "QA", totalDays: 20, present: 20, absent: 0, onLeave: 0, month: "2025-02" },
  { id: "9", employee: "Clement Mendie", avatar: "https://i.pravatar.cc/40?img=1", department: "UI/UX", totalDays: 20, present: 15, absent: 3, onLeave: 2, month: "2025-02" },
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

  // --- STATE FOR MONTHLY SUMMARY FILTERS ---
  const [selectedDepartment, setSelectedDepartment] = useState(DEPARTMENTS[0]); // "All Department"
  const [selectedMonth, setSelectedMonth] = useState(MONTHS[0].value); // "2025-03"


  const TabButton: React.FC<{ k: string, label: string }> = ({ k, label }) => (
    <button
      onClick={() => setActiveTab(k as any)}
      className={`pb-3 text-base transition-colors ${activeTab === k
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
      {/* 1. Daily Attendance Table */}
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

  // --- FILTERING LOGIC FOR MONTHLY SUMMARY ---
  const filteredMonthlyData = useMemo(() => {
    return monthlyData.filter(item => {
      const isMonthMatch = item.month === selectedMonth;
      const isDepartmentMatch = selectedDepartment === "All Department" || item.department === selectedDepartment;

      return isMonthMatch && isDepartmentMatch;
    });
  }, [selectedDepartment, selectedMonth]);


  const renderMonthlySummary = () => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 overflow-hidden">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Monthly Summary Overview</h3>

      {/* Filters Row (NOW DYNAMIC) */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Department Filter */}
        <select
          className="border border-gray-300 px-3 py-2 rounded-lg text-gray-700 bg-white shadow-sm"
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          {DEPARTMENTS.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>

        {/* Month/Calendar Filter */}
        <div className="relative">
          <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <select
            className="border border-gray-300 pl-10 pr-3 py-2 rounded-lg text-gray-700 bg-white shadow-sm appearance-none"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {MONTHS.map(month => (
              <option key={month.value} value={month.value}>{month.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Monthly Summary Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead className="text-gray-700 uppercase bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="py-3 px-6 text-left">Employee</th>
              <th className="py-3 px-6">Department</th> {/* Added Department Column */}
              <th className="py-3 px-6">Total Days</th>
              <th className="py-3 px-6">Present (%)</th>
              <th className="py-3 px-6">Absent (%)</th>
              <th className="py-3 px-6">On Leave (%)</th>
              <th className="py-3 px-6">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredMonthlyData.length > 0 ? (
              filteredMonthlyData.map((m, index) => {
                const presentPct = ((m.present / m.totalDays) * 100).toFixed(1);
                const absentPct = ((m.absent / m.totalDays) * 100).toFixed(1);
                const onLeavePct = ((m.onLeave / m.totalDays) * 100).toFixed(1);

                return (
                  <tr
                    key={m.id + m.month} // Use id and month for a more unique key
                    className={`border-b border-gray-100 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50/50`}
                  >
                    <td className="py-3 px-6 flex items-center gap-3 font-medium text-gray-800">
                      <img src={m.avatar} alt={m.employee} className="w-9 h-9 rounded-full object-cover" />
                      {m.employee}
                    </td>
                    <td className="text-center text-gray-600">{m.department}</td> {/* Display Department */}
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
              })
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-8 text-lg text-gray-500">
                  No attendance data found for the selected filters.
                </td>
              </tr>
            )}
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

      {/* Attendance Records Table */}
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