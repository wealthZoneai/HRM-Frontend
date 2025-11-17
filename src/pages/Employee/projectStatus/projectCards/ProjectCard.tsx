import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, Clock } from "lucide-react";

type ProjectStatus = "Completed" | "Delayed" | "On Track";

type ProjectCardProps = {
  name: string;
  subtitle?: string;
  status: ProjectStatus;
  progress: number;
  tasks: string;
  due: string;
};

export default function ProjectCard({
  name,
  subtitle = "Website Redesign",
  status,
  progress,
  tasks,
  due,
}: ProjectCardProps) {
  const normalizedProgress = Math.min(100, Math.max(0, progress));

  const getStatusBadge = () => {
    switch (status) {
      case "Completed":
        return (
          <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 font-medium">
            <CheckCircle2 size={14} /> {status}
          </span>
        );
      case "Delayed":
        return (
          <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-red-100 text-red-700 font-medium">
            <AlertTriangle size={14} /> {status}
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
            <Clock size={14} /> {status}
          </span>
        );
    }
  };

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-sm bg-white hover:shadow-lg hover:border-blue-200 transition-all duration-300 relative touch-none"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{name}</h4>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
        <p className="text-xs text-gray-500">{subtitle}</p>
        {getStatusBadge()}
      </div>

      {/* Progress */}
      <div>
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>Progress</span>
          <span>{normalizedProgress}%</span>
        </div>

        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-4">
          <motion.div
            className={`h-full ${
              normalizedProgress === 100
                ? "bg-green-500"
                : normalizedProgress < 50
                ? "bg-red-500"
                : "bg-linear-to-r from-blue-500 to-blue-400"
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${normalizedProgress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-between text-xs text-gray-600 gap-1">
          <span>Tasks: {tasks}</span>
          <span>Due: {due}</span>
        </div>
      </div>
    </motion.div>
  );
}