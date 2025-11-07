type TaskItemProps = {
  title: string;
  priority: "High" | "Medium" | "Low";
  due: string;
};

const priorityColors = {
  High: "bg-red-100 text-red-500",
  Medium: "bg-yellow-100 text-yellow-600",
  Low: "bg-blue-100 text-blue-600",
};

export default function TaskItem({ title, priority, due }: TaskItemProps) {
  return (
    <div className="flex items-center justify-between py-2 border-b">
      <div className="flex items-center gap-3">
        <input type="checkbox" className="w-4 h-4" />
        <span className="font-medium">{title}</span>
      </div>

      <div className="flex items-center gap-4">
        <span className={`text-xs px-2 py-1 rounded ${priorityColors[priority]}`}>
          {priority}
        </span>
        <span className="text-red-500 font-semibold">{due}</span>
      </div>
    </div>
  );
}
