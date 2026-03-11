"use client";

import React, { useEffect, useRef } from 'react';

const ReactionDiffusion: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Internal resolution
    const size = 320;
    canvas.width = size;
    canvas.height = size;

    // Using Float32Arrays for massive performance gains
    let gridA = new Float32Array(size * size);
    let gridB = new Float32Array(size * size);
    let nextA = new Float32Array(size * size);
    let nextB = new Float32Array(size * size);

    // Labyrinth Parameters
    const dA = 1.0;
    const dB = 0.5;
    const feed = 0.055;
    const kill = 0.062;

    let animationFrameId: number;

    const init = () => {
      gridA.fill(1);
      gridB.fill(0);

      // Random noise to seed the maze
      for (let i = 0; i < size * size; i++) {
        if (Math.random() < 0.1) {
          gridB[i] = 1;
        }
      }

      // Pre-calculate the maze so it's fully formed on load
      for (let i = 0; i < 1000; i++) {
        update();
      }
    };

    const update = () => {
      for (let y = 1; y < size - 1; y++) {
        for (let x = 1; x < size - 1; x++) {
          const i = x + y * size;

          const a = gridA[i];
          const b = gridB[i];

          // Calculate laplacian directly from the flat array
          const lapA =
            gridA[i] * -1 +
            gridA[i - 1] * 0.2 +
            gridA[i + 1] * 0.2 +
            gridA[i - size] * 0.2 +
            gridA[i + size] * 0.2 +
            gridA[i - size - 1] * 0.05 +
            gridA[i - size + 1] * 0.05 +
            gridA[i + size - 1] * 0.05 +
            gridA[i + size + 1] * 0.05;

          const lapB =
            gridB[i] * -1 +
            gridB[i - 1] * 0.2 +
            gridB[i + 1] * 0.2 +
            gridB[i - size] * 0.2 +
            gridB[i + size] * 0.2 +
            gridB[i - size - 1] * 0.05 +
            gridB[i - size + 1] * 0.05 +
            gridB[i + size - 1] * 0.05 +
            gridB[i + size + 1] * 0.05;

          // Gray-Scott formulas
          const abb = a * b * b;
          nextA[i] = Math.min(Math.max(a + (dA * lapA - abb + feed * (1 - a)), 0), 1);
          nextB[i] = Math.min(Math.max(b + (dB * lapB + abb - (kill + feed) * b), 0), 1);
        }
      }

      // Swap arrays
      const tempA = gridA;
      gridA = nextA;
      nextA = tempA;
      const tempB = gridB;
      gridB = nextB;
      nextB = tempB;
    };

    const draw = () => {
      const imageData = ctx.createImageData(size, size);
      const data = imageData.data;

      for (let i = 0; i < size * size; i++) {
        const v = gridA[i] - gridB[i];

        // Smoothstep interpolation
        const edge0 = 0.2;
        const edge1 = 0.3;
        const t = Math.max(0, Math.min(1, (v - edge0) / (edge1 - edge0)));
        const smoothT = t * t * (3 - 2 * t);

        const color = Math.floor(smoothT * 255);

        const pixelIndex = i * 4;
        data[pixelIndex] = color; // R
        data[pixelIndex + 1] = color; // G
        data[pixelIndex + 2] = color; // B
        data[pixelIndex + 3] = 255; // A
      }

      ctx.putImageData(imageData, 0, 0);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      const mouseX = Math.floor((e.clientX - rect.left) * scaleX);
      const mouseY = Math.floor((e.clientY - rect.top) * scaleY);

      const radius = 8;

      for (let y = -radius; y <= radius; y++) {
        for (let x = -radius; x <= radius; x++) {
          if (x * x + y * y <= radius * radius) {
            const cx = mouseX + x;
            const cy = mouseY + y;

            if (cx >= 1 && cx < size - 1 && cy >= 1 && cy < size - 1) {
              const index = cx + cy * size;
              gridB[index] = 1;
            }
          }
        }
      }
    };

    const animate = () => {
      for (let i = 0; i < 12; i++) {
        update();
      }
      draw();
      animationFrameId = requestAnimationFrame(animate);
    };

    // Attach event listener
    canvas.addEventListener('mousemove', handleMouseMove);

    // Boot up
    init();
    animate();

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); // Empty dependency array ensures this runs only once on mount

return (
    <div className="flex justify-center items-center w-full h-full bg-transparent overflow-hidden m-0">
      <canvas
        ref={canvasRef}
        // Swapped the raw CSS for Tailwind arbitrary values: blur-[2px] contrast-[500%]
        className="blur-[2px] contrast-[500%] w-full max-w-[350px] aspect-square rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.04)] dark:invert"
      />
    </div>
  );
};

export default ReactionDiffusion;