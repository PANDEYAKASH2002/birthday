"use client";

import { useEffect, useRef, useCallback } from "react";
import confetti from "canvas-confetti";

interface ConfettiEffectProps {
  active: boolean;
}

// Pink-themed confetti palette
const COLORS = [
  "#ff85b3",
  "#e75480",
  "#ffc8dc",
  "#ffaacb",
  "#ffffff",
  "#ffd6e7",
  "#f9a8c9",
  "#c97fa0",
];

export default function ConfettiEffect({ active }: ConfettiEffectProps) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const frameRef = useRef<number | null>(null);
  const fireRef = useRef<((opts?: confetti.Options) => void) | null>(null);

  const stop = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    intervalRef.current = null;
    frameRef.current = null;
  }, []);

  useEffect(() => {
    if (!active) {
      stop();
      return;
    }

    // Create a confetti function bound to our canvas
    const canvas = document.getElementById("confetti-canvas") as HTMLCanvasElement | null;
    const fire = canvas
      ? confetti.create(canvas, { resize: true, useWorker: false })
      : confetti;

    fireRef.current = fire;

    const defaults: confetti.Options = {
      colors: COLORS,
      ticks: 200,
      gravity: 0.6,
      scalar: 1.1,
    };

    // Initial big burst
    const initialBurst = () => {
      fire({
        ...defaults,
        particleCount: 80,
        spread: 70,
        origin: { x: 0.5, y: 0.45 },
        startVelocity: 45,
      });
      // Side cannons
      setTimeout(() => {
        fire({
          ...defaults,
          particleCount: 40,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          startVelocity: 40,
        });
        fire({
          ...defaults,
          particleCount: 40,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          startVelocity: 40,
        });
      }, 200);
    };

    initialBurst();

    // Continuous random pops
    const continuousPop = () => {
      const rand = Math.random();

      if (rand < 0.4) {
        // Gentle rain from top
        fire({
          ...defaults,
          particleCount: 8,
          spread: 40,
          origin: { x: Math.random(), y: 0 },
          startVelocity: 25,
          gravity: 0.5,
        });
      } else if (rand < 0.65) {
        // Side burst
        const fromLeft = Math.random() < 0.5;
        fire({
          ...defaults,
          particleCount: 12,
          angle: fromLeft ? 60 : 120,
          spread: 45,
          origin: { x: fromLeft ? 0 : 1, y: Math.random() * 0.5 + 0.3 },
          startVelocity: 35,
        });
      } else if (rand < 0.85) {
        // Center burst
        fire({
          ...defaults,
          particleCount: 20,
          spread: 90,
          origin: { x: 0.5, y: 0.5 },
          startVelocity: 30,
          gravity: 0.4,
        });
      } else {
        // Heart shapes (using emoji shapes)
        fire({
          ...defaults,
          particleCount: 6,
          spread: 50,
          origin: { x: Math.random() * 0.8 + 0.1, y: Math.random() * 0.4 + 0.1 },
          shapes: ["circle"],
          scalar: 1.4,
          startVelocity: 20,
          colors: ["#ff85b3", "#e75480", "#ffd6e7"],
        });
      }
    };

    intervalRef.current = setInterval(continuousPop, 600);

    // Occasional center mega burst every ~8 seconds
    const megaInterval = setInterval(() => {
      fire({
        ...defaults,
        particleCount: 100,
        spread: 120,
        origin: { x: 0.5, y: 0.4 },
        startVelocity: 50,
        gravity: 0.55,
      });
    }, 8000);

    return () => {
      stop();
      clearInterval(megaInterval);
    };
  }, [active, stop]);

  return (
    <canvas
      id="confetti-canvas"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 100,
      }}
      aria-hidden="true"
    />
  );
}
