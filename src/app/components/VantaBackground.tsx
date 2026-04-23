"use client";

import { useEffect, useRef, ReactNode } from "react";

interface VantaBackgroundProps {
  children: ReactNode;
}

export default function VantaBackground({ children }: VantaBackgroundProps) {
  const vantaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let effect: any;

    const initVanta = async () => {
      const THREE = await import("three");
      const FOG = (await import("vanta/dist/vanta.fog.min")).default;

      if (vantaRef.current) {
        effect = FOG({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          highlightColor: 0x000000,
          midtoneColor: 0x000000,
          lowlightColor: 0x090909,
          baseColor: 0x222222,
          blurFactor: 0.42,
          speed: 0.0,
          zoom: 1.2,
        });
      }
    };

    initVanta();

    return () => {
      if (effect) effect.destroy();
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      className="min-h-screen w-full bg-transparent"
    >
      {children}
    </div>
  );
}
