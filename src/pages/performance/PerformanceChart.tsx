import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Cell } from "recharts";
import { useEffect } from "react";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-200">
        <p className="font-semibold text-sm">{label}</p>
        <p className="text-sm">
          <span className="text-blue-600">Score:</span> {payload[0].value}%
        </p>
      </div>
    );
  }
  return null;
};

interface PerformanceData {
  day: string;
  value: number;
}

const PerformanceChart = ({ data }: { data: PerformanceData[] }) => {
  // Debug: Log the incoming data
  useEffect(() => {
    console.log('Performance chart data:', data);
  }, [data]);

  if (!data || data.length === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-gray-50 rounded-lg">
        <p className="text-gray-500">No performance data available</p>
      </div>
    );
  }
  // Calculate average for the reference line
  const average = data.length > 0 
    ? data.reduce((sum, item) => sum + item.value, 0) / data.length 
    : 0;

  // Ensure data is sorted by day of the week
  const daysOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const sortedData = [...data].sort((a, b) => 
    daysOrder.indexOf(a.day) - daysOrder.indexOf(b.day)
  );

  return (
    <div className="w-full h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-700">Weekly Performance</h3>
        <div className="flex items-center text-sm text-gray-500">
          <span className="w-3 h-3 bg-blue-600 rounded-full mr-1"></span>
          <span>Your Score</span>
          <span className="w-3 h-3 bg-blue-100 rounded-full mx-1 ml-4"></span>
          <span>Avg: {average.toFixed(1)}%</span>
        </div>
      </div>
      
      <div className="h-64 w-full border border-gray-200 rounded-lg p-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={sortedData}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            barSize={24}
          >
            <CartesianGrid vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} />
            <Bar 
              dataKey="value" 
              name="Performance"
              radius={[4, 4, 0, 0]}
              background={{ fill: '#f3f4f6', radius: 4 }}
            >
              {sortedData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={
                    entry.value > average + 10 ? '#1d4ed8' : 
                    entry.value > average - 10 ? '#3b82f6' : '#93c5fd'
                  } 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;
