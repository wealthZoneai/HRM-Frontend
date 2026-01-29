import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployeeProjects, selectProjects, selectProjectsLoading } from '../../../store/slice/projectSlice';
import type { AppDispatch } from '../../../store';

// Updated Palette: Matches HR theme (Amber for In Progress, Gray for To Do)
const COLORS = ["#d97706", "#9ca3af"];

export default function ProjectStatus() {
  const dispatch = useDispatch<AppDispatch>();
  const projects = useSelector(selectProjects);
  const loading = useSelector(selectProjectsLoading);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchEmployeeProjects());
  }, [dispatch]);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  // Transform API data to chart format - only show open tasks
  const getChartData = (project: any) => {
    const total = project.total_tasks || 1; // Total is already only open tasks from backend
    return [
      { name: "In Progress", value: Math.round((project.in_progress_tasks / total) * 100) },
      { name: "To Do", value: Math.round((project.todo_tasks / total) * 100) },
    ];
  };

  // Loading state
  if (loading) {
    return (
      <div className="h-[420px] bg-white rounded-2xl shadow-lg p-6 border border-gray-100 flex items-center justify-center font-sans">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
          <p className="text-sm text-gray-500">Loading project status...</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (!projects || projects.length === 0) {
    return (
      <div className="h-[420px] bg-white rounded-2xl shadow-lg p-6 border border-gray-100 flex items-center justify-center font-sans">
        <div className="text-center">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No Projects Assigned</h3>
          <p className="text-sm text-gray-500">You don't have any tasks assigned yet.</p>
        </div>
      </div>
    );
  }

  const currentProject = projects[currentIndex];
  const chartData = getChartData(currentProject);
  const total = currentProject.total_tasks || 1;

  return (
    <div className="h-[420px] bg-white rounded-2xl shadow-lg p-6 border border-gray-100 flex flex-col font-sans text-gray-800">

      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 min-w-0 pr-4">
          <h1 className="text-lg font-semibold text-gray-800">Project Status</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs font-medium text-gray-400">
              {currentIndex + 1} / {projects.length}
            </span>
            <h2 className="text-sm font-semibold text-blue-900 truncate">
              {currentProject.project_name}
            </h2>
          </div>
        </div>

        {projects.length > 1 && (
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
        )}
      </div>

      {/* Chart Section - Animated */}
      <div className="relative w-full flex-1 mb-2 min-h-[140px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProject.project_id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius="65%"
                  outerRadius="100%"
                  paddingAngle={6}
                  dataKey="value"
                  stroke="none"
                  cornerRadius={4}
                >
                  {chartData.map((_, i) => (
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
                  {Math.round((currentProject.in_progress_tasks / total) * 100)}%
                </text>
                <text
                  x="50%"
                  y="60%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-gray-400 text-[10px] font-bold uppercase tracking-widest font-sans"
                >
                  In Progress
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
            key={currentProject.project_id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {chartData.map((item, i) => (
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
