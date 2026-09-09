import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Selected Works & Projects | Wayne Obial",
  description:
    "Explore projects and applications built by Wayne Obial — Software Developer. Direct links to live apps and repositories on hexctl.dev.",
  alternates: {
    canonical: "https://hexctl.dev/works",
  },
  openGraph: {
    title: "Selected Works & Projects | Wayne Obial (hexctl.dev)",
    description:
      "Explore software engineering projects and full-stack applications built by Wayne Obial.",
    url: "https://hexctl.dev/works",
  },
};

export default function WorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
