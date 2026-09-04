"use client";

import { motion } from "framer-motion";
import GlassCard from "./GlassCard";

export default function FinalSection() {
  return (
    <section
      className="w-full flex flex-col items-center py-12"
      aria-label="Final birthday message"
    >
      <motion.div
        className="w-full max-w-2xl"
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <GlassCard
          strong
          glow
          className="text-center"
          style={{ padding: "56px 48px" }}
        >
          {/* Top decoration */}
          <motion.div
            className="flex justify-center gap-3 mb-8"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
          >
            {["🎀", "💗", "✨", "💗", "🎀"].map((emoji, i) => (
              <motion.span
                key={i}
                style={{ fontSize: "1.6rem" }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              >
                {emoji}
              </motion.span>
            ))}
          </motion.div>

          {/* Main heading */}
          <motion.h2
            className="font-display gradient-text mb-6"
            style={{
              fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
              fontWeight: 700,
              lineHeight: 1.2,
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Once again...
            <br />
            Happy Birthday, Kashish! 💗
          </motion.h2>

          {/* Divider */}
          <motion.div
            className="mx-auto mb-8 rounded-full"
            style={{
              height: 2,
              width: 0,
              background: "linear-gradient(to right, transparent, #e75480, #ffaacb, #e75480, transparent)",
            }}
            whileInView={{ width: "70%" }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
          />

          {/* Secondary message */}
          <motion.p
            className="font-body mb-8"
            style={{
              fontSize: "clamp(0.98rem, 2.5vw, 1.15rem)",
              color: "rgba(45,32,32,0.72)",
              lineHeight: 1.75,
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Here&apos;s to more laughter, more adventures, more crazy memories
            <br />
            and many more birthdays together. ✨
          </motion.p>

          {/* Signature */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <div
              className="inline-block glass rounded-2xl px-8 py-4"
              style={{
                border: "1px solid rgba(255,133,179,0.4)",
                boxShadow: "0 4px 24px rgba(233,84,128,0.15)",
              }}
            >
              <p
                className="font-display"
                style={{
                  fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
                  fontStyle: "italic",
                  color: "#e75480",
                  fontWeight: 600,
                }}
              >
                With lots of love &amp; countless memories 💗
              </p>
            </div>
          </motion.div>

          {/* Bottom decoration */}
          <motion.div
            className="flex justify-center gap-2 mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9, duration: 0.7 }}
          >
            {Array.from({ length: 7 }).map((_, i) => (
              <motion.span
                key={i}
                style={{ fontSize: "1.2rem", opacity: 0.7 }}
                animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.15 }}
              >
                💗
              </motion.span>
            ))}
          </motion.div>
        </GlassCard>
      </motion.div>

      {/* Footer */}
      <motion.p
        className="mt-8 text-center font-body"
        style={{ color: "rgba(45,32,32,0.35)", fontSize: "0.8rem" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        Made with 💗 — especially for Kashish
      </motion.p>
    </section>
  );
}
