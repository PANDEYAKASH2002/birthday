"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "./GlassCard";
import BirthdayCake from "./BirthdayCake";
import Countdown from "./Countdown";
import ConfettiEffect from "./ConfettiEffect";
import BirthdayMessage from "./BirthdayMessage";
import PhotoGallery from "./PhotoGallery";
import MemoriesSection from "./MemoriesSection";
import FinalSection from "./FinalSection";
import FloatingParticles from "./FloatingParticles";
import MusicPlayer from "./MusicPlayer";

type Stage =
  | "arriving"       // page entrance
  | "countdown"      // countdown running
  | "blown"          // candle just blown
  | "celebrating"    // confetti + message
  | "gallery";       // everything shown

export default function BirthdayExperience() {
  const [stage, setStage] = useState<Stage>("arriving");
  const [candleBlown, setCandleBlown] = useState(false);
  const [showSmoke, setShowSmoke] = useState(false);
  const [glowScreen, setGlowScreen] = useState(false);

  // Start countdown shortly after arriving
  useEffect(() => {
    const t = setTimeout(() => setStage("countdown"), 1800);
    return () => clearTimeout(t);
  }, []);

  const handleCountdownComplete = () => {
    setCandleBlown(true);
    setShowSmoke(true);
    setGlowScreen(true);
    setTimeout(() => setStage("blown"), 600);
    setTimeout(() => setShowSmoke(false), 4000);
    setTimeout(() => {
      setGlowScreen(false);
      setStage("celebrating");
    }, 2000);
    setTimeout(() => setStage("gallery"), 4500);
  };

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{
        background:
          "linear-gradient(160deg, #fff5f8 0%, #ffe4ee 25%, #fff0f5 55%, #ffeef4 100%)",
        backgroundAttachment: "fixed",
      }}
    >
      <FloatingParticles />
      <MusicPlayer />

      {/* Screen glow overlay on candle blow */}
      <AnimatePresence>
        {glowScreen && (
          <motion.div
            key="glow-overlay"
            className="fixed inset-0 pointer-events-none"
            style={{
              zIndex: 50,
              background: "radial-gradient(ellipse at center, rgba(233,84,128,0.22) 0%, transparent 70%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        )}
      </AnimatePresence>

      {/* ConfettiEffect */}
      <ConfettiEffect active={stage === "celebrating" || stage === "gallery"} />

      {/* ── MAIN CONTENT ──────────────────────────────── */}
      <div
        className="relative z-10 flex flex-col items-center px-4 sm:px-8 lg:px-16"
        style={{ maxWidth: 1100, margin: "0 auto", paddingTop: "5vh", paddingBottom: "8vh" }}
      >

        {/* ── BIRTHDAY HEADER ────────────────────────── */}
        <motion.div
          className="text-center mb-10 w-full"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <motion.p
            className="font-body mb-2"
            style={{ color: "rgba(45,32,32,0.5)", fontSize: "1rem", letterSpacing: "0.15em", textTransform: "uppercase" }}
          >
            ✨ Today is all about you ✨
          </motion.p>

          <motion.h1
            className="font-display gradient-text leading-tight"
            style={{
              fontSize: "clamp(2.2rem, 8vw, 5.5rem)",
              fontWeight: 800,
              lineHeight: 1.1,
            }}
            animate={{
              backgroundPosition: ["0% center", "100% center", "0% center"],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            Happy Birthday, Kashish! 🎂💗
          </motion.h1>

          <motion.div
            className="flex justify-center gap-3 mt-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {["🎉", "🎊", "🎀", "🎊", "🎉"].map((e, i) => (
              <motion.span
                key={i}
                style={{ fontSize: "1.5rem" }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.18 }}
              >
                {e}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* ── CAKE SECTION ───────────────────────────── */}
        <motion.div
          className="w-full max-w-lg mb-12"
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <GlassCard
            strong
            className="flex flex-col items-center py-10 px-6"
            style={{
              border: "1px solid rgba(255,133,179,0.4)",
              boxShadow: "0 16px 60px rgba(233,84,128,0.2)",
            }}
          >
            {/* Cake */}
            <BirthdayCake candleBlown={candleBlown} showSmoke={showSmoke} />

            {/* Countdown / celebration text */}
            <div className="w-full mt-8">
              <AnimatePresence mode="wait">
                {(stage === "arriving" || stage === "countdown") && (
                  <motion.div
                    key="countdown-area"
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                  >
                    {stage === "arriving" ? (
                      <motion.p
                        className="font-display text-center"
                        style={{
                          fontSize: "clamp(1.1rem, 3vw, 1.55rem)",
                          color: "rgba(45,32,32,0.65)",
                          fontStyle: "italic",
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                      >
                        Make a wish... ✨
                      </motion.p>
                    ) : (
                      <Countdown onComplete={handleCountdownComplete} />
                    )}
                  </motion.div>
                )}

                {stage === "blown" && (
                  <motion.div
                    key="blown-msg"
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                  >
                    <p
                      className="font-display gradient-text"
                      style={{ fontSize: "clamp(1.4rem, 4vw, 2rem)", fontWeight: 700 }}
                    >
                      💨 Candle blown! 🕯️
                    </p>
                    <p
                      className="font-body mt-2"
                      style={{ fontSize: "0.95rem", color: "rgba(45,32,32,0.5)" }}
                    >
                      Your wish has been made...
                    </p>
                  </motion.div>
                )}

                {(stage === "celebrating" || stage === "gallery") && (
                  <motion.div
                    key="celebrate-msg"
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
                  >
                    <motion.p
                      className="font-display gradient-text"
                      style={{ fontSize: "clamp(1.6rem, 5vw, 2.4rem)", fontWeight: 800 }}
                      animate={{ scale: [1, 1.04, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      HAPPY BIRTHDAY KASHISH! 🎉💗
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </GlassCard>
        </motion.div>

        {/* ── BIRTHDAY MESSAGE ───────────────────────── */}
        <AnimatePresence>
          {(stage === "celebrating" || stage === "gallery") && (
            <motion.div
              key="message"
              className="w-full max-w-2xl mb-16"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <GlassCard
                strong
                className="py-10 px-8 md:px-12"
                style={{ border: "1px solid rgba(255,133,179,0.35)" }}
              >
                {/* Decorative top */}
                <div className="flex justify-center gap-2 mb-6">
                  {["✨", "💗", "🎂", "💗", "✨"].map((e, i) => (
                    <span key={i} style={{ fontSize: "1.4rem" }}>{e}</span>
                  ))}
                </div>
                <BirthdayMessage />
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── PHOTO GALLERY ──────────────────────────── */}
        <AnimatePresence>
          {stage === "gallery" && (
            <motion.div
              key="gallery"
              className="w-full mb-20"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <PhotoGallery />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── MEMORIES TIMELINE ──────────────────────── */}
        <AnimatePresence>
          {stage === "gallery" && (
            <motion.div
              key="memories"
              className="w-full mb-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <MemoriesSection />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── FINAL SECTION ──────────────────────────── */}
        <AnimatePresence>
          {stage === "gallery" && (
            <motion.div
              key="final"
              className="w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <FinalSection />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
