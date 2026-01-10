"use client";

import { useRouter } from "next/navigation";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProjectsSection from "./components/ProjectsSection";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Button } from "@/components/ui/button";
import DarkModeToggle from "./components/DarkModeToggle";


export default function HomePage() {
  const router = useRouter();
  

  return (
    <main>
      <Header />

      

      {/* Hero Section - Name Centered */}
      <section className="flex flex-col items-center justify-center text-center pt-10 sm:pb-0 h-[100vh] px-4 sm:mb-[-150px]">
    
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          <div className="w-[300px] h-[300px] bg-white rounded-full blur-[100px] opacity-30"></div>
        </div>

        <div className="absolute w-full h-[300px] mb-8"> 
        </div>
        
        <div className="mt-34 z-5 max-w-3xl text-center mx-auto">
          <h1 className="flex text-6xl font-bold mb-4 items-center justify-center mx-auto">Wayne Obial</h1>
          <p className="text-gray-400 max-w-md mb-6 mx-auto">
          </p>

          <div className=" flex flex-row gap-4 z-10 justify-center">
            <button 
              onClick={() => router.push("#projects")}
              className="bg-black dark:text-black dark:bg-white white:bg-blue-700 text-white font-semibold py-2 px-7 rounded-2xl transition hover:scale-102 transform">
              View Projects
            </button>
            <a 
              href="/contact"
              className="text-black dark:text-white font-semibold py-2 px-7 rounded-2xl border border-gray-300 transition hover:scale-102 transform">
              Contact Me
            </a>
          </div>
        </div>

        <div className="mt-20 sm:mt-40">
          <a href="#about" className="absolute cursor-pointer mx-auto left-1/2 transform -translate-x-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 animate-bounce text-gray-400 hover:text-white transition"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </a>
        </div>
      </section>
      
      <section id="about" className=" mb-0 w-full flex justify-center items-center sm:p-50 sm:py-20 sm:mt-[-10px] lg:p-50 xl:p-50">
        <div className="w-full max-w-6xl flex flex-col sm:flex-row justify-between gap-2 px-10 ">
          {/* LEFT SIDE — TEXT */}
          <div className="flex-1 min-w-0">
            <h2 className="text-3xl sm:text-md font-bold mb-4 ml-4 text-black dark:text-white">About me</h2>
            <p className="text-black dark:text-white text-md sm:text-base leading-relaxed px-4 ">
              I&apos;m just a tech enthusiast who loves building cool stuff and figuring out how things work.  
              I spend most of my time coding little projects, experimenting with new tools, or just playing around 
              with ideas that come to mind.  
              <br /><br />
              I love creating things that are useful, fun, or just satisfy my curiosity. Sometimes it&apos;s a small game, 
              a simple app, or even tweaking something just for the challenge. I enjoy the process as much as the result.  
              <br /><br />
              When I&apos;m not glued to my computer screen, you can find me exploring the outdoors, reading up on the latest 
              tech trends, or hanging out with friends and family.  
              Overall, I&apos;m just someone who&apos;s passionate about technology and loves to create and learn new things every day.
            </p>
          </div>

          {/* RIGHT SIDE — SOCIAL LINKS */}
          <div className="flex flex-col items-start sm:items-end gap-4 sm:w-[280px] mt-10 ml-4 sm:mt-16 sm:mr-8">
            <a href="https://github.com/wynnee0110" target="_blank" className="flex items-center gap-2 text-black dark:text-white hover:text-white transition">
              GitHub
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 text-black dark:text-white hover:text-white transition" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 4L12 12M20 4V8.5M20 4H15.5M19 12.5V16.8C19 17.9201 19 18.4802 18.782 18.908C18.5903 19.2843 18.2843 19.5903 17.908 19.782C17.4802 20 16.9201 20 15.8 20H7.2C6.0799 20 5.51984 20 5.09202 19.782C4.71569 19.5903 4.40973 19.2843 4.21799 18.908C4 18.4802 4 17.9201 4 16.8V8.2C4 7.0799 4 6.51984 4.21799 6.09202C4.40973 5.71569 4.71569 5.40973 5.09202 5.21799C5.51984 5 6.07989 5 7.2 5H11.5" />
              </svg>
            </a>

            <a href="https://www.linkedin.com/in/wayne-obial-5404a4374/" target="_blank" className="flex items-center gap-2 text-black dark:text-white hover:text-white transition">
              LinkedIn
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 text-black dark:text-white hover:text-white transition" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 4L12 12M20 4V8.5M20 4H15.5M19 12.5V16.8C19 17.9201 19 18.4802 18.782 18.908C18.5903 19.2843 18.2843 19.5903 17.908 19.782C17.4802 20 16.9201 20 15.8 20H7.2C6.0799 20 5.51984 20 5.09202 19.782C4.71569 19.5903 4.40973 19.2843 4.21799 18.908C4 18.4802 4 17.9201 4 16.8V8.2C4 7.0799 4 6.51984 4.21799 6.09202C4.40973 5.71569 4.71569 5.40973 5.09202 5.21799C5.51984 5 6.07989 5 7.2 5H11.5" />
              </svg>
            </a>

            <a href="https://X.com/Lza7Dev" target="_blank" className="flex items-center gap-2 text-black dark:text-white hover:text-white transition">
              X
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 text-black dark:text-white hover:text-white transition" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 4L12 12M20 4V8.5M20 4H15.5M19 12.5V16.8C19 17.9201 19 18.4802 18.782 18.908C18.5903 19.2843 18.2843 19.5903 17.908 19.782C17.4802 20 16.9201 20 15.8 20H7.2C6.0799 20 5.51984 20 5.09202 19.782C4.71569 19.5903 4.40973 19.2843 4.21799 18.908C4 18.4802 4 17.9201 4 16.8V8.2C4 7.0799 4 6.51984 4.21799 6.09202C4.40973 5.71569 4.71569 5.40973 5.09202 5.21799C5.51984 5 6.07989 5 7.2 5H11.5" />
              </svg>
            </a>

            <a href="mailto:obialwayne@gmail.com" className="flex items-center gap-2 text-black dark:text-white hover:text-white transition">
              Email
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 text-black dark:text-white hover:text-white transition" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 4L12 12M20 4V8.5M20 4H15.5M19 12.5V16.8C19 17.9201 19 18.4802 18.782 18.908C18.5903 19.2843 18.2843 19.5903 17.908 19.782C17.4802 20 16.9201 20 15.8 20H7.2C6.0799 20 5.51984 20 5.09202 19.782C4.71569 19.5903 4.40973 19.2843 4.21799 18.908C4 18.4802 4 17.9201 4 16.8V8.2C4 7.0799 4 6.51984 4.21799 6.09202C4.40973 5.71569 4.71569 5.40973 5.09202 5.21799C5.51984 5 6.07989 5 7.2 5H11.5" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <section id="projects" className=" bg-black-100 flex justify-center sm:p-50 sm:mt-[-260px]">
        <div className="w-full max-w-6xl px-4 sm:px-10 py-8">
          <div className="flex items-center gap-4 mb-5 w-full">
            <h2 className="text-3xl sm:text-md font-bold ml-5 sm:mb-[-15px] text-black dark:text-white"> 
              Projects
            </h2>
          </div>
          <div className="">  
            <ProjectsSection />
          </div>
        </div>
      </section>

      <section className=" w-full sm:py-0 py-20 sm:mb-20 flex flex-col items-center text-center sm:mt-[-100px]">
        <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
          Let&apos;s build something great together.
        </h2>
        <p className="text-black dark:text-white max-w-xl mb-8 text-sm md:text-base">
          Whether it&apos;s a full-stack web application, an API, or a product idea,
          I&apos;d love to help bring it to life.
        </p>
        <a
          href="/contact"
          className="text-black dark:text-white px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all text-white flex items-center gap-2"
        >
          <span className="text-black dark:text-white">Contact Me</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4 text-black dark:text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              className="text-black dark:text-white"
            />
          </svg>
        </a>
      </section>
      
      <Footer />
    </main>
  );
}