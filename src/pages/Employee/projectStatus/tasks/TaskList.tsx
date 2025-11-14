import { useState } from "react";
import { tasks as initialTasks } from "./taskData";
import TaskItem from "./TaskItem";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageSquare, Inbox } from "lucide-react";

export default function TaskList() {
  const [active, setActive] = useState("All");
  const [taskList, setTaskList] = useState(initialTasks);
  const [showChallenges, setShowChallenges] = useState(false);
  const [challengeInput, setChallengeInput] = useState("");
  const [selectedTask, setSelectedTask] = useState("");

  const filters = ["All", "Due Today", "Over due", "Challenges"];

  const filteredTasks =
    active === "Due Today"
      ? taskList.filter((t) => t.due === "Today")
      : active === "Over due"
      ? taskList.filter((t) => new Date(t.due) < new Date())
      : taskList;

  const handleStatusChange = (index: number, newStatus: string) => {
    const updated = [...taskList];
    updated[index].status = newStatus as any;
    setTaskList(updated);
  };

  // Empty State Component
  const EmptyState = ({ message }: { message: string }) => (
    <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
      <Inbox size={42} className="mb-3 text-gray-400" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );

  return (
    <div className="p-6 border border-gray-200 rounded-2xl bg-white shadow-md hover:shadow-lg transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">My Open Tasks</h3>

        <div className="flex gap-2 text-sm font-medium">
          {filters.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                if (tab === "Challenges") setShowChallenges(true);
                else setActive(tab);
              }}
              className={`px-4 py-1.5 rounded-lg transition-all duration-200 ${
                active === tab
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab}
              {tab === "Challenges" && (
                <span className="text-blue-500 font-bold ml-1">*</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <EmptyState
            message={
              active === "Due Today"
                ? "No tasks due today."
                : active === "Over due"
                ? "No overdue tasks. Good job."
                : "No tasks found."
            }
          />
        ) : (
          filteredTasks.map((task, index) => (
            <TaskItem
              key={index}
              title={task.title}
              priority={task.priority as any}
              due={task.due}
              status={task.status as any}
              onStatusChange={(newStatus) => handleStatusChange(index, newStatus)}
            />
          ))
        )}
      </div>

      {/* Challenges Popup */}
      <AnimatePresence>
        {showChallenges && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowChallenges(false)}
            />

            <motion.div
              className="fixed top-1/2 left-1/2 z-50 w-[90%] max-w-lg bg-white rounded-2xl shadow-2xl p-6 transform -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <MessageSquare className="text-blue-600" /> Task Challenges
                </h3>
                <button
                  onClick={() => setShowChallenges(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={18} />
                </button>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                Please share any challenges you faced while completing your tasks.
              </p>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Select Task
                </label>
                <select
                  value={selectedTask}
                  onChange={(e) => setSelectedTask(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">-- Choose a Task --</option>
                  {taskList.map((task, i) => (
                    <option key={i} value={task.title}>
                      {task.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Describe Your Challenge
                </label>
                <textarea
                  value={challengeInput}
                  onChange={(e) => setChallengeInput(e.target.value)}
                  placeholder="e.g., Faced API response delays due to authentication issues..."
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowChallenges(false)}
                  className="px-4 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setChallengeInput("");
                    setSelectedTask("");
                    setShowChallenges(false);
                  }}
                  className={`px-4 py-2 rounded-lg text-white ${
                    !selectedTask || !challengeInput.trim()
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                  disabled={!selectedTask || !challengeInput.trim()}
                >
                  Submit
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
