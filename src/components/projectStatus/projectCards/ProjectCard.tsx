type ProjectCardProps = {
  name: string;
  status: string;
  statusColor: string;
  progress: number;
  tasks: string;
  due: string;
};

export default function ProjectCard({
  name,
  status,
  statusColor,
  progress,
  tasks,
  due,
}: ProjectCardProps) {
  return (
    <div className="border rounded-xl p-4 shadow-sm bg-white w-full">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-semibold">{name}</h4>
        <span className={`text-xs px-2 py-1 rounded ${statusColor}`}>
          {status}
        </span>
      </div>

      <p className="text-xs text-gray-500 mb-3">Website Redesign</p>

      <div>
        <p className="text-xs text-gray-600">Progress</p>
        <div className="w-full bg-gray-200 h-2 rounded mt-1 mb-3">
          <div className="h-full bg-blue-600 rounded" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="flex justify-between text-xs text-gray-600">
          <span>Tasks: {tasks}</span>
          <span>Due: {due}</span>
        </div>
      </div>
    </div>
  );
}
