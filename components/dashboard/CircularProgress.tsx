"use client";

import React from "react";

interface CircularProgressProps {
  value: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  label?: string;
  showPercent?: boolean;
}

export function CircularProgress({
  value,
  size = 110,
  strokeWidth = 9,
  color = "var(--accent)",
  trackColor = "var(--border-strong)",
  label,
  showPercent = true,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeOpacity={0.35}
        />
        {/* Progress Arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      {/* Center Label */}
      <div className="absolute flex flex-col items-center justify-center text-center">
        {showPercent && (
          <span className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
            {Math.round(value)}%
          </span>
        )}
        {label && <span className="text-[10px] text-[var(--text-secondary)] font-semibold">{label}</span>}
      </div>
    </div>
  );
}
