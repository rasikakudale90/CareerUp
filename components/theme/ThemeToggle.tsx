"use client";

import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label="Toggle Dark/Light Mode"
      className={`relative p-2 rounded-full transition-all duration-300 border border-[var(--border-color)] bg-[var(--bg-card-subtle)] hover:bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:scale-105 active:scale-95 shadow-sm ${className}`}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 text-[#E8DED6] transition-transform duration-300 rotate-0 hover:rotate-90" />
      ) : (
        <Moon className="h-4 w-4 text-[#8E705A] transition-transform duration-300 rotate-0 hover:-rotate-45" />
      )}
    </button>
  );
}
