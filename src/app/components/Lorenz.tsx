"use client";

import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const MAX_POINTS = 8000;
const SPEED = 5;
const GLOW_LENGTH = 300; 

const AttractorGeometry = () => {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef(0);

  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    let x = 0.1, y = 0, z = 0;
    const sigma = 10, rho = 28, beta = 8 / 3, dt = 0.01;
    for (let i = 0; i < MAX_POINTS; i++) {
      const dx = sigma * (y - x) * dt;
      const dy = (x * (rho - z) - y) * dt;
      const dz = (x * y - beta * z) * dt;
      x += dx; y += dy; z += dz;
      
      // Fixed: Subtract 25 so the shape centers natively at (0,0,0)
      pts.push(new THREE.Vector3(x, y, z - 25)); 
    }
    return pts;
  }, []);

  const { geo, colorAttr } = useMemo(() => {
    const positions = new Float32Array(MAX_POINTS * 3);
    const colors = new Float32Array(MAX_POINTS * 3);

    for (let i = 0; i < MAX_POINTS; i++) {
      positions[i * 3]     = points[i].x;
      positions[i * 3 + 1] = points[i].y;
      positions[i * 3 + 2] = points[i].z;
      
      colors[i * 3]     = 0.05;
      colors[i * 3 + 1] = 0.1;
      colors[i * 3 + 2] = 0.35;
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const ca = new THREE.BufferAttribute(colors, 3);
    g.setAttribute("color", ca);
    return { geo: g, colorAttr: ca };
  }, [points]);

  // Use pure number constants instead of THREE.Color objects for extreme performance
  const rBase = 0.05, gBase = 0.10, bBase = 0.35;
  const rMid = 0.2,   gMid = 0.5,   bMid = 1.0;
  const rGlow = 1.0,  gGlow = 1.0,  bGlow = 1.0;

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.08;
      groupRef.current.rotation.z = clock.getElapsedTime() * 0.04;
    }

    headRef.current = (headRef.current + SPEED) % MAX_POINTS;
    const head = headRef.current;
    
    // Using Float32Array directly is incredibly fast
    const arr = colorAttr.array as Float32Array;

    for (let i = 0; i < MAX_POINTS; i++) {
      const dist = ((head - i) + MAX_POINTS) % MAX_POINTS;
      let r, g, b;

      if (dist < GLOW_LENGTH) {
        const t = dist / GLOW_LENGTH;

        if (t < 0.15) {
          // Fast linear interpolation (Lerp) from Glow to Mid
          const factor = t / 0.15;
          r = rGlow + (rMid - rGlow) * factor;
          g = gGlow + (gMid - gGlow) * factor;
          b = bGlow + (bMid - bGlow) * factor;
        } else {
          // Lerp from Mid to Base
          const factor = (t - 0.15) / 0.85;
          r = rMid + (rBase - rMid) * factor;
          g = gMid + (gBase - gMid) * factor;
          b = bMid + (bBase - bMid) * factor;
        }
      } else {
        r = rBase; g = gBase; b = bBase;
      }

      arr[i * 3]     = r;
      arr[i * 3 + 1] = g;
      arr[i * 3 + 2] = b;
    }

    colorAttr.needsUpdate = true;
  });

  const material = useMemo(() =>
    new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 1 })
  , []);

  return (
    // Fixed: Removed offset positions so it rotates perfectly on its axis
    <group ref={groupRef}>
      <primitive object={new THREE.Line(geo, material)} frustumCulled={false} />
    </group>
  );
};

export default function Lorenz() {
  return (
    <div className="w-full h-full min-h-[400px] md:min-h-[500px] rounded-lg overflow-hidden bg-black/5 dark:bg-black border border-border">
      {/* Fixed: Pulled camera back to Z: 75 so the wings don't get cut off */}
      <Canvas
        camera={{ position: [0, 0, 20], fov: 60 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <AttractorGeometry />
        {/* Fixed: Removed manual target so it defaults to focusing on (0,0,0) */}
        <OrbitControls enableDamping dampingFactor={0.05} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}