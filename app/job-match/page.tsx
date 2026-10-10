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
  CheckCheck,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { AppShell } from "@/components/dashboard/AppShell";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { usePrototype } from "@/lib/prototype-state";

// Helper to provide context-aware bridging paths & code proof for any missing skill
function getSkillBridgeDetails(skillName: string) {
  const s = skillName.toLowerCase();
  if (s.includes("vector")) {
    return {
      title: "Vector Databases & Hybrid Search",
      simId: "sim-vectordb",
      boostPct: "+7% ATS Fit",
      simDesc:
        "Instantly simulate Vector DB & dense-sparse retrieval mastery to unlock high-relevance RAG pipelines and pass corporate ATS filters.",
      roadmapPhase: "Phase 1: Advanced Vector Search & Embeddings",
      roadmapSprint: "Build Sub-50ms Hybrid Vector Search with Pinecone & LangChain",
      bullet:
        "Architected and deployed hybrid semantic vector retrieval pipeline using Pinecone and OpenAI text-embedding-3-small, achieving <45ms p99 latency across 250k indexed vectors.",
      codeSnippet: `from langchain_community.vectorstores import Pinecone
from langchain_openai import OpenAIEmbeddings

vectorstore = Pinecone.from_documents(docs, OpenAIEmbeddings(), index_name="career-rag")`,
    };
  }
  if (s.includes("agent") || s.includes("langgraph")) {
    return {
      title: "LangGraph & Autonomous Agentic Workflows",
      simId: "sim-langgraph",
      boostPct: "+8% ATS Fit",
      simDesc:
        "Simulate cyclic agent graph design, state checkpoints, and structured tool calling in your profile.",
      roadmapPhase: "Phase 2: Agentic Orchestration",
      roadmapSprint: "Build Multi-Agent Orchestrator with Human-in-the-Loop Safeguards",
      bullet:
        "Engineered stateful multi-agent system using LangGraph and FastAPI, reducing multi-step workflow hallucination by 34%.",
      codeSnippet: `from langgraph.graph import StateGraph, END

workflow = StateGraph(AgentState)
workflow.add_node("planner", plan_agent)
workflow.add_node("executor", execute_tool)
workflow.add_edge("planner", "executor")`,
    };
  }
  if (s.includes("ai sdk") || s.includes("vercel ai")) {
    return {
      title: "Vercel AI SDK (Core, UI & Generative Streams)",
      simId: "sim-aisdk",
      boostPct: "+9% ATS Fit (97%)",
      simDesc:
        "Simulate full-stack AI streaming, React Server Actions with AI SDK Core/UI, structured tool calling (zod), and Generative UI components.",
      roadmapPhase: "Phase 4: Capstone AI Product & Edge Streaming",
      roadmapSprint: "Build Real-Time Multi-Modal AI Interface with Vercel AI SDK & Next.js 15",
      bullet:
        "Architected real-time streaming AI chat interface using Vercel AI SDK v3/v4 and streamText with multi-step tool execution, reducing TTFT to 210ms.",
      codeSnippet: `import { streamText, tool } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

const result = streamText({
  model: openai('gpt-4o'),
  messages,
  tools: { getWeather: tool({ ... }) }
});`,
    };
  }
  if (s.includes("docker") || s.includes("container") || s.includes("k8s")) {
    return {
      title: "Docker Containerization & MLOps",
      simId: "sim-docker",
      boostPct: "+5% ATS Fit",
      simDesc:
        "Simulate multi-stage container builds and microservice orchestration in production environments.",
      roadmapPhase: "Phase 3: Production Cloud & MLOps",
      roadmapSprint: "Containerize and Deploy Microservices with Docker Compose & CI/CD",
      bullet:
        "Containerized multi-service ML inferencing stack with multi-stage Docker builds, reducing cold-start image size by 58%.",
      codeSnippet: `FROM python:3.11-slim
COPY --from=builder /app /app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]`,
    };
  }
  // Generic / Custom parsed skill
  return {
    title: skillName,
    simId: "sim-vectordb",
    boostPct: "+7% ATS Fit",
    simDesc: `Simulate high-proficiency mastery of ${skillName} in your verified tech profile.`,
    roadmapPhase: "Phase 3: Technical Specialization",
    roadmapSprint: `Hands-On Mastery Sprint: ${skillName} Architecture & Testing`,
    bullet: `Implemented production-grade ${skillName} pipeline with automated telemetry and performance benchmarking, meeting enterprise SLA requirements.`,
    codeSnippet: `# Integrated ${skillName} into production service architecture\n# Benchmarked at 99.9% uptime SLA`,
  };
}

function JobMatchContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") === "custom" ? "custom" : "browse";

  const {
    jobMatches,
    applyToJob,
    addCustomJobMatch,
    simulatedSkills,
    toggleSimulatedSkill,
    isSimulatedSkillActive,
    roadmap,
    studentProfile,
  } = usePrototype();

  const [activeTab, setActiveTab] = useState<"browse" | "custom">(initialTab);

  React.useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "custom") {
      setActiveTab("custom");
    } else if (tabParam === "browse") {
      setActiveTab("browse");
    }
  }, [searchParams]);
  const [customRoleTitle, setCustomRoleTitle] = useState("");
  const [customCompany, setCustomCompany] = useState("");
  const [customJD, setCustomJD] = useState("");
  const [isParsing, setIsParsing] = useState(false);
  const [bridgedSkillNotification, setBridgedSkillNotification] = useState<string | null>(null);

  // Modal state for in-depth skill bridging
  const [activeModalSkill, setActiveModalSkill] = useState<{
    skill: string;
    jobTitle: string;
    company: string;
  } | null>(null);
  const [copiedBullet, setCopiedBullet] = useState(false);

  // Check if a skill name is bridged via roadmap completion or simulation
  const isSkillBridged = (skillName: string) => {
    const sName = skillName.toLowerCase();

    // Check simulated skills
    if (sName.includes("vector") && isSimulatedSkillActive("sim-vectordb")) return true;
    if (sName.includes("agent") && isSimulatedSkillActive("sim-langgraph")) return true;
    if ((sName.includes("ai sdk") || sName.includes("sdk")) && (isSimulatedSkillActive("sim-aisdk") || isSimulatedSkillActive("sim-vectordb"))) return true;
    if (sName.includes("docker") && isSimulatedSkillActive("sim-docker")) return true;
    if (sName.includes("redis") && isSimulatedSkillActive("sim-redis")) return true;
    if (sName.includes("pytorch") && isSimulatedSkillActive("sim-pytorch")) return true;

    // Check completed roadmap tasks
    const completedTasks = roadmap.flatMap((m) => m.tasks).filter((t) => t.completed);
    if (
      sName.includes("vector") &&
      completedTasks.some(
        (t) =>
          t.title.toLowerCase().includes("vector") ||
          t.title.toLowerCase().includes("hybrid")
      )
    )
      return true;
    if (
      sName.includes("agent") &&
      completedTasks.some(
        (t) =>
          t.title.toLowerCase().includes("agent") ||
          t.title.toLowerCase().includes("langgraph")
      )
    )
      return true;
    if (sName.includes("docker") && completedTasks.some((t) => t.title.toLowerCase().includes("docker")))
      return true;

    return false;
  };

  const handleQuickBridgeSkill = (skillName: string) => {
    const details = getSkillBridgeDetails(skillName);
    toggleSimulatedSkill(details.simId);
    setBridgedSkillNotification(`✨ '${details.title}' bridged! ATS match updated.`);

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
      const KNOWN_TECH_KEYWORDS = [
        "TypeScript", "JavaScript", "React", "Next.js", "Python", "FastAPI", "Node.js",
        "Tailwind CSS", "GraphQL", "REST APIs", "WebSockets", "Docker", "Kubernetes",
        "PostgreSQL", "MongoDB", "Redis", "Vector DB", "Vector Search", "Qdrant", "Pinecone",
        "LangChain", "LangGraph", "LlamaIndex", "AI SDK", "PyTorch", "TensorFlow",
        "LLM APIs", "Gemini", "OpenAI", "Prompt Engineering", "Fine-Tuning", "RAG Systems",
        "Streaming UI", "CI/CD", "System Design", "Microservices", "AWS", "Agentic Tooling"
      ];

      const jdText = `${customRoleTitle} ${customJD}`.toLowerCase();
      const detectedSkills = KNOWN_TECH_KEYWORDS.filter((tech) =>
        jdText.includes(tech.toLowerCase())
      );

      const requiredSkills = detectedSkills.length > 0 
        ? detectedSkills 
        : ["TypeScript", "React", "FastAPI", "LLM APIs", "System Architecture"];

      const candidateSkills = (studentProfile?.skills || []).map((s) =>
        (typeof s === "string" ? s : s.name).toLowerCase()
      );

      const matchedSkills = requiredSkills.filter((sk) =>
        candidateSkills.some((cs) => cs.includes(sk.toLowerCase()) || sk.toLowerCase().includes(cs))
      );

      const missingSkills = requiredSkills.filter((sk) => !matchedSkills.includes(sk));

      const matchPct = Math.min(
        98,
        Math.max(
          55,
          Math.round((matchedSkills.length / Math.max(1, requiredSkills.length)) * 100)
        )
      );

      addCustomJobMatch({
        id: `custom-job-${Date.now()}`,
        company: customCompany || "Target Tech Co.",
        companyLogo:
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80",
        title: customRoleTitle,
        location: "Remote / Hybrid",
        workType: "Remote",
        salaryRange: "$150,000 – $190,000",
        matchPercentage: matchPct,
        postedDate: "Parsed Just Now",
        requiredSkills,
        matchedSkills,
        missingSkills,
        description: customJD,
      });
      setIsParsing(false);
      setActiveTab("browse");
      setCustomRoleTitle("");
      setCustomCompany("");
      setCustomJD("");
    }, 700);
  };

  const activeBridgeDetails = activeModalSkill ? getSkillBridgeDetails(activeModalSkill.skill) : null;

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
                        <div
                          className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                            dynamicMatch >= 95
                              ? "bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 shadow-md"
                              : "bg-emerald-500/10 border border-emerald-500/30 text-emerald-500"
                          }`}
                        >
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
                      {actuallyMissing.length === 0 ? (
                        <div>
                          <span className="text-[10px] font-bold uppercase text-emerald-500 block mb-1.5 flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                            <span>Zero Missing Requirements (100% Covered)</span>
                          </span>
                          <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                            <span>All hiring requirements are fully satisfied!</span>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <span className="text-[10px] font-bold uppercase text-amber-500 dark:text-amber-400 block mb-1.5 flex items-center justify-between">
                            <span className="flex items-center gap-1">
                              <XCircle className="h-3 w-3 text-red-500" />
                              <span>Missing Bridge Requirements ({actuallyMissing.length})</span>
                            </span>
                            <span className="text-[10px] text-[var(--text-muted)] lowercase font-normal">
                              (click to bridge)
                            </span>
                          </span>
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

        {/* Dynamic Skill Bridge Action Modal */}
        {activeModalSkill && activeBridgeDetails && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-xl bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setActiveModalSkill(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-[var(--bg-card-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-red-500 flex items-center justify-center text-white shadow-lg shrink-0">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[var(--text-primary)]">
                    Bridge Requirement: {activeBridgeDetails.title}
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
                      {activeBridgeDetails.boostPct}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mb-3">
                    {activeBridgeDetails.simDesc}
                  </p>
                  <button
                    onClick={() => {
                      handleQuickBridgeSkill(activeModalSkill.skill);
                      setActiveModalSkill(null);
                    }}
                    className="w-full py-2.5 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-semibold transition-all shadow-md flex items-center justify-center gap-1.5"
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
                      <span>Option 2: Add Capstone Sprint to Roadmap</span>
                    </span>
                    <span className="text-[10px] text-[var(--text-muted)]">{activeBridgeDetails.roadmapPhase}</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mb-3 font-medium">
                    &quot;{activeBridgeDetails.roadmapSprint}&quot;
                  </p>
                  <Link
                    href="/roadmap"
                    onClick={() => setActiveModalSkill(null)}
                    className="w-full py-2.5 rounded-xl bg-[var(--border-color)] hover:bg-[var(--text-muted)]/20 text-[var(--text-primary)] text-xs font-semibold transition-all border border-[var(--border-color)] flex items-center justify-center gap-1.5"
                  >
                    <span>Open Roadmap &amp; Start Sprint</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                {/* Option 3: Verified Resume Bullet & Code Proof */}
                <div className="p-4 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                      <Code2 className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Option 3: ATS-Optimized Resume Bullet &amp; Proof</span>
                    </span>
                    <button
                      onClick={() => handleCopyBullet(activeBridgeDetails.bullet)}
                      className="text-[10px] text-[var(--accent)] hover:underline flex items-center gap-1 font-semibold"
                    >
                      {copiedBullet ? <CheckCheck className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      <span>{copiedBullet ? "Copied!" : "Copy Bullet"}</span>
                    </button>
                  </div>
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-[11px] text-[var(--text-secondary)] font-mono leading-relaxed">
                    &quot;{activeBridgeDetails.bullet}&quot;
                  </div>
                  <div className="p-3 rounded-xl bg-black/60 border border-white/5 text-[10px] text-emerald-400 font-mono leading-relaxed overflow-x-auto whitespace-pre">
                    {activeBridgeDetails.codeSnippet}
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

export default function JobMatchPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-[var(--bg-primary)] p-8 text-center text-xs text-[var(--text-muted)] flex items-center justify-center">Loading ATS Job Match Engine...</div>}>
      <JobMatchContent />
    </React.Suspense>
  );
}
