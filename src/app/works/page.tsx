
import Header from "../components/Header";
import ProjectsSection from "../components/ProjectsSection";
import Link from "next/link";

export default function WorksPage() {
    return (
        <section className="flex flex-col justify-center items-center min-h-[100svh] lg:mt-15 mt-10 lg:mt-0 gap-5 px-6 lg:px-0">
        <Header />


        <div className="mt-15" >
            <Link href="/" className="inline-flex gap-0.5 ml-8 hover:text-gray-400 transition-all duration-300 ease-out 
             hover:opacity-70">
                <svg width="24" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M20 12H4M4 12L10 18M4 12L10 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
 </svg>
 <span className="px-2 mt-0.4">Go to Home</span>
            </Link>

            <ProjectsSection />
        </div>
       </section>

    )


}