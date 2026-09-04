"use client";

import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  strong?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export default function GlassCard({
  children,
  className = "",
  glow = false,
  strong = false,
  onClick,
  style,
}: GlassCardProps) {
  return (
    <div
      className={`rounded-3xl ${strong ? "glass-strong" : "glass"} ${glow ? "animate-pulse-glow" : ""} ${className}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  );
}
