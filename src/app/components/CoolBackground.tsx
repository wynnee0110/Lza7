"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const LiquidChrome = dynamic(() => import("@/components/LiquidChrome"), {
  ssr: false,
});

export default function CoolBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isLight = resolvedTheme === "light";

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      <LiquidChrome
        baseColor={isLight ? [0.38, 0.38, 0.42] : [0.1, 0.1, 0.13]}
        speed={0.06}
        amplitude={0.25}
        frequencyX={2.5}
        frequencyY={2.5}
        interactive={true}
        className="w-full h-full opacity-70 dark:opacity-50 transition-opacity duration-700"
      />
    </div>
  );
}
