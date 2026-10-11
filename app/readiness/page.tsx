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
  const { studentProfile, overallReadinessScore, completedTasksCount, totalTasksCount, selectedCareer } = usePrototype();

  const readinessBreakdown = [
    { label: "Technical Execution Depth", score: Math.min(98, Math.max(60, Math.round(overallReadinessScore * 0.96))), desc: "Strong frontend architecture, React 19, FastAPI integration." },
    { label: "AI & Model Tooling", score: overallReadinessScore, desc: "Gemini Live API streaming, RAG foundations, prompt caching." },
    { label: "System Design & Scalability", score: Math.min(95, Math.max(50, Math.round(overallReadinessScore * 0.84))), desc: "Redis caching, rate limiting, and containerized Docker services." },
    { label: "Portfolio Evidence & Open Source", score: Math.min(99, Math.max(65, Math.round(overallReadinessScore * 0.98))), desc: `${studentProfile.projects.length} verified project repositories with active live deployments.` },
    { label: "Technical Interview Defense", score: Math.min(96, Math.max(55, Math.round(overallReadinessScore * 0.89))), desc: "Articulates trade-offs between latency, accuracy, and token costs." },
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
                <span className="text-[11px] text-emerald-500 font-semibold">Strong Alignment</span>
              </div>
            </div>

            <div className="md:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-xs text-[var(--text-secondary)]">
                <ShieldCheck className="h-3.5 w-3.5 text-[var(--accent)]" />
                <span>Deterministic Scoring Engine</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
                Profile Status: High Evidence Alignment for {selectedCareer?.title || "AI Product Engineering"} Roles
              </h2>

              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                Your portfolio projects demonstrate tangible code evidence in modern full-stack systems and reactive user interfaces. Completing your remaining {Math.max(0, totalTasksCount - completedTasksCount)} roadmap tasks will address critical hiring requirements for this track.
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

        {/* Transparent Scoring Methodology Breakdown (Addresses FR-07 & AC-06) */}
        <SpotlightCard className="rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Scoring Methodology &amp; Weight Architecture</h3>
              <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                Deterministic calculation grounded in verified candidate facts and milestone completion.
              </p>
            </div>
            <span className="text-[10px] px-2.5 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] font-bold border border-[var(--accent)]/30">
              v4.2 Deterministic
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] space-y-1">
              <span className="text-[10px] font-bold uppercase text-[var(--accent)]">35% Weight</span>
              <div className="font-bold text-[var(--text-primary)]">Technical Depth</div>
              <p className="text-[10px] text-[var(--text-secondary)]">Languages, frameworks &amp; architectural patterns found in projects.</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] space-y-1">
              <span className="text-[10px] font-bold uppercase text-emerald-400">25% Weight</span>
              <div className="font-bold text-[var(--text-primary)]">Portfolio Evidence</div>
              <p className="text-[10px] text-[var(--text-secondary)]">Public GitHub repos, production links &amp; commit histories.</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] space-y-1">
              <span className="text-[10px] font-bold uppercase text-blue-400">20% Weight</span>
              <div className="font-bold text-[var(--text-primary)]">Tooling &amp; Cloud</div>
              <p className="text-[10px] text-[var(--text-secondary)]">Docker, CI/CD, vector search, Redis caching &amp; database schemas.</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] space-y-1">
              <span className="text-[10px] font-bold uppercase text-purple-400">20% Weight</span>
              <div className="font-bold text-[var(--text-primary)]">Roadmap Execution</div>
              <p className="text-[10px] text-[var(--text-secondary)]">Verified tasks completed in candidate active 12-week plan.</p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-[11px] text-[var(--text-secondary)] leading-relaxed">
            ℹ️ <strong>Educational Notice:</strong> The CareerUp Readiness Score is an educational diagnostic model designed to highlight strengths and bridgeable gaps. It does not constitute an employment guarantee, placement warranty, or automated hiring evaluation.
          </div>
        </SpotlightCard>
      </div>
    </AppShell>
  );
}
