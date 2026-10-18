import type { MetadataRoute } from "next";
import { projects } from "./data/projectsData";
import { blogPosts } from "./data/blogData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://hexctl.dev";
  const lastModified = new Date();

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/works/${project.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/works`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...projectRoutes,
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    ...blogRoutes,
    {
      url: `${baseUrl}/social`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/simulation`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
