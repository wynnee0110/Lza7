"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  ExternalLink,
  Globe,
  Share2,
  Terminal,
  Layers,
  Calendar,
  User,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import CoolBackground from "./CoolBackground";
import DarkModeToggle from "./DarkModeToggle";
import PageTransition from "./PageTransition";
import type { Project } from "../data/projectsData";

const FALLBACK = "/images/works/fallback.webp";

interface ProjectDetailViewProps {
  project: Project;
  currentIndex: number;
  totalProjects: number;
  prevProject: Project;
  nextProject: Project;
}

export default function ProjectDetailView({
  project,
  currentIndex,
  totalProjects,
  prevProject,
  nextProject,
}: ProjectDetailViewProps) {
  const [imgSrc, setImgSrc] = useState(project.image || FALLBACK);
  const [copied, setCopied] = useState(false);

  const hasLiveLink = Boolean(project.link && project.link !== "#");
  const hasGithub = Boolean(project.github && project.github !== "#");

  const handleCopyLink = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `${project.title} — Wayne Obial`,
          text: project.description,
          url: window.location.href,
        });
        return;
      } catch {
        // User cancelled or unsupported, fallback to copy
      }
    }
    handleCopyLink();
  };

  return (
    <main className="portfolio-bg relative isolate min-h-[100svh] text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <CoolBackground />

      {/* Top Header Pill Navigation */}
      <header className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[95%] sm:w-[92%] max-w-4xl flex items-center justify-between px-3.5 sm:px-5 py-2 rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-[#161618]/70 backdrop-blur-md shadow-sm">
        <div className="flex items-center gap-2 font-mono text-xs text-gray-700 dark:text-gray-300 min-w-0 truncate">
          <Terminal className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300 animate-pulse shrink-0" />
          <Link
            href="/"
            className="font-semibold text-gray-900 dark:text-white shrink-0 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          >
            Wayne Obial
          </Link>
          <span className="text-gray-400 dark:text-gray-500 shrink-0">/</span>
          <Link
            href="/?tab=works"
            className="text-gray-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors shrink-0"
          >
            works
          </Link>
          <span className="text-gray-400 dark:text-gray-500 shrink-0">/</span>
          <span className="text-slate-800 dark:text-slate-200 font-medium truncate">
            {project.slug}
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono shrink-0">
          <DarkModeToggle />
        </div>
      </header>

      {/* Main Content Area */}
      <PageTransition>
        <div className="relative z-10 pt-24 pb-20 max-w-4xl mx-auto px-4 lg:px-6 w-full min-w-0">

          {/* Back Navigation & Breadcrumb Info */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <Link
              href="/?tab=works"
              id="back-to-works-btn"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white transition-colors px-2.5 py-1 rounded-none border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>all works</span>
            </Link>

            <div className="flex items-center gap-2 text-[11px] font-mono text-gray-500 dark:text-gray-400">
              <span className="px-2 py-0.5 border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
                {String(currentIndex + 1).padStart(2, "0")} / {String(totalProjects).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Project Hero Header */}
          <section className="space-y-4 mb-8">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-gray-500 dark:text-gray-400">
              {project.category && (
                <span className="px-2 py-0.5 bg-black/5 dark:bg-white/10 border border-black/15 dark:border-white/15 text-gray-800 dark:text-gray-200">
                  {project.category}
                </span>
              )}
              {project.year && (
                <span className="px-2 py-0.5 bg-black/5 dark:bg-white/10 border border-black/15 dark:border-white/15 text-gray-800 dark:text-gray-200">
                  {project.year}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white font-sans">
              {project.title}
            </h1>

            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-sans max-w-2xl leading-relaxed">
              {project.description}
            </p>

            {/* Quick Action Button Bar */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              {hasLiveLink && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="project-visit-live-link"
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-medium bg-slate-900 text-white hover:bg-slate-800 dark:bg-emerald-500 dark:text-black dark:hover:bg-emerald-400 shadow-sm transition-all hover:translate-y-[-1px]"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Visit Live App</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              {hasGithub && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="project-github-link"
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-medium border border-black/20 dark:border-white/20 bg-white/80 dark:bg-black/50 text-gray-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Source Code</span>
                </a>
              )}

              <button
                type="button"
                onClick={handleCopyLink}
                id="project-share-btn"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono border border-black/15 dark:border-white/15 bg-black/5 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer"
                title="Copy project link"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleShare}
                id="project-native-share-btn"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono border border-black/15 dark:border-white/15 bg-black/5 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer"
                title="Share project"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
            </div>
          </section>

          {/* Project Preview Showcase Card */}
          <section className="mb-12">
            <div className="border border-black/15 dark:border-white/15 bg-black/5 dark:bg-white/5 overflow-hidden shadow-lg backdrop-blur-sm">
              {/* Window Terminal Header Bar */}
              <div className="flex items-center justify-between px-3.5 py-2 border-b border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/40 text-[11px] font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="ml-2 text-gray-500 dark:text-gray-400 hidden sm:inline">
                    preview://{project.slug}
                  </span>
                </div>
                <div className="text-gray-500 dark:text-gray-400 truncate max-w-[200px]">
                  {project.title}
                </div>
              </div>

              {/* Showcase Image */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full min-w-0 bg-neutral-900/5 dark:bg-black/40">
                <Image
                  src={imgSrc}
                  alt={project.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 896px"
                  className="object-cover object-center"
                  onError={() => setImgSrc(FALLBACK)}
                />
              </div>

              {/* Status / Quick Tags Footer Bar */}
              {project.languages && project.languages.length > 0 && (
                <div className="px-4 py-2.5 bg-white/80 dark:bg-black/40 border-t border-black/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] uppercase text-gray-400 dark:text-gray-500 mr-1">
                      Stack:
                    </span>
                    {project.languages.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 text-[10px] bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 text-gray-800 dark:text-gray-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {hasLiveLink && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-slate-800 dark:text-emerald-400 hover:underline flex items-center gap-1"
                    >
                      <span>launch project</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </section>

          {/* 2-Column Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">

            {/* Left 2 Cols: Deep Dive & Features */}
            <div className="lg:col-span-2 space-y-10">

              {/* Section 01: Overview */}
              <section className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-gray-400 dark:text-gray-500 border-b border-black/10 dark:border-white/10 pb-2">
                  <Sparkles className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
                  <span>{"// 01. PROJECT OVERVIEW"}</span>
                </div>
                <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-sans space-y-3">
                  <p>
                    {project.overview || project.description}
                  </p>
                  {project.description2 && (
                    <p className="text-gray-600 dark:text-gray-400">
                      {project.description2}
                    </p>
                  )}
                </div>
              </section>

              {/* Section 02: Core Features */}
              {project.features && project.features.length > 0 && (
                <section className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-gray-400 dark:text-gray-500 border-b border-black/10 dark:border-white/10 pb-2">
                    <Layers className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
                    <span>{"// 02. KEY CAPABILITIES & FEATURES"}</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2.5 pt-1">
                    {project.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="p-3 border border-black/10 dark:border-white/10 bg-white/40 dark:bg-white/5 flex items-start gap-3 transition-colors hover:border-black/20 dark:hover:border-white/20"
                      >
                        <span className="font-mono text-xs text-slate-700 dark:text-slate-300 font-bold shrink-0 mt-0.5">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 font-sans leading-normal">
                          {feature}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Section 03: Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <section className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-gray-400 dark:text-gray-500 border-b border-black/10 dark:border-white/10 pb-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
                    <span>{"// 03. ENGINEERING HIGHLIGHTS"}</span>
                  </div>
                  <div className="space-y-2 pt-1">
                    {project.highlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-sans"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right 1 Col: Specs & Metadata Sidebar */}
            <aside className="space-y-6">

              {/* Specifications Card */}
              <div className="p-4 border border-black/15 dark:border-white/15 bg-white/60 dark:bg-black/30 backdrop-blur-sm space-y-4">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-gray-900 dark:text-white border-b border-black/10 dark:border-white/10 pb-2 flex items-center justify-between">
                  <span>Specifications</span>
                  <Terminal className="w-3.5 h-3.5 text-gray-400" />
                </div>

                <div className="space-y-3 text-xs font-mono">
                  {project.role && (
                    <div className="flex items-start justify-between gap-2 border-b border-black/5 dark:border-white/5 pb-2">
                      <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1.5 shrink-0">
                        <User className="w-3 h-3" /> Role
                      </span>
                      <span className="text-gray-900 dark:text-white text-right font-medium">
                        {project.role}
                      </span>
                    </div>
                  )}

                  {project.category && (
                    <div className="flex items-start justify-between gap-2 border-b border-black/5 dark:border-white/5 pb-2">
                      <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1.5 shrink-0">
                        <Layers className="w-3 h-3" /> Category
                      </span>
                      <span className="text-gray-900 dark:text-white text-right font-medium">
                        {project.category}
                      </span>
                    </div>
                  )}

                  {project.year && (
                    <div className="flex items-start justify-between gap-2 border-b border-black/5 dark:border-white/5 pb-2">
                      <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1.5 shrink-0">
                        <Calendar className="w-3 h-3" /> Year
                      </span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {project.year}
                      </span>
                    </div>
                  )}


                  <div className="flex items-start justify-between gap-2 pt-1">
                    <span className="text-gray-500 dark:text-gray-400 shrink-0">
                      Live URL
                    </span>
                    {hasLiveLink ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-800 dark:text-emerald-400 hover:underline truncate max-w-[150px] inline-flex items-center gap-1"
                      >
                        <span>Open Link</span>
                        <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                      </a>
                    ) : (
                      <span className="text-gray-400 dark:text-gray-500">Internal / Private</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Technologies Card */}
              {project.languages && project.languages.length > 0 && (
                <div className="p-4 border border-black/15 dark:border-white/15 bg-white/60 dark:bg-black/30 backdrop-blur-sm space-y-3">
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-gray-900 dark:text-white border-b border-black/10 dark:border-white/10 pb-2">
                    <span>Tech Stack</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.languages.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 text-[11px] font-mono border border-black/15 dark:border-white/15 bg-black/5 dark:bg-white/10 text-gray-800 dark:text-gray-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Inquiries / Contact Card */}
              <div className="p-4 border border-black/15 dark:border-white/15 bg-black/5 dark:bg-white/5 text-xs font-mono space-y-2">
                <span className="font-bold text-gray-900 dark:text-white block">
                  Interested in this build?
                </span>
                <p className="text-gray-600 dark:text-gray-400 font-sans text-xs">
                  Have questions about architecture, collaboration, or code implementation?
                </p>
                <div className="pt-2">
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-800 dark:text-slate-200 hover:underline"
                  >
                    <span>Get in touch</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

            </aside>
          </div>

          {/* Previous / Next Project Navigator */}
          <section className="border-t border-black/10 dark:border-white/10 pt-8 mt-12">
            <div className="text-xs font-mono text-gray-400 dark:text-gray-500 mb-4 text-center">
              <span>BROWSE SELECTED WORKS</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Prev Project Card */}
              <Link
                href={`/works/${prevProject.slug}`}
                id="prev-project-link"
                className="group p-4 border border-black/15 dark:border-white/15 bg-white/40 dark:bg-white/5 hover:border-slate-500/50 dark:hover:border-slate-400/50 transition-all text-left flex flex-col justify-between"
              >
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-gray-500 dark:text-gray-400 group-hover:text-slate-800 dark:group-hover:text-slate-200">
                    <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
                    Previous Project
                  </span>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white truncate font-sans">
                    {prevProject.title}
                  </h4>
                </div>
                {prevProject.category && (
                  <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400 mt-2 truncate">
                    {prevProject.category}
                  </span>
                )}
              </Link>

              {/* Next Project Card */}
              <Link
                href={`/works/${nextProject.slug}`}
                id="next-project-link"
                className="group p-4 border border-black/15 dark:border-white/15 bg-white/40 dark:bg-white/5 hover:border-slate-500/50 dark:hover:border-slate-400/50 transition-all text-right flex flex-col justify-between items-end"
              >
                <div className="space-y-1 w-full">
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-gray-500 dark:text-gray-400 group-hover:text-slate-800 dark:group-hover:text-slate-200 justify-end w-full">
                    Next Project
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </span>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white truncate font-sans">
                    {nextProject.title}
                  </h4>
                </div>
                {nextProject.category && (
                  <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400 mt-2 truncate">
                    {nextProject.category}
                  </span>
                )}
              </Link>
            </div>
          </section>

          {/* Bottom Footer */}
          <footer className="mt-16 pt-6 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500 dark:text-gray-400">
            <span>wayne.obial — {project.title}</span>
            <div className="flex items-center gap-4">
              <Link href="/?tab=works" className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
                all works
              </Link>
              <span>•</span>
              <Link href="/" className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
                home
              </Link>
            </div>
          </footer>
        </div>
      </PageTransition>
    </main>
  );
}
