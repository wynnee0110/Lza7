import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, getProjectBySlug } from "@/app/data/projectsData";
import ProjectDetailView from "@/app/components/ProjectDetailView";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | Wayne Obial",
      description: "The requested project could not be found.",
    };
  }

  const pageTitle = `${project.title} — Selected Work | Wayne Obial`;
  const pageDescription =
    project.overview ||
    project.description ||
    `Detailed case study and overview of ${project.title} by Wayne Obial.`;

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: `https://hexctl.dev/works/${project.slug}`,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `https://hexctl.dev/works/${project.slug}`,
      siteName: "Wayne Obial Portfolio",
      images: [
        {
          url: project.image || "/images/Me.jpg",
          width: 1200,
          height: 630,
          alt: `${project.title} Preview`,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [project.image || "/images/Me.jpg"],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const totalProjects = projects.length;
  const prevProject =
    projects[(currentIndex - 1 + totalProjects) % totalProjects];
  const nextProject = projects[(currentIndex + 1) % totalProjects];

  return (
    <ProjectDetailView
      project={project}
      currentIndex={currentIndex}
      totalProjects={totalProjects}
      prevProject={prevProject}
      nextProject={nextProject}
    />
  );
}
