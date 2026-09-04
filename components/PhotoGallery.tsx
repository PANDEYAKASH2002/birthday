"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, ImageOff } from "lucide-react";
import GlassCard from "./GlassCard";

/* ──────────────────────────────────────────────────────────────
   GALLERY CONFIG  ← Add / remove images here. Drop files into
   /public/images/ and update this array.
─────────────────────────────────────────────────────────────── */
export const GALLERY_IMAGES = [
  { src: "/images/photo-1.jpeg", caption: "Always radiant 🌸" },
  { src: "/images/photo-2.jpeg", caption: "The best memories 💗" },
  { src: "/images/photo-3.jpeg", caption: "Simply magical ✨" },
  { src: "/images/photo-4.jpeg", caption: "Every moment with you 🎀" },
  { src: "/images/photo-5.jpeg", caption: "Unforgettable smiles 😊" },
  { src: "/images/photo-6.jpeg", caption: "Forever cherished 💫" },
];

// Tilt pattern cycles through predefined tilt classes
const TILT_CLASSES = ["tilt-1", "tilt-2", "tilt-3", "tilt-4", "tilt-5", "tilt-6"];

interface LightboxProps {
  images: typeof GALLERY_IMAGES;
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function Lightbox({ images, index, onClose, onPrev, onNext }: LightboxProps) {
  const img = images[index];

  return (
    <motion.div
      className="fixed inset-0 z-[200] lightbox-overlay flex items-center justify-center px-4"
      style={{ background: "rgba(30,10,20,0.75)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      onClick={onClose}
    >
      {/* Glass modal */}
      <motion.div
        className="relative glass-strong rounded-3xl overflow-hidden"
        style={{
          width: "min(90vw, 880px)",
          maxHeight: "85vh",
          border: "1px solid rgba(255,182,193,0.4)",
          boxShadow: "0 30px 80px rgba(233,84,128,0.3), 0 0 0 1px rgba(255,182,193,0.15)",
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image — fixed aspect box so `fill` always has real dimensions */}
        <div
          className="relative w-full"
          style={{
            aspectRatio: "4 / 3",
            maxHeight: "90vh",
            background: "rgba(0,0,0,0.15)",
          }}
        >
          <Image
            src={img.src}
            alt={img.caption}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 90vw, 880px"
            priority
          />
          {/* Caption overlay */}
          <div
            className="absolute bottom-0 left-0 right-0 px-6 py-4"
            style={{
              background: "linear-gradient(to top, rgba(45,20,30,0.75), transparent)",
            }}
          >
            <p
              className="font-display text-center text-white"
              style={{ fontSize: "1.1rem", fontStyle: "italic" }}
            >
              {img.caption}
            </p>
          </div>
        </div>

        {/* Counter */}
        <div
          className="absolute top-3 left-1/2 -translate-x-1/2 glass rounded-full px-4 py-1"
          style={{ fontSize: "0.8rem", color: "rgba(255,182,193,0.9)", border: "1px solid rgba(255,182,193,0.3)" }}
        >
          {index + 1} / {images.length}
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 glass rounded-full p-2 cursor-pointer"
          style={{ border: "1px solid rgba(255,182,193,0.3)", color: "rgba(255,182,193,0.9)" }}
          aria-label="Close photo"
        >
          <X size={18} />
        </button>

        {/* Prev */}
        {index > 0 && (
          <motion.button
            onClick={onPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 glass rounded-full p-3 cursor-pointer"
            style={{ border: "1px solid rgba(255,182,193,0.3)", color: "#e75480" }}
            whileHover={{ scale: 1.1, x: -3 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous photo"
          >
            <ChevronLeft size={22} />
          </motion.button>
        )}

        {/* Next */}
        {index < images.length - 1 && (
          <motion.button
            onClick={onNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 glass rounded-full p-3 cursor-pointer"
            style={{ border: "1px solid rgba(255,182,193,0.3)", color: "#e75480" }}
            whileHover={{ scale: 1.1, x: 3 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Next photo"
          >
            <ChevronRight size={22} />
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
}

interface PhotoGalleryProps {
  images?: typeof GALLERY_IMAGES;
}

function GalleryImage({ src, caption }: { src: string; caption: string }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        className="flex h-full w-full flex-col items-center justify-center gap-2"
        style={{ background: "rgba(233,84,128,0.08)", color: "rgba(233,84,128,0.6)" }}
      >
        <ImageOff size={28} />
        <span style={{ fontSize: "0.7rem" }}>{src}</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={caption}
      fill
      className="object-cover transition-transform duration-500 hover:scale-105"
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      loading="lazy"
      onError={() => setErrored(true)}
    />
  );
}

export default function PhotoGallery({ images = GALLERY_IMAGES }: PhotoGalleryProps) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const openLightbox = useCallback((i: number) => setLightboxIdx(i), []);
  const closeLightbox = useCallback(() => setLightboxIdx(null), []);
  const prevPhoto = useCallback(
    () => setLightboxIdx((i) => (i !== null && i > 0 ? i - 1 : i)),
    []
  );
  const nextPhoto = useCallback(
    () => setLightboxIdx((i) => (i !== null && i < images.length - 1 ? i + 1 : i)),
    [images.length]
  );

  return (
    <section className="w-full" aria-label="Photo Gallery">
      {/* Section heading */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
      >
        <h2
          className="font-display gradient-text"
          style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)", fontWeight: 700, marginBottom: "0.5rem" }}
        >
          Our Memories 💗
        </h2>
        <p
          className="font-body"
          style={{ color: "rgba(45,32,32,0.55)", fontSize: "1.05rem", fontStyle: "italic" }}
        >
          Every photo holds a story worth telling forever.
        </p>
      </motion.div>

      {/* Masonry Gallery — responsive column count, no hardcoded cap */}
      <div
        style={{
          columns: "auto 260px",
          columnGap: "1.5rem",
          width: "100%",
        }}
      >
        {images.map((img, i) => (
          <motion.div
            key={img.src}
            className={`photo-card glass-strong mb-6 cursor-pointer overflow-hidden ${TILT_CLASSES[i % TILT_CLASSES.length]}`}
            style={{
              borderRadius: "20px",
              border: "1px solid rgba(255,182,193,0.35)",
              display: "inline-block",
              width: "100%",
              padding: "10px 10px 36px",
              background: "rgba(255,255,255,0.45)",
              breakInside: "avoid",      // ← stops cards being sliced across columns
              WebkitColumnBreakInside: "avoid",
              pageBreakInside: "avoid",
            }}
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.12, ease: [0.34, 1.56, 0.64, 1] }}
            whileHover={{ scale: 1.03, rotate: 0 }}
            onClick={() => openLightbox(i)}
            role="button"
            tabIndex={0}
            aria-label={`View photo: ${img.caption}`}
            onKeyDown={(e) => e.key === "Enter" && openLightbox(i)}
          >
            {/* Photo — explicit, responsive aspect box so `fill` always has real width/height */}
            <div
              className="relative overflow-hidden rounded-xl group"
              style={{
                aspectRatio: i % 3 === 1 ? "4 / 3" : "4 / 3",
                 minHeight: "420px", 
                width: "100%",
                background: "rgba(233,84,128,0.06)",
              }}
            >
              <GalleryImage src={img.src} caption={img.caption} />

              {/* Hover zoom icon */}
              <div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: "rgba(233,84,128,0.15)" }}
              >
                <ZoomIn size={32} color="rgba(255,255,255,0.9)" />
              </div>
            </div>

            {/* Polaroid caption */}
            <p
              className="font-display text-center mt-3"
              style={{
                fontSize: "0.82rem",
                color: "rgba(45,32,32,0.6)",
                fontStyle: "italic",
                lineHeight: 1.3,
              }}
            >
              {img.caption}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <Lightbox
            images={images}
            index={lightboxIdx}
            onClose={closeLightbox}
            onPrev={prevPhoto}
            onNext={nextPhoto}
          />
        )}
      </AnimatePresence>
    </section>
  );
}