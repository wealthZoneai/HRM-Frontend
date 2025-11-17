import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip
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

// Beautiful gradient colors
const COLORS = [
  "url(#grad1)",
  "url(#grad2)",
  "url(#grad3)",
  "url(#grad4)",
  "url(#grad5)",
];

const DeptDonutChart: React.FC<Props> = ({ data }) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-xl font-semibold mb-6 text-gray-800">
        Employee by Department
      </h3>

      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
        
        {/* ==== Donut Chart Section ==== */}
        <div className="relative w-full max-w-xs mx-auto">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              {/* Gradient Definitions */}
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4F46E5" />
                  <stop offset="100%" stopColor="#6366F1" />
                </linearGradient>
                <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#14B8A6" />
                  <stop offset="100%" stopColor="#2DD4BF" />
                </linearGradient>
                <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#FBBF24" />
                </linearGradient>
                <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#EF4444" />
                  <stop offset="100%" stopColor="#F87171" />
                </linearGradient>
                <linearGradient id="grad5" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0EA5E9" />
                  <stop offset="100%" stopColor="#38BDF8" />
                </linearGradient>
              </defs>

              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
                cornerRadius={8}  // Rounded donut edges
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  borderRadius: "10px",
                  borderColor: "#e5e7eb",
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* ==== Center Content (Total Employees) ==== */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-xs text-gray-500">Total</p>
            <p className="text-2xl font-semibold text-gray-800">{total}</p>
          </div>
        </div>

        {/* ==== Custom Legend ==== */}
        <div className="flex flex-col gap-3 w-full">
          {data.map((item, i) => {
            const percent = ((item.value / total) * 100).toFixed(1);

            return (
              <div key={i} className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ background: COLORS[i % COLORS.length].replace("url(#", "url(#") }}
                />

                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">{item.name}</p>
                  <div className="w-full bg-gray-200 h-2 mt-1 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${percent}%`,
                        background: `var(--legend-color-${i})`,
                      }}
                    />
                  </div>
                </div>

                <span className="text-sm font-semibold text-gray-900">
                  {item.value}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default DeptDonutChart;
