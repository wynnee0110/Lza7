"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';

// Network architecture: 3 → 4 → 4 → 2
const LAYERS = [3, 4, 4, 2];
const LAYER_LABELS = ['Input', 'Hidden 1', 'Hidden 2', 'Output'];

function sigmoid(x: number) { return 1 / (1 + Math.exp(-x)); }
function relu(x: number) { return Math.max(0, x); }

function randomWeights(inSize: number, outSize: number): number[][] {
  return Array.from({ length: outSize }, () =>
    Array.from({ length: inSize }, () => (Math.random() * 2 - 1))
  );
}

function randomBiases(size: number): number[] {
  return Array.from({ length: size }, () => (Math.random() * 2 - 1) * 0.5);
}

type Network = {
  weights: number[][][];  // [layer][outNode][inNode]
  biases: number[][];     // [layer][node]
  activations: number[][]; // [layer][node]
};

function forwardPass(net: Network, inputs: number[]): number[][] {
  const activations: number[][] = [inputs];
  for (let l = 0; l < net.weights.length; l++) {
    const layerOut: number[] = [];
    for (let j = 0; j < net.weights[l].length; j++) {
      let sum = net.biases[l][j];
      for (let i = 0; i < net.weights[l][j].length; i++) {
        sum += net.weights[l][j][i] * activations[l][i];
      }
      layerOut.push(l < net.weights.length - 1 ? relu(sum) : sigmoid(sum));
    }
    activations.push(layerOut);
  }
  return activations;
}

function initNetwork(): Network {
  const weights: number[][][] = [];
  const biases: number[][] = [];
  for (let l = 0; l < LAYERS.length - 1; l++) {
    weights.push(randomWeights(LAYERS[l], LAYERS[l + 1]));
    biases.push(randomBiases(LAYERS[l + 1]));
  }
  const activations = LAYERS.map(size => Array(size).fill(0));
  return { weights, biases, activations };
}

