"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Compass,
  Sparkles,
  TrendingUp,
  Building2,
  CheckCircle2,
  ArrowRight,
  Filter,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { AppShell } from "@/components/dashboard/AppShell";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { usePrototype } from "@/lib/prototype-state";

export default function CareerPage() {
  const { careerPaths, selectedCareerId, setSelectedCareerId } = usePrototype();
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [expandedCareerId, setExpandedCareerId] = useState<string | null>(selectedCareerId);

  const categories = ["All", "AI & Product", "Engineering", "Machine Learning", "Design & UX", "Cloud & Infrastructure"];

  const filteredCareers =
    filterCategory === "All"
      ? careerPaths
      : careerPaths.filter((c) => c.category === filterCategory || (filterCategory === "Engineering" && c.category.includes("Engineering")));

  return (
    <AppShell
      headerTitle="AI Career Landscape & Recommendations"
      headerSubtitle="Explore high-growth career tracks tailored directly to your verified skill stack and project depth."
    >
      <div className="space-y-6">
        {/* Category Filters */}
        <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <Filter className="h-3.5 w-3.5 text-[var(--text-secondary)] mr-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  filterCategory === cat
                    ? "bg-[var(--accent)] text-white shadow-md font-semibold"
                    : "bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)] border border-[var(--border-color)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="text-xs text-[var(--text-secondary)]">
            Showing <span className="font-bold text-[var(--text-primary)]">{filteredCareers.length}</span> matching trajectories
          </div>
        </div>

        {/* Careers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCareers.map((career) => {
            const isExpanded = expandedCareerId === career.id;

            return (
              <SpotlightCard
                key={career.id}
                className={`p-6 flex flex-col justify-between card-hover-effect ${
                  isExpanded
                    ? "ring-2 ring-[var(--accent)]/50 shadow-2xl"
                    : ""
                }`}
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-2xl bg-[var(--accent-soft)] border border-[var(--accent)]/30 flex items-center justify-center text-[var(--accent)]">
                        <Compass className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-[var(--text-primary)] tracking-tight">{career.title}</h3>
                        <span className="text-xs text-[var(--text-secondary)]">{career.category}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-soft)] border border-[var(--accent)]/30 text-[var(--accent)] text-xs font-bold shimmer-badge">
                        <Sparkles className="h-3 w-3" />
                        <span>{career.matchScore}% Match</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">{career.description}</p>

                  {/* Stats Strip */}
                  <div className="grid grid-cols-3 gap-2 py-3 px-3.5 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] text-[11px] mb-4">
                    <div>
                      <span className="text-[var(--text-muted)] block text-[10px]">Avg Compensation</span>
                      <span className="font-bold text-[var(--text-primary)]">{career.avgSalary.split("–")[0]}</span>
                    </div>
                    <div>
                      <span className="text-[var(--text-muted)] block text-[10px]">Market Demand</span>
                      <span className="font-bold text-emerald-500">{career.marketDemand}</span>
                    </div>
                    <div>
                      <span className="text-[var(--text-muted)] block text-[10px]">Open Roles</span>
                      <span className="font-bold text-[var(--text-primary)]">{career.openRolesCount}+</span>
                    </div>
                  </div>

                  {/* Why Fit Breakdown */}
                  <div className="space-y-2 mb-4">
                    <span className="text-xs font-semibold text-[var(--text-primary)] block">Why You Match:</span>
                    {career.whyFit.map((fit, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{fit}</span>
                      </div>
                    ))}
                  </div>

                  {/* Expandable Details */}
                  {isExpanded && (
                    <div className="pt-4 mt-4 border-t border-[var(--border-color)] space-y-4 animate-in fade-in duration-300">
                      <div>
                        <span className="text-xs font-semibold text-[var(--text-primary)] block mb-1.5">
                          Critical Skills to Bridge:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {career.keyMissingSkills.map((sk) => (
                            <span
                              key={sk}
                              className="px-2.5 py-1 rounded-lg bg-red-500/15 border border-red-500/30 text-red-500 text-xs font-medium"
                            >
                              {sk}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="text-xs font-semibold text-[var(--text-primary)] block mb-1.5">
                          Top Hiring Employers:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {career.topCompanies.map((comp) => (
                            <span
                              key={comp}
                              className="px-2.5 py-1 rounded-lg bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-primary)] text-xs"
                            >
                              {comp}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-[var(--accent-soft)] border border-[var(--accent)]/20 text-xs text-[var(--text-secondary)]">
                        <span className="font-bold text-[var(--accent)] block mb-0.5">Growth Projection:</span>
                        {career.growthProjection}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer Actions */}
                <div className="pt-4 mt-4 border-t border-[var(--border-color)] flex items-center justify-between gap-3">
                  <button
                    onClick={() => setExpandedCareerId(isExpanded ? null : career.id)}
                    className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1 transition-colors"
                  >
                    <span>{isExpanded ? "Collapse" : "Full Details"}</span>
                    {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                  </button>

                  <div className="flex items-center gap-2">
                    <Link
                      href="/skill-gap"
                      className="px-3 py-1.5 rounded-xl bg-[var(--bg-card-subtle)] hover:bg-[var(--bg-card)] border border-[var(--border-color)] text-xs font-medium text-[var(--text-primary)] transition-colors"
                    >
                      Skill Gaps
                    </Link>
                    <Link
                      href="/roadmap"
                      className="px-3.5 py-1.5 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-xs font-semibold text-white transition-all shadow-md flex items-center gap-1.5"
                    >
                      <span>Start Roadmap</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
