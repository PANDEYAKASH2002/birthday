"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Pause, Play } from "lucide-react";

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggle = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/music/birthday.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = 0.45;
    }
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        /* Autoplay blocked — user interaction required */
      });
    }
    setPlaying((p) => !p);
  }, [playing]);

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <motion.button
        onClick={() => { setExpanded((e) => !e); }}
        className="glass-strong rounded-full flex items-center gap-2 cursor-pointer select-none overflow-hidden"
        style={{
          padding: expanded ? "10px 18px" : "12px",
          border: "1px solid rgba(255,133,179,0.5)",
          boxShadow: "0 4px 24px rgba(233,84,128,0.2)",
          transition: "padding 0.3s ease",
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Music Player"
      >
        {/* Animated bars */}
        <div className="flex items-end gap-[3px]" style={{ height: 20 }}>
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="rounded-full"
              style={{
                width: 3,
                background: "linear-gradient(to top, #e75480, #ffaacb)",
              }}
              animate={
                playing
                  ? {
                      height: [8, 16, 6, 18, 10, 14],
                      transition: {
                        duration: 0.8,
                        repeat: Infinity,
                        delay: i * 0.15,
                        ease: "easeInOut",
                      },
                    }
                  : { height: 6 }
              }
            />
          ))}
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span
                className="text-sm font-medium whitespace-nowrap"
                style={{
                  color: "#e75480",
                  fontFamily: "var(--font-inter)",
                }}
              >
                Music
              </span>
              <motion.button
                onClick={(e) => { e.stopPropagation(); toggle(); }}
                className="rounded-full flex items-center justify-center"
                style={{
                  width: 28,
                  height: 28,
                  background: "linear-gradient(135deg, #e75480, #ffaacb)",
                  border: "none",
                  cursor: "pointer",
                  color: "white",
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={playing ? "Pause music" : "Play music"}
              >
                {playing ? <Pause size={14} /> : <Play size={14} />}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
}
