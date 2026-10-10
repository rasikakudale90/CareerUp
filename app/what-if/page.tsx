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
  Trash2,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  X,
  FileCheck,
  Search,
  Briefcase,
} from "lucide-react";
import { AppShell } from "@/components/dashboard/AppShell";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { usePrototype } from "@/lib/prototype-state";

export default function WhatIfPage() {
  const router = useRouter();
  const {
    careerPaths,
    simulatedSkills,
    customSimulatedSkills,
    addCustomSimulationSkill,
    removeCustomSimulationSkill,
    toggleSimulatedSkill,
    isSimulatedSkillActive,
    commitSimulatedSkillsToRoadmap,
    resetSimulation,
    overallReadinessScore,
    studentProfile,
  } = usePrototype();

  const [customSkillInput, setCustomSkillInput] = useState("");
  const [customCategoryInput, setCustomCategoryInput] = useState("AI Architecture");
  const [commitSuccess, setCommitSuccess] = useState<{ count: number } | null>(null);
  const [isATSModalOpen, setIsATSModalOpen] = useState(false);
  const [isScanningATS, setIsScanningATS] = useState(false);

  const activePredefinedCount = simulatedSkills.filter((s) => s.added && !s.id.startsWith("custom-sim-")).length;
  const activeCustomCount = customSimulatedSkills.filter((s) => isSimulatedSkillActive(s.id)).length;
  const totalActiveCount = activePredefinedCount + activeCustomCount;

  const totalLift =
    simulatedSkills.filter((s) => s.added).reduce((sum, s) => sum + Math.round(s.impactScore * 0.5), 0);

  const projectedSalaryLift = totalLift > 0 ? `+$${(totalLift * 2200).toLocaleString()}` : "$0";

  const handleAddCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSkillInput.trim()) return;

    addCustomSimulationSkill(
      customSkillInput.trim(),
      customCategoryInput,
      14,
      `User-defined simulated technology: ${customSkillInput.trim()}`
    );
    setCustomSkillInput("");
  };

  const handleCommitToRoadmap = () => {
    const result = commitSimulatedSkillsToRoadmap();
    if (result.addedSkillsCount > 0) {
      setCommitSuccess({ count: result.addedSkillsCount });
      setTimeout(() => setCommitSuccess(null), 5000);
    }
  };

  const handleOpenATSDiagnostic = () => {
    setIsScanningATS(true);
    setIsATSModalOpen(true);
    setTimeout(() => {
      setIsScanningATS(false);
    }, 750);
  };

  const calculateSimulatedScore = (baseScore: number) => {
    return Math.min(99, Math.max(baseScore, baseScore + totalLift));
  };

  const activeSimulatedSkillNames = simulatedSkills.filter((s) => s.added).map((s) => s.name);

  // ATS Calculations based on baseline + simulated skills
  const baselineATS = Math.min(88, Math.max(62, 60 + studentProfile.skills.length * 2));
  const simulatedATS = Math.min(98, baselineATS + totalActiveCount * 4);

  return (
    <AppShell
      headerTitle="Career What-If Simulator"
      headerSubtitle="Explore how acquiring high-leverage frameworks and distributed systems skills dynamically alters your career trajectory."
    >
      <div className="space-y-6">
        {/* Success Banner when Committing Skills */}
        {commitSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-semibold text-xs flex items-center justify-between shadow-xl animate-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>
                Committed {commitSuccess.count} simulated skill{commitSuccess.count > 1 ? "s" : ""} to your verified profile and 12-week roadmap!
              </span>
            </div>
            <Link href="/roadmap" className="underline hover:text-white text-[11px]">
              View Updated Roadmap →
            </Link>
          </div>
        )}

        {/* Dynamic Simulation Live Stats Bar */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-[var(--bg-card-subtle)] via-[var(--bg-card)] to-[var(--bg-primary)] border border-[var(--accent)]/30 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-soft)] border border-[var(--accent)]/40 text-xs text-[var(--accent)] font-bold mb-1 shimmer-badge">
                <Zap className="h-3 w-3" />
                <span>Multi-Dimensional Sandbox</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                Active Simulations: {totalActiveCount} Framework{totalActiveCount === 1 ? "" : "s"} Selected
              </h2>
              <p className="text-xs text-[var(--text-secondary)]">
                Select industry benchmark skills or input custom technologies below to instantly recalculate your fit scores.
              </p>
            </div>

            <div className="flex items-center gap-4 self-start md:self-auto bg-[var(--bg-card-subtle)] px-5 py-3.5 rounded-2xl border border-[var(--border-color)]">
              <div className="text-center">
                <span className="text-[10px] text-[var(--text-muted)] uppercase font-bold block">Live Readiness</span>
                <span className="text-2xl font-bold text-[var(--accent)] shimmer-text">{overallReadinessScore}%</span>
              </div>
              <div className="h-8 w-px bg-[var(--border-color)]" />
              <div className="text-center">
                <span className="text-[10px] text-[var(--text-muted)] uppercase font-bold block">Match Lift</span>
                <span className="text-2xl font-bold text-emerald-500">+{totalLift}%</span>
              </div>
              <div className="h-8 w-px bg-[var(--border-color)]" />
              <div className="text-center">
                <span className="text-[10px] text-[var(--text-muted)] uppercase font-bold block">Est. Comp Lift</span>
                <span className="text-xl font-bold text-[var(--text-primary)]">{projectedSalaryLift}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Active Simulation Actions Banner */}
        {totalActiveCount > 0 && (
          <SpotlightCard className="p-6 rounded-3xl bg-[var(--bg-card)] border-2 border-[var(--accent)] shadow-2xl space-y-4 animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[var(--accent)] text-white flex items-center justify-center shadow-lg shrink-0">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[var(--text-primary)]">
                    Simulating {totalActiveCount} Active Technologies: {activeSimulatedSkillNames.join(", ")}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Your projected trajectory has been elevated across all matching tech stacks and ATS algorithms.
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
              <span className="text-[var(--text-secondary)] font-medium">
                Want to lock in these skills into your real career profile and timeline?
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={handleCommitToRoadmap}
                  className="px-4 py-2.5 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold transition-all flex items-center gap-1.5 shadow-lg hover:scale-105 active:scale-95"
                >
                  <Layers className="h-3.5 w-3.5" />
                  <span>Commit to My Roadmap &amp; Profile</span>
                </button>
                <button
                  onClick={handleOpenATSDiagnostic}
                  className="px-4 py-2.5 rounded-xl bg-[var(--bg-card-subtle)] hover:bg-[var(--border-color)] border border-[var(--accent)]/40 text-[var(--accent)] font-semibold transition-all flex items-center gap-1.5 shadow-md active:scale-95"
                >
                  <FileCheck className="h-3.5 w-3.5" />
                  <span>Test ATS Score</span>
                </button>
                <button
                  onClick={resetSimulation}
                  className="p-2.5 rounded-xl bg-[var(--bg-card-subtle)] hover:bg-red-500/15 hover:text-red-500 border border-[var(--border-color)] text-[var(--text-secondary)] transition-all"
                  title="Reset Sandbox Simulations"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </SpotlightCard>
        )}

        {/* Custom Skill Input Form with Category Selection */}
        <SpotlightCard className="p-5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl space-y-4">
          <form onSubmit={handleAddCustomSkill} className="flex flex-col sm:flex-row items-center gap-3">
            <div className="w-full relative">
              <input
                type="text"
                value={customSkillInput}
                onChange={(e) => setCustomSkillInput(e.target.value)}
                placeholder="Type any custom skill (e.g., Rust, CUDA, LangSmith, Solana, GraphQL, WebGPU, vLLM)..."
                className="w-full px-4 py-3 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-xs sm:text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)]"
              />
            </div>

            <select
              value={customCategoryInput}
              onChange={(e) => setCustomCategoryInput(e.target.value)}
              className="w-full sm:w-auto px-4 py-3 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-xs font-semibold text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
            >
              <option value="AI Architecture">AI Architecture</option>
              <option value="Model Fine-Tuning">Model Fine-Tuning</option>
              <option value="Infrastructure & Cloud">Infrastructure &amp; Cloud</option>
              <option value="Fullstack Web">Fullstack Web</option>
              <option value="Analytical & Rigor">Analytical &amp; Rigor</option>
            </select>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[var(--accent)] text-white font-semibold text-xs sm:text-sm hover:bg-[var(--accent-hover)] transition-all flex items-center justify-center gap-2 shrink-0 shadow-lg active:scale-95"
            >
              <Plus className="h-4 w-4" />
              <span>Simulate Custom Skill</span>
            </button>
          </form>

          {/* Render Persistent Custom Skills */}
          {customSimulatedSkills.length > 0 && (
            <div className="pt-3 border-t border-[var(--border-color)]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider block">
                  Your Custom Saved Simulations ({customSimulatedSkills.length}):
                </span>
                <span className="text-[10px] text-[var(--text-secondary)]">Persisted across refreshes</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {customSimulatedSkills.map((cSkill) => {
                  const isActive = isSimulatedSkillActive(cSkill.id);
                  return (
                    <div
                      key={cSkill.id}
                      className={`inline-flex items-center rounded-xl border transition-all ${
                        isActive
                          ? "bg-[var(--accent)] text-white border-[var(--accent)] shadow-md"
                          : "bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--accent)]"
                      }`}
                    >
                      <button
                        onClick={() => toggleSimulatedSkill(cSkill.id)}
                        className="px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5"
                      >
                        {isActive ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                        <span>{cSkill.name}</span>
                        <span className="text-[10px] opacity-80">(+{cSkill.impactScore}%)</span>
                      </button>
                      <button
                        onClick={() => removeCustomSimulationSkill(cSkill.id)}
                        className="p-1.5 pr-2 opacity-60 hover:opacity-100 hover:text-red-300 transition-opacity"
                        title="Remove custom simulation"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </SpotlightCard>

        {/* Curated Benchmark Skills Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold text-[var(--text-primary)]">Curated Industry Benchmark Skills:</span>
            <span className="text-xs text-[var(--text-muted)]">Click pills to toggle simulation</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {simulatedSkills
              .filter((s) => !s.id.startsWith("custom-sim-"))
              .map((skill) => {
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
                • Live Scores Recalculated for {totalActiveCount} Simulated Skills
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

      {/* DEDICATED ATS COMPATIBILITY DIAGNOSTIC MODAL (Addresses Bug 5) */}
      {isATSModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsATSModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[var(--bg-card-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-lg shrink-0">
                <FileCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[var(--text-primary)]">
                  Live ATS Compatibility Diagnostic
                </h3>
                <p className="text-xs text-[var(--text-secondary)]">
                  Simulating recruiter filters (Workday, Greenhouse, Lever ATS parsers)
                </p>
              </div>
            </div>

            {isScanningATS ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-10 h-10 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs text-[var(--text-secondary)]">Parsing keyword density and schema rubrics...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Score Dial Display */}
                <div className="p-5 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] block">
                      Overall ATS Readiness Index
                    </span>
                    <div className="text-2xl font-bold text-emerald-400 flex items-center gap-2 mt-0.5">
                      <span>{simulatedATS}% Match</span>
                      {totalLift > 0 && (
                        <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold">
                          +{totalActiveCount * 4}% Simulated Boost
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right text-xs">
                    <span className="text-[var(--text-muted)] block">Candidate Baseline:</span>
                    <span className="font-semibold text-[var(--text-primary)]">{baselineATS}% ATS Fit</span>
                  </div>
                </div>

                {/* ATS Parser Checklist Breakdown */}
                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] flex items-center justify-between">
                    <span className="text-[var(--text-secondary)] flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      Core Technical Keyword Density
                    </span>
                    <span className="font-bold text-[var(--text-primary)]">96% (Optimal)</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] flex items-center justify-between">
                    <span className="text-[var(--text-secondary)] flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      Architecture &amp; API Match Ratio
                    </span>
                    <span className="font-bold text-[var(--text-primary)]">{Math.min(99, 88 + totalActiveCount * 3)}% (High)</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] flex items-center justify-between">
                    <span className="text-[var(--text-secondary)] flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      Schema &amp; Resume Formatting
                    </span>
                    <span className="font-bold text-emerald-400">100% (Compliant)</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-2">
                  <Link
                    href="/job-match?tab=custom"
                    onClick={() => setIsATSModalOpen(false)}
                    className="w-full py-3 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-lg hover:scale-[1.01]"
                  >
                    <Search className="h-3.5 w-3.5" />
                    <span>Test Against Specific Job Description (Paste JD)</span>
                  </Link>

                  <Link
                    href="/job-match?tab=browse"
                    onClick={() => setIsATSModalOpen(false)}
                    className="w-full py-3 rounded-xl bg-[var(--bg-card-subtle)] hover:bg-[var(--border-color)] border border-[var(--border-color)] text-[var(--text-primary)] text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                  >
                    <Briefcase className="h-3.5 w-3.5" />
                    <span>Browse Matching Tech Openings</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </AppShell>
  );
}
