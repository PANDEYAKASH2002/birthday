"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingParticles from "./FloatingParticles";

interface LandingPageProps {
  onReveal: () => void;
}

export default function LandingPage({ onReveal }: LandingPageProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  /* Magnetic hover effect */
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const btn = buttonRef.current;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.18;
      const dy = (e.clientY - cy) * 0.18;
      setMousePos({ x: dx, y: dy });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setMousePos({ x: 0, y: 0 });
  }, []);

  const handleClick = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => onReveal(), 900);
  }, [onReveal]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="landing"
          className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #fff5f8 0%, #ffe4ee 35%, #fff0f5 65%, #ffeef4 100%)",
          }}
          exit={{
            opacity: 0,
            scale: 1.08,
            filter: "blur(12px)",
          }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
        >
          <FloatingParticles />

          {/* Main content */}
          <div
            className="relative z-10 flex flex-col items-center text-center px-6"
            style={{ maxWidth: 680 }}
          >
            {/* Greeting */}
            <motion.p
              className="font-display text-xl md:text-2xl mb-4"
              style={{
                color: "rgba(45,32,32,0.55)",
                fontStyle: "italic",
                letterSpacing: "0.05em",
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            >
              a little something for you...
            </motion.p>

            {/* Main headline */}
            <motion.h1
              className="font-display gradient-text mb-3 leading-tight"
              style={{
                fontSize: "clamp(3rem, 10vw, 7rem)",
                fontWeight: 700,
                lineHeight: 1.1,
              }}
              initial={{ opacity: 0, scale: 0.85, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
            >
              Hey Kashish...
            </motion.h1>

            {/* Heart */}
            <motion.span
              style={{ fontSize: "2.8rem", display: "block", marginBottom: "1.2rem" }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.1, ease: [0.34, 1.56, 0.64, 1] }}
            >
              💗
            </motion.span>

            {/* Subtitle */}
            <motion.p
              className="font-body mb-14"
              style={{
                fontSize: "clamp(1.1rem, 3vw, 1.55rem)",
                color: "rgba(45,32,32,0.65)",
                letterSpacing: "0.02em",
                fontWeight: 400,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
            >
              I have a little surprise for you...
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.6, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <motion.button
                ref={buttonRef}
                id="surprise-btn"
                onClick={handleClick}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="glass-strong animate-pulse-glow relative overflow-hidden cursor-pointer select-none"
                style={{
                  padding: "18px 52px",
                  borderRadius: "100px",
                  border: "1.5px solid rgba(255,133,179,0.6)",
                  fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
                  fontFamily: "var(--font-inter)",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  color: "#e75480",
                  background: "rgba(255,255,255,0.35)",
                  x: mousePos.x,
                  y: mousePos.y,
                } as React.CSSProperties}
                animate={{
                  x: mousePos.x,
                  y: mousePos.y,
                }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.97 }}
                aria-label="Click to see birthday surprise"
              >
                {/* Shimmer overlay */}
                <motion.div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background: "linear-gradient(105deg, transparent 40%, rgba(255,182,193,0.4) 50%, transparent 60%)",
                    backgroundSize: "200% 100%",
                  }}
                  animate={{ backgroundPosition: ["-200% center", "200% center"] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                />

                <span className="relative z-10">✨ CLICK FOR SURPRISE ✨</span>
              </motion.button>
            </motion.div>

            {/* Hint below button */}
            <motion.p
              className="mt-6 text-sm"
              style={{ color: "rgba(233,84,128,0.5)", fontStyle: "italic" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 1 }}
            >
              tap to begin your birthday experience 🌸
            </motion.p>
          </div>
        </motion.div>
      )}

      {/* Exit overlay bloom */}
      {isExiting && (
        <motion.div
          key="bloom"
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(255,240,245,0)" }}
          animate={{ background: "rgba(255,240,245,1)" }}
          transition={{ duration: 0.9 }}
        />
      )}
    </AnimatePresence>
  );
}
