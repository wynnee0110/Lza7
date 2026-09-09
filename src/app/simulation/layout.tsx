import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interactive Simulations & Math Models | Wayne Obial",
  description:
    "Explore interactive 2D simulations, differential models, Gray-Scott reaction-diffusion, Lissajous curves, and neural networks by Wayne Obial on hexctl.dev.",
  alternates: {
    canonical: "https://hexctl.dev/simulation",
  },
  openGraph: {
    title: "Interactive Simulations & Math Models | Wayne Obial (hexctl.dev)",
    description:
      "Interactive 2D simulations, differential models, Gray-Scott reaction-diffusion, and algorithm visualizers by Wayne Obial.",
    url: "https://hexctl.dev/simulation",
  },
};

export default function SimulationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
