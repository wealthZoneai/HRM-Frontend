import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

// Dummy Data
const projectsData = [
  {
    id: 1,
    name: "Wealth Zone HRM Portal",
    data: [
      { name: "Completed", value: 65 },
      { name: "In Progress", value: 25 },
      { name: "To Do", value: 10 },
    ]
  },
  {
    id: 2,
    name: "E-Commerce Platform Revamp",
    data: [
      { name: "Completed", value: 30 },
      { name: "In Progress", value: 50 },
      { name: "To Do", value: 20 },
    ]
  },
  {
    id: 3,
    name: "Client CRM Dashboard",
    data: [
      { name: "Completed", value: 80 },
      { name: "In Progress", value: 15 },
      { name: "To Do", value: 5 },
    ]
  },
  {
    id: 4,
    name: "Mobile App Development",
    data: [
      { name: "Completed", value: 40 },
      { name: "In Progress", value: 40 },
      { name: "To Do", value: 20 },
    ]
  }
];

// Updated Palette: Matches HR theme (Blue, Amber, Gray/Stone)
const COLORS = ["#1e3a8a", "#d97706", "#9ca3af"];

export default function ProjectStatus() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projectsData.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projectsData.length) % projectsData.length);
  };

  const currentProject = projectsData[currentIndex];
  const total = currentProject.data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="h-[420px] bg-white rounded-2xl shadow-lg p-6 border border-gray-100 flex flex-col font-sans text-gray-800">

      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 min-w-0 pr-4">
          <h1 className="text-lg font-semibold text-gray-800">Project Status</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs font-medium text-gray-400">
              {currentIndex + 1} / {projectsData.length}
            </span>
            <h2 className="text-sm font-semibold text-blue-900 truncate">
              {currentProject.name}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={prevProject}
            className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-blue-900 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextProject}
            className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-blue-900 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Chart Section - Animated */}
      <div className="relative w-full flex-1 mb-2 min-h-[140px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProject.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={currentProject.data}
                  cx="50%"
                  cy="50%"
                  innerRadius="65%"
                  outerRadius="100%"
                  paddingAngle={6}
                  dataKey="value"
                  stroke="none"
                  cornerRadius={4}
                >
                  {currentProject.data.map((_, i) => (
                    <Cell
                      key={i}
                      fill={COLORS[i]}
                      className="outline-none focus:outline-none hover:opacity-90 transition-opacity"
                    />
                  ))}
                </Pie>
                {/* Center Text */}
                <text
                  x="50%"
                  y="45%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-blue-900 text-2xl font-bold font-sans"
                >
                  {Math.round((currentProject.data[0].value / total) * 100)}%
                </text>
                <text
                  x="50%"
                  y="60%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-gray-400 text-[10px] font-bold uppercase tracking-widest font-sans"
                >
                  Complete
                </text>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    padding: "8px 12px",
                    border: "1px solid #f3f4f6",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
                  }}
                  itemStyle={{ color: "#1f2937", fontSize: "12px", fontWeight: 600 }}
                  formatter={(value) => [`${value}%`, ""]}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Legend */}
      <div className="space-y-2 overflow-y-auto min-h-0 flex-1 scrollbar-hide pt-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProject.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {currentProject.data.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors group cursor-default"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: COLORS[i] }}
                  />
                  <span className="text-xs font-medium text-gray-500 group-hover:text-gray-900 transition-colors">
                    {item.name}
                  </span>
                </div>
                <span className="text-xs font-bold text-gray-900">
                  {item.value}%
                </span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
