"use client";

export default function Footer() {
  return (
    <footer className="w-full py-4 px-8 bg-black-900 text-gray-400 flex flex-col sm:flex-row items-center justify-center gap-1 border-gray-600">
      <p className="text-sm font-mono">
        &copy; {new Date().getFullYear()} <span className="text-gray-300 font-semibold">Wayne Obial</span> &mdash; Software Developer &middot; hexctl.dev. All rights reserved.
      </p>
    </footer>
    );
}