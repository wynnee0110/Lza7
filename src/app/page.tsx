"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import ProjectsSection from "./components/ProjectsSection";
import CertificationsSection from "./components/CertificationsSection";
import GitHubContributionTracker from "./components/GitHubContributionTracker";
import ResourcesSection from "./components/ResourcesSection";
import BlogSection from "./components/BlogSection";
import { blogPosts } from "./data/blogData";

// Lazy Load Heavy WebGL & Simulation Components (No SSR)
const Reactdiff = dynamic(() => import("./components/Reactdiff"), { ssr: false });
const Lissajous = dynamic(() => import("./components/Lissajous"), { ssr: false });
const BubbleSort = dynamic(() => import("./components/Bubblesort"), { ssr: false });
const NeuralNetwork = dynamic(() => import("./components/Neuralnetwork"), { ssr: false });

import CoolBackground from "./components/CoolBackground";
import DarkModeToggle from "./components/DarkModeToggle";
import experience from "./data/experience.json";
import connect from "./data/connect.json";
import stats from "./data/stats.json";
import { projects } from "./data/projectsData";
import { Cpu, Brain, Terminal, ArrowUpRight, ChevronDown } from "lucide-react";
import { FaPython, FaReact } from "react-icons/fa";
import { useEffect, useState, useRef, useCallback } from "react";
import FloatingButton from "./components/FloatingButton";
import BackToTop from "./components/BackToTop";

type RightPanelView = "home" | "projects" | "certifications" | "simulations" | "resources" | "blog";

const navTabs: { id: RightPanelView; label: string; shortcut: string }[] = [
  { id: "home", label: "home", shortcut: "1" },
  { id: "projects", label: "works", shortcut: "2" },
  { id: "certifications", label: "certifications", shortcut: "3" },
  { id: "blog", label: "blog", shortcut: "4" },
  { id: "simulations", label: "simulations", shortcut: "5" },
  { id: "resources", label: "resources", shortcut: "6" },
];

