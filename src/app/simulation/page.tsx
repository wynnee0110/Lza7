"use client";

import 'katex/dist/katex.min.css';
// @ts-expect-error react-katex has no type declarations
import { BlockMath } from 'react-katex';
import { useRouter } from 'next/navigation';
import React from 'react';
import Reactdiff from '../components/Reactdiff';
import Lorenz from '../components/Lorenz';
import Header from '../components/Header';
import { ArrowLeft } from 'lucide-react';

function Page() {
  const router = useRouter();
  return (
    // FIX 2: Added 'overflow-x-hidden' to prevent double horizontal scrollbars from the math block
    <div className="w-full min-h-screen flex flex-col bg-background overflow-x-hidden scrollbar-hide">
      <Header />

      <main className="flex-grow flex flex-col items-center p-6 md:p-20 mt-20 sm:mt-0" >

        <button className="btn btn-active rounded-full mb-10" onClick={() => router.back()}>
          <ArrowLeft />
          Back
        </button>

        <div className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-6">
          Simulations
        </div>

        {/* The single, centered column wrapper for ALL simulations */}
        <div className="flex flex-col items-center w-full max-w-[600px] gap-24">

          {/* =========================================
              1. REACTION-DIFFUSION
          ========================================= */}
          <div className="flex flex-col items-center w-full gap-6">
            <h1 className="font-bold text-2xl w-full">
              1. Reaction-Diffusion
            </h1>

            <p className="text-sm text-muted-foreground leading-relaxed w-full">
              Visualizing the Gray-Scott equations: a mathematical model of complex Turing patterns where diffusion (D<sub>A</sub>, D<sub>B</sub>), feed rate (f), and kill rate (k) determine the structural evolution.
            </p>

            {/* Added max-w-full to prevent math from stretching the parent */}
            <div className="flex flex-col items-center justify-center text-muted-foreground w-full max-w-full mt-2">
              <p className="text-sm mb-4">Governed by the Gray-Scott equations:</p>

              <div className="text-lg overflow-x-auto max-w-full">
                <BlockMath math="\frac{\partial A}{\partial t} = D_A \nabla^2 A - AB^2 + f(1 - A)" />
              </div>
              <div className="text-lg mt-2 overflow-x-auto max-w-full">
                <BlockMath math="\frac{\partial B}{\partial t} = D_B \nabla^2 B + AB^2 - (k + f)B" />
              </div>
            </div>

            {/* Canvas Wrapper */}
            <div className="w-full mt-4">
              <Reactdiff />
            </div>
          </div>

          {/* A subtle divider line between simulations */}
          <hr className="w-24 border-border opacity-50" />

          {/* =========================================
              2. THE LORENZ ATTRACTOR
          ========================================= */}
          <div className="flex flex-col items-center w-full gap-6">
            <h1 className="font-bold text-2xl w-full">
              2. The Lorenz Attractor
            </h1>

            <p className="text-sm text-muted-foreground leading-relaxed w-full">
              A 3D visualization of deterministic chaos. First studied by Edward Lorenz, these linked differential equations show how tiny changes in initial conditions result in drastically different, completely unpredictable outcomes—commonly known as the butterfly effect.
            </p>

            <div className="flex flex-col items-center justify-center text-muted-foreground w-full max-w-full mt-2">
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

            {/* FIX 1: Changed h-[400px] to aspect-square so it perfectly matches the Reactdiff 1:1 box */}
            <div className="w-full aspect-square mt-4 cursor-grab active:cursor-grabbing">
              <Lorenz />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default Page;