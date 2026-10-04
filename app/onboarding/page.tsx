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
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { usePrototype } from "@/lib/prototype-state";

export default function OnboardingPage() {
  const router = useRouter();
  const { signIn } = usePrototype();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>("Aditi_Sharma_Resume_2026.pdf");
  const [uploadedBlob, setUploadedBlob] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { title: "Extracting Core Tech Stack & Tooling", desc: "Found: React, Next.js, Python, TypeScript, SQL..." },
    { title: "Analyzing Project Complexity & Architecture", desc: "Evaluated: PulseAI Meeting Assistant & Synapse Graph..." },
    { title: "Benchmarking Against Tier-1 Industry Rubrics", desc: "Matching with OpenAI, Linear, Scale AI standards..." },
    { title: "Synthesizing Multidimensional Career DNA", desc: "Generated 92% AI Product Engineer trajectory..." },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file.name);
      setUploadedBlob(file);
    }
  };

  const handleSelectPersona = (fileName: string, persona: "aditi" | "alex") => {
    setSelectedFile(fileName);
    setUploadedBlob(null);
    if (persona === "alex") {
      signIn("alex.morgan@stanford.edu", "", "alex");
    } else {
      signIn("aditi.sharma@iit.ac.in", "", "aditi");
    }
  };

  const handleStartAnalysis = async () => {
    setIsAnalyzing(true);
    setCurrentStep(0);

    // If a custom file was chosen, dispatch upload to backend asynchronously
    if (uploadedBlob) {
      try {
        const formData = new FormData();
        formData.append("file", uploadedBlob);
        await fetch("http://localhost:8000/api/v1/resume/upload", {
          method: "POST",
          body: formData,
        });
      } catch (err) {
        console.warn("Backend upload notification (hybrid fallback engaged):", err);
      }
    }

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            router.push("/dashboard");
          }, 800);
          return prev;
        }
        return prev + 1;
      });
    }, 1100);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col relative overflow-hidden selection:bg-[var(--accent)] selection:text-white">
      {/* ATMOSPHERIC BACKGROUND (career2.png student collaboration) */}
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
          {!isAnalyzing ? (
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
                  Supports PDF, DOCX, TXT (Click here to browse files on your computer)
                </div>

                {selectedFile && (
                  <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] shadow-md shimmer-badge">
                    <FileText className="h-4 w-4 text-[var(--accent)]" />
                    <span>{selectedFile}</span>
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  </div>
                )}
              </div>

              {/* Sample Presets */}
              <div>
                <span className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-3">
                  Or test with sample student personas:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => handleSelectPersona("Aditi_Sharma_Resume_2026.pdf", "aditi")}
                    className={`p-3.5 rounded-2xl text-left border transition-all flex items-center justify-between card-hover-effect ${
                      selectedFile === "Aditi_Sharma_Resume_2026.pdf"
                        ? "bg-[var(--accent)]/15 border-[var(--accent)] text-[var(--text-primary)] shadow-lg"
                        : "bg-[var(--bg-card-subtle)] border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[var(--border-color)]"
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-[var(--text-primary)]">Aditi Sharma (Default)</div>
                      <div className="text-[11px] text-[var(--text-secondary)]">Full-Stack &amp; Applied AI • IIT / CS 2026</div>
                    </div>
                    <CheckCircle2
                      className={`h-4 w-4 ${
                        selectedFile === "Aditi_Sharma_Resume_2026.pdf" ? "text-[var(--accent)]" : "opacity-0"
                      }`}
                    />
                  </button>

                  <button
                    onClick={() => handleSelectPersona("Alex_Morgan_Data_Resume.pdf", "alex")}
                    className={`p-3.5 rounded-2xl text-left border transition-all flex items-center justify-between card-hover-effect ${
                      selectedFile === "Alex_Morgan_Data_Resume.pdf"
                        ? "bg-[var(--accent)]/15 border-[var(--accent)] text-[var(--text-primary)] shadow-lg"
                        : "bg-[var(--bg-card-subtle)] border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[var(--border-color)]"
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-[var(--text-primary)]">Alex Morgan</div>
                      <div className="text-[11px] text-[var(--text-secondary)]">Python, SQL &amp; Data Foundations • CS 2025</div>
                    </div>
                    <CheckCircle2
                      className={`h-4 w-4 ${
                        selectedFile === "Alex_Morgan_Data_Resume.pdf" ? "text-[var(--accent)]" : "opacity-0"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Start Analysis Button */}
              <button
                onClick={handleStartAnalysis}
                className="w-full py-4 rounded-2xl bg-[var(--accent)] text-white font-semibold text-sm hover:bg-[var(--accent-hover)] transition-all flex items-center justify-center gap-2 shadow-2xl hover:scale-[1.01] active:scale-[0.99]"
              >
                <span className="shimmer-text">Generate Career DNA &amp; Roadmap</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ) : (
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
          )}
        </SpotlightCard>
      </main>
    </div>
  );
}
