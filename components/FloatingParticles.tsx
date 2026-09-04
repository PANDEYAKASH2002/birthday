"use client";

import { useRef, useMemo } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: "circle" | "heart" | "sparkle" | "blob";
  color: string;
  tx: number; // translateX magnitude
  ty: number; // translateY magnitude
}

const COLORS = [
  "rgba(255,182,193,0.55)",
  "rgba(233,84,128,0.38)",
  "rgba(249,168,201,0.48)",
  "rgba(255,192,203,0.42)",
  "rgba(255,133,179,0.32)",
  "rgba(255,255,255,0.45)",
];

function HeartSVG({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
    </svg>
  );
}

function SparkleSVG({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
    </svg>
  );
}

/* Pure-CSS floating keyframes injected once */
const CSS_KEYFRAMES = `
@keyframes css-float-a {
  0%,100%{transform:translate(0,0) rotate(0deg)}
  25%{transform:translate(12px,-28px) rotate(5deg)}
  50%{transform:translate(-8px,-18px) rotate(-3deg)}
  75%{transform:translate(6px,-32px) rotate(4deg)}
}
@keyframes css-float-b {
  0%,100%{transform:translate(0,0) rotate(0deg)}
  33%{transform:translate(-14px,-22px) rotate(-5deg)}
  66%{transform:translate(10px,-30px) rotate(3deg)}
}
@keyframes css-float-c {
  0%,100%{transform:translate(0,0) scale(1)}
  40%{transform:translate(8px,-24px) scale(1.1)}
  80%{transform:translate(-6px,-16px) scale(0.95)}
}
@keyframes css-blob-float {
  0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%;transform:translate(0,0)}
  50%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%;transform:translate(6px,-20px)}
}
`;

const KF = ["css-float-a", "css-float-b", "css-float-c"];

export default function FloatingParticles() {
  const injectedRef = useRef(false);

  // Inject keyframes into <head> once
  if (typeof document !== "undefined" && !injectedRef.current) {
    injectedRef.current = true;
    const style = document.createElement("style");
    style.textContent = CSS_KEYFRAMES;
    document.head.appendChild(style);
  }

  // Generate particles only once (stable across renders)
  const particles = useMemo<Particle[]>(() => {
    // Use seeded-ish values so SSR and client match
    const types: Particle["type"][] = ["circle", "heart", "sparkle", "blob", "circle", "circle"];
    return Array.from({ length: 22 }, (_, i) => {
      const seed = (i * 137.508) % 1; // golden-ratio pseudo-random
      const seed2 = (i * 97.31 + 0.42) % 1;
      const seed3 = (i * 61.18 + 0.77) % 1;
      return {
        id: i,
        x: seed * 95 + 2,
        y: seed2 * 90 + 2,
        size: seed3 * 16 + 7,
        duration: seed * 8 + 7,
        delay: -(seed2 * 12),
        type: types[i % types.length],
        color: COLORS[i % COLORS.length],
        tx: (seed3 - 0.5) * 30,
        ty: seed * 30 + 10,
      };
    });
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Background blobs — CSS only, no Framer Motion */}
      <div
        className="absolute animate-blob"
        style={{
          width: 560,
          height: 560,
          top: -100,
          left: -130,
          background: "radial-gradient(circle, rgba(255,182,193,0.32) 0%, transparent 70%)",
          filter: "blur(55px)",
          willChange: "transform, border-radius",
        }}
      />
      <div
        className="absolute animate-blob"
        style={{
          width: 460,
          height: 460,
          bottom: -80,
          right: -90,
          background: "radial-gradient(circle, rgba(233,84,128,0.22) 0%, transparent 70%)",
          filter: "blur(55px)",
          animationDelay: "-4s",
          animationDuration: "14s",
          willChange: "transform, border-radius",
        }}
      />
      <div
        className="absolute animate-blob"
        style={{
          width: 360,
          height: 360,
          top: "45%",
          left: "38%",
          background: "radial-gradient(circle, rgba(249,168,201,0.18) 0%, transparent 70%)",
          filter: "blur(48px)",
          animationDelay: "-8s",
          animationDuration: "10s",
          willChange: "transform, border-radius",
        }}
      />

      {/* Particles — pure CSS animations (compositor thread, no JS) */}
      {particles.map((p) => {
        const kf = p.type === "blob" ? "css-blob-float" : KF[p.id % KF.length];
        const style: React.CSSProperties = {
          position: "absolute",
          left: `${p.x}%`,
          top: `${p.y}%`,
          animation: `${kf} ${p.duration}s ease-in-out ${p.delay}s infinite`,
          willChange: "transform",
          opacity: 0.75,
        };

        if (p.type === "heart") return <div key={p.id} style={style}><HeartSVG color={p.color} size={p.size} /></div>;
        if (p.type === "sparkle") return <div key={p.id} style={style}><SparkleSVG color={p.color} size={p.size} /></div>;

        return (
          <div
            key={p.id}
            style={{
              ...style,
              width: p.size,
              height: p.size,
              borderRadius: p.type === "blob" ? "60% 40% 30% 70% / 60% 30% 70% 40%" : "50%",
              background: p.color,
              border: "1px solid rgba(255,182,193,0.25)",
            }}
          />
        );
      })}
    </div>
  );
}
