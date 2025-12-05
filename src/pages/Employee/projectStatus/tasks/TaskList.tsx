import { useState, useMemo, useEffect } from "react";
import { tasks as initialTasks, employees, type Task, type Subtask } from "./taskData";
import TaskItem from "./TaskItem";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageSquare, Inbox, Filter, Plus, } from "lucide-react";

// Current logged-in employee (hardcoded for demo)
const CURRENT_EMPLOYEE = "John Doe";

export default function TaskList() {
  const [taskList, setTaskList] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });

  const [showChallenges, setShowChallenges] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false); // State for Add Task modal
  const [challengeInput, setChallengeInput] = useState("");
  const [selectedTask, setSelectedTask] = useState("");

  // Save tasks to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskList));
  }, [taskList]);

  // Filter states
  const [selectedEmployee, setSelectedEmployee] = useState<string>("All"); // Employee filter
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [selectedPriority, setSelectedPriority] = useState<string>("All");

  // New Task Form State
  const [newTask, setNewTask] = useState({
    title: "",
    priority: "Medium",
    due: "",
    assignedTo: CURRENT_EMPLOYEE,
    assignedDate: new Date().toISOString().split('T')[0], // Default to today
  });

  // Status options
  const statusOptions = ["All", "Not Started", "In Progress", "Completed"];

  // Priority options
  const priorityOptions = ["All", "High", "Medium", "Low"];

  // Filter tasks
  const filteredTasks = useMemo(() => {
    return taskList.filter((task) => {
      const matchesEmployee = selectedEmployee === "All" || task.assignedTo === selectedEmployee;

      const matchesStatus =
        selectedStatus === "All" ||
        (selectedStatus === "Not Started" && task.status === "notStarted") ||
        (selectedStatus === "In Progress" && task.status === "inProgress") ||
        (selectedStatus === "Completed" && task.status === "completed");


      const matchesPriority = selectedPriority === "All" || task.priority === selectedPriority;

      return matchesEmployee && matchesStatus && matchesPriority;
    });
  }, [taskList, selectedEmployee, selectedStatus, selectedPriority]);

  const handleAddSubtask = (taskIndex: number, subtaskTitle: string, assignedTo: string) => {
    const updated = [...taskList];
    // Find the correct task in the main list (since filteredTasks indices might differ)
    const taskToUpdate = filteredTasks[taskIndex];
    const actualIndex = taskList.indexOf(taskToUpdate);

    if (actualIndex === -1) return;

    const newSubtask: Subtask = {
      id: `${Date.now()}-${Math.random()}`,
      title: subtaskTitle,
      completed: false,
      assignedTo: assignedTo,
    };
    updated[actualIndex].subtasks.push(newSubtask);
    setTaskList(updated);
  };

  const handleToggleSubtask = (taskIndex: number, subtaskId: string) => {
    const updated = [...taskList];
    const taskToUpdate = filteredTasks[taskIndex];
    const actualIndex = taskList.indexOf(taskToUpdate);

    if (actualIndex === -1) return;

    const subtask = updated[actualIndex].subtasks.find((s) => s.id === subtaskId);
    if (subtask) {
      subtask.completed = !subtask.completed;
    }

    // Auto-update task status based on subtask completion
    const task = updated[actualIndex];
    const totalSubtasks = task.subtasks.length;
    const completedSubtasks = task.subtasks.filter((s) => s.completed).length;

    if (totalSubtasks > 0) {
      if (completedSubtasks === 0) {
        task.status = "notStarted";
      } else if (completedSubtasks === totalSubtasks) {
        task.status = "completed";
      } else {
        task.status = "inProgress";
      }
    }

    setTaskList(updated);
  };

  const handleCreateTask = () => {
    if (!newTask.title || !newTask.due) return;

    const task: Task = {
      title: newTask.title,
      priority: newTask.priority as "High" | "Medium" | "Low",
      due: newTask.due,
      status: "notStarted",
      assignedBy: CURRENT_EMPLOYEE, // Created by current user
      assignedTo: newTask.assignedTo,
      assignedDate: newTask.assignedDate, // Use the date from the form
      subtasks: [],
    };

    setTaskList([task, ...taskList]);
    setShowAddTask(false);
    setNewTask({
      title: "",
      priority: "Medium",
      due: "",
      assignedTo: CURRENT_EMPLOYEE,
      assignedDate: new Date().toISOString().split('T')[0],
    });
  };

  const EmptyState = ({ message }: { message: string }) => (
    <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
      <Inbox size={36} className="mb-3 text-gray-400" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 border border-gray-200 rounded-2xl bg-white shadow-md hover:shadow-lg transition-all duration-300">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl md:text-md font-bold text-gray-900">My Open Tasks</h3>
          <button
            onClick={() => setShowAddTask(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all shadow-sm"
          >
            <Plus size={18} />
            <span>Add Task</span>
          </button>
        </div>

        {/* Filter Section */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="flex items-center gap-2 text-gray-700">
            <Filter size={18} />
            <span className="text-sm font-medium">Filters:</span>
          </div>

          <div className="flex flex-wrap gap-3 w-full sm:w-auto">
            {/* Employee Filter */}
            <div className="flex-1 sm:flex-initial min-w-[150px]">
              <select
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white hover:border-gray-400 transition"
              >
                <option value="All">All Employees</option>
                {employees.map((emp) => (
                  <option key={emp} value={emp}>
                    {emp}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex-1 sm:flex-initial min-w-[150px]">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white hover:border-gray-400 transition"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status === "All" ? "Status" : status}
                  </option>
                ))}
              </select>
            </div>

            {/* Priority Filter */}
            <div className="flex-1 sm:flex-initial min-w-[150px]">
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white hover:border-gray-400 transition"
              >
                {priorityOptions.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority === "All" ? "Priority" : priority}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Challenges Button */}
          <button
            onClick={() => setShowChallenges(true)}
            className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-all duration-200 shadow-sm whitespace-nowrap ml-auto"
          >
            Report Challenge
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <EmptyState message="No tasks match the selected filters." />
        ) : (
          filteredTasks.map((task, index) => (
            <TaskItem
              key={index}
              title={task.title}
              priority={task.priority as any}
              due={task.due}
              status={task.status as any}
              assignedTo={task.assignedTo}
              assignedBy={task.assignedBy}
              assignedDate={task.assignedDate}
              subtasks={task.subtasks}
              employees={employees}
              onAddSubtask={(subtaskTitle, assignedTo) => handleAddSubtask(index, subtaskTitle, assignedTo)}
              onToggleSubtask={(subtaskId) => handleToggleSubtask(index, subtaskId)}
            />
          ))
        )}
      </div>

      {/* Add Task Modal */}
      <AnimatePresence>
        {showAddTask && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddTask(false)}
            />
            <motion.div
              className="fixed top-1/2 left-1/2 z-50 w-[95%] max-w-md bg-white rounded-2xl shadow-2xl p-6 transform -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Create New Task</h3>
                <button onClick={() => setShowAddTask(false)} className="p-2 hover:bg-gray-100 rounded-full">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    placeholder="Enter task title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select
                      value={newTask.priority}
                      onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                    <input
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={newTask.due}
                      onChange={(e) => setNewTask({ ...newTask, due: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Assign To</label>
                    <select
                      value={newTask.assignedTo}
                      onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      {employees.map((emp) => (
                        <option key={emp} value={emp}>
                          {emp}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Date</label>
                    <input
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={newTask.assignedDate}
                      onChange={(e) => setNewTask({ ...newTask, assignedDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => setShowAddTask(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateTask}
                    disabled={!newTask.title || !newTask.due}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Create Task
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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
              className="fixed top-1/2 left-1/2 z-50 w-[95%] max-w-lg bg-white rounded-2xl shadow-2xl p-5 sm:p-6 transform -translate-x-1/2 -translate-y-1/2"
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
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                  placeholder="e.g., Faced API response delays..."
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowChallenges(false)}
                  className="px-4 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setChallengeInput("");
                    setSelectedTask("");
                    setShowChallenges(false);
                  }}
                  className={`px-4 py-2 rounded-lg text-white text-sm ${!selectedTask || !challengeInput.trim()
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