import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Completed", value: 65 },
  { name: "In Progress", value: 25 },
  { name: "To Do", value: 10 },
];

// Classic + modern tones (green, orange, muted gray)
const COLORS = ["#4CAF50", "#FF9800", "#8B5CF6"];

export default function ProjectStatus() {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white p-5 rounded-xl shadow w-full">
      <h2 className="font-semibold text-lg mb-4">Project Status</h2>

      <div className="w-full h-64 md:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="55%"
              outerRadius="80%"
              dataKey="value"
              stroke="transparent"
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>

            {/* Center Percentage Text */}
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-gray-700 font-semibold text-lg"
            >
              {Math.round((data[0].value / total) * 100)}%
            </text>

            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                padding: "6px 10px",
                fontSize: "12px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Custom Legend */}
      <div className="flex justify-center mt-4 gap-6 flex-wrap">
        {data.map((item, i) => (
          <div key={i} className="flex items-center space-x-2 text-sm">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[i] }}
            />
            <p className="text-gray-700 font-medium">
              {item.name} ({item.value}%)
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
