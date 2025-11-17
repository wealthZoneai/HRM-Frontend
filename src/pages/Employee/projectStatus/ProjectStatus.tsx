import ProjectOverview from "./projectCards/ProjectOverview";
import TaskList from "./tasks/TaskList";

export default function ProjectStatus() {
  return (
    <div className="space-y-6 p-4 md:p-6 max-w-7xl mx-auto">
      <TaskList />
      <ProjectOverview />
    </div>
  );
}