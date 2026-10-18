"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Trophy } from "lucide-react";
import { blogPosts } from "../data/blogData";

export default function BlogSection() {
  return (
    <div className="space-y-4 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between text-xs font-mono text-gray-500 dark:text-gray-400 pb-2 border-b border-black/10 dark:border-white/10">
        <span>{"/* Notes & Articles */"}</span>
        <span>
          {blogPosts.length} {blogPosts.length === 1 ? "article" : "articles"}
        </span>
      </div>

      {/* Blog Posts List */}
      <div className="space-y-4 divide-y divide-black/10 dark:divide-white/10">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block pt-2 pb-4 transition-colors"
          >
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              {post.coverImage && (
                <div className="relative w-full sm:w-44 h-32 sm:h-28 shrink-0 overflow-hidden border border-black/15 dark:border-white/15 bg-neutral-900/5 dark:bg-black/40">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 176px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-black/80 backdrop-blur-xs text-[10px] font-mono text-amber-300 flex items-center gap-1 border border-amber-400/20">
                    <Trophy className="w-2.5 h-2.5" />
                    <span>Champions</span>
                  </div>
                </div>
              )}

              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex items-center gap-2 text-[11px] font-mono text-gray-500 dark:text-gray-400">
                  <span className="px-1.5 py-0.5 border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.04] text-gray-700 dark:text-gray-300">
                    {post.category}
                  </span>
                  <span>•</span>
                  <span>{post.formattedDate}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors leading-snug">
                    {post.title}
                  </h2>
                  <ArrowUpRight className="w-4 h-4 text-gray-400 dark:text-gray-500 shrink-0 group-hover:text-gray-900 dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all mt-1" />
                </div>

                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>

                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {post.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono text-gray-500 dark:text-gray-400"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
