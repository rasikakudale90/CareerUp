"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  Camera,
  Bot,
  RotateCcw,
  LogOut,
  Upload,
  Shield,
  FileText,
  Loader2,
  Users,
  Check,
} from "lucide-react";
import { AppShell } from "@/components/dashboard/AppShell";
import { RadarChartDNA } from "@/components/dashboard/RadarChartDNA";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { usePrototype } from "@/lib/prototype-state";

export default function ProfilePage() {
  const router = useRouter();
  const {
    studentProfile,
    currentUser,
    overallReadinessScore,
    updateAvatar,
    generateAIAvatar,
    removeAvatar,
    parseAndUploadResumeFile,
    signOut,
  } = usePrototype();

  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [isUploadingResume, setIsUploadingResume] = useState(false);
  const [resumeFileName, setResumeFileName] = useState<string | null>(null);
  const [photoFeedback, setPhotoFeedback] = useState<string | null>(null);
  const photoInputRef = useRef<HTMLInputElement | null>(null);
  const resumeInputRef = useRef<HTMLInputElement | null>(null);

  const categories = ["All", "Technical", "Analytical", "Communication", "Leadership"];

  const filteredSkills =
    activeCategory === "All"
      ? studentProfile.skills
      : studentProfile.skills.filter((s) => s.category === activeCategory);

  // Handle Photo File Upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          updateAvatar(reader.result);
          setPhotoFeedback("Custom profile photo uploaded successfully!");
          setTimeout(() => setPhotoFeedback(null), 3500);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle AI Avatar Generation
  const handleGenerateAI = () => {
    generateAIAvatar();
    setPhotoFeedback("Generated new futuristic AI avatar!");
    setTimeout(() => setPhotoFeedback(null), 3500);
  };

  // Handle Reset to Default AI
  const handleResetAI = () => {
    removeAvatar();
    setPhotoFeedback("Reset to default AI neural avatar.");
    setTimeout(() => setPhotoFeedback(null), 3500);
  };

  // Handle Resume File Ingestion
  const handleResumeFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setResumeFileName(file.name);
      setIsUploadingResume(true);
      await parseAndUploadResumeFile(file);
      setIsUploadingResume(false);
      setPhotoFeedback(`Resume parsed & stats calibrated from ${file.name}!`);
      setTimeout(() => setPhotoFeedback(null), 4000);
    }
  };

  const handleSignOut = () => {
    signOut();
    router.push("/");
  };

  return (
    <AppShell
      headerTitle="Student Career DNA & Profile"
      headerSubtitle="Inspect your multidimensional skill matrix, profile avatar, verified portfolio, and account settings."
    >
      <div className="space-y-6">
        {/* Profile Card Header with Avatar Management */}
        <SpotlightCard className="rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {photoFeedback && (
            <div className="mb-4 p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
              <Check className="h-4 w-4 shrink-0" />
              <span>{photoFeedback}</span>
            </div>
          )}

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            {/* Left: Avatar + Identity */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              {/* Avatar Container with Interactive Upload */}
              <div className="relative group">
                <input
                  type="file"
                  ref={photoInputRef}
                  onChange={handlePhotoUpload}
                  accept="image/png,image/jpeg,image/webp,image/jpg"
                  className="hidden"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={studentProfile.avatarUrl}
                  alt={studentProfile.name}
                  className="w-24 h-24 rounded-3xl object-cover border-2 border-[var(--accent)] shadow-2xl transition-transform group-hover:scale-105"
                />
                <button
                  onClick={() => photoInputRef.current?.click()}
                  title="Upload Custom Photo"
                  className="absolute inset-0 bg-black/60 rounded-3xl opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity text-[10px] font-semibold gap-1 backdrop-blur-xs"
                >
                  <Camera className="h-5 w-5" />
                  <span>Change Photo</span>
                </button>
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
                    {studentProfile.name}
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                    Verified Candidate
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[var(--accent-soft)] border border-[var(--accent)]/30 text-[var(--accent)] text-[10px] font-bold uppercase">
                    {currentUser?.role || "Student"}
                  </span>
                </div>
                <p className="text-xs text-[var(--accent)] font-semibold mt-0.5">{studentProfile.title}</p>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  {studentProfile.degree} • {studentProfile.university} ({studentProfile.graduationYear})
                </p>

                {/* Avatar Action Buttons */}
                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  <button
                    onClick={() => photoInputRef.current?.click()}
                    className="px-3 py-1 rounded-xl bg-[var(--bg-card-subtle)] hover:bg-[var(--border-color)] border border-[var(--border-color)] text-[11px] font-medium text-[var(--text-primary)] transition-all flex items-center gap-1.5"
                  >
                    <Upload className="h-3 w-3 text-[var(--accent)]" />
                    <span>Upload Picture</span>
                  </button>
                  <button
                    onClick={handleGenerateAI}
                    className="px-3 py-1 rounded-xl bg-[var(--accent-soft)] hover:bg-[var(--accent)] hover:text-white border border-[var(--accent)]/30 text-[11px] font-semibold text-[var(--accent)] transition-all flex items-center gap-1.5"
                    title="Generate AI Cyber Avatar"
                  >
                    <Bot className="h-3 w-3" />
                    <span>Generate AI Avatar</span>
                  </button>
                  <button
                    onClick={handleResetAI}
                    className="px-2.5 py-1 rounded-xl bg-[var(--bg-card-subtle)] hover:bg-red-500/15 hover:text-red-500 border border-[var(--border-color)] text-[11px] text-[var(--text-secondary)] transition-all"
                    title="Reset to default AI generated"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Quick Action Controls */}
            <div className="flex items-center gap-3 flex-wrap">
              <input
                type="file"
                ref={resumeInputRef}
                onChange={handleResumeFileChange}
                accept=".pdf,.docx,.txt"
                className="hidden"
              />
              <button
                onClick={() => resumeInputRef.current?.click()}
                disabled={isUploadingResume}
                className="px-4 py-2.5 rounded-2xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-semibold transition-all flex items-center gap-2 shadow-md hover:scale-105 active:scale-95"
              >
                {isUploadingResume ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Parsing Resume...</span>
                  </>
                ) : (
                  <>
                    <FileText className="h-3.5 w-3.5" />
                    <span>Upload Different Resume</span>
                  </>
                )}
              </button>

              <div className="px-4 py-2.5 rounded-2xl bg-[var(--accent-soft)] border border-[var(--accent)]/40 text-xs font-bold text-[var(--accent)]">
                {overallReadinessScore}% Overall Readiness
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

        {/* Account, RBAC & Session Management Card (Addresses Bug 1) */}
        <SpotlightCard className="rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2.5">
              <Shield className="h-5 w-5 text-[var(--accent)]" />
              <div>
                <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)]">
                  Account, Security &amp; RBAC Session
                </h3>
                <p className="text-xs text-[var(--text-secondary)]">
                  Manage your active identity, candidate role, and authentication state.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-semibold border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Active Session</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] space-y-1">
              <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] block">Signed In As</span>
              <span className="text-xs font-bold text-[var(--text-primary)] block truncate">{currentUser?.email || "student@careerup.ai"}</span>
              <span className="text-[10px] text-[var(--text-secondary)]">Role: {currentUser?.role || "student"}</span>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] space-y-1">
              <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] block">Candidate Account</span>
              <span className="text-xs font-bold text-[var(--text-primary)] block">{studentProfile.name}</span>
              <span className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                <span>Active Verified Session</span>
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] block">Session Action</span>
                <span className="text-xs text-[var(--text-secondary)]">End your current session securely.</span>
              </div>
              <button
                onClick={handleSignOut}
                className="mt-3 w-full py-2.5 rounded-xl bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-500 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <LogOut className="h-4 w-4" />
                <span>Log Out of Account</span>
              </button>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </AppShell>
  );
}
