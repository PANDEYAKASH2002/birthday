"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GALLERY_IMAGES } from "./PhotoGallery";

const QUOTES = [
  "Some memories are simply unforgettable.",
  "And some people make them even more special.",
  "Every laugh shared is a treasure kept forever.",
  "The best chapters of life are written with the best people.",
];

export default function MemoriesSection() {
  // Pick up to 4 images for the memory timeline
  const memoryImages = GALLERY_IMAGES.slice(0, Math.min(4, GALLERY_IMAGES.length));

  return (
    <section className="w-full py-8" aria-label="Memories Timeline">
      {/* Heading */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
      >
        <h2
          className="font-display gradient-text"
          style={{ fontSize: "clamp(1.8rem, 5.5vw, 3rem)", fontWeight: 700, marginBottom: "0.6rem" }}
        >
          Little Moments, Big Memories 💗
        </h2>
        <p
          className="font-body"
          style={{ color: "rgba(45,32,32,0.5)", fontStyle: "italic", fontSize: "1rem" }}
        >
          A timeline of things that matter the most.
        </p>
      </motion.div>

      {/* Timeline items */}
      <div className="relative">
        {/* Vertical line */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0"
          style={{
            width: 2,
            background: "linear-gradient(to bottom, transparent, rgba(233,84,128,0.3), rgba(249,168,201,0.5), rgba(233,84,128,0.3), transparent)",
          }}
          aria-hidden="true"
        />

        <div className="flex flex-col gap-16">
          {memoryImages.map((img, i) => {
            const isLeft = i % 2 === 0;
            const quote = QUOTES[i % QUOTES.length];

            return (
              <motion.div
                key={img.src + i}
                className={`relative flex items-center gap-8 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
                initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
              >
                {/* Photo card — half width */}
                <div className="flex-1 max-w-sm">
                  <motion.div
                    className="glass-strong rounded-2xl overflow-hidden"
                    style={{
                      border: "1px solid rgba(255,182,193,0.4)",
                      boxShadow: "0 12px 40px rgba(233,84,128,0.15)",
                      padding: "10px 10px 32px",
                      background: "rgba(255,255,255,0.45)",
                    }}
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0 20px 60px rgba(233,84,128,0.25)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative overflow-hidden rounded-xl" style={{ aspectRatio: "3 / 4",     // was 4/3 — now taller than wide
    minHeight: "280px",  }}>
                      <Image
                        src={img.src}
                        alt={img.caption}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 90vw, 380px"
                        loading="lazy"
                      />
                    </div>
                    <p
                      className="font-display text-center mt-3"
                      style={{ fontSize: "0.88rem", color: "rgba(45,32,32,0.6)", fontStyle: "italic" }}
                    >
                      {img.caption}
                    </p>
                  </motion.div>
                </div>

                {/* Centre dot */}
                <div className="relative z-10 flex-shrink-0" style={{ width: 48 }}>
                  <motion.div
                    className="mx-auto rounded-full flex items-center justify-center"
                    style={{
                      width: 44,
                      height: 44,
                      background: "linear-gradient(135deg, #e75480, #ffaacb)",
                      boxShadow: "0 0 0 6px rgba(233,84,128,0.12), 0 0 20px rgba(233,84,128,0.3)",
                      fontSize: "1.3rem",
                    }}
                    whileInView={{ scale: [0, 1.2, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    💗
                  </motion.div>
                </div>

                {/* Quote — half width */}
                <div className="flex-1 max-w-sm">
                  <motion.div
                    className="glass rounded-2xl"
                    style={{
                      padding: "28px 28px",
                      border: "1px solid rgba(255,182,193,0.35)",
                    }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <p
                      className="font-display"
                      style={{
                        fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
                        fontStyle: "italic",
                        color: "rgba(45,32,32,0.78)",
                        lineHeight: 1.6,
                      }}
                    >
                      &ldquo;{quote}&rdquo;
                    </p>
                    <div
                      className="mt-4 h-0.5 rounded-full"
                      style={{ background: "linear-gradient(to right, #e75480, transparent)", width: "50%" }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom tagline */}
      <motion.div
        className="text-center mt-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p
          className="font-display gradient-text"
          style={{ fontSize: "clamp(1.2rem, 3vw, 1.7rem)", fontStyle: "italic" }}
        >
          &ldquo;With you, every ordinary day becomes extraordinary.&rdquo;
        </p>
      </motion.div>
    </section>
  );
}
