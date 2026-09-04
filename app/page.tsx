"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LandingPage from "@/components/LandingPage";
import BirthdayExperience from "@/components/BirthdayExperience";

type Phase = "landing" | "birthday";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("landing");

  return (
    <AnimatePresence mode="wait">
      {phase === "landing" ? (
        <motion.div
          key="landing-phase"
          className="flex-1"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LandingPage onReveal={() => setPhase("birthday")} />
        </motion.div>
      ) : (
        <motion.div
          key="birthday-phase"
          className="flex-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <BirthdayExperience />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
