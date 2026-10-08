import type { MetadataRoute } from "next";
import { projects } from "./data/projectsData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://hexctl.dev";
  const lastModified = new Date();

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/works/${project.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/works`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...projectRoutes,
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
