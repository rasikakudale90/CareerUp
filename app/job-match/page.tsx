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
  X,
  Code2,
  Layers,
  BookOpen,
  Copy,
} from "lucide-react";
import { AppShell } from "@/components/dashboard/AppShell";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { usePrototype } from "@/lib/prototype-state";

export default function JobMatchPage() {
  const {
    jobMatches,
    applyToJob,
    addCustomJobMatch,
    simulatedSkills,
    toggleSimulatedSkill,
    isSimulatedSkillActive,
    roadmap,
    toggleRoadmapTask,
  } = usePrototype();

  const [activeTab, setActiveTab] = useState<"browse" | "custom">("browse");
  const [customRoleTitle, setCustomRoleTitle] = useState("");
  const [customCompany, setCustomCompany] = useState("");
  const [customJD, setCustomJD] = useState("");
  const [isParsing, setIsParsing] = useState(false);
  const [bridgedSkillNotification, setBridgedSkillNotification] = useState<string | null>(null);
  
  // Modal state for in-depth skill bridging
  const [activeModalSkill, setActiveModalSkill] = useState<{ skill: string; jobTitle: string; company: string } | null>(null);
  const [copiedBullet, setCopiedBullet] = useState(false);

  // Check if a skill name is bridged via roadmap completion or simulation
  const isSkillBridged = (skillName: string) => {
    const sName = skillName.toLowerCase();
    
    // Check simulated skills
    if (sName.includes("vector") && isSimulatedSkillActive("sim-vectordb")) return true;
    if (sName.includes("agent") && isSimulatedSkillActive("sim-langgraph")) return true;
    if (sName.includes("docker") && isSimulatedSkillActive("sim-docker")) return true;
    if (sName.includes("redis") && isSimulatedSkillActive("sim-redis")) return true;
    if (sName.includes("pytorch") && isSimulatedSkillActive("sim-pytorch")) return true;

    // Check completed roadmap tasks
    const completedTasks = roadmap.flatMap((m) => m.tasks).filter((t) => t.completed);
    if (sName.includes("vector") && completedTasks.some((t) => t.title.toLowerCase().includes("vector") || t.title.toLowerCase().includes("hybrid"))) return true;
    if (sName.includes("agent") && completedTasks.some((t) => t.title.toLowerCase().includes("agent") || t.title.toLowerCase().includes("langgraph"))) return true;
    if (sName.includes("docker") && completedTasks.some((t) => t.title.toLowerCase().includes("docker"))) return true;

    return false;
  };

  const handleQuickBridgeSkill = (skillName: string) => {
    const sName = skillName.toLowerCase();
    if (sName.includes("vector")) {
      toggleSimulatedSkill("sim-vectordb");
      setBridgedSkillNotification("✨ 'Vector DB (Pinecone/Milvus)' bridged! Match score jumped to 98%.");
    } else if (sName.includes("agent")) {
      toggleSimulatedSkill("sim-langgraph");
      setBridgedSkillNotification("✨ 'Agentic Tooling' bridged! Match score jumped to 96%.");
    } else if (sName.includes("docker")) {
      toggleSimulatedSkill("sim-docker");
      setBridgedSkillNotification("✨ 'Docker' bridged! Match score updated.");
    } else {
      toggleSimulatedSkill("sim-vectordb");
      setBridgedSkillNotification(`✨ '${skillName}' bridged via Simulation Sandbox.`);
    }

    setTimeout(() => {
      setBridgedSkillNotification(null);
    }, 4000);
  };

  const handleOpenBridgeModal = (skillName: string, jobTitle: string, company: string) => {
    setActiveModalSkill({ skill: skillName, jobTitle, company });
  };

  const handleCopyBullet = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBullet(true);
    setTimeout(() => setCopiedBullet(false), 2000);
  };

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
        {/* Floating Notification Toast */}
        {bridgedSkillNotification && (
          <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-semibold text-xs flex items-center justify-between shadow-2xl animate-in slide-in-from-top-3 duration-300">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              <span>{bridgedSkillNotification}</span>
            </div>
            <Link href="/readiness" className="underline hover:text-white text-[11px]">
              View Readiness ➔
            </Link>
          </div>
        )}

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
            {jobMatches.map((job) => {
              // Calculate dynamically bridged skills
              const actuallyMissing = job.missingSkills.filter((sk) => !isSkillBridged(sk));
              const bridgedSkills = job.missingSkills.filter((sk) => isSkillBridged(sk));
              const dynamicMatch = Math.min(
                99,
                job.matchPercentage + bridgedSkills.length * 7
              );

              return (
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
                        <div className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                          dynamicMatch >= 95
                            ? "bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 shadow-md"
                            : "bg-emerald-500/10 border border-emerald-500/30 text-emerald-500"
                        }`}>
                          {dynamicMatch}% ATS Fit {bridgedSkills.length > 0 && "(+Bridged)"}
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
                        <span>Matching Verified Skills ({job.matchedSkills.length + bridgedSkills.length})</span>
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
                        {bridgedSkills.map((sk) => (
                          <span
                            key={sk}
                            className="px-2 py-0.5 rounded-md bg-[var(--accent-soft)] border border-[var(--accent)]/40 text-[var(--accent)] text-[11px] font-bold flex items-center gap-1 shimmer-badge"
                          >
                            <Sparkles className="h-3 w-3" />
                            <span>{sk} (Bridged)</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase text-amber-500 dark:text-amber-400 block mb-1.5 flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          <XCircle className="h-3 w-3 text-red-500" />
                          <span>Missing Bridge Requirements ({actuallyMissing.length})</span>
                        </span>
                        {actuallyMissing.length > 0 && (
                          <span className="text-[10px] text-[var(--text-muted)] lowercase font-normal">
                            (click to bridge)
                          </span>
                        )}
                      </span>
                      
                      {actuallyMissing.length === 0 ? (
                        <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 py-1">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                          <span>All requirements fully bridged &amp; verified (98%+ Match)!</span>
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-1.5">
                          {actuallyMissing.map((sk) => (
                            <button
                              key={sk}
                              onClick={() => handleOpenBridgeModal(sk, job.title, job.company)}
                              className="px-2.5 py-1 rounded-md bg-red-500/10 hover:bg-red-500/25 border border-red-500/30 text-red-600 dark:text-red-300 text-[11px] font-medium transition-all flex items-center gap-1.5 group/skill shadow-sm active:scale-95"
                              title="Click for AI skill bridge options"
                            >
                              <span>{sk}</span>
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-red-500/20 text-red-400 font-bold group-hover/skill:bg-red-500 group-hover/skill:text-white transition-all">
                                ⚡ Bridge
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-[var(--border-color)]">
                    <span className="text-[11px] text-[var(--text-muted)]">Posted {job.postedDate}</span>

                    <div className="flex items-center gap-2.5">
                      <Link
                        href="/roadmap"
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
                            <span>Apply with Verified DNA</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </SpotlightCard>
              );
            })}
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

        {/* Skill Bridge Action Modal */}
        {activeModalSkill && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-xl bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative">
              <button
                onClick={() => setActiveModalSkill(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-[var(--bg-card-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-red-500 flex items-center justify-center text-white shadow-lg">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[var(--text-primary)]">
                    Bridge Requirement: {activeModalSkill.skill}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Target: {activeModalSkill.company} • {activeModalSkill.jobTitle}
                  </p>
                </div>
              </div>

              {/* 3 Suitable Implementation Paths */}
              <div className="space-y-3">
                {/* Option 1: Instant AI Simulation */}
                <div className="p-4 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--accent)]/30 hover:border-[var(--accent)] transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[var(--accent)] flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Option 1: Instant AI Sandbox Bridge (Recommended)</span>
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
                      +7% ATS Boost (98%)
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mb-3">
                    Instantly simulate Vector DB mastery in your profile to preview unlocked hiring pipelines, salary jump (+$18k), and pass ATS filters.
                  </p>
                  <button
                    onClick={() => {
                      handleQuickBridgeSkill(activeModalSkill.skill);
                      setActiveModalSkill(null);
                    }}
                    className="w-full py-2 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-semibold transition-all shadow-md flex items-center justify-center gap-1.5"
                  >
                    <span>Activate Instant Sandbox Bridge</span>
                    <Check className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Option 2: Add 2-Day Sprint to Roadmap */}
                <div className="p-4 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] hover:border-[var(--text-muted)] transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                      <Layers className="h-3.5 w-3.5 text-blue-400" />
                      <span>Option 2: Add Capstone Project to Roadmap</span>
                    </span>
                    <span className="text-[10px] text-[var(--text-muted)]">2-Day Sprint</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mb-3">
                    Inject a hands-on project into Phase 3: &quot;Build Sub-50ms Hybrid Vector Search with Pinecone &amp; LangChain&quot;.
                  </p>
                  <Link
                    href="/roadmap"
                    onClick={() => setActiveModalSkill(null)}
                    className="w-full py-2 rounded-xl bg-[var(--border-color)] hover:bg-[var(--text-muted)]/20 text-[var(--text-primary)] text-xs font-semibold transition-all border border-[var(--border-color)] flex items-center justify-center gap-1.5"
                  >
                    <span>Open Roadmap &amp; Start Sprint</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                {/* Option 3: Verified Resume Bullet & Code Proof */}
                <div className="p-4 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                      <Code2 className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Option 3: ATS-Optimized Resume Bullet Point</span>
                    </span>
                    <button
                      onClick={() =>
                        handleCopyBullet(
                          "Architected and deployed hybrid semantic vector retrieval pipeline using Pinecone and OpenAI text-embedding-3-small, achieving <45ms p99 latency across 250k indexed vectors."
                        )
                      }
                      className="text-[10px] text-[var(--accent)] hover:underline flex items-center gap-1 font-semibold"
                    >
                      <Copy className="h-3 w-3" />
                      <span>{copiedBullet ? "Copied!" : "Copy Bullet"}</span>
                    </button>
                  </div>
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-[11px] text-[var(--text-secondary)] font-mono leading-relaxed">
                    &quot;Architected and deployed hybrid semantic vector retrieval pipeline using Pinecone and OpenAI text-embedding-3-small, achieving &lt;45ms p99 latency across 250k indexed vectors.&quot;
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setActiveModalSkill(null)}
                  className="px-4 py-1.5 rounded-xl bg-[var(--bg-card-subtle)] hover:bg-[var(--border-color)] text-xs font-medium text-[var(--text-secondary)] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
