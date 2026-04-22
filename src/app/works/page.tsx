"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ProjectsSection from "../components/ProjectsSection";
import { useRouter } from "next/navigation";
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function WorksPage() {
    const router = useRouter();

    return (
        <main className="overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] min-h-[100svh] bg-gray-50 dark:bg-[#0a0a0a] text-gray-800 dark:text-gray-300 pb-10 transition-colors duration-300">
            <Header />

            <div style={{ zoom: 0.9 }}>
                <section className="pt-25 max-w-5xl mx-auto px-4 lg:px-0">
                    <div className="flex flex-col bg-white dark:bg-[#161618] border border-gray-200 dark:border-[#2d2d2d] rounded-md overflow-hidden shadow-xl dark:shadow-2xl transition-colors duration-300">

                        {/* Post Meta Header */}
                        <div className="bg-gray-100 dark:bg-[#1a1a1c] px-4 py-2 text-xs text-gray-500 dark:text-gray-500 border-b border-gray-200 dark:border-[#2d2d2d] flex justify-between items-center transition-colors duration-300">
                            <span>Works — selected projects & builds</span>
                            <span className="font-bold text-gray-600 dark:text-gray-400">#works</span>
                        </div>

                        {/* Page Body */}
                        <div className="p-6 md:p-8">

                            {/* Back button */}
                            <Link
                                href="/"
                                className="flex items-center gap-2 text-sm text-pink-600 dark:text-pink-500 hover:text-pink-500 dark:hover:text-pink-400 transition-colors mb-6 font-medium"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back
                            </Link>

                            <ProjectsSection />
                        </div>

                    </div>
                </section>

                <Footer />
            </div>
        </main>
    );
}