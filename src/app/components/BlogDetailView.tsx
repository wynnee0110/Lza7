"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Terminal, Copy, Check, Trophy, Calendar, Clock, Tag } from "lucide-react";
import CoolBackground from "./CoolBackground";
import DarkModeToggle from "./DarkModeToggle";
import type { BlogPost } from "../data/blogData";

interface BlogDetailViewProps {
  post: BlogPost;
  prevPost?: BlogPost;
  nextPost?: BlogPost;
}

function CodeBlock({
  code,
  language,
  filename,
}: {
  code: string;
  language: string;
  filename?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(code);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="my-4 rounded-none border border-black/15 dark:border-white/15 bg-black/[0.04] dark:bg-white/[0.03] overflow-hidden font-mono text-xs">
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-black/10 dark:border-white/10 text-[11px] text-gray-500 dark:text-gray-400">
        <span className="flex items-center gap-1.5">
          <Terminal className="w-3 h-3 text-slate-500" />
          {filename || language}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="text-[10px] hover:text-slate-800 dark:hover:text-slate-200 inline-flex items-center gap-1 transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-500" />
              <span className="text-emerald-500">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-3 overflow-x-auto text-xs leading-relaxed text-gray-800 dark:text-gray-200">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function BlogDetailView({
  post,
  prevPost,
  nextPost,
}: BlogDetailViewProps) {
  return (
    <main className="portfolio-bg relative isolate min-h-[100svh] text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <CoolBackground />

      {/* Top Header Navigation Pill with Breadcrumb Tracker */}
      <header className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[95%] sm:w-[92%] max-w-3xl flex items-center justify-between px-4 py-2 rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-[#161618]/70 backdrop-blur-md shadow-sm font-mono text-xs">
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 min-w-0 truncate">
          <Link
            href="/"
            className="font-semibold text-gray-900 dark:text-white hover:underline shrink-0"
          >
            Wayne Obial
          </Link>
          <span className="text-gray-400 dark:text-gray-500 shrink-0">/</span>
          <Link
            href="/?tab=blog"
            className="text-gray-500 hover:text-gray-900 dark:hover:text-white hover:underline shrink-0"
          >
            blog
          </Link>
          <span className="text-gray-400 dark:text-gray-500 shrink-0">/</span>
          <span className="text-gray-900 dark:text-white font-medium truncate">
            {post.slug}
          </span>
        </div>

        <DarkModeToggle />
      </header>

      {/* Article Content: Rich, Visual, Clean Tech Aesthetic */}
      <article className="pt-24 pb-20 max-w-2xl mx-auto px-4 sm:px-6 relative z-10 font-sans space-y-6">
        {/* Back Link */}
        <div>
          <Link
            href="/?tab=blog"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3 h-3" />
            back to articles
          </Link>
        </div>

        {/* Title, Metadata & Category */}
        <header className="space-y-3 border-b border-black/10 dark:border-white/10 pb-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 border border-black/15 dark:border-white/15 bg-black/[0.03] dark:bg-white/[0.04] text-gray-700 dark:text-gray-300">
              <Trophy className="w-3 h-3 text-amber-500" />
              {post.category}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-gray-500 dark:text-gray-400 pt-1">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              {post.formattedDate}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              {post.readTime}
            </span>
            <span>By {post.author.name}</span>
          </div>
        </header>

        {/* Hero Cover Image */}
        {post.coverImage && (
          <div className="space-y-2">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden border border-black/15 dark:border-white/15 bg-neutral-900/5 dark:bg-black/40 shadow-sm">
              <Image
                src={post.coverImage}
                alt={post.coverImageCaption || post.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 672px"
                className="object-cover object-center"
              />
            </div>
            {post.coverImageCaption && (
              <p className="text-[11px] font-mono text-gray-500 dark:text-gray-400 italic">
                {post.coverImageCaption}
              </p>
            )}
          </div>
        )}

        {/* Main Text Content */}
        <div className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 space-y-6">
          {/* Introduction */}
          <p className="text-base leading-relaxed font-normal text-gray-800 dark:text-gray-200">
            {post.introduction}
          </p>

          {/* Sections */}
          {post.sections.map((section) => (
            <div key={section.id} className="space-y-3 pt-3">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                {section.title}
              </h2>

              <p>{section.content}</p>

              {/* Section Image if present */}
              {section.image && (
                <div className="space-y-1.5 my-4">
                  <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden border border-black/15 dark:border-white/15 bg-neutral-900/5 dark:bg-black/40">
                    <Image
                      src={section.image}
                      alt={section.imageCaption || section.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 672px"
                      className="object-cover object-center"
                    />
                  </div>
                  {section.imageCaption && (
                    <p className="text-[11px] font-mono text-gray-500 dark:text-gray-400 italic">
                      {section.imageCaption}
                    </p>
                  )}
                </div>
              )}

              {/* Code Snippet if present */}
              {section.codeSnippet && (
                <CodeBlock
                  code={section.codeSnippet.code}
                  language={section.codeSnippet.language}
                  filename={section.codeSnippet.filename}
                />
              )}

              {/* Tip if present */}
              {section.tip && (
                <div className="p-3 border-l-2 border-amber-500 bg-amber-500/5 text-xs text-gray-700 dark:text-gray-300 font-mono">
                  <strong className="text-amber-600 dark:text-amber-400">Insight: </strong>
                  {section.tip}
                </div>
              )}
            </div>
          ))}

          {/* Key Takeaways Box */}
          {post.keyTakeaways && post.keyTakeaways.length > 0 && (
            <div className="my-6 p-4 border border-black/15 dark:border-white/15 bg-black/[0.02] dark:bg-white/[0.02] space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
                <Tag className="w-3.5 h-3.5 text-slate-500" />
                Key Takeaways
              </div>
              <ul className="space-y-2 text-xs text-gray-700 dark:text-gray-300 list-disc list-inside">
                {post.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {takeaway}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Conclusion */}
          {post.conclusion && (
            <div className="pt-4 border-t border-black/10 dark:border-white/10 space-y-2">
              <p>{post.conclusion}</p>
            </div>
          )}

          {/* Event Photo Gallery */}
          {post.galleryImages && post.galleryImages.length > 0 && (
            <div className="space-y-3 pt-6 border-t border-black/10 dark:border-white/10">
              <div className="text-xs font-mono text-gray-500 dark:text-gray-400">
                {"/* Event Gallery & Highlights */"}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {post.galleryImages.map((img, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="relative aspect-[4/3] w-full overflow-hidden border border-black/15 dark:border-white/15 bg-neutral-900/5 dark:bg-black/40">
                      <Image
                        src={img.url}
                        alt={img.alt || img.caption}
                        fill
                        sizes="(max-width: 640px) 100vw, 320px"
                        className="object-cover object-center hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    {img.caption && (
                      <p className="text-[10px] font-mono text-gray-500 dark:text-gray-400 leading-tight">
                        {img.caption}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Prev / Next Minimalist Links */}
        <div className="pt-8 border-t border-black/10 dark:border-white/10 flex items-center justify-between font-mono text-xs text-gray-500">
          {prevPost ? (
            <Link
              href={`/blog/${prevPost.slug}`}
              className="hover:text-gray-900 dark:hover:text-white hover:underline inline-flex items-center gap-1 max-w-[45%] truncate"
            >
              <ArrowLeft className="w-3 h-3 shrink-0" />
              <span className="truncate">{prevPost.title}</span>
            </Link>
          ) : (
            <span />
          )}

          {nextPost && (
            <Link
              href={`/blog/${nextPost.slug}`}
              className="hover:text-gray-900 dark:hover:text-white hover:underline inline-flex items-center gap-1 max-w-[45%] truncate ml-auto text-right"
            >
              <span className="truncate">{nextPost.title}</span>
              <ArrowRight className="w-3 h-3 shrink-0" />
            </Link>
          )}
        </div>
      </article>
    </main>
  );
}
