"use client";

import { useEffect, useState } from "react";

interface PreloaderProps {
  minMs?: number;
}

export default function Preloader({ minMs = 500 }: PreloaderProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (window.location.pathname !== "/") {
      setVisible(false);
      return;
    }

    const start = performance.now();

    const hide = () => {
      const elapsed = performance.now() - start;
      const wait = Math.max(0, minMs - elapsed);

      setTimeout(() => setVisible(false), wait);
    };

    if (document.readyState === "complete") {
      hide();
    } else {
      window.addEventListener("load", hide);
      return () => window.removeEventListener("load", hide);
    }
  }, [minMs]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-black transition-opacity duration-500">
      <div className="w-6 h-6 border-2 border-black dark:border-white border-t-transparent rounded-full animate-spin" />
    </div>
  );
}