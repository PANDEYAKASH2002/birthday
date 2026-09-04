"use client";

import { motion } from "framer-motion";

interface BirthdayCakeProps {
  candleBlown: boolean;
  showSmoke?: boolean;
}

export default function BirthdayCake({ candleBlown, showSmoke }: BirthdayCakeProps) {
  return (
    <div className="flex flex-col items-center" style={{ userSelect: "none" }}>
      <svg
        width="220"
        height="260"
        viewBox="0 0 220 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Birthday cake with candle"
        role="img"
      >
        {/* ── Candle & Flame ───────────────────────────── */}
        {/* Candle stick */}
        <rect x="102" y="50" width="16" height="36" rx="4" fill="#ffd6e7" stroke="rgba(233,84,128,0.3)" strokeWidth="1" />
        {/* Candle stripes */}
        <line x1="102" y1="58" x2="118" y2="58" stroke="rgba(233,84,128,0.2)" strokeWidth="1.5" />
        <line x1="102" y1="66" x2="118" y2="66" stroke="rgba(233,84,128,0.2)" strokeWidth="1.5" />
        <line x1="102" y1="74" x2="118" y2="74" stroke="rgba(233,84,128,0.2)" strokeWidth="1.5" />
        {/* Wick */}
        <line x1="110" y1="50" x2="110" y2="43" stroke="#5c3d2e" strokeWidth="1.5" strokeLinecap="round" />

        {/* Flame (only when not blown) */}
        {!candleBlown && (
          <motion.g
            style={{ transformOrigin: "110px 38px" }}
            animate={{
              scaleX: [1, 0.88, 1.08, 0.92, 1],
              scaleY: [1, 1.1, 0.92, 1.06, 1],
              rotate: [-2, 2, -1, 3, -2],
              opacity: [1, 0.93, 1, 0.95, 1],
            }}
            transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Outer flame */}
            <ellipse cx="110" cy="34" rx="8" ry="12" fill="#ffb347" opacity="0.85" />
            {/* Inner flame */}
            <ellipse cx="110" cy="35" rx="5" ry="8" fill="#ff7730" opacity="0.9" />
            {/* Core */}
            <ellipse cx="110" cy="37" rx="2.5" ry="4" fill="#fff5c0" opacity="1" />
            {/* Glow */}
            <ellipse cx="110" cy="34" rx="12" ry="16" fill="rgba(255,179,71,0.2)" />
          </motion.g>
        )}

        {/* Smoke (only after blown) */}
        {candleBlown && showSmoke && (
          <>
            <motion.path
              d="M110 43 C108 35 112 28 109 20 C106 12 112 5 110 -5"
              stroke="rgba(120,80,100,0.5)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0.7 }}
              animate={{ pathLength: 1, opacity: [0.7, 0.5, 0.2, 0] }}
              transition={{ duration: 2, ease: "easeOut", repeat: 3, repeatDelay: 0.5 }}
            />
            <motion.path
              d="M112 40 C115 32 108 26 112 18 C116 10 110 3 113 -7"
              stroke="rgba(140,90,110,0.4)"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0.5 }}
              animate={{ pathLength: 1, opacity: [0.5, 0.3, 0.1, 0] }}
              transition={{ duration: 2.2, ease: "easeOut", delay: 0.3, repeat: 3, repeatDelay: 0.5 }}
            />
          </>
        )}

        {/* ── Top Tier (Smallest) ───────────────────────── */}
        {/* Top frosting drips */}
        <path d="M82 90 Q85 82 90 90 Q95 80 100 90 Q105 81 110 90 Q115 80 120 90 Q125 82 130 90 Q135 81 138 90" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
        <rect x="82" y="88" width="56" height="28" rx="6" fill="#ffcce0" />
        <rect x="82" y="88" width="56" height="8" rx="6" fill="white" opacity="0.6" />
        {/* Decorations */}
        <circle cx="96" cy="102" r="3" fill="#e75480" opacity="0.8" />
        <circle cx="110" cy="102" r="3" fill="#ff9fc7" opacity="0.8" />
        <circle cx="124" cy="102" r="3" fill="#e75480" opacity="0.8" />

        {/* ── Middle Tier ───────────────────────────────── */}
        <path d="M66 128 Q70 118 76 128 Q82 117 90 128 Q98 116 106 128 Q114 117 122 128 Q130 116 136 128 Q142 118 148 128 Q152 118 154 128" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
        <rect x="66" y="126" width="88" height="36" rx="7" fill="#ffb3d1" />
        <rect x="66" y="126" width="88" height="10" rx="7" fill="white" opacity="0.5" />
        {/* Sprinkles */}
        {[
          [80, 142, -20], [92, 150, 30], [104, 140, -10], [116, 148, 25],
          [128, 143, -30], [140, 150, 15],
        ].map(([cx, cy, rot], i) => (
          <rect
            key={i}
            x={cx - 4}
            y={cy - 1.5}
            width={8}
            height={3}
            rx={1.5}
            fill={i % 2 === 0 ? "#e75480" : "#fff"}
            opacity={0.8}
            transform={`rotate(${rot}, ${cx}, ${cy})`}
          />
        ))}

        {/* ── Bottom Tier (Largest) ─────────────────────── */}
        <path d="M45 180 Q50 168 58 180 Q68 166 78 180 Q88 165 98 180 Q108 165 118 180 Q128 165 138 180 Q148 166 158 180 Q166 168 172 180 Q176 168 175 180" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
        <rect x="45" y="176" width="130" height="44" rx="8" fill="#ff85b3" />
        <rect x="45" y="176" width="130" height="14" rx="8" fill="white" opacity="0.45" />
        {/* Bottom decorations */}
        {[60, 80, 100, 120, 140, 160].map((x, i) => (
          <circle key={i} cx={x} cy={208} r={4} fill={i % 2 === 0 ? "white" : "#ffd6e7"} opacity={0.85} />
        ))}
        {/* Text on cake */}
        <text
          x="110"
          y="198"
          textAnchor="middle"
          fontSize="11"
          fontFamily="Georgia, serif"
          fontStyle="italic"
          fill="white"
          opacity="0.95"
        >
          Happy Birthday
        </text>

        {/* ── Plate ─────────────────────────────────────── */}
        <ellipse cx="110" cy="222" rx="80" ry="10" fill="rgba(255,182,193,0.3)" />
        <ellipse cx="110" cy="220" rx="82" ry="8" fill="none" stroke="rgba(233,84,128,0.2)" strokeWidth="1.5" />
      </svg>
    </div>
  );
}
