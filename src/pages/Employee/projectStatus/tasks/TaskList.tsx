import { useState, useMemo, useEffect } from "react";
import { employees, type Task, type Subtask } from "./taskData";
import TaskItem from "./TaskItem";
import { motion, AnimatePresence } from "framer-motion";
import { X, Inbox, Plus } from "lucide-react";
import { GetEmployeeTasks } from "../../../../Services/apiHelpers";

// Current logged-in employee
const CURRENT_EMPLOYEE = localStorage.getItem("userName") || "Unknown User";

export default function TaskList() {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showChallenges, setShowChallenges] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);


  // Fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await GetEmployeeTasks();

        const transformedTasks: Task[] = response.data.map((task: any) => ({
          title: task.title,
          priority: "Medium",
          due:
            task.due_date ||
            new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
          status: mapStatus(task.status),
          assignedBy: task.created_by_name || "System",
          assignedTo: CURRENT_EMPLOYEE,
          assignedDate:
            task.assigned_date ||
            new Date().toISOString().split("T")[0],
          subtasks:
            task.subtasks?.map((sub: any) => ({
              id: sub.id.toString(),
              title: sub.title,
              completed: sub.status === "completed",
              assignedTo: CURRENT_EMPLOYEE,
            })) || [],
        }));

        setTaskList(transformedTasks);
        setError(null);
      } catch (err: any) {
        const msg = err.response?.data?.detail;

        if (msg === "You do not have permission to perform this action.") {
          setTaskList([]);
          setError("NO_PERMISSION");
        } else {
          setError("Something went wrong. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const mapStatus = (
    backendStatus: string
  ): "notStarted" | "inProgress" | "completed" => {
    switch (backendStatus) {
      case "assigned":
        return "notStarted";
      case "in_progress":
      case "review":
      case "rework":
        return "inProgress";
      case "completed":
        return "completed";
      default:
        return "notStarted";
    }
  };

  // const role = localStorage.getItem("role");
  // const isTLorHR = role === "tl" || role === "hr" || role === "admin";

  const filteredTasks = useMemo(() => taskList, [taskList]);

  const handleAddSubtask = (
    taskIndex: number,
    title: string,
    assignedTo: string
  ) => {
    const updated = [...taskList];
    const task = updated[taskIndex];

    const newSubtask: Subtask = {
      id: `${Date.now()}`,
      title,
      completed: false,
      assignedTo,
    };

    task.subtasks.push(newSubtask);
    setTaskList(updated);
  };

  const handleToggleSubtask = (taskIndex: number, subtaskId: string) => {
    const updated = [...taskList];
    const sub = updated[taskIndex].subtasks.find((s) => s.id === subtaskId);
    if (sub) sub.completed = !sub.completed;
    setTaskList(updated);
  };

  const handleStatusChange = (taskIndex: number, status: string) => {
    const updated = [...taskList];
    updated[taskIndex].status = status as any;
    setTaskList(updated);
  };

  return (
    <div className="p-4 sm:p-6 border rounded-2xl bg-white shadow-md">
      {/* Header */}
      <div className="flex justify-between mb-4">
        <h3 className="text-lg font-bold">My Open Tasks</h3>
        <button
          onClick={() => setShowAddTask(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          <Plus size={16} /> Add Task
        </button>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {loading ? (
          <div className="py-12 text-center text-gray-500">Loading tasks…</div>
        ) : error === "NO_PERMISSION" || filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <Inbox size={36} className="mb-3 text-gray-400" />
            <p className="text-sm font-medium">
              No project is started or assigned
            </p>
          </div>
        ) : error ? (
          <div className="py-12 text-center text-red-600">{error}</div>
        ) : (
          filteredTasks.map((task, index) => (
            <TaskItem
              key={index}
              {...task}
              employees={employees}
              onAddSubtask={(t, a) => handleAddSubtask(index, t, a)}
              onToggleSubtask={(id) => handleToggleSubtask(index, id)}
              onStatusChange={(s) => handleStatusChange(index, s)}
            />
          ))
        )}
      </div>

      {/* Challenges Popup (unchanged) */}
      <AnimatePresence>
        {showChallenges && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setShowChallenges(false)}
            />
            <motion.div className="fixed inset-1/2 bg-white p-6 rounded-xl z-50">
              <button onClick={() => setShowChallenges(false)}>
                <X />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
