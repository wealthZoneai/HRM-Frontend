import { projects } from "./projectData";
import ProjectCard from "./ProjectCard";

export default function ProjectOverview() {
  return (
    <div className="p-4 sm:p-6 border border-gray-200 rounded-2xl bg-white shadow-md hover:shadow-lg transition-all duration-300">
      <h3 className="text-xl md:text-md font-bold mb-6 text-gray-900">Project Overview</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {projects.map((project, i) => (
          <ProjectCard key={i} {...project} status={project.status as any} />
        ))}
      </div>
    </div>
  );
}