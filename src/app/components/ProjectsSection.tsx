import { projects } from "../data/projectsData";
import { FiExternalLink } from "react-icons/fi";

export default function ProjectsSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-4" id="projects">
      {/* Grid: Tighter gap, more columns on large screens to keep cards compact */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, index) => (
          <div
            key={index}
            className="group flex flex-col justify-between p-4 rounded-2xl border border-black/10 dark:border-white/10 bg-white/5 backdrop-blur-sm hover:border-black/30 dark:hover:border-white/30 transition-colors duration-300"
          >
            <div>
              {/* Header: Title + Link Icon aligned to save space */}
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-semibold text-black dark:text-white truncate pr-2">
                  {project.title}
                </h3>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors"
                  aria-label="Live Demo"
                >
                  <FiExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Description: Removed bullets, used smaller text */}
              <div className="space-y-1 text-xs text-black/70 dark:text-white/70 mb-4 leading-relaxed">
                <p>{project.description}</p>
                {project.description2 && <p>{project.description2}</p>}
              </div>
            </div>

            {/* Footer: Tiny tags */}
            <div className="flex flex-wrap gap-1.5 mt-auto pt-2 border-t border-black/5 dark:border-white/5">
              {project.languages?.map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 bg-black/5 dark:bg-white/10 text-black dark:text-white text-[10px] rounded-md font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}