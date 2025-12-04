import { useState } from "react";
import { CheckCircle2, Hourglass, Circle, User, Plus, Check, ChevronDown, ChevronRight } from "lucide-react";
import type { Subtask } from "./taskData";

type TaskProps = {
  title: string;
  priority: "High" | "Medium" | "Low";
  due: string;
  status: "none" | "completed" | "inProgress" | "notStarted";
  assignedTo: string;
  assignedBy: string;
  subtasks: Subtask[];
  employees: string[];
  onAddSubtask: (subtaskTitle: string, assignedTo: string) => void;
  onToggleSubtask: (subtaskId: string) => void;
};

export default function TaskItem({
  title,
  due,
  status,
  assignedTo,
  assignedBy,
  subtasks,
  employees,
  onAddSubtask,
  onToggleSubtask,
}: TaskProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSubtaskInput, setShowSubtaskInput] = useState(false);
  const [subtaskInput, setSubtaskInput] = useState("");
  const [subtaskAssignee, setSubtaskAssignee] = useState(assignedTo); // Default to task owner

  const role = localStorage.getItem("role");
  const isTL = role === "tl";

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

  // Calculate progress
  const completedSubtasks = subtasks.filter((s) => s.completed).length;
  const totalSubtasks = subtasks.length;
  const progressPercentage = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

  const handleAddSubtask = () => {
    if (subtaskInput.trim()) {
      onAddSubtask(subtaskInput.trim(), subtaskAssignee);
      setSubtaskInput("");
      setSubtaskAssignee(assignedTo); // Reset to task owner
      setShowSubtaskInput(false);
    }
  };

  return (
    <div className="relative flex flex-col bg-gray-50 rounded-lg hover:bg-gray-100 transition border border-gray-200">
      {/* Accordion Header - Always Visible */}
      <div
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3 flex-1">
          {/* Expand/Collapse Icon */}
          {isExpanded ? (
            <ChevronDown size={20} className="text-gray-500 flex-shrink-0" />
          ) : (
            <ChevronRight size={20} className="text-gray-500 flex-shrink-0" />
          )}

          {/* Status Icon */}
          {renderStatusIcon()}

          {/* Task Title */}
          <span className="font-medium text-gray-900 text-sm sm:text-base flex-1">{title}</span>
        </div>

        {/* Status Badge and Progress (Compact View) */}
        <div className="flex items-center gap-3">
          {/* Progress Indicator (only if subtasks exist) */}
          {totalSubtasks > 0 && (
            <span className="text-xs font-medium text-gray-600 whitespace-nowrap">
              {completedSubtasks}/{totalSubtasks}
            </span>
          )}

          {/* Status Badge */}
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${status === "completed"
              ? "bg-green-100 text-green-700"
              : status === "inProgress"
                ? "bg-yellow-100 text-yellow-700"
                : status === "notStarted"
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-gray-700"
              }`}
          >
            {status === "completed"
              ? "Completed"
              : status === "inProgress"
                ? "In Progress"
                : status === "notStarted"
                  ? "Not Started"
                  : "None"}
          </span>
        </div>
      </div>

      {/* Accordion Content - Shown When Expanded */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-gray-200 pt-3">
          {/* Employee Info and Due Date */}
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm ml-8">
            <div className="flex items-center gap-1 text-gray-600">
              <User size={14} />
              <span>Assigned to: <span className="font-medium text-gray-800">{assignedTo}</span></span>
            </div>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600">
              By: <span className="font-medium text-gray-800">{assignedBy}</span>
            </span>
            <span className="text-gray-400">•</span>
            <span
              className={`font-medium ${due === "Today" ? "text-blue-600" : "text-gray-700"
                }`}
            >
              Due: {due}
            </span>
          </div>

          {/* Progress Bar (only show if there are subtasks) */}
          {totalSubtasks > 0 && (
            <div className="ml-8">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-gray-700">Progress</span>
                <span className="text-xs font-medium text-gray-600">
                  {completedSubtasks}/{totalSubtasks} ({Math.round(progressPercentage)}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          )}

          {/* Subtasks List */}
          {subtasks.length > 0 && (
            <div className="ml-8 space-y-2">
              <p className="text-xs font-semibold text-gray-700 mb-2">Subtasks:</p>
              {subtasks.map((subtask) => (
                <div
                  key={subtask.id}
                  className="flex items-center justify-between group p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-gray-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSubtask(subtask.id);
                  }}
                >
                  <div className="flex items-center gap-2 cursor-pointer">
                    <button
                      className={`flex items-center justify-center w-5 h-5 rounded-full border-2 transition-all ${subtask.completed
                        ? "bg-green-500 border-green-500"
                        : "border-gray-400 hover:border-green-500"
                        }`}
                    >
                      {subtask.completed && <Check size={14} className="text-white" />}
                    </button>
                    <span
                      className={`text-sm ${subtask.completed
                        ? "line-through text-gray-500"
                        : "text-gray-800 group-hover:text-gray-900"
                        }`}
                    >
                      {subtask.title}
                    </span>
                  </div>

                  {/* Subtask Assignee Display */}
                  {subtask.assignedTo && (
                    <div className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      <User size={12} />
                      <span>{subtask.assignedTo}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Add Subtask Section */}
          <div className="ml-8" onClick={(e) => e.stopPropagation()}>
            {showSubtaskInput ? (
              <div className="flex flex-col gap-2 p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                <input
                  type="text"
                  value={subtaskInput}
                  onChange={(e) => setSubtaskInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddSubtask();
                    if (e.key === "Escape") {
                      setShowSubtaskInput(false);
                      setSubtaskInput("");
                    }
                  }}
                  placeholder="Enter subtask title..."
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  autoFocus
                />

                <div className={`flex items-center ${isTL ? "justify-between" : "justify-end"} gap-2`}>
                  {isTL && (
                    <div className="flex items-center gap-2 flex-1">
                      <span className="text-xs text-gray-500">Assign to:</span>
                      <select
                        value={subtaskAssignee}
                        onChange={(e) => setSubtaskAssignee(e.target.value)}
                        className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                      >
                        {employees.map((emp) => (
                          <option key={emp} value={emp}>
                            {emp}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setShowSubtaskInput(false);
                        setSubtaskInput("");
                      }}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-200 transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddSubtask}
                      disabled={!subtaskInput.trim()}
                      className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      Add Subtask
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowSubtaskInput(true)}
                className="flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition"
              >
                <Plus size={16} />
                <span>Add Subtask</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}