export default function HomePage() {
  const [rightPanelView, setRightPanelView] = useState<RightPanelView>("home");
  const [simulationsReady, setSimulationsReady] = useState(false);
  const [expandedExp, setExpandedExp] = useState<number | null>(null);
  const [activeShortcut, setActiveShortcut] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const switchTab = useCallback((tab: RightPanelView) => {
    setRightPanelView(tab);
    setExpandedExp(null);
    if (tab === "simulations") {
      setSimulationsReady(true);
    }
    if (typeof window !== "undefined") {
      const url = tab === "home" ? "/" : `/?tab=${tab === "projects" ? "works" : tab}`;
      window.history.pushState({ tab }, "", url);
    }
  }, []);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [rightPanelView]);

  useEffect(() => {
    const handleUrlTab = () => {
      if (typeof window === "undefined") return;
      const searchParams = new URLSearchParams(window.location.search);
      const tab = searchParams.get("tab") || searchParams.get("view");
      const hash = window.location.hash;
      if (tab === "about" || hash === "#about") {
        setRightPanelView("home");
      } else if (tab === "works" || tab === "projects" || hash === "#projects" || hash === "#works") {
        setRightPanelView("projects");
      } else if (tab === "certifications" || hash === "#certifications") {
        setRightPanelView("certifications");
      } else if (tab === "simulations" || hash === "#simulations") {
        setSimulationsReady(true);
        setRightPanelView("simulations");
      } else if (tab === "resources" || hash === "#resources") {
        setRightPanelView("resources");
      } else if (tab === "blog" || hash === "#blog") {
        setRightPanelView("blog");
      } else {
        setRightPanelView("home");
      }
    };

    handleUrlTab();
    window.addEventListener("popstate", handleUrlTab);
    window.addEventListener("hashchange", handleUrlTab);
    return () => {
      window.removeEventListener("popstate", handleUrlTab);
      window.removeEventListener("hashchange", handleUrlTab);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Do not trigger if modifier keys (Ctrl, Meta/Cmd, Alt, Shift) are held
      if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;

      // Do not trigger if the user is typing in an input or editable field
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable ||
          target.closest("input, textarea, select, [contenteditable='true']"))
      ) {
        return;
      }

      // Check digit keys 1-6 (standard number row & numpad)
      const numFromDigit = e.code?.match(/^Digit([1-6])$/)?.[1];
      const numFromNumpad = e.code?.match(/^Numpad([1-6])$/)?.[1];
      const numFromKey = ["1", "2", "3", "4", "5", "6"].includes(e.key) ? e.key : null;
      const shortcutNum = numFromDigit || numFromNumpad || numFromKey;

      if (shortcutNum) {
        const tabIndex = parseInt(shortcutNum, 10) - 1;
        if (tabIndex >= 0 && tabIndex < navTabs.length) {
          e.preventDefault();
          const targetTab = navTabs[tabIndex].id;
          switchTab(targetTab);

          // Visual feedback pulse on the pressed shortcut badge
          setActiveShortcut(shortcutNum);
          setTimeout(() => {
            setActiveShortcut((current) => (current === shortcutNum ? null : current));
          }, 300);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [switchTab]);

  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const rafIdRef = useRef<number | null>(null);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    text: string
  ) => {
    const x = e.clientX + 15;
    const y = e.clientY + 15;

    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    rafIdRef.current = requestAnimationFrame(() => {
      if (tooltipRef.current) {
        tooltipRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        if (tooltipRef.current.textContent !== text) {
          tooltipRef.current.textContent = text;
        }
        tooltipRef.current.style.opacity = "1";
      }
    });
  };

  const handleMouseLeave = () => {
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    if (tooltipRef.current) {
      tooltipRef.current.style.opacity = "0";
    }
  };

  return (
    <main
      className="portfolio-bg relative isolate min-h-[100svh] text-gray-800 dark:text-gray-200 transition-colors duration-300 flex flex-col items-center justify-start"
      style={{ overflowY: 'auto', overflowX: 'hidden' }}
    >
      <FloatingButton />
      {/* Interactive Background Canvas */}
      <CoolBackground />

      {/* Top Embedded Minimalist Header */}
      <header className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[95%] sm:w-[92%] max-w-4xl flex items-center justify-between px-3.5 sm:px-5 py-2 rounded-full border border-black/10 dark:border-white/10 bg-white/50 dark:bg-[#161618]/70 backdrop-blur-md shadow-sm">
        <div className="flex items-center gap-2 font-mono text-xs text-gray-700 dark:text-gray-300 min-w-0 truncate">
          <Terminal className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300 animate-pulse shrink-0" />
          <button
            type="button"
            onClick={() => switchTab("home")}
            aria-keyshortcuts="1"
            title="Wayne Obial — Home (Press 1)"
            className="font-semibold text-gray-900 dark:text-white shrink-0 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-pointer"
          >
            Wayne Obial
          </button>
          <span className="text-gray-400 dark:text-gray-500 shrink-0">/</span>
          <span className="text-slate-800 dark:text-slate-200 font-medium truncate transition-all duration-200">
            {rightPanelView === "projects" ? "works" : rightPanelView}
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono shrink-0">
          <DarkModeToggle />
        </div>
      </header>

      {/* Right-Side Vertical Page Selector (Desktop only) */}
      <nav
        aria-label="Page Selector"
        className="hidden md:flex fixed right-3 sm:right-6 lg:right-8 xl:right-12 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-3 font-mono text-xs select-none"
      >
        {navTabs.map((tab) => {
          const isActive = rightPanelView === tab.id;
          const isPressed = activeShortcut === tab.shortcut;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => switchTab(tab.id)}
              aria-keyshortcuts={tab.shortcut}
              title={`Press ${tab.shortcut} to switch to ${tab.label}`}
              className={`group flex items-center justify-end gap-2 text-right transition-all duration-150 cursor-pointer ${
                isActive
                  ? "text-gray-950 dark:text-white font-bold tracking-tight"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-950 dark:hover:text-white"
              }`}
            >
              <span
                className={`font-mono text-xs transition-all duration-150 ${
                  isPressed
                    ? "scale-125 text-gray-950 dark:text-white font-bold"
                    : isActive
                    ? "text-gray-950 dark:text-white font-bold"
                    : "text-gray-400 dark:text-gray-500 group-hover:text-gray-950 dark:group-hover:text-white"
                }`}
              >
                {tab.shortcut}
              </span>
              <span className="tracking-wide">{tab.label}</span>
              <span
                className={`transition-all duration-200 ${
                  isActive
                    ? "w-3 sm:w-4 h-0.5 bg-gray-950 dark:bg-white"
                    : "w-1.5 h-0.5 bg-gray-400 dark:bg-gray-500 group-hover:w-2.5 group-hover:bg-gray-900 dark:group-hover:bg-gray-200"
                }`}
              />
            </button>
          );
        })}
      </nav>

      {/* Main Workspace Layout */}
      <section className="pt-20 pb-12 max-w-4xl mx-auto px-4 md:px-6 relative z-10 w-full flex-1 flex flex-col md:flex-row gap-6 items-start justify-start">

        {/* LEFT UNTOUCHED SIDEBAR - Shown only on Home view */}
        {rightPanelView === "home" && (
          <aside className="w-full md:w-60 flex flex-col items-center shrink-0 justify-start py-2 border-b md:border-b-0 md:border-r border-black/10 dark:border-white/10 md:pr-6">
            <div className="w-full flex flex-col items-center">
              {/* Identity */}
              <div className="font-bold text-lg text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="cyber-badge text-xs px-2.5 py-0.5 rounded-full font-mono font-medium">
                  [Dev]
                </span>
                <span>Wayne Obial</span>
              </div>

              {/* Profile Avatar */}
              <div className="relative w-28 h-28 md:w-36 md:h-36 mb-4 shrink-0 rounded-full overflow-hidden ring-2 ring-slate-400/30 shadow-lg">
                <Image
                  src="/images/Me.jpg"
                  alt="Wayne Obial Profile Picture"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Role Badge */}
              <div className="w-full text-center text-slate-800 dark:text-slate-200 font-bold text-xs py-1.5 px-3 rounded-xl bg-slate-500/10 dark:bg-white/10 border border-slate-500/20 dark:border-white/15 uppercase tracking-widest mb-6">
                Software Dev
              </div>

              {/* Tech Stack Icons */}
              <div className="w-full flex justify-center gap-4 mb-6 py-2 px-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-sm">
                <div
                  onMouseMove={(e) => handleMouseMove(e, "Python")}
                  onMouseLeave={handleMouseLeave}
                  className="cursor-pointer p-1 rounded hover:bg-cyan-500/10 transition-colors"
                >
                  <FaPython className="text-gray text-2xl hover:scale-110 transition-transform" />
                </div>

                <div
                  onMouseMove={(e) => handleMouseMove(e, "React / Next.js")}
                  onMouseLeave={handleMouseLeave}
                  className="cursor-pointer p-1 rounded hover:bg-cyan-500/10 transition-colors"
                >
                  <FaReact className="text-gray text-2xl hover:scale-110 transition-transform" />
                </div>

                <div
                  onMouseMove={(e) => handleMouseMove(e, "IoT Systems")}
                  onMouseLeave={handleMouseLeave}
                  className="cursor-pointer p-1 rounded hover:bg-emerald-500/10 transition-colors"
                >
                  <Cpu className="text-gray w-6 h-6 hover:scale-110 transition-transform" />
                </div>

                <div
                  onMouseMove={(e) => handleMouseMove(e, "AI & Machine Learning")}
                  onMouseLeave={handleMouseLeave}
                  className="cursor-pointer p-1 rounded hover:bg-purple-500/10 transition-colors"
                >
                  <Brain className="text-gray w-6 h-6 hover:scale-110 transition-transform" />
                </div>
              </div>
            </div>

            {/* Custom Tooltip (GPU Accelerated) */}
            <div
              ref={tooltipRef}
              className="fixed top-0 left-0 z-50 bg-gray-900 text-white text-xs font-mono px-2.5 py-1 rounded-md shadow-lg pointer-events-none border border-white/20 opacity-0 transition-opacity duration-150 will-change-transform"
            />

            {/* Developer Stats Overview (Simple row lines, no icons, only titles) */}
            <div className="w-full text-xs font-mono space-y-1 text-gray-600 dark:text-gray-400 pt-4 border-t border-black/10 dark:border-white/10 mb-2">
              <div className="text-[11px] font-semibold tracking-wider text-gray-500 dark:text-gray-400 uppercase px-2.5 pb-1">
                Stats
              </div>
              <div className="flex justify-between items-center py-1 px-2.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <span className="font-medium text-gray-700 dark:text-gray-300">Projects</span>
                <span className="font-bold text-gray-900 dark:text-white">{stats.projectsCount || projects.length}+</span>
              </div>
              <div className="flex justify-between items-center py-1 px-2.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <span className="font-medium text-gray-700 dark:text-gray-300">Joined</span>
                <span className="font-bold text-gray-900 dark:text-white">{stats.joinedYear}</span>
              </div>
              <button
                type="button"
                onClick={() => switchTab("blog")}
                className="w-full flex justify-between items-center py-1 px-2.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors group cursor-pointer text-left"
              >
                <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                  Articles
                </span>
                <span className="text-slate-800 dark:text-slate-200 group-hover:text-slate-600 dark:group-hover:text-slate-400 flex items-center gap-0.5 group-hover:underline">
                  {blogPosts.length} <ArrowUpRight className="w-3 h-3" />
                </span>
              </button>
              <Link
                href="/about"
                className="flex justify-between items-center py-1 px-2.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
              >
                <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                  About Me
                </span>
                <span className="text-slate-800 dark:text-slate-200 group-hover:text-slate-600 dark:group-hover:text-slate-400 flex items-center gap-0.5 group-hover:underline">
                  Read <ArrowUpRight className="w-3 h-3" />
                </span>
              </Link>
            </div>

            {/* Social Links — Projects & Simulations excluded (shown in top nav) */}
            <div className="w-full text-xs font-mono space-y-1.5 text-gray-600 dark:text-gray-400 pt-3 border-t border-black/10 dark:border-white/10">
              <div className="text-[11px] font-semibold tracking-wider text-gray-500 dark:text-gray-400 uppercase px-2.5 pb-1">
                Connect
              </div>
              {connect
                .filter((item) => item.name !== "Projects" && item.name !== "Simulations")
                .map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-1 px-2.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  >
                    <span className="font-medium text-gray-700 dark:text-gray-300">{item.name}</span>
                    <a
                      href={item.url}
                      target={item.url.startsWith("http") ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      className="text-slate-800 dark:text-slate-200 hover:text-slate-600 dark:hover:text-slate-400 flex items-center gap-0.5 hover:underline"
                    >
                      Visit <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                ))}
            </div>
          </aside>
        )}

        {/* REFACTORED MINIMAL MAIN CONTENT AREA */}
        <div className="flex-1 flex flex-col min-h-0 min-w-0 w-full">
          {/* Mobile View Switcher Tabs (Linear/GitHub style) */}
          <div className="md:hidden border-b border-black/10 dark:border-white/10 mb-6 font-mono text-xs w-full min-w-0">
            <nav
              aria-label="Mobile Workspace Navigation"
              className="flex items-center gap-1 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden -mb-px w-full"
            >
              {navTabs.map((tab) => {
                const isActive = rightPanelView === tab.id;
                const isPressed = activeShortcut === tab.shortcut;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => switchTab(tab.id)}
                    aria-keyshortcuts={tab.shortcut}
                    title={`Press ${tab.shortcut} to switch to ${tab.label}`}
                    className={`group relative flex items-center gap-1.5 px-2.5 py-2 text-xs font-mono transition-all duration-150 shrink-0 select-none cursor-pointer ${
                      isActive
                        ? "text-gray-950 dark:text-white font-bold"
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-950 dark:hover:text-white"
                    }`}
                  >
                    <span
                      className={`font-mono text-xs transition-all duration-150 ${
                        isPressed
                          ? "scale-125 text-gray-950 dark:text-white font-bold"
                          : isActive
                          ? "text-gray-950 dark:text-white font-bold"
                          : "text-gray-400 dark:text-gray-500 group-hover:text-gray-950 dark:group-hover:text-white"
                      }`}
                    >
                      {tab.shortcut}
                    </span>
                    <span>{tab.label}</span>
                    {/* Active sliding bottom indicator line */}
                    {isActive ? (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-950 dark:bg-white" />
                    ) : (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-transparent group-hover:bg-black/20 dark:group-hover:bg-white/20 transition-colors" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Scrollable Main Content Stream */}
          <div
            ref={scrollContainerRef}
            className="flex-1 space-y-8 min-h-0 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pr-2"
          >
            <div key={rightPanelView} className="animate-basic-fade space-y-8">
              {/* MINIMAL HOME VIEW */}
              {rightPanelView === "home" && (
                <>
                  <article className="space-y-4">

                    <div className="text-sm leading-relaxed text-gray-600 dark:text-gray-300 space-y-3 font-normal">

                      <p>
                        I&apos;m <span className="font-semibold text-gray-900 dark:text-white">Wayne Obial</span>, a technology-driven software developer with a strong interest in building practical and creative digital solutions.
                        I&apos;m currently the Head of <span className="underline">Committee on Web Development</span> at{" "}
                        <a
                          href="https://www.facebook.com/ICpEP.SE.USTP"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-0.5 font-semibold text-gray-900 dark:text-white underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          ICpEP.SE
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                        . I enjoy working on projects that involve software development, automation, and problem-solving, and I&apos;m always curious about how systems work behind the scenes.
                      </p>

                    </div>
                  </article>

                  {/* MINIMAL EXPERIENCE LOGS */}
                  <section className="pt-4 border-t border-black/10 dark:border-white/10 space-y-4">
                    <span className="text-xs font-mono text-slate-700 dark:text-slate-300 font-semibold tracking-wider uppercase">
                      {"/* Experience */"}
                    </span>

                    <div className="space-y-2">
                      {experience.map((item, index) => {
                        const isOpen = expandedExp === index;
                        return (
                          <div
                            key={index}
                            className={`border-l-2 transition-all duration-200 ${isOpen
                              ? "border-slate-600 dark:border-slate-400 bg-slate-500/10 dark:bg-slate-400/10 rounded-r-xl"
                              : "border-slate-400/30 dark:border-slate-600/30 hover:border-slate-600 dark:hover:border-slate-400"
                              }`}
                          >
                            {/* Clickable header row */}
                            <button
                              onClick={() => setExpandedExp(isOpen ? null : index)}
                              className="w-full text-left flex items-start justify-between gap-3 pl-4 pr-3 py-2.5 group"
                            >
                              <div className="flex-1 min-w-0">
                                <h3 className={`font-medium text-sm leading-snug transition-colors ${isOpen
                                  ? "text-slate-900 dark:text-slate-100"
                                  : "text-gray-900 dark:text-gray-100 group-hover:text-slate-700 dark:group-hover:text-slate-300"
                                  }`}>
                                  {item.role}
                                  {(() => {
                                    const expItem = item as unknown as { logo?: string; link?: string };
                                    return expItem.logo ? (
                                      expItem.link ? (
                                        <a
                                          href={expItem.link}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          onClick={(e) => e.stopPropagation()}
                                          className="inline-flex items-center align-middle ml-1.5 p-0.5 hover:scale-110 transition-transform rounded bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20"
                                          title="Open link"
                                        >
                                          <Image
                                            src={expItem.logo}
                                            alt={`${item.role} logo`}
                                            width={18}
                                            height={18}
                                            className="w-4 h-4 object-contain rounded-xs"
                                          />
                                        </a>
                                      ) : (
                                        <Image
                                          src={expItem.logo}
                                          alt={`${item.role} logo`}
                                          width={18}
                                          height={18}
                                          className="w-4 h-4 object-contain rounded-xs inline-block align-middle ml-1.5"
                                        />
                                      )
                                    ) : null;
                                  })()}
                                </h3>
                                {!isOpen && (
                                  <p className="text-[11px] text-gray-600 dark:text-gray-400 mt-0.5 leading-relaxed line-clamp-1">
                                    {item.description}
                                  </p>
                                )}
                              </div>
                              <div className="flex items-center gap-2 shrink-0 mt-0.5">
                                <span className="text-[11px] font-mono text-gray-500 dark:text-gray-400">
                                  {item.period}
                                </span>
                                <ChevronDown
                                  className={`w-4 h-4 text-gray-400 dark:text-gray-500 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-slate-700 dark:text-slate-300" : ""
                                    }`}
                                />
                              </div>
                            </button>

                            {/* Expandable details */}
                            <div
                              className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                }`}
                            >
                              <div className="pl-4 pr-3 pb-4 space-y-3">
                                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed italic border-b border-black/8 dark:border-white/8 pb-2">
                                  &quot;{item.description}&quot;
                                </p>
                                {(item as { highlights?: string[] }).highlights && (
                                  <div className="space-y-2">
                                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                                      Highlights
                                    </span>
                                    <div className="relative">
                                      {/* Vertical line — center of 14px node = left-[6px] */}
                                      <div className="absolute left-[6px] top-0 bottom-0 w-px bg-slate-500/30" />
                                      <div className="space-y-3">
                                        {(item as { highlights: string[] }).highlights.map((h, hi) => (
                                          <div key={hi} className="flex items-start gap-3">
                                            {/* Timeline node — 14px, center at 7px matches line */}
                                            <div className="shrink-0 w-3.5 h-3.5 rounded-full border-2 border-slate-500/60 bg-slate-500/10 flex items-center justify-center mt-0.5 z-10 bg-white dark:bg-[#0a0a0a]">
                                              <span className="w-1 h-1 rounded-full bg-slate-600 dark:bg-slate-300" />
                                            </div>
                                            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed pt-px">
                                              {h}
                                            </p>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>

                  {/* GITHUB CONTRIBUTION TRACKER BELOW EXPERIENCE */}
                  <section className="pt-6 border-t border-black/10 dark:border-white/10 space-y-4">
                    <GitHubContributionTracker />
                  </section>
                </>
              )}

              {/* UNTOUCHED PROJECTS COMPONENT */}
              {rightPanelView === "projects" && (
                <section className="space-y-4">
                  <div className="space-y-2">
                    <div className="text-xs font-mono text-gray-500 dark:text-gray-400 pb-2 border-b border-black/10 dark:border-white/10">
                      {"/* Selected Projects */"}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-sans leading-relaxed">
                      A curated collection of full-stack web applications, developer utilities, CLI tools, and interactive software. Click on any project card to reveal detailed specifications, tech stack tags, and live demo links.
                    </p>
                  </div>
                  <ProjectsSection />
                </section>
              )}

              {/* CERTIFICATIONS COMPONENT */}
              {rightPanelView === "certifications" && (
                <section className="space-y-4">
                  <div className="space-y-2">
                    <div className="text-xs font-mono text-gray-500 dark:text-gray-400 pb-2 border-b border-black/10 dark:border-white/10">
                      {"/* Verified Credentials & Certifications */"}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-sans leading-relaxed">
                      Verified credentials and completed courses across software development, data analytics, systems, and networking. Click on any card to reveal details and credential links.
                    </p>
                  </div>
                  <CertificationsSection />
                </section>
              )}

              {/* UNTOUCHED SIMULATIONS COMPONENT */}
              {simulationsReady ? (
                <section
                  className={
                    rightPanelView === "simulations" ? "space-y-4 w-full min-w-0 max-w-full" : "hidden"
                  }
                >
                  <div className="space-y-2">
                    <div className="text-xs font-mono text-gray-500 dark:text-gray-400 pb-2 border-b border-black/10 dark:border-white/10">
                      {"/* Abstract Math Models & Simulations */"}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-sans leading-relaxed">
                      Interactive visualizations of mathematical differential equations, chaotic attractors, sorting algorithms, and neural networks.
                    </p>
                  </div>

                  {/* Pure CSS Masonry Grid Layout with Sharp Edges */}
                  <div className="columns-1 sm:columns-2 gap-4 space-y-4 w-full min-w-0 max-w-full">

                    {/* MASONRY ITEM 1: Lissajous Curve (Column 1 Top) */}
                    <div className="break-inside-avoid space-y-2.5 p-4 rounded-none border border-black/15 dark:border-white/15 bg-black/2 dark:bg-white/3 backdrop-blur-md w-full min-w-0 max-w-full overflow-hidden">
                      <div className="flex items-center justify-between font-mono text-xs">
                        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 font-sans">
                          Lissajous Curve
                        </h2>
                        <span className="text-gray-400 text-[10px]">Harmonics</span>
                      </div>
                      <div className="w-full h-[260px] rounded-none overflow-hidden border border-black/10 dark:border-white/10">
                        <Lissajous />
                      </div>
                    </div>

                    {/* MASONRY ITEM 2: Reaction Diffusion (Column 2 Top) */}
                    <div className="break-inside-avoid space-y-2.5 p-4 rounded-none border border-black/15 dark:border-white/15 bg-black/2 dark:bg-white/3 backdrop-blur-md w-full min-w-0 max-w-full overflow-hidden">
                      <div className="flex items-center justify-between font-mono text-xs">
                        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 font-sans">
                          Reaction-Diffusion
                        </h2>
                        <span className="text-gray-400 text-[10px]">Pattern</span>
                      </div>
                      <div className="rounded-none overflow-hidden border border-black/10 dark:border-white/10 w-full min-w-0 max-w-full">
                        <Reactdiff />
                      </div>
                    </div>

                    {/* MASONRY ITEM 3: Bubble Sort (Column 1 Bottom) */}
                    <div className="break-inside-avoid space-y-2.5 p-4 rounded-none border border-black/15 dark:border-white/15 bg-black/2 dark:bg-white/3 backdrop-blur-md w-full min-w-0 max-w-full overflow-hidden">
                      <div className="flex items-center justify-between font-mono text-xs">
                        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 font-sans">
                          Bubble Sort
                        </h2>
                        <span className="text-gray-400 text-[10px]">Algorithm</span>
                      </div>
                      <div className="rounded-none overflow-hidden border border-black/10 dark:border-white/10 w-full min-w-0 max-w-full">
                        <BubbleSort />
                      </div>
                    </div>

                    {/* MASONRY ITEM 4: Neural Network (Column 2 Bottom) */}
                    <div className="break-inside-avoid space-y-2.5 p-4 rounded-none border border-black/15 dark:border-white/15 bg-black/2 dark:bg-white/3 backdrop-blur-md w-full min-w-0 max-w-full overflow-hidden">
                      <div className="flex items-center justify-between font-mono text-xs">
                        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 font-sans">
                          Neural Network
                        </h2>
                        <span className="text-gray-400 text-[10px]">Deep Learning</span>
                      </div>
                      <div className="rounded-none overflow-hidden border border-black/10 dark:border-white/10 w-full min-w-0 max-w-full">
                        <NeuralNetwork />
                      </div>
                    </div>

                  </div>
                </section>
              ) : (
                rightPanelView === "simulations" && (
                  <section className="space-y-3">
                    <div className="text-xs font-mono text-gray-500 dark:text-gray-400">
                      {"/* Simulations */"}
                    </div>
                    <p className="text-xs font-mono text-gray-500">
                      Preparing simulations...
                    </p>
                  </section>
                )
              )}
              {/* RESOURCES COMPONENT */}
              {rightPanelView === "resources" && (
                <section className="space-y-4">
                  <ResourcesSection />
                </section>
              )}
              {/* BLOG COMPONENT */}
              {rightPanelView === "blog" && (
                <section className="space-y-4">
                  <BlogSection />
                </section>
              )}
            </div>
          </div>
        </div>
      </section>
      <BackToTop containerRef={scrollContainerRef} />
    </main>
  );
}
