// DepartmentModal.tsx
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  PieChart, // Added for new chart type
  Pie,
  Cell,
  Tooltip, // Added for chart interaction
  Legend, // Added for chart legend
} from "recharts";

interface Props {
  open: boolean;
  onClose: () => void;
  dept: any;
}

// --- Mock Data Structures (REQUIRED FOR NEW CHARTS/METRICS) ---
const HEADCOUNT_DATA = [
    { name: 'Interns', value: 10, color: '#A5B4FC' }, // Indigo-200
    { name: 'Juniors', value: 45, color: '#4F46E5' }, // Indigo-600
    { name: 'Seniors', value: 30, color: '#1E40AF' }, // Blue-800
    { name: 'Leads', value: 5, color: '#DC2626' },    // Red-600
];

const KEY_METRICS = [
    { label: "Attrition Rate", value: "3.2%", color: "text-red-600", description: "YTD Departures" },
    { label: "Avg Tenure", value: "4.1 yrs", color: "text-green-600", description: "Average Employee Duration" },
    { label: "Open Roles", value: "7", color: "text-yellow-600", description: "Current Vacancies" },
    { label: "Avg Salary", value: "$85K", color: "text-blue-600", description: "Mean Annual Compensation" },
];


export default function DepartmentModal({ open, onClose, dept }: Props) {
  if (!open || !dept) return null;

  // Pie chart helper for tooltips
  const renderCustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 border border-gray-200 text-xs shadow-md rounded">
          <p className="font-semibold text-gray-800">{data.name}</p>
          <p className="text-gray-600">{data.value} Employees</p>
        </div>
      );
    }
    return null;
  };


  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-999 px-4">
      {/* Modal Container: Max height, scrollable content */}
      <div 
        className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl relative 
                   max-h-[90vh] overflow-hidden" // FIX: Max height and overflow wrapper
      >
        
        {/* Scrollable Content Area */}
        <div className="p-6 md:p-8 overflow-y-auto max-h-[90vh]"> 

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-black z-10 p-2"
          >
            <span className="text-xl font-medium">✕</span>
          </button>

          {/* Header */}
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            {dept.name}
          </h2>
          <p className="text-lg text-blue-600 font-medium border-b pb-4 mb-8">
            Detailed Departmental Insights Dashboard
          </p>

          {/* 1. Key Performance Indicators (KPIs) */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Key HR Metrics 📊</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {KEY_METRICS.map((metric) => (
                <div key={metric.label} className="p-5 rounded-xl bg-white border border-gray-200 shadow-sm transition hover:shadow-md">
                  <p className="text-sm font-medium text-gray-500">{metric.label}</p>
                  <p className={`text-3xl font-bold mt-1 ${metric.color}`}>{metric.value}</p>
                  <p className="text-xs text-gray-400 mt-2">{metric.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Charts Section (Grid Layout) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* A. Headcount Breakdown (New Pie Chart) */}
            <div className="bg-gray-50 rounded-xl p-5 shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold mb-3 text-gray-700">Headcount Breakdown by Role</h3>
              <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={HEADCOUNT_DATA}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      fill="#8884d8"
                    >
                      {HEADCOUNT_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={renderCustomTooltip} />
                    <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ paddingLeft: '20px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* B. Productivity Chart (Improved Bar Chart) */}
            <div className="bg-gray-50 rounded-xl p-5 shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold mb-3 text-gray-700">Monthly Productivity Score 📈</h3>
              <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dept.productivityData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                    <XAxis dataKey="month" stroke="#6b7280" tickLine={false} axisLine={false} />
                    <YAxis stroke="#6b7280" tickLine={false} axisLine={false} />
                    <Tooltip 
                       contentStyle={{ border: 'none', borderRadius: '4px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }} 
                       labelStyle={{ fontWeight: 'bold', color: '#1f2937' }}
                    />
                    <Bar dataKey="score" fill="#1D4ED8" radius={[8, 8, 0, 0]} barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* C. Attendance Chart (Improved Line Chart) */}
            <div className="lg:col-span-2 bg-gray-50 rounded-xl p-5 shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold mb-3 text-gray-700">Daily Attendance Rate (Last 30 Days) 📅</h3>
              <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dept.attendanceData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                    <XAxis dataKey="day" stroke="#6b7280" tickLine={false} axisLine={false} />
                    <YAxis stroke="#6b7280" tickLine={false} axisLine={false} domain={[70, 100]} />
                    <Tooltip 
                       contentStyle={{ border: 'none', borderRadius: '4px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }} 
                       labelStyle={{ fontWeight: 'bold', color: '#1f2937' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="present"
                      stroke="#059669" // Green
                      strokeWidth={3}
                      dot={{ r: 4, fill: '#059669' }}
                      activeDot={{ r: 8, strokeWidth: 2, stroke: '#10B981' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* Spacer to ensure the last chart is not cut off by padding/border */}
          <div className="h-4"></div> 
        </div>
      </div>
    </div>
  );
}