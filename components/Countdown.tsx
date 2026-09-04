"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CountdownProps {
  onComplete: () => void;
}

type Phase = "idle" | "3" | "2" | "1" | "blow";

const COUNT_DELAY_MS = 1000;

export default function Countdown({ onComplete }: CountdownProps) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (started) return;
    setStarted(true);

    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase("3"), 600));
    timers.push(setTimeout(() => setPhase("2"), 600 + COUNT_DELAY_MS));
    timers.push(setTimeout(() => setPhase("1"), 600 + COUNT_DELAY_MS * 2));
    timers.push(setTimeout(() => setPhase("blow"), 600 + COUNT_DELAY_MS * 3));
    timers.push(
      setTimeout(() => {
        onComplete();
      }, 600 + COUNT_DELAY_MS * 3 + 1600)
    );

    return () => timers.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isNumber = phase === "3" || phase === "2" || phase === "1";

  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ minHeight: 120 }}
      aria-live="polite"
    >
      <AnimatePresence mode="wait">
        {phase === "idle" && (
          <motion.p
            key="make-wish"
            className="font-display text-center"
            style={{
              fontSize: "clamp(1.1rem, 3vw, 1.5rem)",
              color: "rgba(45,32,32,0.7)",
              fontStyle: "italic",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            Make a wish... ✨
          </motion.p>
        )}

        {isNumber && (
          <motion.div
            key={phase}
            className="font-display gradient-text"
            style={{
              fontSize: "clamp(5rem, 18vw, 9rem)",
              fontWeight: 800,
              lineHeight: 1,
            }}
            initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 1.5, rotate: 15 }}
            transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
          >
            {phase}
          </motion.div>
        )}

        {phase === "blow" && (
          <motion.div
            key="blow"
            className="text-center"
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <motion.p
              className="font-display gradient-text"
              style={{
                fontSize: "clamp(1.5rem, 5vw, 2.6rem)",
                fontWeight: 700,
                lineHeight: 1.2,
              }}
              animate={{
                scale: [1, 1.04, 1],
              }}
              transition={{ duration: 0.6, repeat: 3, ease: "easeInOut" }}
            >
              BLOW THE CANDLE! 🕯️💨
            </motion.p>
            <motion.p
              className="mt-2 font-body"
              style={{
                fontSize: "0.95rem",
                color: "rgba(45,32,32,0.55)",
                fontStyle: "italic",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              (stand by... it&apos;s happening!)
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
