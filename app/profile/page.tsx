"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  User,
  Sparkles,
  Award,
  BookOpen,
  Briefcase,
  Code2,
  ExternalLink,
  Edit3,
  CheckCircle2,
  FolderGit2,
} from "lucide-react";
import { AppShell } from "@/components/dashboard/AppShell";
import { RadarChartDNA } from "@/components/dashboard/RadarChartDNA";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { usePrototype } from "@/lib/prototype-state";

export default function ProfilePage() {
  const { studentProfile, overallReadinessScore } = usePrototype();
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Technical", "Analytical", "Communication", "Leadership"];

  const filteredSkills =
    activeCategory === "All"
      ? studentProfile.skills
      : studentProfile.skills.filter((s) => s.category === activeCategory);

  return (
    <AppShell
      headerTitle="Student Career DNA & Profile"
      headerSubtitle="Inspect your multidimensional skill matrix, verified project portfolio, and AI behavioral synthesis."
    >
      <div className="space-y-6">
        {/* Profile Card Header */}
        <SpotlightCard className="rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={studentProfile.avatarUrl}
                alt={studentProfile.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-[var(--accent)] shadow-xl"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
                    {studentProfile.name}
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                    Verified Candidate
                  </span>
                </div>
                <p className="text-xs text-[var(--accent)] font-semibold mt-0.5">{studentProfile.title}</p>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  {studentProfile.degree} • {studentProfile.university} ({studentProfile.graduationYear})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/onboarding"
                className="px-4 py-2 rounded-xl bg-[var(--bg-card-subtle)] hover:bg-[var(--border-color)] border border-[var(--border-color)] text-xs font-semibold text-[var(--text-primary)] transition-colors"
              >
                Re-upload Resume
              </Link>
              <div className="px-4 py-2 rounded-xl bg-[var(--accent)]/15 border border-[var(--accent)]/30 text-xs font-bold text-[var(--accent)]">
                {overallReadinessScore}% Readiness
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-[var(--border-color)] text-xs text-[var(--text-secondary)] leading-relaxed">
            <strong className="text-[var(--text-primary)] block mb-1">AI Career DNA Summary:</strong>
            {studentProfile.careerDNASummary}
          </div>
        </SpotlightCard>

        {/* DNA Radar & Skill Matrix Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Radar Column (5 cols) */}
          <SpotlightCard className="lg:col-span-5 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] p-6 shadow-xl flex flex-col justify-between">
            <span className="text-sm font-bold text-[var(--text-primary)]">Multidimensional DNA Polygon</span>

            <div className="py-6 flex items-center justify-center">
              <RadarChartDNA scores={studentProfile.radarScores} size={220} />
            </div>

            <div className="space-y-2 text-xs pt-4 border-t border-[var(--border-color)]">
              <div className="flex justify-between text-[var(--text-secondary)]">
                <span>Technical Depth</span>
                <span className="font-bold text-[var(--text-primary)]">{studentProfile.radarScores.technical}%</span>
              </div>
              <div className="flex justify-between text-[var(--text-secondary)]">
                <span>Analytical Rigor</span>
                <span className="font-bold text-[var(--text-primary)]">{studentProfile.radarScores.analytical}%</span>
              </div>
              <div className="flex justify-between text-[var(--text-secondary)]">
                <span>Communication &amp; Craft</span>
                <span className="font-bold text-[var(--text-primary)]">{studentProfile.radarScores.communication}%</span>
              </div>
              <div className="flex justify-between text-[var(--text-secondary)]">
                <span>Ownership &amp; Leadership</span>
                <span className="font-bold text-[var(--text-primary)]">{studentProfile.radarScores.leadership}%</span>
              </div>
            </div>
          </SpotlightCard>

          {/* Verified Skills Column (7 cols) */}
          <SpotlightCard className="lg:col-span-7 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-sm font-bold text-[var(--text-primary)]">Verified Skill Stack ({filteredSkills.length})</span>
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all hover:scale-105 active:scale-95 ${
                      activeCategory === cat
                        ? "bg-[var(--accent)] text-white font-semibold shadow-md"
                        : "bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border hover:border-[var(--accent)]/40"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
              {filteredSkills.map((sk) => (
                <div
                  key={sk.name}
                  className="p-3.5 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] space-y-2 hover:border-[var(--accent)]/60 hover:translate-x-1 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                        {sk.name}
                      </span>
                      <span className="text-[10px] text-[var(--text-secondary)] px-2 py-0.5 rounded bg-black/10 dark:bg-black/40">
                        {sk.category}
                      </span>
                    </div>
                    <span className="font-bold text-[var(--accent)]">{sk.proficiency}%</span>
                  </div>

                  <div className="w-full h-1.5 rounded-full bg-black/10 dark:bg-black/40 overflow-hidden">
                    <div
                      className="h-full bg-[var(--accent)] rounded-full transition-all duration-500"
                      style={{ width: `${sk.proficiency}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </SpotlightCard>
        </div>

        {/* Projects Section */}
        <SpotlightCard className="rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2">
            <FolderGit2 className="h-4 w-4 text-[var(--accent)]" />
            <h3 className="text-sm font-bold text-[var(--text-primary)]">Verified Project Portfolio</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {studentProfile.projects.map((proj) => (
              <div
                key={proj.id}
                className="p-4 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-xl hover:border-[var(--accent)] transition-all duration-300 group"
              >
                <div>
                  <h4 className="text-xs font-bold text-[var(--text-primary)] mb-1 group-hover:text-[var(--accent)] transition-colors">
                    {proj.title}
                  </h4>
                  <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed mb-3">{proj.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {proj.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded bg-[var(--border-color)] text-[10px] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:scale-105 transition-all cursor-default"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-[var(--border-color)] flex items-center justify-between text-[11px]">
                  <span className="text-emerald-500 font-medium">{proj.metrics}</span>
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[var(--accent)] hover:underline flex items-center gap-1 hover:scale-105 active:scale-95 transition-transform"
                    >
                      <Code2 className="h-3 w-3" />
                      <span>Code</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </SpotlightCard>

        {/* AI Interaction History Section */}
        <SpotlightCard className="rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[var(--accent)]" />
              <h3 className="text-sm font-bold text-[var(--text-primary)]">AI Interaction History & Audit Trail</h3>
            </div>
            <span className="text-[10px] text-[var(--text-muted)] uppercase font-bold tracking-wider">
              Gemini 2.5 Flash Verified
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[var(--text-primary)]">Resume Parsing &amp; Career DNA Extraction</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-500 font-semibold">Processed</span>
                </div>
                <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                  Extracted 94% Next.js proficiency, reactive frontend architecture, and recommended 92% match for AI Product Engineer.
                </p>
              </div>
              <span className="text-[10px] text-[var(--text-muted)] shrink-0">Today at 09:45 AM</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[var(--text-primary)]">Skill Gap Diagnostic Evaluation</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/15 text-blue-500 font-semibold">Analyzed</span>
                </div>
                <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                  Identified Vector Databases &amp; LangGraph as top 2 critical blockers (~54 hours estimated learning time).
                </p>
              </div>
              <span className="text-[10px] text-[var(--text-muted)] shrink-0">Today at 09:47 AM</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[var(--text-primary)]">What-If Skill Acquisition Simulation</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--accent)]/15 text-[var(--accent)] font-semibold">Simulated</span>
                </div>
                <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                  Tested LangGraph + Vector DB acquisition. Result: +14% hiring readiness and +$25,000 projected starting compensation.
                </p>
              </div>
              <span className="text-[10px] text-[var(--text-muted)] shrink-0">Today at 09:50 AM</span>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </AppShell>
  );
}

