import TaskList from "../../components/projectStatus/tasks/TaskList";
import ProjectOverview from "../../components/projectStatus/projectCards/ProjectOverview";
import DashboardLayout from "../../components/dashboard/DashboardLayout";

export default function ProjectStatus() {
  return (
    <DashboardLayout><div className="space-y-6">
      <TaskList />
      <ProjectOverview />
    </div></DashboardLayout>
    
  );
}
