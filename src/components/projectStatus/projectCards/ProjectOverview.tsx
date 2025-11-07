import { projects } from "./projectData";
import ProjectCard from "./ProjectCard";

export default function ProjectOverview() {
  return (
    <div className="p-4 border rounded-xl bg-white shadow-sm">
      <h3 className="font-semibold mb-4">Project Overviews</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects.map((project, i) => (
          <ProjectCard key={i} {...project} />
        ))}
      </div>
    </div>
  );
}
