import { projects } from "../data/projectsData";
import { FiExternalLink } from "react-icons/fi";
import Image from "next/image";

export default function ProjectsSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-4" id="projects">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
        {projects.map((project, index) => (
          <div
            key={index}
            className="group h-full min-h-[20rem] sm:min-h-[21rem] lg:min-h-[20.5rem] flex flex-col rounded-xl border border-black/10 dark:border-white/10 bg-white/5 backdrop-blur-sm hover:border-black/30 dark:hover:border-white/30 transition-colors duration-300 overflow-hidden"
          >
            <div className="relative w-full h-36 sm:h-40 lg:h-36 bg-gradient-to-br from-black/5 to-black/10 dark:from-white/5 dark:to-white/10 flex items-center justify-center overflow-hidden">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg width="100%" height="100%" className="absolute inset-0 opacity-10 dark:opacity-10" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id={`grid-${index}`} width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#grid-${index})`} />
                  </svg>
                  <span className="text-xs text-black/30 dark:text-white/30 select-none z-10">No preview</span>
                </div>
              )}
            </div>

            <div className="flex flex-col flex-1 justify-between p-4">
              <div>
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

                <div className="space-y-1 text-xs text-black/70 dark:text-white/70 mb-4 leading-relaxed">
                  <p className="max-h-[3.8rem] overflow-hidden">{project.description}</p>
                  {project.description2 && <p className="max-h-[2.6rem] overflow-hidden">{project.description2}</p>}
                </div>
              </div>

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
          </div>
        ))}
      </div>
    </section>
  );
}
