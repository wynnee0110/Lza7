"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, memo } from "react";
import { projects } from "../data/projectsData";

const FALLBACK = "/images/works/fallback.webp";

const ProjectCard = memo(function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const [imgSrc, setImgSrc] = useState(project.image || FALLBACK);

  return (
    <Link
      href={`/works/${project.slug}`}
      className="
        group relative w-full min-w-0 max-w-full aspect-[4/3] rounded-none overflow-hidden cursor-pointer
        border border-black/15 dark:border-white/15 bg-black/5 dark:bg-white/5
        transition-all duration-300 ease-out hover:border-slate-500/50 dark:hover:border-slate-400/50 hover:shadow-xl
        select-none block
      "
    >
      {/* PHOTO / IMAGE */}
      <Image
        src={imgSrc}
        alt={project.title}
        fill
        sizes="(max-width: 640px) 100vw, 50vw"
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        onError={() => setImgSrc(FALLBACK)}
      />

      {/* Default Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/40 to-transparent dark:from-black/85 dark:via-black/25 dark:to-transparent" />

      {/* Photo State: Title & Hint */}
      <div className="absolute inset-0 p-4 flex flex-col justify-between z-10 pointer-events-none">
        <div className="flex justify-between items-center w-full">
          <span className="px-2.5 py-0.5 rounded-none text-[10px] font-mono font-bold bg-white/85 text-gray-900 border border-black/15 dark:bg-black/70 dark:text-white/90 dark:border-white/20 backdrop-blur-md shadow-sm">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-[10px] font-mono bg-white/85 text-gray-900 border border-black/15 dark:bg-black/60 dark:text-white/80 dark:border-white/15 px-2 py-0.5 rounded-none backdrop-blur-md shadow-sm font-semibold opacity-90 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
            View project →
          </span>
        </div>

        <div>
          <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white drop-shadow-sm truncate font-sans group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors">
            {project.title}
          </h3>
          {project.languages?.[0] && (
            <span className="text-[11px] font-mono text-gray-700 dark:text-gray-300">
              {project.languages[0]}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
});

function ProjectsSection() {
  return (
    <section className="w-full min-w-0 max-w-full py-1" id="projects">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full min-w-0 max-w-full">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

export default memo(ProjectsSection);
