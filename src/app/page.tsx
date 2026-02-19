"use client";

import Image from "next/image";
import Header from "./components/Header";
import Footer from "./components/Footer";
import experience from "./data/experience.json";
import connect from "./data/connect.json";



export default function HomePage() {
  return (
    <main>
      <Header />

<section className="flex flex-col md:flex-col justify-center items-center min-h-[100svh] lg:mt-15 mt-10 lg:mt-0 gap-5 px-6 lg:px-0">
        
<div className="justify-center mt-10 items">
<Image
  src="/images/Rudo.jpg"
  alt="Profile picture"
  width={160}
  height={160}
  className="rounded-full border shadow
      w-28 h-28
    sm:w-32 sm:h-32
    md:w-42 md:h-40
    lg:w-48 lg:h-48"
/>

</div>
<div className="flex flex-col items-center text-4xl">
     <span>Wayne Obial</span>              
      <span className="text-sm text-gray-400 mt-2">Software Developer</span>
 
</div>
        <p className="max-w-xl text-center md:text-left text-left">
          Hi, I’m Wayne — a technology-driven learner with a strong interest in building
          practical and creative digital solutions. I enjoy working on projects that
          involve software development, automation, and problem-solving, and I’m always
          curious about how systems work behind the scenes.

          <br /><br />

          I actively explore different tools, frameworks, and technologies by creating
          hands-on projects, from small scripts to full applications. Through these
          projects, I focus on writing clean, efficient solutions while continuously
          improving my skills and understanding.

          <br /><br />

          I believe in continuous growth, learning beyond the classroom, and turning ideas
          into real, functional products. This portfolio showcases my journey, projects,
          and the skills I’m developing as I move forward in the tech field.
        </p>


<div className="w-full max-w-xl mt-5">
 
  <div className="relative border-l border-gray-300 pl-6 space-y-8">
    {experience.map((item, index) => (
      <div key={index} className="relative">
        <span className=""></span>

        <h3 className="font-medium text-lg">{item.role}</h3>
        <p className="text-sm text-gray-500">{item.period}</p>
        <p className="mt-2 text-sm">{item.description}</p>
      </div>
    ))}
  </div>
</div>

{/* Connect With Me */}
<div className="w-full max-w-xl mt-6 mb-8">
  <h2 className="mb-4 text-lg font-medium text-gray-400">Connect</h2>

  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8  ">
    {connect.map((item, index) => (
      <a
        key={index}
        href={item.url}
        className="
        flex
      
        "
      >
        <span className="font-medium text-md text-">{item.name}</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-6 ml-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
          />
        </svg>
      </a>
    ))}
  </div>
</div>

      </section>
      <Footer/>
      
    </main>
  );
}
