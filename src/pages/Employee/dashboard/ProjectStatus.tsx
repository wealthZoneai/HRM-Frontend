import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

// Dummy Data for Multiple Projects
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

// Classic Palette: Navy (Primary), Muted Amber (Secondary), Warm Stone (Neutral)
const COLORS = ["#1e3a8a", "#d97706", "#a8a29e"];

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
    <div className="max-h-[500px] bg-white flex items-center justify-center font-sans text-stone-800">

      {/* Main Card */}
      <div className="w-full bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-100 overflow-hidden p-6 md:p-6 flex flex-col h-full">

        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <h1 className="text-2xl md:text-xl font-bold text-stone-900 tracking-tight">Project Status</h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm font-medium text-stone-500">
                {currentIndex + 1} / {projectsData.length}
              </span>
              <h2 className="text-sm font-semibold text-blue-900 truncate max-w-[200px]">
                {currentProject.name}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prevProject}
              className="p-2 rounded-full hover:bg-stone-100 text-stone-500 hover:text-blue-900 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextProject}
              className="p-2 rounded-full hover:bg-stone-100 text-stone-500 hover:text-blue-900 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
            {/* <button className="p-2 rounded-full hover:bg-stone-50 text-stone-400 hover:text-blue-900 transition-colors ml-2">
              <MoreHorizontal size={20} />
            </button> */}
          </div>
        </div>

        {/* Chart Section - Animated */}
        <div className="relative w-full flex-1 mb-4 min-h-[250px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={currentProject.data}
                    cx="50%"
                    cy="50%"
                    innerRadius="60%"
                    outerRadius="90%"
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                    cornerRadius={4}
                  >
                    {currentProject.data.map((_, i) => (
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
                    className="fill-blue-900 text-3xl font-bold font-sans"
                  >
                    {Math.round((currentProject.data[0].value / total) * 100)}%
                  </text>
                  <text
                    x="50%"
                    y="58%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-stone-400 text-xs font-medium uppercase tracking-widest font-sans"
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
                    }}
                    itemStyle={{ color: "#1c1917", fontSize: "14px", fontWeight: 500 }}
                    formatter={(value) => [`${value}%`, ""]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Custom Legend - Animated */}
        <div className="space-y-2 overflow-y-auto flex-1 no-scrollbar">
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
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}