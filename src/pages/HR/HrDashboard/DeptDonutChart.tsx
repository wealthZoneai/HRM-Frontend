import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

export interface DeptDataItem {
  name: string;
  value: number;
  color?: string;
  [key: string]: any;
}

interface Props {
  data: DeptDataItem[];
}

const IMAGE_COLORS = [
  "#90BFFF", 
  "#A3C9FF",
  "#3377CC", 
  "#66A3FF",
  "#1A5099", 
  "#4A82CD",
  "#73A2E8",
  "#90BFFF",
  "#B3D3FF",
  "#CCEBFF", 
];


const CustomTooltip = ({ active, payload, data }: any) => {
  // 1. Guard against inactive or empty payload
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const segmentData = payload[0].payload;
  
  // Calculate total from the main data prop (passed from the parent component)
  const total = data.reduce((sum: number, d: DeptDataItem) => sum + d.value, 0);

  // Guard against division by zero
  const percentage = total > 0 ? ((segmentData.value / total) * 100).toFixed(1) : '0';

  return (
    <div className="bg-white p-3 rounded-md shadow-md border border-gray-200 text-sm">
      <p className="font-semibold text-gray-800">{segmentData.name}</p>
      <p className="text-gray-600">{`Employees: ${segmentData.value}`}</p>
      <p className="text-gray-500">{`Share: ${percentage}%`}</p>
    </div>
  );
};

const DeptDonutChart: React.FC<Props> = ({ data }) => {
  const chartColors = IMAGE_COLORS.slice(0, data.length);
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-xl font-semibold mb-6 text-gray-800">
        Employee By Department
      </h3>

      {/* Alignment Fix: Using flex-row with items-start for clean top alignment */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
        
        {/* ==== Donut Chart Section ==== */}
        {/* Alignment Fix: Reduced max-width for better legend space */}
        <div className="w-full max-w-[220px] lg:max-w-[260px] flex-shrink-0">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={80} 
                outerRadius={130}
                paddingAngle={0} 
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={chartColors[index % chartColors.length]} 
                  />
                ))}
              </Pie>

              {/* Pass the full data to the CustomTooltip for calculation */}
              <Tooltip content={<CustomTooltip data={data} />} />
            </PieChart>
        </ResponsiveContainer>
        </div>

        {/* ==== Custom Legend (Matches Image Structure) ==== */}
        {/* Alignment Fix: Removed unnecessary padding/margins, allowing growth */}
        <div className="flex-1 space-y-3 pt-4 lg:pt-0">
          {data.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              {/* Colored Dot */}
              <div
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: chartColors[i % chartColors.length] }}
              />

              {/* Department Name */}
              <span className="text-sm font-medium text-gray-700">
                {item.name}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default DeptDonutChart;