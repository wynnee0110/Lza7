"use client";

import { useRouter } from "next/navigation";

import { useState, useEffect } from "react";
import DarkModeToggle from "./DarkModeToggle";



export default function Header() {
  const router = useRouter();
  const [time, setTime] = useState(new Date());
  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000); // Update every minute
    return () => clearInterval(timer);
  }, []);
  return (

    <header className="flex items-center justify-between px-0 py-0 fixed top-0 left-0 z-50 w-full h-16 bg-transparent backdrop-blur-md border-b border-white/10 shadow-sm">
      {/* Logo (Atom3D) clickable 
      <button
        onClick={() => router.push("/")}
        className="relative bottom-1 w-[100px] h-[100px] hover:opacity-80 transition-opacity mt-3"
        aria-label="Home"
      >
      </button>
 */}
      {/* Navbar Component */}
      <div className="flex flex-row gap-3">
        <button onClick={() => router.push("/")}
          className="w-20 h-10 rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors">



        </button>


      </div>




      <div className="text-sm font-mono mx-5 flex flex-row gap-3 mt-2">
        <div className="mt-2 text-black dark:text-white">{formattedTime}</div>
        <div><DarkModeToggle /></div>
      </div>




    </header>
  );
}