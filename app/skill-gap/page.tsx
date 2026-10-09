"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  Sparkles,
  Clock,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Zap,
} from "lucide-react";
import { AppShell } from "@/components/dashboard/AppShell";
import { CircularProgress } from "@/components/dashboard/CircularProgress";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { usePrototype } from "@/lib/prototype-state";

export default function SkillGapPage() {
  const { skillGaps, studentProfile, overallReadinessScore } = usePrototype();
  const [filterType, setFilterType] = useState<"All" | "Critical" | "Advantage" | "Bonus">("All");

  const filteredGaps =
    filterType === "All" ? skillGaps : skillGaps.filter((g) => g.category === filterType);

  const totalGapHours = skillGaps.reduce((acc, g) => acc + g.estimatedHours, 0);
  const criticalGaps = skillGaps.filter((g) => g.category === "Critical");
  const criticalGapsNames = criticalGaps.map((g) => g.name).slice(0, 2).join(" & ") || "No Critical Gaps";
  const estimatedWeeks = Math.max(1, Math.ceil(totalGapHours / 10));

  return (
    <AppShell
      headerTitle="Skill Gap Intelligence"
      headerSubtitle="Pinpoint exactly what separates your current tech stack from Tier-1 industry readiness."
    >
      <div className="space-y-6">
        {/* Top Summary Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <SpotlightCard className="p-5 flex items-center gap-4">
            <CircularProgress value={overallReadinessScore} size={70} strokeWidth={6} color="var(--accent)" />
            <div>
              <span className="text-[10px] text-[var(--text-muted)] uppercase font-bold tracking-wider">Current Match</span>
              <div className="text-lg font-bold text-[var(--text-primary)]">{overallReadinessScore}% Target Fit</div>
            </div>
          </SpotlightCard>

          <SpotlightCard className="p-5">
            <span className="text-[10px] text-[var(--text-muted)] uppercase font-bold tracking-wider">Critical Blockers</span>
            <div className="text-xl font-bold text-red-500 mt-1">{criticalGaps.length} {criticalGaps.length === 1 ? "Skill" : "Skills"}</div>
            <div className="text-[11px] text-[var(--text-secondary)] truncate">{criticalGapsNames}</div>
          </SpotlightCard>

          <SpotlightCard className="p-5">
            <span className="text-[10px] text-[var(--text-muted)] uppercase font-bold tracking-wider">Est. Time to Close</span>
            <div className="text-xl font-bold text-[var(--accent)] mt-1">{totalGapHours} Hours</div>
            <div className="text-[11px] text-[var(--text-secondary)]">~{estimatedWeeks} {estimatedWeeks === 1 ? "week" : "weeks"} at 10h/week</div>
          </SpotlightCard>

          <div className="rounded-3xl bg-gradient-to-br from-[var(--bg-card-subtle)] to-[var(--bg-card)] border border-[var(--accent)]/30 p-5 flex flex-col justify-between card-hover-effect">
            <span className="text-[10px] text-[var(--accent)] uppercase font-bold tracking-wider flex items-center gap-1">
              <Zap className="h-3 w-3" />
              <span>Simulate Lift</span>
            </span>
            <div className="text-xs font-semibold text-[var(--text-primary)]">Test how learning a skill boosts score</div>
            <Link
              href="/what-if"
              className="inline-flex items-center gap-1.5 text-xs text-[var(--accent)] hover:underline font-bold"
            >
              <span>Launch Simulator</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 border-b border-[var(--border-color)] pb-3">
          {(["All", "Critical", "Advantage", "Bonus"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterType(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                filterType === cat
                  ? "bg-[var(--accent)] text-white font-semibold shadow-sm"
                  : "bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)] border border-[var(--border-color)]"
              }`}
            >
              {cat} {cat !== "All" && `(${skillGaps.filter((g) => g.category === cat).length})`}
            </button>
          ))}
        </div>

        {/* Skill Gap Cards List */}
        <div className="space-y-4">
          {filteredGaps.map((gap) => {
            const categoryBadge =
              gap.category === "Critical"
                ? "bg-red-500/15 border-red-500/30 text-red-500"
                : gap.category === "Advantage"
                ? "bg-amber-500/15 border-amber-500/30 text-amber-500"
                : "bg-blue-500/15 border-blue-500/30 text-blue-500";

            return (
              <SpotlightCard
                key={gap.id}
                className="p-6 space-y-4 card-hover-effect"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${categoryBadge}`}>
                      {gap.category} Priority
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)]">{gap.name}</h3>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)]">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-[var(--accent)]" />
                      ~{gap.estimatedHours} hrs
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-emerald-500 font-semibold">
                      <TrendingUp className="h-3.5 w-3.5" />
                      {gap.marketDemand} Demand
                    </span>
                  </div>
                </div>

                {/* Level Comparison Bar */}
                <div className="space-y-1.5 p-4 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)]">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[var(--text-secondary)]">Current Proficiency: <strong className="text-[var(--text-primary)]">{gap.currentLevel}%</strong></span>
                    <span className="text-[var(--text-secondary)]">Required for Tier-1: <strong className="text-[var(--accent)]">{gap.requiredLevel}%</strong></span>
                  </div>

                  <div className="w-full h-3 rounded-full bg-[var(--bg-primary)] relative overflow-hidden border border-[var(--border-subtle)]">
                    {/* Target Required Level Indicator */}
                    <div
                      className="absolute top-0 bottom-0 bg-[var(--accent-soft)] rounded-full"
                      style={{ width: `${gap.requiredLevel}%` }}
                    />
                    {/* Current Student Level */}
                    <div
                      className="absolute top-0 bottom-0 bg-[var(--accent)] rounded-full shadow-lg"
                      style={{ width: `${gap.currentLevel}%` }}
                    />
                  </div>
                </div>

                {/* Recommended Action */}
                <div className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  <strong className="text-[var(--text-primary)]">Recommended Action:</strong> {gap.recommendedAction}
                </div>

                {/* Resources & CTA */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-3 border-t border-[var(--border-color)] gap-3">
                  <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                    <BookOpen className="h-3.5 w-3.5 text-[var(--accent)]" />
                    <span>Top Resource: <strong className="text-[var(--text-primary)]">{gap.resources[0].title}</strong> ({gap.resources[0].provider})</span>
                  </div>

                  <Link
                    href="/roadmap"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-semibold self-start sm:self-auto transition-all shadow-md"
                  >
                    <span>Add to Learning Roadmap</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
