"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  Compass,
  BarChart3,
  GitBranch,
  Sparkles,
  Briefcase,
  ArrowRight,
  ChevronRight,
  Bookmark,
  CheckCircle2,
  Zap,
  Upload,
  FileText,
  Loader2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { AppShell } from "@/components/dashboard/AppShell";
import { RadarChartDNA } from "@/components/dashboard/RadarChartDNA";
import { CircularProgress } from "@/components/dashboard/CircularProgress";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { usePrototype } from "@/lib/prototype-state";

export default function DashboardPage() {
  const {
    hasUploadedResume,
    parseAndUploadResumeFile,
    studentProfile,
    careerPaths,
    selectedCareerId,
    setSelectedCareerId,
    selectedCareer,
    skillGaps,
    roadmap,
    jobMatches,
    insights,
    overallReadinessScore,
    completedTasksCount,
    totalTasksCount,
    greeting,
  } = usePrototype();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState<string | null>(null);

  const topMatches = careerPaths.slice(0, 3);
  const criticalGaps = skillGaps.filter((g) => g.category === "Critical");
  const topMissingSkill = criticalGaps[0]?.name || selectedCareer.keyMissingSkills?.[0] || "Agentic Workflows";
  const potentialLift = Math.min(18, Math.max(8, 99 - selectedCareer.matchScore));

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setIsUploading(true);
      await new Promise((r) => setTimeout(r, 900));
      await parseAndUploadResumeFile(file);
      setIsUploading(false);
      setUploadSuccessMessage(`Successfully calibrated Career DNA from ${file.name}!`);
      setTimeout(() => setUploadSuccessMessage(null), 4000);
    }
  };

  return (
    <AppShell
      headerTitle={`${greeting}, ${studentProfile.name.split(" ")[0]} 👋`}
      headerSubtitle="Your future is full of possibilities. Let's explore."
    >
      <div className="space-y-6">
        {/* Hidden Global File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf,.docx,.txt"
          className="hidden"
        />

        {/* UPLOAD RESUME CALLOUT BANNER (Addresses Bug 1 & 2) */}
        {!hasUploadedResume ? (
          <SpotlightCard className="p-6 rounded-3xl bg-gradient-to-r from-amber-500/15 via-[var(--bg-card)] to-[var(--accent)]/15 border-2 border-amber-500/40 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0 border border-amber-500/30 shadow-md">
                  <Upload className="h-6 w-6 animate-bounce" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                      Action Required
                    </span>
                    <span className="text-xs text-[var(--text-muted)]">Sample Baseline Preview Mode</span>
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-[var(--text-primary)]">
                    Upload Your Resume to Calibrate Your Live Career DNA &amp; Stats
                  </h2>
                  <p className="text-xs text-[var(--text-secondary)] mt-1 max-w-xl">
                    The scores below are currently showing a baseline preview. Upload your real resume to extract verified skills, unlock tailored career match percentages, and generate your custom 12-week roadmap.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-wrap shrink-0">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="px-5 py-3 rounded-2xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold text-xs transition-all flex items-center gap-2 shadow-xl hover:scale-105 active:scale-95"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Calibrating Stats...</span>
                    </>
                  ) : (
                    <>
                      <FileText className="h-4 w-4" />
                      <span className="shimmer-text">Upload Resume Now</span>
                    </>
                  )}
                </button>

                <Link
                  href="/onboarding"
                  className="px-4 py-3 rounded-2xl bg-[var(--bg-card-subtle)] hover:bg-[var(--border-color)] border border-[var(--border-color)] text-xs font-semibold text-[var(--text-primary)] transition-all flex items-center gap-1.5"
                >
                  <span>4-Step AI Ingestion</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </SpotlightCard>
        ) : (
          /* Calibrated Success Bar with Fast In-Place Re-Upload */
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-md">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>
                {uploadSuccessMessage || `Career DNA calibrated for ${studentProfile.name} • ${studentProfile.skills.length} verified skills active`}
              </span>
            </div>

            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[var(--accent)] hover:underline self-start sm:self-auto"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isUploading ? "animate-spin" : ""}`} />
              <span>Upload Different Resume</span>
            </button>
          </div>
        )}

        {/* TOP ROW: Career DNA + Top Career Matches + What-If Hero Widget */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Card 1: Your Career DNA (4 cols) with Spotlight Effect */}
          <div className="lg:col-span-4">
            <SpotlightCard className="p-6 flex flex-col justify-between shadow-2xl card-hover-effect h-full">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-[var(--text-primary)] tracking-tight flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-[var(--accent)]" />
                  Your Career DNA
                </span>
                <Link href="/profile" className="text-xs text-[var(--accent)] hover:underline flex items-center gap-1">
                  Deep Dive <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="py-2 flex items-center justify-center">
                <RadarChartDNA scores={studentProfile.radarScores} size={190} />
              </div>

              {/* Matrix Pills with hover glows */}
              <div className="grid grid-cols-2 gap-2 text-xs pt-3 border-t border-[var(--border-color)]">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] interactive-pill">
                  <span className="text-[var(--text-secondary)]">Technical</span>
                  <span className="font-bold text-[var(--text-primary)]">{studentProfile.radarScores.technical}%</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] interactive-pill">
                  <span className="text-[var(--text-secondary)]">Analytical</span>
                  <span className="font-bold text-[var(--text-primary)]">{studentProfile.radarScores.analytical}%</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] interactive-pill">
                  <span className="text-[var(--text-secondary)]">Communication</span>
                  <span className="font-bold text-[var(--text-primary)]">{studentProfile.radarScores.communication}%</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] interactive-pill">
                  <span className="text-[var(--text-secondary)]">Leadership</span>
                  <span className="font-bold text-[var(--text-primary)]">{studentProfile.radarScores.leadership}%</span>
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* Card 2: Top Career Matches (4 cols) with Spotlight Effect */}
          <div className="lg:col-span-4">
            <SpotlightCard className="p-6 flex flex-col justify-between shadow-2xl card-hover-effect h-full">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-[var(--text-primary)] tracking-tight flex items-center gap-1.5">
                  <Compass className="h-4 w-4 text-[var(--accent)]" />
                  Top Career Matches
                </span>
                <Link href="/career" className="text-xs text-[var(--accent)] hover:underline flex items-center gap-1">
                  See All ({careerPaths.length}) <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="space-y-3">
                {topMatches.map((career) => {
                  const isSelected = selectedCareerId === career.id;
                  return (
                    <div
                      key={career.id}
                      onClick={() => setSelectedCareerId(career.id)}
                      className={`p-3.5 rounded-2xl bg-[var(--bg-card-subtle)] border transition-all cursor-pointer group ${
                        isSelected
                          ? "border-[var(--accent)] ring-1 ring-[var(--accent)]/40 bg-[var(--accent-soft)]/20 shadow-md"
                          : "border-[var(--border-subtle)] hover:border-[var(--accent)]/60"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2.5">
                        <div className="flex items-start gap-3 min-w-0 flex-1">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform ${
                              isSelected
                                ? "bg-[var(--accent)] text-white"
                                : "bg-[var(--accent-soft)] text-[var(--accent)]"
                            }`}
                          >
                            <Compass className="h-5 w-5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-xs font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors leading-snug">
                                {career.title}
                              </span>
                              {isSelected && (
                                <span className="text-[9px] px-1.5 py-0.2 rounded bg-[var(--accent)] text-white font-bold">
                                  Selected
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-[var(--text-secondary)] mt-0.5">
                              {career.avgSalary} • {career.openRolesCount} Openings
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span
                            className={`px-2.5 py-1 rounded-full font-bold text-xs inline-block transition-all ${
                              career.matchScore >= 90
                                ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-400"
                                : career.matchScore >= 80
                                ? "bg-[var(--accent-soft)] border border-[var(--accent)]/40 text-[var(--accent)]"
                                : "bg-amber-500/15 border border-amber-500/30 text-amber-400"
                            }`}
                          >
                            {career.matchScore}% Match
                          </span>
                        </div>
                      </div>

                      {/* Visual Match Progress Bar */}
                      <div className="w-full bg-[var(--border-color)] h-1.5 rounded-full mt-2.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            career.matchScore >= 90
                              ? "bg-emerald-500"
                              : career.matchScore >= 80
                              ? "bg-[var(--accent)]"
                              : "bg-amber-500"
                          }`}
                          style={{ width: `${career.matchScore}%` }}
                        />
                      </div>

                      {/* Key Match Components Tags */}
                      <div className="flex items-center justify-between text-[10px] mt-2 text-[var(--text-secondary)] pt-1.5 border-t border-[var(--border-subtle)]">
                        <span className="truncate pr-1">
                          <span className="text-[var(--text-muted)]">Fit:</span> {career.whyFit?.[0]?.slice(0, 30) || career.category}...
                        </span>
                        <span className="shrink-0 text-amber-400/90 font-medium">
                          Gap: {career.keyMissingSkills?.[0]?.split(" ")[0] || "Bridge"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Link
                href="/career"
                className="mt-3 w-full py-2.5 rounded-xl bg-[var(--bg-card-subtle)] hover:bg-[var(--bg-card)] border border-[var(--border-color)] text-xs font-semibold text-[var(--text-primary)] flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              >
                <span>Explore Match Explanations</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </SpotlightCard>
          </div>

          {/* Card 3: What-If Simulator Feature Card (4 cols) */}
          <div className="lg:col-span-4">
            <div className="h-full rounded-3xl bg-gradient-to-br from-[var(--bg-card-subtle)] via-[var(--bg-card)] to-[var(--bg-primary)] border border-[var(--accent)]/30 p-6 flex flex-col justify-between shadow-2xl card-hover-effect relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-36 h-36 bg-[var(--accent-soft)] rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-soft)] border border-[var(--accent)]/40 text-[var(--accent)] text-xs font-bold mb-3 shimmer-badge">
                  <Zap className="h-3.5 w-3.5 animate-bounce" />
                  <span>What If Simulator</span>
                </div>

                <h3 className="text-base font-bold text-[var(--text-primary)] mb-2 leading-snug">
                  What if you acquire {topMissingSkill}?
                </h3>

                <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                  Simulate how acquiring {topMissingSkill} elevates your {selectedCareer.title} fit to 98% and unlocks {selectedCareer.openRolesCount.toLocaleString()}+ positions.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] flex items-center justify-between text-xs">
                  <span className="text-[var(--text-secondary)]">Projected Match Lift:</span>
                  <span className="font-bold text-emerald-500 shimmer-text">+{potentialLift}% to {selectedCareer.title.split(" ")[0]}</span>
                </div>

                <Link
                  href="/what-if"
                  className="w-full py-3 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Launch What-If Sandbox</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* MIDDLE ROW: Skill Gap Analysis + 12-Week Roadmap Preview + Job Matches */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Skill Gap Analysis (4 cols) */}
          <div className="lg:col-span-4">
            <SpotlightCard className="p-6 flex flex-col justify-between shadow-2xl card-hover-effect h-full">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-[var(--text-primary)] tracking-tight flex items-center gap-1.5">
                  <BarChart3 className="h-4 w-4 text-[var(--accent)]" />
                  Skill Gap Analysis
                </span>
                <Link href="/skill-gap" className="text-xs text-[var(--accent)] hover:underline">
                  View All Gaps →
                </Link>
              </div>

              <div className="flex items-center gap-5 py-2">
                <CircularProgress value={overallReadinessScore} size={105} strokeWidth={9} color="var(--accent)" />
                <div className="space-y-2 flex-1 text-xs">
                  <div className="flex items-center justify-between p-1.5 rounded-lg bg-[var(--bg-card-subtle)]">
                    <span className="text-[var(--text-secondary)] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      Verified Skills
                    </span>
                    <span className="font-bold text-[var(--text-primary)]">{studentProfile.skills.length}</span>
                  </div>
                  <div className="flex items-center justify-between p-1.5 rounded-lg bg-[var(--bg-card-subtle)]">
                    <span className="text-[var(--text-secondary)] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      Skills in Progress
                    </span>
                    <span className="font-bold text-[var(--text-primary)]">{completedTasksCount}</span>
                  </div>
                  <div className="flex items-center justify-between p-1.5 rounded-lg bg-[var(--bg-card-subtle)]">
                    <span className="text-[var(--text-secondary)] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                      Critical Gaps
                    </span>
                    <span className="font-bold text-[var(--text-primary)]">{criticalGaps.length}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--border-color)]">
                <div className="text-[11px] text-[var(--text-secondary)] mb-1">Top Priority Gap to Close:</div>
                <div className="text-xs font-semibold text-[var(--text-primary)] flex items-center justify-between">
                  <span className="truncate pr-2">{criticalGaps[0]?.name || "Core Infrastructure"}</span>
                  <span className="text-[10px] text-[var(--accent)] font-bold shrink-0">~{criticalGaps[0]?.estimatedHours || 15} hrs</span>
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* 12-Week Roadmap Interactive (5 cols) */}
          <div className="lg:col-span-5">
            <SpotlightCard className="p-6 flex flex-col justify-between shadow-2xl card-hover-effect h-full">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-sm font-bold text-[var(--text-primary)] tracking-tight flex items-center gap-1.5">
                    <GitBranch className="h-4 w-4 text-[var(--accent)]" />
                    Your Personalized Roadmap
                  </span>
                  <div className="text-[11px] text-[var(--text-secondary)]">12 Weeks Plan • {completedTasksCount}/{totalTasksCount} Tasks Done</div>
                </div>
                <Link href="/roadmap" className="text-xs text-[var(--accent)] hover:underline">
                  Full Plan →
                </Link>
              </div>

              <div className="space-y-3">
                {roadmap.slice(0, 3).map((milestone) => (
                  <div
                    key={milestone.id}
                    className="p-3.5 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] flex items-center justify-between hover:border-[var(--accent)]/40 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold ${
                          milestone.status === "in-progress"
                            ? "bg-[var(--accent)] text-white"
                            : "bg-[var(--bg-card)] text-[var(--text-secondary)]"
                        }`}
                      >
                        P{milestone.phaseNumber}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-[var(--text-primary)]">{milestone.title}</div>
                        <div className="text-[10px] text-[var(--text-secondary)]">{milestone.timeframe}</div>
                      </div>
                    </div>

                    <div className="text-right text-[11px]">
                      <span className="text-emerald-500 font-semibold">
                        {milestone.tasks.filter((t) => t.completed).length}/{milestone.tasks.length} Done
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/roadmap"
                className="mt-3 w-full py-2.5 rounded-xl bg-[var(--bg-card-subtle)] hover:bg-[var(--bg-card)] border border-[var(--border-color)] text-xs font-semibold text-[var(--text-primary)] flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              >
                <span>Continue Learning Tasks</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </SpotlightCard>
          </div>

          {/* Job Matches (3 cols) */}
          <div className="lg:col-span-3">
            <SpotlightCard className="p-6 flex flex-col justify-between shadow-2xl card-hover-effect h-full">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-[var(--text-primary)] tracking-tight flex items-center gap-1.5">
                  <Briefcase className="h-4 w-4 text-[var(--accent)]" />
                  Job Matches
                </span>
                <Link href="/job-match" className="text-xs text-[var(--accent)] hover:underline">
                  See All →
                </Link>
              </div>

              <div className="space-y-3">
                {jobMatches.slice(0, 2).map((job) => (
                  <div key={job.id} className="p-3 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] space-y-2 hover:border-[var(--accent)]/40 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[var(--text-primary)]">{job.company}</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 text-[10px] font-bold">
                        {job.matchPercentage}% Match
                      </span>
                    </div>
                    <div className="text-[11px] text-[var(--text-secondary)] line-clamp-1">{job.title}</div>
                    <div className="text-[10px] text-[var(--text-muted)]">{job.salaryRange}</div>
                  </div>
                ))}
              </div>

              <Link
                href="/job-match"
                className="mt-3 w-full py-2.5 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-xs font-semibold text-white flex items-center justify-center gap-2 transition-all shadow-lg hover:scale-[1.02]"
              >
                <span>Analyze Job Openings</span>
                <Briefcase className="h-3.5 w-3.5" />
              </Link>
            </SpotlightCard>
          </div>
        </div>

        {/* RECENT AI INSIGHTS & SIGNALS */}
        <SpotlightCard className="p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[var(--accent)]" />
              <span className="text-sm font-bold text-[var(--text-primary)]">Recent AI Career Insights</span>
            </div>
            <span className="text-xs text-[var(--text-secondary)]">Updated in real-time</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {insights.map((insight) => (
              <div
                key={insight.id}
                className="p-4 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] flex flex-col justify-between hover:border-[var(--accent)]/40 transition-all card-hover-effect"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[var(--accent)] mb-1.5">
                    <span>{insight.category}</span>
                    <span className="text-[var(--text-muted)]">{insight.date}</span>
                  </div>
                  <div className="text-xs font-bold text-[var(--text-primary)] mb-1">{insight.title}</div>
                  <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed mb-4">{insight.message}</p>
                </div>

                <Link
                  href={insight.actionHref}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors"
                >
                  <span>{insight.actionText}</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </SpotlightCard>
      </div>
    </AppShell>
  );
}
