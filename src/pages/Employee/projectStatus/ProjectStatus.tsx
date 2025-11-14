import TaskList from "../projectStatus/tasks/TaskList";
import ProjectOverview from "../projectStatus/projectCards/ProjectOverview";
import DashboardLayout from "../dashboard/DashboardLayout";

export default function ProjectStatus() {
  return (
      <div className="space-y-6">
        <TaskList />
        <ProjectOverview />
      </div>
  );
}