function lerpColor(a: string, b: string, t: number): string {
  // a and b are hex colors like #ff0000
  const parse = (hex: string) => [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
  const ca = parse(a), cb = parse(b);
  const r = Math.round(ca[0] + (cb[0] - ca[0]) * t);
  const g = Math.round(ca[1] + (cb[1] - ca[1]) * t);
  const bl = Math.round(ca[2] + (cb[2] - ca[2]) * t);
  return `rgb(${r},${g},${bl})`;
}

type NeuralNetworkProps = {
  isActive?: boolean;
};

export default function NeuralNetwork({ isActive = true }: NeuralNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const netRef = useRef<Network>(initNetwork());
  const activationsRef = useRef<number[][]>(LAYERS.map(s => Array(s).fill(0)));
  const animRef = useRef<number>(0);
  const phaseRef = useRef(0);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains('dark'));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const dark = isDark;
    const bg = dark ? '#0f0f11' : '#f9f9fb';
    const edgePos = dark ? '#ec4899' : '#db2777';
    const edgeNeg = dark ? '#38bdf8' : '#0284c7';
    const nodeBg = dark ? '#1e1e22' : '#ffffff';
    const nodeBorder = dark ? '#3d3d44' : '#d1d5db';
    const textColor = dark ? '#9ca3af' : '#6b7280';

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    const net = netRef.current;
    const activations = activationsRef.current;

    // Compute node positions
    const xPositions = LAYERS.map((_, l) => (W / (LAYERS.length + 1)) * (l + 1));
    const nodePositions: { x: number; y: number }[][] = LAYERS.map((size, l) => {
      const spacing = H / (size + 1);
      return Array.from({ length: size }, (_, i) => ({
        x: xPositions[l],
        y: spacing * (i + 1),
      }));
    });

    const R = Math.min(16, H / (Math.max(...LAYERS) + 1) * 0.4);

    // Draw edges
    for (let l = 0; l < LAYERS.length - 1; l++) {
      for (let j = 0; j < LAYERS[l + 1]; j++) {
        for (let i = 0; i < LAYERS[l]; i++) {
          const w = net.weights[l][j][i];
          const srcAct = activations[l][i];
          const alpha = Math.min(Math.abs(w) * 0.6 + 0.1, 0.7);
          const color = w > 0 ? edgePos : edgeNeg;
          ctx.beginPath();
          ctx.moveTo(nodePositions[l][i].x, nodePositions[l][i].y);
          ctx.lineTo(nodePositions[l + 1][j].x, nodePositions[l + 1][j].y);
          ctx.strokeStyle = color;
          ctx.globalAlpha = alpha * (0.4 + srcAct * 0.6);
          ctx.lineWidth = Math.abs(w) * 1.5 + 0.3;
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;

    // Draw nodes
    for (let l = 0; l < LAYERS.length; l++) {
      for (let i = 0; i < LAYERS[l]; i++) {
        const { x, y } = nodePositions[l][i];
        const act = activations[l][i];

        // Glow
        if (act > 0.1) {
          const grd = ctx.createRadialGradient(x, y, 0, x, y, R * 2.5);
          grd.addColorStop(0, `rgba(236,72,153,${act * 0.3})`);
          grd.addColorStop(1, 'rgba(236,72,153,0)');
          ctx.beginPath();
          ctx.arc(x, y, R * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(x, y, R, 0, Math.PI * 2);
        ctx.fillStyle = nodeBg;
        ctx.fill();
        ctx.strokeStyle = act > 0.3
          ? lerpColor(nodeBorder, '#ec4899', Math.min(act, 1))
          : nodeBorder;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Fill based on activation
        if (act > 0.01) {
          ctx.beginPath();
          ctx.arc(x, y, R * 0.75, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(236,72,153,${act * 0.85})`;
          ctx.fill();
        }

        // Value text
        ctx.fillStyle = textColor;
        ctx.font = `bold ${Math.max(8, R * 0.6)}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(act.toFixed(1), x, y);
      }
    }

    // Layer labels
    ctx.fillStyle = textColor;
    ctx.font = `${Math.max(9, R * 0.55)}px monospace`;
    ctx.textAlign = 'center';
    LAYERS.forEach((_, l) => {
      ctx.fillText(LAYER_LABELS[l], xPositions[l], H - 8);
    });
  }, [isDark]);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.parentElement?.getBoundingClientRect();
    if (!rect) return;

    const width = Math.floor(rect.width);
    const height = Math.floor(rect.height);
    if (width <= 1 || height <= 1) return;

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
  }, []);

  useEffect(() => {
    const animate = () => {
      phaseRef.current += 0.018;
      const t = phaseRef.current;
      // Smoothly varying inputs
      const inputs = [
        (Math.sin(t * 1.1) + 1) / 2,
        (Math.sin(t * 0.7 + 1.2) + 1) / 2,
        (Math.cos(t * 0.9 + 0.5) + 1) / 2,
      ];
      activationsRef.current = forwardPass(netRef.current, inputs);
      draw();
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [draw]);

  // Keep canvas sized correctly even when parent visibility/layout changes.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    const resize = () => {
      resizeCanvas();
      draw();
    };

    resize();
    window.addEventListener('resize', resize);

    const observer = parent ? new ResizeObserver(resize) : null;
    if (parent && observer) observer.observe(parent);

    return () => {
      window.removeEventListener('resize', resize);
      observer?.disconnect();
    };
  }, [draw, resizeCanvas]);

  useEffect(() => {
    if (!isActive) return;
    const raf = requestAnimationFrame(() => {
      resizeCanvas();
      draw();
    });
    return () => cancelAnimationFrame(raf);
  }, [isActive, draw, resizeCanvas]);

  const handleRandomize = () => {
    netRef.current = initNetwork();
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="w-full h-64 rounded-md overflow-hidden bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-[#2a2a2e]">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
        <span className="flex items-center gap-1.5"><span className="w-3 h-[2px] bg-pink-500 inline-block" /> Positive weight</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-[2px] bg-sky-500 inline-block" /> Negative weight</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-pink-400 inline-block opacity-70" /> Activation</span>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleRandomize}
          className="px-4 py-1.5 text-sm rounded-md bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-400 text-white dark:text-black font-medium transition-colors"
        >
          Randomize Weights
        </button>
      </div>
    </div>
  );
}
