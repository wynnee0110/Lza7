"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const ROUTE_SHORTCUTS: Record<string, string> = {
  "1": "/",
  "2": "/?tab=works",
  "3": "/?tab=certifications",
  "4": "/?tab=blog",
  "5": "/?tab=simulations",
  "6": "/?tab=resources",
};

export default function GlobalKeyboardNav() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // On the root home page ("/"), HomePage handles its own tab switching in-place
    if (pathname === "/") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if modifier keys are held
      if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;

      // Ignore if active focus is in an input or editable field
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable ||
          target.closest("input, textarea, select, [contenteditable='true']"))
      ) {
        return;
      }

      // Check digit keys 1-6 or numpad 1-6
      const numFromDigit = e.code?.match(/^Digit([1-6])$/)?.[1];
      const numFromNumpad = e.code?.match(/^Numpad([1-6])$/)?.[1];
      const numFromKey = ["1", "2", "3", "4", "5", "6"].includes(e.key) ? e.key : null;
      const shortcutNum = numFromDigit || numFromNumpad || numFromKey;

      if (shortcutNum && ROUTE_SHORTCUTS[shortcutNum]) {
        e.preventDefault();
        router.push(ROUTE_SHORTCUTS[shortcutNum]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pathname, router]);

  return null;
}
