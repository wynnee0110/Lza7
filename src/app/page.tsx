"use client";

import Image from "next/image";
import Header from "./components/Header";

export default function HomePage() {
  return (
    <main>
      <Header />


<section className="flex flex-col md:flex-col justify-center items-center min-h-[100svh] mt-10 lg:mt-0 gap-5 px-6 lg:px-0">
        
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
<div className="text-4xl">
  <a href="/social" className="inline-flex items-center gap-2">
     <span>Wayne Obial</span>              
 </a>
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
     
      </section>
      
      
    </main>
  );
}
