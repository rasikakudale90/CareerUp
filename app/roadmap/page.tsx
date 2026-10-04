"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  GitBranch,
  Sparkles,
  CheckCircle2,
  Circle,
  Clock,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { AppShell } from "@/components/dashboard/AppShell";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { usePrototype } from "@/lib/prototype-state";

export default function RoadmapPage() {
  const {
    roadmap,
    toggleRoadmapTask,
    completeAllRoadmapTasks,
    resetRoadmapTasks,
    overallReadinessScore,
    completedTasksCount,
    totalTasksCount,
  } = usePrototype();

  const [activePhaseFilter, setActivePhaseFilter] = useState<number | "all">("all");
  const [expandedMilestones, setExpandedMilestones] = useState<Record<string, boolean>>({
    "m-1": true,
    "m-2": true,
    "m-3": true,
    "m-4": true,
  });

  const toggleExpand = (id: string) => {
    setExpandedMilestones((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const progressPercent = Math.round((completedTasksCount / totalTasksCount) * 100);

  const filteredRoadmap = activePhaseFilter === "all"
    ? roadmap
    : roadmap.filter((m) => m.phaseNumber === activePhaseFilter);

  return (
    <AppShell
      headerTitle="12-Week Personalized Career Roadmap"
      headerSubtitle="Complete curated milestones to close your skill gaps and directly elevate your verified hiring readiness score."
    >
      <div className="space-y-6">
        {/* Progress Header Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[var(--bg-card-subtle)] via-[var(--bg-card)] to-[var(--bg-primary)] border border-[var(--accent)]/30 p-6 shadow-xl card-hover-effect">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-soft)] border border-[var(--accent)]/40 text-xs text-[var(--accent)] font-bold mb-2 shimmer-badge">
                <Sparkles className="h-3 w-3" />
                <span>Active Target: AI Product Engineer</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                Roadmap Progress: {completedTasksCount} of {totalTasksCount} Tasks Completed ({progressPercent}%)
              </h2>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Checking off completed tasks automatically updates your hiring readiness index and triggers live ATS recalculation.
              </p>

              {/* Demo Action Buttons */}
              <div className="flex items-center gap-2.5 mt-4">
                <button
                  onClick={completeAllRoadmapTasks}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 font-semibold text-xs transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Complete All Tasks (Demo 100%)</span>
                </button>

                <button
                  onClick={resetRoadmapTasks}
                  className="px-3.5 py-1.5 rounded-xl bg-[var(--bg-card-subtle)] hover:bg-[var(--border-color)] border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)] font-semibold text-xs transition-all active:scale-95"
                >
                  <span>Reset Tasks</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-6 self-start md:self-auto bg-[var(--bg-card-subtle)] px-5 py-3 rounded-2xl border border-[var(--border-color)]">
              <div className="text-center">
                <span className="text-[10px] text-[var(--text-muted)] uppercase font-bold block">Live Readiness</span>
                <span className="text-2xl font-bold text-[var(--accent)] shimmer-text">{overallReadinessScore}%</span>
              </div>
              <div className="h-8 w-px bg-[var(--border-color)]" />
              <div className="text-center">
                <span className="text-[10px] text-[var(--text-muted)] uppercase font-bold block">Phases Active</span>
                <span className="text-2xl font-bold text-emerald-500">{roadmap.filter(m => m.tasks.some(t => t.completed)).length || 1} / 4</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2.5 rounded-full bg-[var(--bg-primary)] mt-6 overflow-hidden border border-[var(--border-subtle)]">
            <div
              className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Phase Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => setActivePhaseFilter("all")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 ${
              activePhaseFilter === "all"
                ? "bg-[var(--accent)] text-white shadow-md"
                : "bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            All 4 Phases ({totalTasksCount} Tasks)
          </button>

          {roadmap.map((m) => (
            <button
              key={m.id}
              onClick={() => setActivePhaseFilter(m.phaseNumber)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                activePhaseFilter === m.phaseNumber
                  ? "bg-[var(--accent)] text-white shadow-md"
                  : "bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              Phase {m.phaseNumber}: {m.title.split(":")[1]?.trim() || m.title}
            </button>
          ))}
        </div>

        {/* Milestone Timeline List */}
        <div className="space-y-6">
          {filteredRoadmap.map((milestone) => {
            const isExpanded = !!expandedMilestones[milestone.id];
            const completedInMilestone = milestone.tasks.filter((t) => t.completed).length;
            const milestoneProgress = Math.round((completedInMilestone / milestone.tasks.length) * 100);

            return (
              <SpotlightCard
                key={milestone.id}
                className="shadow-xl overflow-hidden transition-all card-hover-effect"
              >
                {/* Milestone Header / Toggle */}
                <div
                  onClick={() => toggleExpand(milestone.id)}
                  className="p-6 cursor-pointer hover:bg-[var(--bg-card-subtle)] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm shrink-0 border ${
                        milestone.status === "in-progress"
                          ? "bg-[var(--accent)] text-white border-[var(--accent)]"
                          : milestone.status === "completed"
                          ? "bg-emerald-500/15 text-emerald-500 border-emerald-500/30"
                          : "bg-[var(--bg-card-subtle)] text-[var(--text-muted)] border-[var(--border-color)]"
                      }`}
                    >
                      P{milestone.phaseNumber}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">
                          {milestone.timeframe}
                        </span>
                        <span className="text-[var(--text-muted)]">•</span>
                        <span className="text-[11px] text-[var(--text-secondary)]">
                          {completedInMilestone}/{milestone.tasks.length} Done ({milestoneProgress}%)
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)] tracking-tight mt-0.5">
                        {milestone.title}
                      </h3>
                      <p className="text-xs text-[var(--text-secondary)] mt-1">{milestone.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <button className="p-2 rounded-full hover:bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                      {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* Tasks List (when expanded) */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-[var(--border-color)] space-y-3 animate-in fade-in duration-200">
                    {milestone.tasks.map((task) => (
                      <div
                        key={task.id}
                        onClick={() => toggleRoadmapTask(milestone.id, task.id)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 group ${
                          task.completed
                            ? "bg-emerald-500/10 border-emerald-500/20 text-[var(--text-primary)]"
                            : "bg-[var(--bg-card-subtle)] border-[var(--border-subtle)] hover:border-[var(--accent)]/40"
                        }`}
                      >
                        <div className="flex items-start gap-3.5">
                          <button
                            type="button"
                            className="mt-0.5 shrink-0 transition-transform group-hover:scale-110"
                          >
                            {task.completed ? (
                              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                            ) : (
                              <Circle className="h-5 w-5 text-[var(--text-muted)] group-hover:text-[var(--accent)]" />
                            )}
                          </button>

                          <div>
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-xs font-bold ${
                                  task.completed ? "line-through text-[var(--text-muted)]" : "text-[var(--text-primary)]"
                                }`}
                              >
                                {task.title}
                              </span>
                              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[var(--bg-primary)] text-[var(--text-secondary)] border border-[var(--border-subtle)]">
                                {task.category}
                              </span>
                            </div>
                            <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                              {task.description}
                            </p>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="inline-flex items-center gap-1 text-[11px] font-bold text-[var(--accent)]">
                            <Sparkles className="h-3 w-3" />
                            <span>+{task.readinessDelta}% Score</span>
                          </div>
                          <div className="text-[10px] text-[var(--text-muted)] flex items-center justify-end gap-1 mt-1">
                            <Clock className="h-3 w-3" />
                            <span>~{task.estimatedHours}h</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </SpotlightCard>
            );
          })}
        </div>

        {/* 100% Roadmap Completion Celebratory Card */}
        {progressPercent >= 100 ? (
          <SpotlightCard className="rounded-3xl bg-gradient-to-r from-emerald-500/15 via-[var(--bg-card)] to-[var(--accent)]/15 border-2 border-emerald-500/40 p-8 shadow-2xl text-center space-y-4 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg">
              <ShieldCheck className="h-8 w-8 animate-bounce" />
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Tier-1 Industry Certification Ready</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                🎉 Congratulations! 12-Week Roadmap 100% Completed
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-xl mx-auto mt-2">
                You have closed all critical architectural skill gaps (pgvector RAG, LangGraph agents, containerization, and capstone polish). Your profile is now benchmarked in the top 5% of candidate pools.
              </p>
            </div>

            {/* Next Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/job-match"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[var(--accent)] text-white font-semibold text-xs sm:text-sm hover:bg-[var(--accent-hover)] transition-all flex items-center justify-center gap-2 shadow-xl hover:scale-105"
              >
                <span>Launch Job &amp; ATS Matcher</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/readiness"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[var(--bg-card-subtle)] hover:bg-[var(--border-color)] border border-[var(--border-color)] text-[var(--text-primary)] font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
              >
                <span>View Full Readiness Diagnostics</span>
              </Link>

              <Link
                href="/what-if"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[var(--bg-card-subtle)] hover:bg-[var(--border-color)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
              >
                <span>Simulate Next Senior Pivot</span>
              </Link>
            </div>
          </SpotlightCard>
        ) : (
          <div className="rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[var(--accent)]/15 text-[var(--accent)] flex items-center justify-center font-bold text-xs shrink-0">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[var(--text-primary)]">
                  Next Step After Roadmap Completion:
                </h4>
                <p className="text-[11px] text-[var(--text-secondary)]">
                  Once all 4 phases are completed, you unlock direct ATS Job Matching and AI Cover Letter generation.
                </p>
              </div>
            </div>

            <Link
              href="/job-match"
              className="px-4 py-2 rounded-xl bg-[var(--accent)]/15 hover:bg-[var(--accent)]/25 text-[var(--accent)] border border-[var(--accent)]/30 text-xs font-semibold transition-colors flex items-center gap-1.5 shrink-0"
            >
              <span>Preview Job Matches</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        )}
      </div>
    </AppShell>
  );
}
