
import  { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip  } from 'recharts';
import { motion } from 'framer-motion';
import {  CalendarCheck } from 'lucide-react';

const data = [
  { name: 'Present', value: 78, color: 'hsl(143, 76%, 46%)' },
  { name: 'Absent', value: 12, color: 'hsl(0, 84%, 60%)' },
  { name: 'Late', value: 10, color: 'hsl(45, 93%, 58%)' },
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return percent > 0.08 ? (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      className="text-xs font-semibold drop-shadow-md"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  ) : null;
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload[0]) {
    return (
      <div className="bg-white/95 backdrop-blur-lg border border-gray-100 rounded-xl p-3 shadow-xl">
        <p className="text-sm font-medium text-gray-900">{payload[0].name}</p>
        <p className="text-xs text-gray-600">{payload[0].value} students</p>
      </div>
    );
  }
  return null;
};

export default function AttendanceChart() {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative group"
    >
      {/* Glassmorphic Card */}
      <div
        className={`relative p-6 bg-linear-to-br from-white/80 via-white/70 to-white/60 
                    backdrop-blur-xl rounded-2xl shadow-lg border border-white/40 
                    transition-all duration-500 
                    ${hovered ? 'shadow-2xl scale-[1.02]' : 'shadow-lg'}
                    overflow-hidden`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-linear-to-tr from-emerald-400/20 via-teal-400/10 to-cyan-400/20" />
        </div>

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Attendance Overview
            </h2>
            <p className="text-xs text-gray-500 mt-1">November 2025 • 90 students</p>
          </div>
          <div className="flex gap-2">
            <div className="p-2 bg-emerald-50 rounded-lg">
              <CalendarCheck className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
        </div>

        {/* Donut Chart */}
        <div className="relative h-56 -mx-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={90}
                innerRadius={55}
                fill="#8884d8"
                dataKey="value"
                stroke="none"
                animationBegin={0}
                animationDuration={1200}
                animationEasing="ease-out"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} className="transition-all duration-300 hover:opacity-80" />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Center Stats */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none"
          >
            <div className="text-3xl font-bold bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              78%
            </div>
            <div className="text-xs text-gray-500 font-medium">Present</div>
          </motion.div>
        </div>

        {/* Legend */}
        <div className="relative z-10 mt-6 grid grid-cols-3 gap-3">
          {data.map((item) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + data.indexOf(item) * 0.1 }}
              className="flex items-center gap-2"
            >
              <div
                className="w-3 h-3 rounded-full shadow-sm"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs font-medium text-gray-700">{item.name}</span>
              <span className="text-xs text-gray-500 ml-auto">{item.value}</span>
            </motion.div>
          ))}
        </div>

        {/* Floating Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0 }}
          className="absolute -top-3 -right-3 bg-linear-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg"
        >
          Live
        </motion.div>
      </div>

      {/* Subtle Glow Effect */}
      <div className="absolute inset-0 -z-10 blur-3xl opacity-30">
        <div className="absolute inset-0 bg-linear-to-r from-emerald-400/30 to-teal-400/30 rounded-2xl" />
      </div>
    </motion.div>
  );
}