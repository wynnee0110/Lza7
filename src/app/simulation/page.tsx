"use client";

import 'katex/dist/katex.min.css';
// @ts-expect-error react-katex has no type declarations
import { BlockMath } from 'react-katex';
import Link from 'next/link';
import React from 'react';
import Reactdiff from '../components/Reactdiff';
import Lorenz from '../components/Lorenz';
import Header from '../components/Header';
import { ArrowLeft } from 'lucide-react';

function Page() {
  return (
    <main className="overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] min-h-[100svh] bg-gray-50 dark:bg-[#0a0a0a] text-gray-800 dark:text-gray-300 pb-10 transition-colors duration-300">
      <Header />

      <div style={{ zoom: 0.9 }}>
        <section className="pt-25 max-w-5xl mx-auto px-4 lg:px-0">
          <div className="flex flex-col bg-white dark:bg-[#161618] border border-gray-200 dark:border-[#2d2d2d] rounded-md overflow-hidden shadow-xl dark:shadow-2xl transition-colors duration-300">

            {/* Post Meta Header */}
            <div className="bg-gray-100 dark:bg-[#1a1a1c] px-4 py-2 text-xs text-gray-500 dark:text-gray-500 border-b border-gray-200 dark:border-[#2d2d2d] flex justify-between items-center transition-colors duration-300">
              <span>Simulations — interactive mathematical models</span>
              <span className="font-bold text-gray-600 dark:text-gray-400">#sim</span>
            </div>

            {/* Page Body */}
            <div className="p-6 md:p-8">

              {/* Back button */}
              <Link
                href="/"
                className="inline-flex flex-row items-center gap-2 text-sm text-pink-600 dark:text-pink-500 hover:text-pink-500 dark:hover:text-pink-400 transition-colors mb-6 font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Link>

              <div className="text-sm font-medium tracking-widest uppercase text-gray-400 dark:text-gray-500 mb-8">
                Simulations
              </div>

              {/* Single centered column for ALL simulations */}
              <div className="flex flex-col items-center w-full max-w-[600px] mx-auto gap-24">

                {/* =========================================
                    1. REACTION-DIFFUSION
                ========================================= */}
                <div className="flex flex-col items-center w-full gap-6">
                  <h1 className="font-bold text-2xl w-full text-gray-900 dark:text-gray-100">
                    1. Reaction-Diffusion
                  </h1>

                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed w-full">
                    Visualizing the Gray-Scott equations: a mathematical model of complex Turing patterns where diffusion (D<sub>A</sub>, D<sub>B</sub>), feed rate (f), and kill rate (k) determine the structural evolution.
                  </p>

                  <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 w-full max-w-full mt-2">
                    <p className="text-sm mb-4">Governed by the Gray-Scott equations:</p>
                    <div className="text-lg overflow-x-auto max-w-full">
                      <BlockMath math="\frac{\partial A}{\partial t} = D_A \nabla^2 A - AB^2 + f(1 - A)" />
                    </div>
                    <div className="text-lg mt-2 overflow-x-auto max-w-full">
                      <BlockMath math="\frac{\partial B}{\partial t} = D_B \nabla^2 B + AB^2 - (k + f)B" />
                    </div>
                  </div>

                  <div className="w-full mt-4">
                    <Reactdiff />
                  </div>
                </div>

                {/* Divider */}
                <hr className="w-24 border-gray-300 dark:border-[#333] opacity-50" />

                {/* =========================================
                    2. THE LORENZ ATTRACTOR
                ========================================= */}
                <div className="flex flex-col items-center w-full gap-6">
                  <h1 className="font-bold text-2xl w-full text-gray-900 dark:text-gray-100">
                    2. The Lorenz Attractor
                  </h1>

                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed w-full">
                    A 3D visualization of deterministic chaos. First studied by Edward Lorenz, these linked differential equations show how tiny changes in initial conditions result in drastically different, completely unpredictable outcomes—commonly known as the butterfly effect.
                  </p>

                  <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 w-full max-w-full mt-2">
                    <p className="text-sm mb-4">Governed by the Lorenz equations:</p>
                    <div className="text-lg overflow-x-auto max-w-full">
                      <BlockMath math="\frac{dx}{dt} = \sigma(y - x)" />
                    </div>
                    <div className="text-lg mt-2 overflow-x-auto max-w-full">
                      <BlockMath math="\frac{dy}{dt} = x(\rho - z) - y" />
                    </div>
                    <div className="text-lg mt-2 overflow-x-auto max-w-full">
                      <BlockMath math="\frac{dz}{dt} = xy - \beta z" />
                    </div>
                  </div>

                  <div className="w-full aspect-square mt-4 cursor-grab active:cursor-grabbing">
                    <Lorenz />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Page;