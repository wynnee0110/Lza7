import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Engineering Articles | Wayne Obial",
  description:
    "Technical articles, deep dives into full-stack web development, IoT telemetry with ESP32, mathematical canvas simulations, and software architecture by Wayne Obial.",
  alternates: {
    canonical: "https://hexctl.dev/blog",
  },
  openGraph: {
    title: "Blog & Engineering Articles | Wayne Obial (hexctl.dev)",
    description:
      "Technical essays and software engineering insights by Wayne Obial.",
    url: "https://hexctl.dev/blog",
    siteName: "Wayne Obial Portfolio",
    type: "website",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
