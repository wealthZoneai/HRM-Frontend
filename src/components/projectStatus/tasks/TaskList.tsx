import { tasks } from "./taskData";
import TaskItem from "./TaskItem";
import { useState } from "react";

export default function TaskList() {
  const [active, setActive] = useState("All");

  return (
    <div className="p-4 border rounded-xl bg-white shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">My Open Tasks</h3>

        <div className="flex gap-2 text-sm">
          {["All", "Due Today", "Over due"].map((t) => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`px-3 py-1 rounded 
              ${active === t ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div>
        {tasks.map((task, index) => (
          <TaskItem
            key={index}
            title={task.title}
            priority={task.priority as "High" | "Medium" | "Low"}
            due={task.due}
          />
        ))}
      </div>
    </div>
  );
}
