"use client";

import Header from "../components/Header";
import ProjectsSection from "../components/ProjectsSection";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';


export default function WorksPage() {
    const router = useRouter();

    return (
        <section className="flex flex-col justify-center items-center min-h-[100svh] lg:mt-20 mt-20 lg:mt-0 gap-5 px-6 lg:px-0">
        <Header />

        <button className="btn btn-active rounded-full mb-0" onClick={() => router.back()}>
          <ArrowLeft />
          Back
        </button>

        <div className="mt-10" >


            <ProjectsSection />
        </div>
       </section>

    )


}