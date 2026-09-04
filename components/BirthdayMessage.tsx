"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MESSAGE_LINES = [
  "Happy Birthday to one of the most special people in my life. 💗",
  "May your smile always stay this beautiful, your dreams become reality,",
  "and every year bring you countless reasons to be happy.",
  "",
  "Thank you for being an amazing friend and for making so many moments unforgettable.",
  "Today is your day — so smile a little more, laugh a little louder,",
  "and make the most beautiful memories.",
  "",
  "Happy Birthday, Kashish! 🎂✨",
];

const CHAR_DELAY = 0.018; // seconds per character

export default function BirthdayMessage() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    let i = 0;
    const next = () => {
      setVisibleLines((n) => n + 1);
      i++;
      if (i < MESSAGE_LINES.length) {
        const delay = (MESSAGE_LINES[i - 1].length * CHAR_DELAY * 1000) + 320;
        setTimeout(next, delay);
      }
    };
    const start = setTimeout(next, 300);
    return () => clearTimeout(start);
  }, []);

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div
        className="font-body text-center leading-relaxed"
        style={{
          color: "rgba(45,32,32,0.82)",
          fontSize: "clamp(0.92rem, 2.2vw, 1.12rem)",
        }}
      >
        {MESSAGE_LINES.map((line, lineIdx) => {
          if (line === "") return <div key={lineIdx} style={{ height: "1em" }} />;
          const isVisible = lineIdx < visibleLines;

          return (
            <motion.p
              key={lineIdx}
              className="overflow-hidden"
              style={{
                marginBottom: "0.3em",
                minHeight: "1.6em",
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {isVisible && (
                <TypewriterLine
                  text={line}
                  isLast={line.includes("Happy Birthday, Kashish")}
                />
              )}
            </motion.p>
          );
        })}
      </div>
    </motion.div>
  );
}

function TypewriterLine({ text, isLast }: { text: string; isLast: boolean }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    setDisplayed("");
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, CHAR_DELAY * 1000);
    return () => clearInterval(id);
  }, [text]);

  return (
    <span
      style={
        isLast
          ? {
              fontFamily: "var(--font-playfair)",
              fontStyle: "italic",
              fontWeight: 600,
              background:
                "linear-gradient(135deg, #e75480, #ff85b3, #f9a8c9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontSize: "clamp(1rem, 2.6vw, 1.28rem)",
            }
          : {}
      }
    >
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.55, repeat: Infinity, repeatType: "reverse" }}
        style={{ display: "inline-block", marginLeft: 1 }}
      >
        {displayed.length < text.length ? "|" : ""}
      </motion.span>
    </span>
  );
}
