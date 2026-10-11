"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Upload,
  Sparkles,
  FileText,
  CheckCircle2,
  ArrowRight,
  Loader2,
  Cpu,
  X,
  Plus,
  Compass,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { usePrototype } from "@/lib/prototype-state";

export default function OnboardingPage() {
  const router = useRouter();
  const {
    parseAndUploadResumeFile,
    studentProfile,
    setStudentProfile,
    careerPaths,
    selectedCareerId,
    setSelectedCareerId,
  } = usePrototype();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [uploadedBlob, setUploadedBlob] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showReviewStep, setShowReviewStep] = useState(false);
  const [newSkillInput, setNewSkillInput] = useState("");

  const steps = [
    { title: "Extracting Core Tech Stack & Tooling", desc: "Analyzing candidate frameworks, languages, and tools..." },
    { title: "Analyzing Project Complexity & Architecture", desc: "Evaluating system architecture, APIs, and impact metrics..." },
    { title: "Benchmarking Against Tier-1 Industry Rubrics", desc: "Matching against OpenAI, Linear, Scale AI standards..." },
    { title: "Synthesizing Multidimensional Career DNA", desc: "Generated tailored career trajectory, radar scores, and learning roadmap..." },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file.name);
      setUploadedBlob(file);
    }
  };

  const handleStartAnalysis = async () => {
    if (!selectedFile && !uploadedBlob) {
      fileInputRef.current?.click();
      return;
    }

    setIsAnalyzing(true);
    setCurrentStep(0);

    if (uploadedBlob) {
      await parseAndUploadResumeFile(uploadedBlob);
    }

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            setIsAnalyzing(false);
            setShowReviewStep(true);
          }, 600);
          return prev;
        }
        return prev + 1;
      });
    }, 900);
  };

  const handleRemoveSkill = (skillName: string) => {
    setStudentProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.name.toLowerCase() !== skillName.toLowerCase()),
    }));
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillInput.trim()) return;
    setStudentProfile((prev) => ({
      ...prev,
      skills: [
        {
          name: newSkillInput.trim(),
          category: "Technical",
          proficiency: 85,
          verified: true,
        },
        ...prev.skills,
      ],
    }));
    setNewSkillInput("");
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col relative overflow-hidden selection:bg-[var(--accent)] selection:text-white">
      {/* ATMOSPHERIC BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/career2.png"
          alt="Student Collaborative Hub"
          className="w-full h-full object-cover object-center opacity-15 filter blur-[1.5px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/85 to-[var(--bg-primary)]/75" />
      </div>

      <div className="relative z-10">
        <Navbar />
      </div>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12 flex flex-col justify-center relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-xs text-[var(--text-secondary)] mb-3 shimmer-badge">
            <Sparkles className="h-3.5 w-3.5 text-[var(--accent)]" />
            <span>CareerUp AI Ingestion Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-2">
            Upload Your Resume to Generate Career DNA
          </h1>
          <p className="text-sm text-[var(--text-secondary)] max-w-xl mx-auto">
            Our AI scans beyond simple keyword matching to evaluate architectural intuition, project impact, and your highest-potential career pivot.
          </p>
        </div>

        {/* Card Container with Spotlight */}
        <SpotlightCard className="p-6 sm:p-10 shadow-2xl bg-[var(--bg-card)] border border-[var(--border-color)]">
          {isAnalyzing ? (
            /* Multi-step Loading Animation */
            <div className="py-12 px-4 max-w-md mx-auto space-y-8 text-center">
              <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-[var(--accent)]/40 animate-ping" />
                <div className="w-16 h-16 rounded-full bg-[var(--accent)]/15 flex items-center justify-center text-[var(--accent)] shadow-xl">
                  <Cpu className="h-8 w-8 animate-pulse" />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">
                  Synthesizing Your Career Intelligence...
                </h3>
                <p className="text-xs text-[var(--text-secondary)]">
                  Running 4-stage neural pipeline across 10,000+ tech job requirements
                </p>
              </div>

              {/* Progress Steps */}
              <div className="space-y-3 text-left">
                {steps.map((step, idx) => {
                  const isDone = idx < currentStep;
                  const isCurrent = idx === currentStep;
                  return (
                    <div
                      key={step.title}
                      className={`p-3.5 rounded-2xl border transition-all ${
                        isDone
                          ? "bg-emerald-500/10 border-emerald-500/30 text-[var(--text-primary)]"
                          : isCurrent
                          ? "bg-[var(--accent)]/15 border-[var(--accent)] text-[var(--text-primary)] shadow-xl shimmer-badge"
                          : "bg-[var(--bg-card-subtle)] border-[var(--border-color)] text-[var(--text-muted)]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {isDone ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                        ) : isCurrent ? (
                          <Loader2 className="h-4 w-4 text-[var(--accent)] animate-spin shrink-0" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-[var(--border-color)] shrink-0" />
                        )}
                        <span className="text-xs font-semibold">{step.title}</span>
                      </div>
                      {(isDone || isCurrent) && (
                        <div className="text-[11px] text-[var(--text-secondary)] pl-6 mt-1">{step.desc}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : showReviewStep ? (
            /* Step 2: Review Extracted Facts & Select Target Track (FR-02 & FR-05) */
            <div className="space-y-8 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-color)]">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-semibold mb-2">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Fact Extraction Complete (FR-02 & FR-05 Verified)</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                    Review Extracted Profile & Target Role
                  </h2>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    Review and calibrate extracted candidate facts before recommendations and roadmap calculations are computed.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowReviewStep(false)}
                  className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] underline self-start sm:self-auto"
                >
                  Upload a different resume
                </button>
              </div>

              {/* Target Role Selector (FR-05) */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-2">
                  <Compass className="h-4 w-4 text-[var(--accent)]" />
                  Target Career Track (FR-05)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {careerPaths.map((path) => {
                    const isSelected = selectedCareerId === path.id;
                    return (
                      <div
                        key={path.id}
                        onClick={() => setSelectedCareerId(path.id)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? "bg-[var(--accent)]/15 border-[var(--accent)] text-[var(--text-primary)] shadow-lg"
                            : "bg-[var(--bg-card-subtle)] border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--accent)]/50"
                        }`}
                      >
                        <div className="font-semibold text-xs text-[var(--text-primary)]">{path.title}</div>
                        <div className="text-[11px] text-[var(--text-muted)] mt-1 line-clamp-1">{path.marketDemand} Demand • {path.matchScore}% Base Match</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Extracted Skills Review & Correction (FR-02) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                    Extracted Skills ({studentProfile.skills.length}) — Click ✕ to remove inaccurate skills
                  </label>
                </div>

                <div className="flex flex-wrap gap-2 p-4 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] max-h-48 overflow-y-auto">
                  {studentProfile.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] font-medium group hover:border-rose-500/50 transition-colors"
                    >
                      <span>{skill.name}</span>
                      <span className="text-[10px] text-[var(--text-muted)]">({skill.proficiency}%)</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill.name)}
                        className="text-[var(--text-muted)] hover:text-rose-500 transition-colors p-0.5"
                        title="Remove skill"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                  {studentProfile.skills.length === 0 && (
                    <div className="text-xs text-[var(--text-muted)] italic">No skills extracted yet. Add some below.</div>
                  )}
                </div>

                {/* Add Missing Skill */}
                <form onSubmit={handleAddSkill} className="flex gap-2">
                  <input
                    type="text"
                    value={newSkillInput}
                    onChange={(e) => setNewSkillInput(e.target.value)}
                    placeholder="Add missing skill (e.g. Docker, PyTorch, GraphQL)..."
                    className="flex-1 px-4 py-2 text-xs rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[var(--accent)]/15 border border-[var(--accent)]/30 text-[var(--accent)] text-xs font-semibold hover:bg-[var(--accent)] hover:text-white transition-all flex items-center gap-1"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Skill</span>
                  </button>
                </form>
              </div>

              {/* Confirm CTA */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => router.push("/dashboard")}
                  className="w-full py-4 rounded-2xl bg-[var(--accent)] text-white font-semibold text-sm hover:bg-[var(--accent-hover)] transition-all flex items-center justify-center gap-2 shadow-2xl hover:scale-[1.01] active:scale-[0.99]"
                >
                  <span className="shimmer-text">Confirm Verified Profile & Launch Dashboard</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.docx,.txt"
                className="hidden"
              />

              {/* Drag and drop zone with Hover Glow */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[var(--border-color)] hover:border-[var(--accent)] rounded-2xl p-8 sm:p-12 text-center transition-all bg-[var(--bg-card-subtle)] hover:bg-[var(--accent)]/5 cursor-pointer group card-hover-effect"
              >
                <div className="w-14 h-14 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <Upload className="h-6 w-6" />
                </div>
                <div className="text-sm font-semibold text-[var(--text-primary)] mb-1 group-hover:text-[var(--accent)] transition-colors">
                  Click to upload or drag and drop your resume
                </div>
                <div className="text-xs text-[var(--text-muted)]">
                  Supports PDF, DOCX, TXT (Browse any resume file from your computer)
                </div>

                {selectedFile && (
                  <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] shadow-md shimmer-badge">
                    <FileText className="h-4 w-4 text-[var(--accent)]" />
                    <span>{selectedFile}</span>
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  </div>
                )}
              </div>

              {/* Start Analysis Button */}
              <button
                onClick={handleStartAnalysis}
                className="w-full py-4 rounded-2xl bg-[var(--accent)] text-white font-semibold text-sm hover:bg-[var(--accent-hover)] transition-all flex items-center justify-center gap-2 shadow-2xl hover:scale-[1.01] active:scale-[0.99]"
              >
                <span className="shimmer-text">
                  {selectedFile ? "Generate Career DNA & Roadmap" : "Browse & Upload Resume"}
                </span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </SpotlightCard>
      </main>
    </div>
  );
}
