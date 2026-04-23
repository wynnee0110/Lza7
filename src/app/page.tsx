"use client";

import Image from "next/image";
import Header from "./components/Header";
import Footer from "./components/Footer";
import experience from "./data/experience.json";
import connect from "./data/connect.json";



export default function HomePage() {
  return (
    <main className="overflow-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] h-[100svh] bg-gray-50 dark:bg-[#0a0a0a] text-gray-800 dark:text-gray-300 transition-colors duration-300">
      <Header />

      {/* Zoomed content wrapper — header is excluded */}

      <div style={{ zoom: 1.0 }}>
        {/* Main Forum Post Container */}
        <section className="pt-20 max-w-5xl mx-auto px-4 lg:px-0 ">
          <div className="flex flex-col md:flex-row bg-white dark:bg-[#161618] border border-gray-200 dark:border-[#2d2d2d] rounded-md overflow-hidden shadow-xl dark:shadow-2xl transition-colors duration-300">

            {/* Left Sidebar: Profile (Mimicking the forum user info) */}
            <div className="w-full md:w-64 bg-gray-100 dark:bg-[#1a1a1c] p-5 flex flex-col items-center border-b md:border-b-0 md:border-r border-gray-200 dark:border-[#2d2d2d] shrink-0 transition-colors duration-300">

              {/* Username & "Rank" */}
              <div className="font-bold text-lg text-gray-900 dark:text-[#e2e8f0] mb-4 flex items-center gap-2">
                <span className="text-pink-600 dark:text-pink-500 text-sm">[Dev]</span> Wayne Obial
              </div>

              {/* Profile Avatar */}
              <div className="relative w-32 h-32 mb-4">
                <Image
                  src="/images/2.jpeg"
                  alt="Profile picture"
                  fill
                  className="rounded-md object-cover border border-gray-300 dark:border-[#333]"
                />
              </div>

              <div className="text-sm text-green-600 dark:text-green-500 mb-4 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-600 dark:bg-green-500 rounded-full inline-block"></span>
                Online
              </div>

              {/* Badge */}
              <div className="w-full text-center border border-pink-500 dark:border-[#b8287f] bg-pink-100 dark:bg-[#b8287f]/10 text-pink-700 dark:text-[#b8287f] font-bold text-xs py-1.5 uppercase tracking-widest mb-6">
                Software Dev
              </div>

              {/* Connect / "Stats" Section */}
              <div className="w-full text-xs space-y-2 text-gray-600 dark:text-gray-400">
                {connect.map((item, index) => (
                  <div key={index} className="flex justify-between border-b border-gray-300 dark:border-[#2d2d2d] pb-1">
                    <span>{item.name}:</span>
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 hover:underline">
                      Visit
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Area: Main Post Content */}
            <div className="flex-1 flex flex-col">

              {/* Post Meta Header */}
              <div className="bg-gray-100 dark:bg-[#1a1a1c] px-4 py-2 text-xs text-gray-500 dark:text-gray-500 border-b border-gray-200 dark:border-[#2d2d2d] flex justify-between items-center transition-colors duration-300">
                <span>Posted just now (This portfolio was last modified recently by WayneObial.)</span>
                <span className="font-bold text-gray-600 dark:text-gray-400">#1</span>
              </div>

              {/* Post Body */}
              <div className="p-6 md:p-8 space-y-6">
                <h1 className="text-xl font-medium text-black dark:text-white mb-2">
                  Hey <span className="font-bold">Visitors</span>.
                </h1>

                <div className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 space-y-4">
                  <p>Greetings.</p>
                  <p>
                    I’m Wayne — a technology-driven learner with a strong interest in building
                    practical and creative digital solutions. I enjoy working on projects that
                    involve software development, automation, and problem-solving, and I’m always
                    curious about how systems work behind the scenes.
                  </p>
                  <p>
                    I actively explore different tools, frameworks, and technologies by creating
                    hands-on projects, from small scripts to full applications. Through these
                    projects, I focus on writing clean, efficient solutions while continuously
                    improving my skills and understanding.
                  </p>
                  <p>
                    I believe in continuous growth, learning beyond the classroom, and turning ideas
                    into real, functional products. This portfolio showcases my journey, projects,
                    and the skills I’m developing as I move forward in the tech field.
                  </p>
                </div>

                {/* Experience Section formatted as a "Code" or "Quote" block */}
                <div className="mt-8 bg-gray-50 dark:bg-[#111112] border border-gray-200 dark:border-[#333] rounded-md p-4 transition-colors duration-300">
                  <p className="text-red-600 dark:text-red-400 font-mono text-sm mb-4">{"/* System.Experience Logs */"}</p>

                  <div className="relative border-l-2 border-gray-300 dark:border-[#333] pl-4 space-y-6 ml-2">
                    {experience.map((item, index) => (
                      <div key={index} className="relative">
                        {/* Timeline dot */}
                        <span className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 bg-gray-400 dark:bg-gray-500 rounded-full"></span>

                        <h3 className="font-semibold text-gray-900 dark:text-gray-200">{item.role}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">{item.period}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 italic">&quot;{item.description}&quot;</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}