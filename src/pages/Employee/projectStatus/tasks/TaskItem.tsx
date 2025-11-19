import { useState } from "react";
import { CheckCircle2, Hourglass, Circle, ChevronDown } from "lucide-react";

type TaskProps = {
  title: string;
  priority: "High" | "Medium" | "Low";
  due: string;
  status: "none" | "completed" | "inProgress" | "notStarted";
  onStatusChange: (newStatus: "completed" | "inProgress" | "notStarted" | "none") => void;
};

export default function TaskItem({
  title,
  due,
  status,
  onStatusChange,
}: TaskProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const renderStatusIcon = () => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="text-green-500" size={20} />;
      case "inProgress":
        return <Hourglass className="text-yellow-500" size={20} />;
      case "notStarted":
      case "none":
        return <Circle className="text-red-500" size={20} />;
      default:
        return <Circle className="text-red-400" size={20} />;
    }
  };

  const statusOptions = [
    { label: "Completed", value: "completed", icon: <CheckCircle2 className="text-green-500" size={16} /> },
    { label: "In Progress", value: "inProgress", icon: <Hourglass className="text-yellow-500" size={16} /> },
    { label: "Not Started", value: "notStarted", icon: <Circle className="text-red-500" size={16} /> },
    // { label: "Clear Status", value: "none", icon: <Circle className="text-gray-400" size={16} /> },
  ];

  return (
    <div className="relative flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
      {/* Left */}
      <div className="flex items-center gap-3 mb-2 sm:mb-0">
        {renderStatusIcon()}
        <span className="font-medium text-gray-900 text-sm sm:text-base">{title}</span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <span
          className={`text-xs sm:text-sm font-medium ${
            due === "Today" ? "text-blue-600" : "text-gray-700"
          }`}
        >
          {due}
        </span>

        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="p-1 hover:bg-gray-200 rounded-full"
        >
          <ChevronDown size={16} />
        </button>

        {/* Dropdown */}
        {dropdownOpen && (
          <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-gray-200 shadow-lg rounded-lg z-50">
            {statusOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  onStatusChange(opt.value as any);
                  setDropdownOpen(false);
                }}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100 text-left"
              >
                {opt.icon}
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}