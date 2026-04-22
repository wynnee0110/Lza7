"use client";
import { useEffect, useState } from "react";

interface PreloaderTailwindProps {
  minMs?: number;
}

export default function PreloaderTailwind({ minMs = 300 }: PreloaderTailwindProps) {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Only show the preloader on the root home page
    if (typeof window !== "undefined" && window.location.pathname !== "/") {
      setVisible(false);
      return;
    }

    const start = performance.now();

    function hide() {
      const elapsed = performance.now() - start;
      const wait = Math.max(0, minMs - elapsed);

      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => setVisible(false), 1000);
      }, wait);
    }

    if (document.readyState === "complete") hide();
    else {
      window.addEventListener("load", hide);
      return () => window.removeEventListener("load", hide);
    }
  }, [minMs]);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-black
        transition-opacity duration-500 ${fadeOut ? "opacity-0" : "opacity-100"}`}
    >
      <div className="w-14 h-14 rounded-full border-4 border-black border-t-white dark:border-white dark:border-t-black animate-spin transform scale-[0.5]" />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
