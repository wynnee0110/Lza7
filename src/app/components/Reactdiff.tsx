"use client";

import React, { useEffect, useRef } from "react";

const SIZE = 320;
const dA = 1.0;
const dB = 0.5;
const feed = 0.055;
const kill = 0.062;

const ReactionDiffusion: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", {
      willReadFrequently: true,
    });

    if (!ctx) return;

    canvas.width = SIZE;
    canvas.height = SIZE;

    let gridA = new Float32Array(SIZE * SIZE);
    let gridB = new Float32Array(SIZE * SIZE);
    let nextA = new Float32Array(SIZE * SIZE);
    let nextB = new Float32Array(SIZE * SIZE);

    let animationFrameId = 0;
    let isVisible = true;
    let lastMouseTime = 0;

    /* -----------------------
       Reuse image buffer
    ------------------------ */
    const imageData = ctx.createImageData(SIZE, SIZE);
    const pixels = imageData.data;

    const init = () => {
      gridA.fill(1);
      gridB.fill(0);

      for (let i = 0; i < SIZE * SIZE; i++) {
        if (Math.random() < 0.1) {
          gridB[i] = 1;
        }
      }

      // Precompute stable state
      for (let i = 0; i < 500; i++) {
        update();
      }
    };

    const update = () => {
      for (let y = 1; y < SIZE - 1; y++) {
        for (let x = 1; x < SIZE - 1; x++) {
          const i = x + y * SIZE;

          const a = gridA[i];
          const b = gridB[i];

          const lapA =
            -a +
            gridA[i - 1] * 0.2 +
            gridA[i + 1] * 0.2 +
            gridA[i - SIZE] * 0.2 +
            gridA[i + SIZE] * 0.2 +
            gridA[i - SIZE - 1] * 0.05 +
            gridA[i - SIZE + 1] * 0.05 +
            gridA[i + SIZE - 1] * 0.05 +
            gridA[i + SIZE + 1] * 0.05;

          const lapB =
            -b +
            gridB[i - 1] * 0.2 +
            gridB[i + 1] * 0.2 +
            gridB[i - SIZE] * 0.2 +
            gridB[i + SIZE] * 0.2 +
            gridB[i - SIZE - 1] * 0.05 +
            gridB[i - SIZE + 1] * 0.05 +
            gridB[i + SIZE - 1] * 0.05 +
            gridB[i + SIZE + 1] * 0.05;

          const abb = a * b * b;

          nextA[i] = Math.min(
            Math.max(a + (dA * lapA - abb + feed * (1 - a)), 0),
            1
          );

          nextB[i] = Math.min(
            Math.max(b + (dB * lapB + abb - (kill + feed) * b), 0),
            1
          );
        }
      }

      [gridA, nextA] = [nextA, gridA];
      [gridB, nextB] = [nextB, gridB];
    };

    const draw = () => {
      for (let i = 0; i < SIZE * SIZE; i++) {
        const v = gridA[i] - gridB[i];

        const t = Math.max(
          0,
          Math.min(1, (v - 0.2) / (0.3 - 0.2))
        );

        const smoothT = t * t * (3 - 2 * t);
        const color = smoothT * 255;

        const p = i * 4;
        pixels[p] = color;
        pixels[p + 1] = color;
        pixels[p + 2] = color;
        pixels[p + 3] = 255;
      }

      ctx.putImageData(imageData, 0, 0);
    };

    /* -----------------------
       Throttled mouse interaction
    ------------------------ */
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();

      if (now - lastMouseTime < 16) return; // ~60fps throttle
      lastMouseTime = now;

      const rect = canvas.getBoundingClientRect();

      const x = Math.floor(
        ((e.clientX - rect.left) / rect.width) * SIZE
      );

      const y = Math.floor(
        ((e.clientY - rect.top) / rect.height) * SIZE
      );

      const radius = 8;

      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          if (dx * dx + dy * dy <= radius * radius) {
            const cx = x + dx;
            const cy = y + dy;

            if (
              cx > 0 &&
              cx < SIZE - 1 &&
              cy > 0 &&
              cy < SIZE - 1
            ) {
              gridB[cx + cy * SIZE] = 1;
            }
          }
        }
      }
    };

    /* -----------------------
       Pause when offscreen
    ------------------------ */
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );

    observer.observe(container);

    /* -----------------------
       Pause when tab hidden
    ------------------------ */
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    /* -----------------------
       Animation loop
    ------------------------ */
    let lastTime = 0;

    const animate = (time: number) => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      if (time - lastTime > 16) {
        for (let i = 0; i < 6; i++) {
          update();
        }

        draw();
        lastTime = time;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    init();
    animate(0);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );

      canvas.removeEventListener(
        "mousemove",
        handleMouseMove
      );
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex justify-center items-center w-full h-full bg-transparent overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="w-full max-w-[350px] aspect-square rounded-lg 
        blur-[2px] contrast-[500%]
        shadow-[0_10px_30px_rgba(0,0,0,0.04)]
        dark:invert"
      />
    </div>
  );
};

export default React.memo(ReactionDiffusion);