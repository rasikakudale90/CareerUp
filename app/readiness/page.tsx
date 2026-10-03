"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  BrainCircuit,
  MessageSquare,
  FileCheck,
} from "lucide-react";
import { AppShell } from "@/components/dashboard/AppShell";
import { CircularProgress } from "@/components/dashboard/CircularProgress";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { usePrototype } from "@/lib/prototype-state";

export default function ReadinessPage() {
  const { studentProfile, overallReadinessScore, completedTasksCount, totalTasksCount } = usePrototype();

  const readinessBreakdown = [
    { label: "Technical Execution Depth", score: 86, desc: "Strong frontend architecture, React 19, FastAPI integration." },
    { label: "AI & Model Tooling", score: overallReadinessScore, desc: "Gemini Live API streaming, RAG foundations, prompt caching." },
    { label: "System Design & Scalability", score: 72, desc: "Redis caching, rate limiting, and containerized Docker services." },
    { label: "Portfolio Evidence & Open Source", score: 88, desc: "3 live deployed repositories with active campus users." },
    { label: "Technical Interview Defense", score: 78, desc: "Articulates trade-offs between latency, accuracy, and token costs." },
  ];

  return (
    <AppShell
      headerTitle="Comprehensive Job Readiness Index"
      headerSubtitle="A multidimensional assessment of your candidate profile evaluated against current tech hiring bars."
    >
      <div className="space-y-6">
        {/* Main Readiness Gauge Hero */}
        <SpotlightCard className="rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] p-6 sm:p-8 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-4 flex flex-col items-center justify-center text-center p-4 bg-[var(--bg-card-subtle)] rounded-2xl border border-[var(--border-color)]">
              <CircularProgress value={overallReadinessScore} size={150} strokeWidth={12} color="var(--accent)" />
              <div className="mt-3">
                <span className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider block">
                  Overall Readiness Score
                </span>
                <span className="text-[11px] text-emerald-500 font-semibold">Tier-1 Competitive</span>
              </div>
            </div>

            <div className="md:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-xs text-[var(--text-secondary)]">
                <ShieldCheck className="h-3.5 w-3.5 text-[var(--accent)]" />
                <span>AI Recruiter Synthesis</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
                Profile Status: Strongly Positioned for AI Product Engineering Roles
              </h2>

              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                Your portfolio projects demonstrate exceptional craft in streaming AI user experiences. Completing your remaining {totalTasksCount - completedTasksCount} roadmap tasks will firmly place you in the top 5th percentile of new grad and junior applicants.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/roadmap"
                  className="px-4 py-2 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md"
                >
                  <span>Accelerate Roadmap</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>

                <Link
                  href="/job-match"
                  className="px-4 py-2 rounded-xl bg-[var(--bg-card-subtle)] hover:bg-[var(--border-color)] border border-[var(--border-color)] text-[var(--text-primary)] text-xs font-semibold transition-colors"
                >
                  <span>View 90%+ Job Fits</span>
                </Link>
              </div>
            </div>
          </div>
        </SpotlightCard>

        {/* Multidimensional Readiness Breakdown */}
        <SpotlightCard className="rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-[var(--text-primary)] mb-2">Hiring Bar Competency Breakdown</h3>

          <div className="space-y-4">
            {readinessBreakdown.map((item) => (
              <div key={item.label} className="p-4 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[var(--text-primary)]">{item.label}</span>
                  <span className="font-bold text-[var(--accent)]">{item.score}%</span>
                </div>

                <div className="w-full h-2 rounded-full bg-black/10 dark:bg-black/40 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[var(--accent)] to-[#A6866D] rounded-full transition-all duration-700"
                    style={{ width: `${item.score}%` }}
                  />
                </div>

                <p className="text-[11px] text-[var(--text-secondary)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </SpotlightCard>

        {/* Interview Talking Points / Strengths vs Blindspots */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SpotlightCard className="rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] p-6 shadow-xl">
            <div className="flex items-center gap-2 text-emerald-500 text-xs font-bold uppercase tracking-wider mb-4">
              <CheckCircle2 className="h-4 w-4" />
              <span>Verified Candidate Strengths</span>
            </div>
            <ul className="space-y-2.5 text-xs text-[var(--text-secondary)]">
              {studentProfile.strengths.map((s, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </SpotlightCard>

          <SpotlightCard className="rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] p-6 shadow-xl">
            <div className="flex items-center gap-2 text-amber-500 text-xs font-bold uppercase tracking-wider mb-4">
              <AlertTriangle className="h-4 w-4" />
              <span>Key Areas to Defend in Technical Interviews</span>
            </div>
            <ul className="space-y-2.5 text-xs text-[var(--text-secondary)]">
              {studentProfile.blindspots.map((b, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </SpotlightCard>
        </div>
      </div>
    </AppShell>
  );
}
