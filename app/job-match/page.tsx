"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  Sparkles,
  Search,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ExternalLink,
  Upload,
  Plus,
  Building,
  Check,
} from "lucide-react";
import { AppShell } from "@/components/dashboard/AppShell";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { usePrototype } from "@/lib/prototype-state";

export default function JobMatchPage() {
  const { jobMatches, applyToJob, addCustomJobMatch } = usePrototype();
  const [activeTab, setActiveTab] = useState<"browse" | "custom">("browse");
  const [customRoleTitle, setCustomRoleTitle] = useState("");
  const [customCompany, setCustomCompany] = useState("");
  const [customJD, setCustomJD] = useState("");
  const [isParsing, setIsParsing] = useState(false);

  const handleParseCustomJD = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customJD.trim() || !customRoleTitle.trim()) return;

    setIsParsing(true);
    setTimeout(() => {
      addCustomJobMatch({
        id: `custom-job-${Date.now()}`,
        company: customCompany || "Target Tech Co.",
        companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80",
        title: customRoleTitle,
        location: "Remote / Hybrid",
        workType: "Remote",
        salaryRange: "$150,000 – $180,000",
        matchPercentage: 87,
        postedDate: "Parsed Just Now",
        requiredSkills: ["Next.js", "TypeScript", "FastAPI", "Vector Search", "LangGraph"],
        matchedSkills: ["Next.js", "TypeScript", "FastAPI"],
        missingSkills: ["Vector Search", "LangGraph"],
        description: customJD,
      });
      setIsParsing(false);
      setActiveTab("browse");
      setCustomRoleTitle("");
      setCustomCompany("");
      setCustomJD("");
    }, 900);
  };

  return (
    <AppShell
      headerTitle="Job Description & ATS Compatibility Engine"
      headerSubtitle="Upload or select real tech job descriptions to benchmark your resume against specific hiring rubrics."
    >
      <div className="space-y-6">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-3 border-b border-[var(--border-color)] pb-3">
          <button
            onClick={() => setActiveTab("browse")}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              activeTab === "browse"
                ? "bg-[var(--accent)] text-white shadow-md"
                : "bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            Curated Tech Openings ({jobMatches.length})
          </button>
          <button
            onClick={() => setActiveTab("custom")}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "custom"
                ? "bg-[var(--accent)] text-white shadow-md"
                : "bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Analyze Custom Job Description</span>
          </button>
        </div>

        {activeTab === "browse" ? (
          /* Job Cards List */
          <div className="space-y-4">
            {jobMatches.map((job) => (
              <SpotlightCard
                key={job.id}
                className="rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] p-6 shadow-xl space-y-4 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={job.companyLogo}
                      alt={job.company}
                      className="w-12 h-12 rounded-2xl object-cover border border-[var(--border-color)]"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[var(--text-primary)]">{job.company}</span>
                        <span className="text-[var(--text-muted)]">•</span>
                        <span className="text-xs text-[var(--text-secondary)]">{job.location}</span>
                      </div>
                      <h3 className="text-base font-bold text-[var(--text-primary)] tracking-tight mt-0.5">
                        {job.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-start sm:self-auto">
                    <div className="text-right">
                      <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-bold">
                        {job.matchPercentage}% ATS Fit
                      </div>
                      <span className="text-[10px] text-[var(--text-muted)] block mt-0.5">{job.salaryRange}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{job.description}</p>

                {/* Skills Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-xs">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-emerald-500 block mb-1.5 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>Matching Verified Skills ({job.matchedSkills.length})</span>
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {job.matchedSkills.map((sk) => (
                        <span
                          key={sk}
                          className="px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-300 text-[11px]"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase text-amber-500 dark:text-amber-400 block mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <XCircle className="h-3 w-3 text-red-500" />
                        <span>Missing Bridge Requirements ({job.missingSkills.length})</span>
                      </span>
                      <span className="text-[10px] text-[var(--text-muted)] lowercase font-normal">
                        (click to bridge)
                      </span>
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {job.missingSkills.map((sk) => (
                        <Link
                          key={sk}
                          href="/roadmap"
                          className="px-2.5 py-1 rounded-md bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-600 dark:text-red-300 text-[11px] font-medium transition-all flex items-center gap-1 group/skill shadow-sm"
                          title="Click to view roadmap tasks bridging this requirement"
                        >
                          <span>{sk}</span>
                          <span className="text-[10px] text-red-500 group-hover/skill:translate-x-0.5 transition-transform">➔</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-[var(--border-color)]">
                  <span className="text-[11px] text-[var(--text-muted)]">Posted {job.postedDate}</span>

                  <div className="flex items-center gap-2.5">
                    <Link
                      href="/skill-gap"
                      className="px-3.5 py-1.5 rounded-xl bg-[var(--bg-card-subtle)] hover:bg-[var(--border-color)] text-xs font-semibold text-[var(--text-primary)] transition-colors border border-[var(--border-color)]"
                    >
                      Close Skill Gaps
                    </Link>

                    <button
                      onClick={() => applyToJob(job.id)}
                      disabled={job.applied}
                      className={`px-4 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md ${
                        job.applied
                          ? "bg-emerald-600 text-white cursor-default"
                          : "bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white"
                      }`}
                    >
                      {job.applied ? (
                        <>
                          <Check className="h-3.5 w-3.5" />
                          <span>Applied via Portfolio</span>
                        </>
                      ) : (
                        <>
                          <span>Apply Simulated</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        ) : (
          /* Custom JD Parser Form */
          <SpotlightCard className="rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] p-6 sm:p-8 shadow-2xl">
            <h3 className="text-base font-bold text-[var(--text-primary)] mb-2">Analyze Any Tech Job Posting</h3>
            <p className="text-xs text-[var(--text-secondary)] mb-6">
              Paste the job description from Greenhouse, Lever, LinkedIn, or Workday to compute your ATS fit score and highlight required bridges.
            </p>

            <form onSubmit={handleParseCustomJD} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">
                    Job Title / Role Name
                  </label>
                  <input
                    type="text"
                    required
                    value={customRoleTitle}
                    onChange={(e) => setCustomRoleTitle(e.target.value)}
                    placeholder="e.g. AI Engineer, LLM Platforms"
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={customCompany}
                    onChange={(e) => setCustomCompany(e.target.value)}
                    placeholder="e.g. Stripe, OpenAI, Mistral"
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">
                  Job Description Text
                </label>
                <textarea
                  rows={6}
                  required
                  value={customJD}
                  onChange={(e) => setCustomJD(e.target.value)}
                  placeholder="Paste responsibilities, requirements, and tech stack requirements here..."
                  className="w-full p-4 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)]"
                />
              </div>

              <button
                type="submit"
                disabled={isParsing}
                className="w-full py-3.5 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                {isParsing ? (
                  <span>Extracting ATS Match Signals...</span>
                ) : (
                  <>
                    <span>Run Compatibility Analysis</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </SpotlightCard>
        )}
      </div>
    </AppShell>
  );
}
