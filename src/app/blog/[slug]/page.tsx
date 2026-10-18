import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPostBySlug } from "@/app/data/blogData";
import BlogDetailView from "@/app/components/BlogDetailView";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | Wayne Obial",
      description: "The requested article could not be found.",
    };
  }

  const pageTitle = `${post.title} — Wayne Obial`;
  const pageDescription = post.excerpt;

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: `https://hexctl.dev/blog/${post.slug}`,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `https://hexctl.dev/blog/${post.slug}`,
      siteName: "Wayne Obial Portfolio",
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
      tags: post.tags,
      images: [
        {
          url: post.coverImage || "/images/Me.jpg",
          width: 1200,
          height: 630,
          alt: `${post.title} Preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [post.coverImage || "/images/Me.jpg"],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const currentIndex = blogPosts.findIndex((p) => p.slug === post.slug);
  const totalPosts = blogPosts.length;
  const prevPost =
    currentIndex > 0 ? blogPosts[currentIndex - 1] : undefined;
  const nextPost =
    currentIndex < totalPosts - 1 ? blogPosts[currentIndex + 1] : undefined;

  return (
    <BlogDetailView
      post={post}
      prevPost={prevPost}
      nextPost={nextPost}
    />
  );
}
