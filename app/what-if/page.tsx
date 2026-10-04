"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Zap,
  Plus,
  Check,
  TrendingUp,
  ArrowRight,
  Compass,
  DollarSign,
  Layers,
  Bot,
  RotateCcw,
} from "lucide-react";
import { AppShell } from "@/components/dashboard/AppShell";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { usePrototype } from "@/lib/prototype-state";

export default function WhatIfPage() {
  const router = useRouter();
  const {
    careerPaths,
    simulatedSkills,
    toggleSimulatedSkill,
    isSimulatedSkillActive,
    overallReadinessScore,
  } = usePrototype();

  const [customSkillInput, setCustomSkillInput] = useState("");
  const [customSkills, setCustomSkills] = useState<
    Array<{ id: string; name: string; category: string; impactScore: number; description: string; added: boolean }>
  >([]);

  const activePredefinedCount = simulatedSkills.filter((s) => s.added).length;
  const activeCustomCount = customSkills.filter((s) => s.added).length;
  const totalActiveCount = activePredefinedCount + activeCustomCount;

  const totalLift =
    simulatedSkills.filter((s) => s.added).reduce((sum, s) => sum + Math.round(s.impactScore * 0.5), 0) +
    customSkills.filter((s) => s.added).reduce((sum, s) => sum + Math.round(s.impactScore * 0.5), 0);

  const projectedSalaryLift = totalLift > 0 ? `+$${(totalLift * 2200).toLocaleString()}` : "$0";

  const handleAddCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSkillInput.trim()) return;

    const newSkill = {
      id: `custom-${Date.now()}`,
      name: customSkillInput.trim(),
      category: "Custom Exploration",
      impactScore: 12,
      description: `User-defined skill simulation: ${customSkillInput.trim()}`,
      added: true,
    };

    setCustomSkills((prev) => [newSkill, ...prev]);
    setCustomSkillInput("");
  };

  const toggleCustomSkill = (id: string) => {
    setCustomSkills((prev) =>
      prev.map((s) => (s.id === id ? { ...s, added: !s.added } : s))
    );
  };

  const calculateSimulatedScore = (baseScore: number) => {
    return Math.min(99, baseScore + totalLift);
  };

  return (
    <AppShell
      headerTitle="What-If Skill & Career Simulator"
      headerSubtitle="Experiment with potential skill acquisitions in real-time to preview match score surges and unlocked career trajectories."
    >
      <div className="space-y-6">
        {/* Simulator Control Header */}
        <div className="rounded-3xl bg-gradient-to-br from-[var(--bg-card-subtle)] via-[var(--bg-card)] to-[var(--bg-primary)] border border-[var(--accent)]/40 p-6 sm:p-8 shadow-2xl relative overflow-hidden card-hover-effect">
          <div className="absolute top-0 right-0 w-72 h-72 bg-[var(--accent-soft)] rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--accent-soft)] border border-[var(--accent)]/40 text-xs text-[var(--accent)] font-bold mb-3 shimmer-badge">
                <Zap className="h-3.5 w-3.5 animate-pulse" />
                <span>Simulation Sandbox Mode</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
                Simulate Your Next High-Impact Move
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-xl mt-1 leading-relaxed">
                Toggle skills below or type your own custom technology. Observe how your fit scores across AI Engineering, Applied ML, and Architecture shift immediately.
              </p>
            </div>

            <div className="flex items-center gap-4 bg-[var(--bg-card-subtle)] p-4 rounded-2xl border border-[var(--border-color)] shrink-0 shadow-xl">
              <div className="text-center">
                <span className="text-[10px] text-[var(--text-muted)] uppercase font-bold block">Active Simulations</span>
                <span className="text-2xl font-bold text-[var(--accent)]">{totalActiveCount} Skills</span>
              </div>
              <div className="h-8 w-px bg-[var(--border-color)]" />
              <div className="text-center">
                <span className="text-[10px] text-[var(--text-muted)] uppercase font-bold block">Simulated Readiness</span>
                <span className="text-2xl font-bold text-emerald-500 shimmer-text">{overallReadinessScore}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Strategic Impact Dashboard Banner */}
        {totalActiveCount > 0 && (
          <SpotlightCard className="rounded-3xl bg-gradient-to-r from-[var(--accent-soft)] via-[var(--bg-card)] to-emerald-500/10 border-2 border-[var(--accent)]/40 p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[var(--accent)] text-white flex items-center justify-center shrink-0 shadow-lg">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)]">
                      AI Sandbox Projection Analysis
                    </h3>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold uppercase">
                      Active Surge
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    Mastering these {totalActiveCount} simulated skills removes your top 2 blockers for Tier-1 AI Product Engineer roles at OpenAI, Linear, and Scale AI.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0 bg-[var(--bg-card-subtle)] px-4 py-2.5 rounded-2xl border border-[var(--border-color)]">
                <div>
                  <span className="text-[10px] text-[var(--text-muted)] uppercase font-bold block">Readiness Delta</span>
                  <span className="text-lg font-bold text-emerald-500">+{totalLift}% Lift</span>
                </div>
                <div className="h-7 w-px bg-[var(--border-color)]" />
                <div>
                  <span className="text-[10px] text-[var(--text-muted)] uppercase font-bold block">Projected Starting Comp</span>
                  <span className="text-lg font-bold text-[var(--accent)]">{projectedSalaryLift} /yr</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[var(--border-color)] flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-[var(--text-secondary)]">
                Ready to commit this learning path to your actual schedule?
              </span>
              <div className="flex items-center gap-2">
                <Link
                  href="/roadmap"
                  className="px-4 py-2 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold transition-all flex items-center gap-1.5 shadow-md"
                >
                  <Layers className="h-3.5 w-3.5" />
                  <span>View 12-Week Roadmap</span>
                </Link>
                <Link
                  href="/job-match"
                  className="px-4 py-2 rounded-xl bg-[var(--bg-card-subtle)] hover:bg-[var(--border-color)] border border-[var(--border-color)] text-[var(--text-primary)] font-semibold transition-all flex items-center gap-1.5"
                >
                  <span>Test with ATS Scanner</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </SpotlightCard>
        )}

        {/* Custom Skill Input Form */}
        <SpotlightCard className="p-5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl">
          <form onSubmit={handleAddCustomSkill} className="flex flex-col sm:flex-row items-center gap-3">
            <div className="w-full relative">
              <input
                type="text"
                value={customSkillInput}
                onChange={(e) => setCustomSkillInput(e.target.value)}
                placeholder="Type any custom skill or technology to simulate (e.g., Rust, CUDA, LangSmith, Solana, GraphQL)..."
                className="w-full px-4 py-3 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-xs sm:text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)]"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[var(--accent)] text-white font-semibold text-xs sm:text-sm hover:bg-[var(--accent-hover)] transition-all flex items-center justify-center gap-2 shrink-0 shadow-lg active:scale-95"
            >
              <Plus className="h-4 w-4" />
              <span>Simulate Custom Skill</span>
            </button>
          </form>

          {/* Render Custom Skills if any */}
          {customSkills.length > 0 && (
            <div className="mt-4 pt-4 border-t border-[var(--border-color)]">
              <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-2">
                Your Custom Simulated Skills ({customSkills.length}):
              </span>
              <div className="flex flex-wrap gap-2">
                {customSkills.map((cSkill) => (
                  <button
                    key={cSkill.id}
                    onClick={() => toggleCustomSkill(cSkill.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 interactive-pill ${
                      cSkill.added
                        ? "bg-[var(--accent)] text-white border-[var(--accent)] shadow-md"
                        : "bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--accent)]"
                    }`}
                  >
                    {cSkill.added ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                    <span>{cSkill.name}</span>
                    <span className="text-[10px] opacity-75">(+{cSkill.impactScore}%)</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </SpotlightCard>

        {/* Interactive Skills Selector Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold text-[var(--text-primary)]">Curated Industry Benchmark Skills:</span>
            <span className="text-xs text-[var(--text-muted)]">Click pills to toggle simulation</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {simulatedSkills.map((skill) => {
              const isActive = isSimulatedSkillActive(skill.id);

              return (
                <SpotlightCard
                  key={skill.id}
                  onClick={() => toggleSimulatedSkill(skill.id)}
                  className={`p-5 cursor-pointer flex flex-col justify-between card-hover-effect ${
                    isActive
                      ? "bg-[var(--accent-soft)] border-[var(--accent)] shadow-2xl ring-2 ring-[var(--accent)]/40 scale-[1.02]"
                      : "bg-[var(--bg-card)] border-[var(--border-color)] hover:border-[var(--accent)]/50"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded bg-[var(--bg-card-subtle)] text-[var(--text-secondary)]">
                        {skill.category}
                      </span>
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                          isActive
                            ? "bg-[var(--accent)] text-white shadow-md scale-110"
                            : "bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]"
                        }`}
                      >
                        {isActive ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </div>
                    </div>

                    <h3 className="text-sm font-bold text-[var(--text-primary)] mb-1.5">{skill.name}</h3>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">{skill.description}</p>
                  </div>

                  <div className="pt-3 border-t border-[var(--border-color)] flex items-center justify-between text-xs">
                    <span className="text-[var(--text-secondary)]">Match Boost:</span>
                    <span className="font-bold text-[var(--accent)] shimmer-badge px-2 py-0.5 rounded">
                      +{skill.impactScore}% Career Fit
                    </span>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </div>

        {/* Real-time Recalculated Career Trajectories */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold text-[var(--text-primary)]">Projected Career Match Deltas:</span>
            {totalActiveCount > 0 && (
              <span className="text-xs text-emerald-500 font-semibold animate-pulse">
                • Live Scores Updated with {totalActiveCount} Simulated Skills
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {careerPaths.map((career) => {
              const base = career.matchScore;
              const sim = calculateSimulatedScore(base);
              const delta = sim - base;

              return (
                <SpotlightCard
                  key={career.id}
                  className="p-5 flex items-center justify-between gap-4 card-hover-effect"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-2xl bg-[var(--accent-soft)] flex items-center justify-center text-[var(--accent)]">
                      <Compass className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[var(--text-primary)]">{career.title}</h4>
                      <span className="text-xs text-[var(--text-secondary)]">{career.avgSalary}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm font-bold text-[var(--text-primary)]">{sim}% Fit</div>
                      {delta > 0 && (
                        <span className="text-xs font-bold text-emerald-500 flex items-center justify-end gap-0.5">
                          <TrendingUp className="h-3 w-3" />
                          +{delta}%
                        </span>
                      )}
                    </div>

                    <Link
                      href="/roadmap"
                      className="p-2 rounded-xl bg-[var(--bg-card-subtle)] hover:bg-[var(--accent)] hover:text-white text-[var(--text-secondary)] transition-all"
                      title="View roadmap to acquire"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

