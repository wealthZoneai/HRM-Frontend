import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { MoreHorizontal } from 'lucide-react';

const data = [
  { name: "Completed", value: 65 },
  { name: "In Progress", value: 25 },
  { name: "To Do", value: 10 },
];

// Classic Palette: Navy (Primary), Muted Amber (Secondary), Warm Stone (Neutral)
const COLORS = ["#1e3a8a", "#d97706", "#a8a29e"];

export default function ProjectStatus() {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center font-sans text-stone-800">

      {/* Main Card */}
      <div className="w-full bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-100 overflow-hidden p-6 md:p-8 h-[650px] flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            {/* <h2 className="text-xs font-bold tracking-widest uppercase text-blue-900/60 mb-1">Overview</h2> */}
            <h1 className="text-2xl font-bold text-stone-900 tracking-tight">Project Status</h1>
          </div>
          <button className="p-2 rounded-full hover:bg-stone-50 text-stone-400 hover:text-blue-900 transition-colors">
            <MoreHorizontal size={20} />
          </button>
        </div>

        {/* Chart Section */}
        <div className="relative w-full flex-1 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="85%"
                paddingAngle={5}
                dataKey="value"
                stroke="none"
                cornerRadius={4}
              >
                {data.map((_, i) => (
                  <Cell 
                    key={i} 
                    fill={COLORS[i]} 
                    className="outline-none focus:outline-none transition-all duration-300 hover:opacity-90"
                  />
                ))}
              </Pie>

              {/* Center Percentage Text */}
              <text
                x="50%"
                y="45%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-blue-900 text-4xl font-bold"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {Math.round((data[0].value / total) * 100)}%
              </text>
              <text
                x="50%"
                y="58%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-stone-400 text-xs font-medium uppercase tracking-widest"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Complete
              </text>

              {/* Custom Tooltip */}
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  padding: "12px",
                  border: "1px solid #e7e5e4", // stone-200
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
                  fontFamily: "'Inter', sans-serif",
                }}
                itemStyle={{ color: "#1c1917", fontSize: "14px", fontWeight: 500 }}
                formatter={(value) => [`${value}%`, ""]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Custom Legend */}
        <div className="space-y-2 overflow-y-auto flex-1">
          {data.map((item, i) => (
            <div 
              key={i} 
              className="flex items-center justify-between p-2 rounded-xl hover:bg-stone-50 transition-colors group cursor-default"
            >
              <div className="flex items-center space-x-3">
                <div
                  className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-white"
                  style={{ backgroundColor: COLORS[i], '--tw-ring-color': COLORS[i] + '40' } as React.CSSProperties & Record<string, string>}
                />
                <span className="text-sm font-medium text-stone-600 group-hover:text-stone-900 transition-colors">
                  {item.name}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold text-stone-900">
                  {item.value}%
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        {/* <div className="mt-6 pt-6 border-t border-stone-100 flex items-center gap-2 text-xs text-stone-400">
            <Activity size={14} />
            <span>Last updated 2 hours ago</span>
        </div> */}

      </div>
    </div>
  );
}