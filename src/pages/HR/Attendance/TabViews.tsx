import React, { useState, useEffect, useMemo } from "react";
import { FiSearch, FiCalendar, FiDownload } from "react-icons/fi";
import { 
  DEPARTMENTS, 
  MONTHS, 
  BADGE_STYLES, 
} from "./data";
import type { AttendanceRecord, User } from "./types";
import { GetMonthlyAttendance } from "../../../Services/apiHelpers"; 

// --- HELPER: Format Time (e.g., "2025-12-30T12:00:27..." -> "12:00 PM") ---
const formatTime = (isoString: string | null) => {
  if (!isoString) return "-";
  return new Date(isoString).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
};

// --- HELPER: Map API Status to Badge Styles ---
const getStatusStyle = (apiStatus: string) => {
  const statusMap: Record<string, string> = {
    "working": "Present",
    "present": "Present",
    "absent": "Absent", 
    "on_leave": "On Leave"
  };
  const uiStatus = statusMap[apiStatus.toLowerCase()] || "Present";
  return BADGE_STYLES[uiStatus as keyof typeof BADGE_STYLES] || "bg-gray-100 text-gray-700";
};

// --- DAILY VIEW COMPONENT ---
export const DailyView: React.FC = () => {
  const [attendanceData, setAttendanceData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Get Today's Date info
        const todayDate = new Date();
        const year = todayDate.getFullYear().toString();
        // Month is 0-indexed, so add 1. PadStart ensures "03" instead of "3"
        const month = String(todayDate.getMonth() + 1).padStart(2, '0'); 
        const todayString = todayDate.toISOString().split('T')[0]; 

        // 2. Fetch the WHOLE month's data
        const response = await GetMonthlyAttendance(year, month);
        
        // 3. Access the 'results' array
        const allMonthRecords = response.data.results || [];
        
        // 4. Filter strictly for TODAY's date
        const todaysRecords = allMonthRecords.filter((item: any) => item.date === todayString);

        setAttendanceData(todaysRecords);
      } catch (error) {
        console.error("Error fetching daily attendance:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="p-10 text-center text-gray-500">Loading today's attendance...</div>;
  }

  return (
    <div className="space-y-6">
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
              {attendanceData.length > 0 ? (
                attendanceData.map((d: any) => (
                  <tr key={d.id} className="border-b border-gray-100 transition-colors bg-white hover:bg-blue-50/50">
                    <td className="py-3 px-6 flex items-center gap-3">
                      <img 
                        src={`https://ui-avatars.com/api/?name=${d.user.username}&background=random&color=fff`} 
                        alt={d.user.username} 
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-100" 
                      />
                      <div>
                        <p className="font-medium text-gray-800 capitalize">
                          {d.user.first_name ? `${d.user.first_name} ${d.user.last_name}` : d.user.username}
                        </p>
                        <p className="text-xs text-gray-500 capitalize">{d.user.role} </p>
                      </div>
                    </td>
                    <td className={`text-center font-semibold text-base ${!d.clock_in ? 'text-gray-400' : 'text-green-600'}`}>
                      {formatTime(d.clock_in)}
                    </td>
                    <td className={`text-center font-semibold text-base ${!d.clock_out ? 'text-gray-400' : 'text-red-600'}`}>
                      {formatTime(d.clock_out)}
                    </td>
                    <td className="text-center">
                      <span className={`px-3 py-1 rounded-full text-xs uppercase ${getStatusStyle(d.status)}`}>
                        {d.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-gray-500">
                    No attendance records found for today.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- MONTHLY VIEW COMPONENT (UPDATED) ---
export const MonthlyView: React.FC<{ onViewLog: (emp: string, month: string, logs: any[]) => void }> = ({ onViewLog }) => {
  // FIX 1: Initialize as empty string to support "Select Department" placeholder
  const [selectedDepartment, setSelectedDepartment] = useState(""); 
  const [selectedMonth, setSelectedMonth] = useState(MONTHS[0].value); 
  
  const [monthlyAggregatedData, setMonthlyAggregatedData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAndProcessData = async () => {
      setLoading(true);
      try {
        const [year, month] = selectedMonth.split("-");
        
        const response = await GetMonthlyAttendance(year, month);
        const rawRecords = response.data.results || [];

        const summaryMap = new Map<number, any>();

        rawRecords.forEach((record: any) => {
          const userId = record.user.id;
          const status = record.status ? record.status.toLowerCase() : "";

          if (!summaryMap.has(userId)) {
            summaryMap.set(userId, {
              id: userId.toString(),
              employee: record.user.first_name ? `${record.user.first_name} ${record.user.last_name}` : record.user.username,
              avatar: `https://ui-avatars.com/api/?name=${record.user.username}&background=random&color=fff`,
              department: record.user.role || "Employee",
              totalDays: 0,
              present: 0,
              absent: 0,
              onLeave: 0,
              month: selectedMonth,
              logs: [] // Initialize logs array
            });
          }

          const empSummary = summaryMap.get(userId);
          empSummary.logs.push(record); // Push record to logs
          empSummary.totalDays += 1;

          if (status === 'working' || status === 'present') {
            empSummary.present += 1;
          } else if (status === 'absent') {
            empSummary.absent += 1;
          } else if (status === 'on_leave') {
            empSummary.onLeave += 1;
          }
        });

        setMonthlyAggregatedData(Array.from(summaryMap.values()));

      } catch (error) {
        console.error("Error fetching monthly data:", error);
        setMonthlyAggregatedData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAndProcessData();
  }, [selectedMonth]);

  const filteredMonthlyData = useMemo(() => {
    return monthlyAggregatedData.filter(item => {
      // FIX 2: If selectedDepartment is empty (Select) or "Teams", show all.
      if (selectedDepartment === "" || selectedDepartment === "Teams") return true;
      return item.department?.toLowerCase() === selectedDepartment.toLowerCase();
    });
  }, [selectedDepartment, monthlyAggregatedData]);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 overflow-hidden">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Monthly Summary Overview</h3>
      
      <div className="flex flex-wrap gap-4 mb-6">
        {/* FIX 3: Added conditional styling and default option */}
        <select 
          className={`border px-3 py-2 rounded-lg shadow-sm capitalize ${selectedDepartment === "" ? "text-gray-400" : "text-gray-700"} border-gray-300 bg-white`}
          value={selectedDepartment} 
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          <option value="" className="text-gray-400">Select Department</option>
          {DEPARTMENTS.map(dept => <option key={dept} value={dept} className="text-gray-700">{dept}</option>)}
        </select>
        
        <div className="relative">
          <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <select 
            className="border border-gray-300 pl-10 pr-3 py-2 rounded-lg text-gray-700 bg-white shadow-sm appearance-none" 
            value={selectedMonth} 
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {MONTHS.map(month => <option key={month.value} value={month.value}>{month.label}</option>)}
          </select>
        </div>
      </div>

      {loading ? (
         <div className="text-center py-12 text-gray-500">Loading monthly data...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead className="text-gray-700 uppercase bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="py-3 px-6 text-left">Employee</th>
                <th className="py-3 px-6">Department</th>
                <th className="py-3 px-6">Total Days</th>
                <th className="py-3 px-6">Present (%)</th>
                <th className="py-3 px-6">Absent (%)</th>
                <th className="py-3 px-6">On Leave (%)</th>
                <th className="py-3 px-6">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredMonthlyData.length > 0 ? filteredMonthlyData.map((m, index) => {
                const presentPct = m.totalDays > 0 ? ((m.present / m.totalDays) * 100).toFixed(1) : "0.0";
                const absentPct = m.totalDays > 0 ? ((m.absent / m.totalDays) * 100).toFixed(1) : "0.0";
                const onLeavePct = m.totalDays > 0 ? ((m.onLeave / m.totalDays) * 100).toFixed(1) : "0.0";
                
                return (
                  <tr key={m.id} className={`border-b border-gray-100 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50/50`}>
                    <td className="py-3 px-6 flex items-center gap-3 font-medium text-gray-800">
                      <img src={m.avatar} alt={m.employee} className="w-9 h-9 rounded-full object-cover" /> 
                      <span className="capitalize">{m.employee}</span>
                    </td>
                    <td className="text-center text-gray-600 capitalize">{m.department}</td>
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
                      <button onClick={() => onViewLog(m.employee, m.month, m.logs)} className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition">View Log</button>
                    </td>
                  </tr>
                );
              }) : (
                <tr><td colSpan={7} className="text-center py-8 text-lg text-gray-500">No attendance data found for the selected filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// --- RECORDS VIEW COMPONENT ---
export const RecordsView: React.FC = () => {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [search, setSearch] = useState("");
  
  // Initialize as empty strings to show "All" by default
  const [fromDate, setFromDate] = useState(""); 
  const [toDate, setToDate] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // If 'fromDate' is set, use it to determine the month to fetch.
      // If 'fromDate' is EMPTY, default to the CURRENT DATE.
      const dateObj = fromDate ? new Date(fromDate) : new Date();
      
      const year = dateObj.getFullYear().toString();
      const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");

      const response = await GetMonthlyAttendance(year, month);
      
      if (response.data && response.data.results) {
        setRecords(response.data.results);
      } else {
        setRecords([]);
      }
    } catch (error) {
      console.error("Error fetching records:", error);
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromDate]); 

  // --- FILTERING LOGIC ---
  const filteredRecords = records.filter((r) => {
    // 1. Search Logic
    const searchTerm = search.toLowerCase();
    const fullName = getEmployeeName(r.user).toLowerCase();
    
    const matchesSearch = 
      r.user.username.toLowerCase().includes(searchTerm) ||
      r.user.email.toLowerCase().includes(searchTerm) ||
      fullName.includes(searchTerm);

    // 2. Date Range Logic
    const recDate = new Date(r.date);
    const start = fromDate ? new Date(fromDate) : null;
    const end = toDate ? new Date(toDate) : null;

    if (start) start.setHours(0, 0, 0, 0);
    if (end) end.setHours(23, 59, 59, 999);

    // If 'start' (fromDate) is empty, !start is true, so we show everything
    const isAfterStart = !start || recDate >= start;
    // If 'end' (toDate) is empty, !end is true, so we show everything
    const isBeforeEnd = !end || recDate <= end;

    return matchesSearch && isAfterStart && isBeforeEnd;
  });

  const handleDownload = (data: AttendanceRecord[]) => {
    const csvContent = [
      ["Employee", "Employee ID", "Role", "Email", "Date", "Check In", "Check Out", "Status"],
      ...data.map((item) => {
        return [
          getEmployeeName(item.user),
          item.user.id,
          item.user.role,
          item.user.email,
          item.date,
          formatTime(item.clock_in),
          formatTime(item.clock_out),
          item.status
        ];
      })
    ]
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    const fileNameDate = fromDate ? `${fromDate}_to_${toDate || 'end'}` : 'Full_Month';
    link.setAttribute("download", `attendance_records_${fileNameDate}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  function getEmployeeName(user: User): string {
    return user.first_name && user.last_name 
      ? `${user.first_name} ${user.last_name}` 
      : user.username || "";
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
      <div className="flex flex-col gap-4 mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Full Attendance Records</h3>
        
        {/* Controls */}
        <div className="flex flex-wrap justify-between items-center gap-4">
          
          {/* Search */}
          <div className="relative w-full md:w-auto">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search Employee..."
              className="pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors w-full md:w-64"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Date Pickers */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-lg border border-gray-200">
              <div className="relative">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-[10px] font-bold uppercase tracking-wider">From</span>
                <input
                  type="date"
                  max={new Date().toISOString().split("T")[0]}
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="pl-10 pr-2 py-1.5 border-none bg-transparent text-sm text-gray-700 focus:ring-0 cursor-pointer placeholder-gray-400"
                />
              </div>
              <div className="h-4 w-px bg-gray-300"></div>
              <div className="relative">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-[10px] font-bold uppercase tracking-wider">To</span>
                <input
                  type="date"
                  max={new Date().toISOString().split("T")[0]}
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="pl-8 pr-2 py-1.5 border-none bg-transparent text-sm text-gray-700 focus:ring-0 cursor-pointer placeholder-gray-400"
                />
              </div>
            </div>
            
            <button
              onClick={() => handleDownload(filteredRecords)}
              disabled={loading || filteredRecords.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              <FiDownload /> Export
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-100">
        <table className="w-full text-sm min-w-[900px]">
          <thead className="text-gray-700 uppercase bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="py-3 px-6 text-left">Employee</th>
              <th className="py-3 px-6 text-center">ID</th>
              <th className="py-3 px-6 text-center">Role</th>
              <th className="py-3 px-6 text-center">Date</th>
              <th className="py-3 px-6 text-center">Check In</th>
              <th className="py-3 px-6 text-center">Check Out</th>
              <th className="py-3 px-6 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center py-12">
                   <div className="flex justify-center items-center gap-2 text-gray-500">
                     <span className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"></span>
                     Loading records...
                   </div>
                </td>
              </tr>
            ) : filteredRecords.length > 0 ? (
              filteredRecords.map((r, index) => (
                <tr
                  key={r.id}
                  className={`border-b border-gray-100 transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-blue-50/50`}
                >
                  <td className="py-3 px-6 flex items-center gap-3 font-medium text-gray-800">
                    <img
                      src={`https://ui-avatars.com/api/?name=${r.user.username}&background=random&color=fff`}
                      alt={r.user.username}
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-white shadow-sm"
                    />
                    <div className="flex flex-col">
                        <span>{getEmployeeName(r.user)}</span>
                        <span className="text-xs text-gray-400 font-normal">{r.user.email}</span>
                    </div>
                  </td>
                  <td className="text-center text-gray-600">{r.user.id}</td>
                  <td className="text-center text-gray-600 capitalize">{r.user.role}</td>
                  <td className="text-center text-gray-600 font-medium">{r.date}</td>
                  <td className="text-center font-bold text-gray-700">
                    {formatTime(r.clock_in)}
                  </td>
                  <td className="text-center font-bold text-gray-700">
                    {formatTime(r.clock_out)}
                  </td>
                  <td className="text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusStyle(r.status)}`}
                    >
                      {r.status.replace('_', ' ')}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-12 text-gray-500">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};