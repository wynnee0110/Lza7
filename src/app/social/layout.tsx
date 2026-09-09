import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social Profiles & Links | Wayne Obial",
  description:
    "Connect with Wayne Obial across GitHub, LinkedIn, LeetCode, Twitter, and other professional developer platforms.",
  alternates: {
    canonical: "https://hexctl.dev/social",
  },
  openGraph: {
    title: "Social Profiles & Links | Wayne Obial (hexctl.dev)",
    description:
      "Connect with Wayne Obial across GitHub, LinkedIn, LeetCode, Twitter, and developer networks.",
    url: "https://hexctl.dev/social",
  },
};

export default function SocialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
