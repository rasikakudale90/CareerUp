"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Compass,
  BarChart3,
  GitBranch,
  Wand2,
  Briefcase,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Target,
  Zap,
  Play,
  Users,
  BookOpen,
  Award,
  GraduationCap,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CareerOrbit3D } from "@/components/hero/CareerOrbit3D";
import { RadarChartDNA } from "@/components/dashboard/RadarChartDNA";
import { CircularProgress } from "@/components/dashboard/CircularProgress";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { usePrototype } from "@/lib/prototype-state";

export default function LandingPage() {
  const { studentProfile, careerPaths, overallReadinessScore, roadmap } = usePrototype();

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col selection:bg-[var(--accent)] selection:text-white transition-colors duration-300">
      {/* 1. CINEMATIC HERO SECTION WITH VIVID CAREER1.PNG LANDSCAPE */}
      <section className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden text-white">
        {/* Full-bleed high-res landscape backdrop (career1.png) */}
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/career1.png"
            alt="Cinematic Misty Mountain Landscape"
            className="w-full h-full object-cover object-center scale-105 transform motion-safe:animate-pulse-subtle"
          />
          {/* Subtle dark tint gradient to ensure crisp typography contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-[var(--bg-primary)]/95" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.6)_100%)]" />
        </div>

        {/* Top Floating Navbar inside Hero */}
        <div className="relative z-30">
          <Navbar />
        </div>

        {/* Center Hero Content */}
        <div className="relative z-20 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center pt-8 pb-12 flex flex-col items-center">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-xl border border-white/20 text-xs text-white/90 mb-6 shadow-2xl shimmer-border">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-ping" />
            <span className="font-semibold uppercase tracking-wider text-[11px]">
              CareerUp AI Intelligence Platform
            </span>
          </div>

          {/* Large Editorial Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] max-w-4xl drop-shadow-lg">
            Turn your skills into your <br />
            <span className="font-serif italic font-normal text-[#E8DED6]">next career move.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-base md:text-lg text-[#EFF0F8]/85 max-w-2xl mt-4 sm:mt-5 leading-relaxed drop-shadow-md px-2">
            CareerUp understands where you are, where you want to go, and what you need to do next.
            Generate your verified Career DNA, pinpoint skill bridges, and simulate your readiness.
          </p>

          {/* Hero Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-6 sm:mt-8 w-full sm:w-auto">
            <Link
              href="/onboarding"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 rounded-full bg-[var(--accent)] text-white font-semibold text-xs sm:text-sm hover:bg-[var(--accent-hover)] transition-all hover:scale-105 active:scale-95 shadow-2xl border border-white/20 group"
            >
              <span>Upload Your Resume</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/career"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 sm:px-7 sm:py-4 rounded-full bg-black/50 backdrop-blur-xl text-white border border-white/25 font-semibold text-xs sm:text-sm hover:bg-white/15 hover:border-white/40 transition-all hover:scale-105 shadow-xl"
            >
              <span>Explore 6 AI Career Tracks</span>
            </Link>
          </div>

          {/* Student Social Proof Strip */}
          <div className="flex items-center gap-3 mt-10 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs text-white/80">
            <div className="flex -space-x-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-6 h-6 rounded-full ring-2 ring-black object-cover"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="User"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-6 h-6 rounded-full ring-2 ring-black object-cover"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                alt="User"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-6 h-6 rounded-full ring-2 ring-black object-cover"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                alt="User"
              />
            </div>
            <span>Trusted by <strong>50,000+ students</strong> to discover real career opportunities</span>
          </div>
        </div>

        {/* Translucent Metric Cards Strip over lake landscape */}
        <div className="relative z-20 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-6 rounded-3xl bg-[#1A1917]/75 backdrop-blur-2xl border border-white/15 shadow-2xl hover:border-[var(--accent)]/50 transition-all card-hover-effect">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#BABBC3] mb-1">
                Career Clarity Boost
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight">95%</div>
              <p className="text-xs text-[#BABBC3] mt-1.5 leading-relaxed">
                Students report absolute clarity on which skills unlock immediate hiring interest.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#1A1917]/75 backdrop-blur-2xl border border-white/15 shadow-2xl hover:border-[var(--accent)]/50 transition-all card-hover-effect">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#BABBC3] mb-1">
                Skill Acquisition Speed
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-[var(--accent)] tracking-tight shimmer-text">3x Faster</div>
              <p className="text-xs text-[#BABBC3] mt-1.5 leading-relaxed">
                Personalized 12-week roadmap milestones eliminate guessing and tutorial hell.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#1A1917]/75 backdrop-blur-2xl border border-white/15 shadow-2xl hover:border-[var(--accent)]/50 transition-all card-hover-effect">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#BABBC3] mb-1">
                Job Readiness Index
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-emerald-400 tracking-tight">80%+</div>
              <p className="text-xs text-[#BABBC3] mt-1.5 leading-relaxed">
                Directly verified ATS alignment against Tier-1 AI &amp; Product Engineer job postings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 3D CAREER ORBIT & INTERACTIVE MAP SHOWCASE */}
      <section className="py-20 bg-[var(--bg-secondary)] relative overflow-hidden transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* 3D Orbit Canvas with Interactive Floating Pills */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              <div className="relative w-full aspect-square max-w-[480px] flex items-center justify-center rounded-3xl bg-gradient-to-b from-[var(--bg-card-subtle)] to-[var(--bg-card)] border border-[var(--border-color)] shadow-2xl p-4">
                <CareerOrbit3D />

                {/* Floating Interactive Feature Cards */}
                <Link
                  href="/career"
                  className="absolute -top-4 -left-4 sm:-left-6 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[var(--bg-card)] text-[var(--text-primary)] shadow-2xl border border-[var(--border-color)] hover:scale-110 hover:border-[var(--accent)] transition-all text-xs font-medium animate-float"
                >
                  <div className="p-1.5 rounded-lg bg-[var(--accent)] text-white">
                    <Compass className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <span className="block font-semibold">Explore Career Paths</span>
                    <span className="text-[10px] text-[var(--text-muted)]">6 AI tracks</span>
                  </div>
                </Link>

                <Link
                  href="/what-if"
                  className="absolute -bottom-4 -right-4 sm:-right-6 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[var(--bg-card)] text-[var(--text-primary)] shadow-2xl border border-[var(--border-color)] hover:scale-110 hover:border-[var(--accent)] transition-all text-xs font-medium"
                >
                  <div className="p-1.5 rounded-lg bg-[var(--accent)] text-white">
                    <Wand2 className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <span className="block font-semibold">What-If Simulator</span>
                    <span className="text-[10px] text-[var(--text-muted)]">Live score deltas</span>
                  </div>
                </Link>
              </div>
            </div>

            {/* Content Side */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/25 text-xs text-[var(--accent)] font-bold">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Multidimensional Intelligence</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-tight">
                Beyond Keywords: Understand Your Real Career DNA
              </h2>

              <p className="text-base text-[var(--text-secondary)] leading-relaxed">
                Traditional job boards match simple buzzwords. CareerUp evaluates your code architecture,
                problem decomposition depth, technical storytelling, and execution velocity to match you with roles where you will truly excel.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)]">
                  <div className="text-sm font-bold text-[var(--text-primary)] mb-1">Radar Synthesis</div>
                  <div className="text-xs text-[var(--text-secondary)]">Technical, Analytical, Leadership, and Communication evaluated together.</div>
                </div>
                <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)]">
                  <div className="text-sm font-bold text-[var(--text-primary)] mb-1">Bridge Gap Engine</div>
                  <div className="text-xs text-[var(--text-secondary)]">Identifies the exact 2-3 missing skills that will produce a 15%+ score surge.</div>
                </div>
              </div>

              <Link
                href="/onboarding"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--accent)] text-white font-semibold text-xs hover:bg-[var(--accent-hover)] transition-all hover:scale-105 shadow-xl"
              >
                <span>Generate Your Career DNA</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TRUSTED HIRING PARTNERS TICKER */}
      <section className="py-8 border-y border-[var(--border-color)] bg-[var(--bg-primary)] transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)] mb-6">
            Calibrated with hiring bars from world-class engineering organizations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-75 grayscale hover:grayscale-0 transition-all">
            <span className="text-base sm:text-lg font-bold tracking-tight text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors">Google</span>
            <span className="text-base sm:text-lg font-bold tracking-tight text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors">Microsoft</span>
            <span className="text-base sm:text-lg font-bold tracking-tight text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors">amazon</span>
            <span className="text-base sm:text-lg font-bold tracking-tight text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors">Adobe</span>
            <span className="text-base sm:text-lg font-bold tracking-tight text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors">Scale AI</span>
            <span className="text-base sm:text-lg font-bold tracking-tight text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors">Linear</span>
            <span className="text-base sm:text-lg font-bold tracking-tight text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors">Anthropic</span>
          </div>
        </div>
      </section>

      {/* 4. STUDENT PEER COLLABORATION & STUDY HUB (FEATURING CAREER2.PNG) */}
      <section className="py-20 bg-[var(--bg-secondary)] relative overflow-hidden transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SpotlightCard className="p-8 sm:p-12 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--accent)]/15 border border-[var(--accent)]/30 text-xs text-[var(--accent)] font-bold shimmer-badge">
                  <Users className="h-3.5 w-3.5" />
                  <span>Collaborative Cohort Intelligence</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
                  Learn Faster With Peer Roadmaps &amp; Shared Benchmarks
                </h2>

                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  CareerUp connects you with student cohorts targeting the same roles. Compare verified project architectures, swap interview talking points, and accelerate through skill roadmaps together.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] flex items-start gap-3">
                    <GraduationCap className="h-5 w-5 text-[var(--accent)] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-[var(--text-primary)]">500+ University Campuses</div>
                      <div className="text-[11px] text-[var(--text-secondary)]">Stanford, IIT, Berkeley, MIT &amp; beyond.</div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] flex items-start gap-3">
                    <Award className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-[var(--text-primary)]">Verified Portfolio Proof</div>
                      <div className="text-[11px] text-[var(--text-secondary)]">Live GitHub projects &amp; architecture rubrics.</div>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/onboarding"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--accent)] text-white text-xs font-semibold hover:bg-[var(--accent-hover)] transition-all shadow-xl hover:scale-105"
                  >
                    <span>Join Your Student Cohort</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              {/* career2.png showcase card */}
              <div className="lg:col-span-6 relative">
                <div className="relative rounded-2xl overflow-hidden border border-[var(--border-color)] shadow-2xl group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/career2.png"
                    alt="Students collaborating on AI engineering code"
                    className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Floating overlay stats on image */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/15 text-white flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        <span>Active Study Circles</span>
                      </div>
                      <span className="text-[11px] text-white/70">1,420 students building LLM apps today</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[var(--accent)] text-white text-[10px] font-bold">
                      Live Cohort
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </section>

      {/* 5. LIVE INTERACTIVE DASHBOARD PREVIEW SECTION */}
      <section className="py-20 bg-[var(--bg-primary)] text-[var(--text-primary)] relative overflow-hidden transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-xs text-[var(--text-secondary)] mb-3 shimmer-badge">
                <Sparkles className="h-3.5 w-3.5 text-[var(--accent)]" />
                <span>Interactive Command Center</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
                Inside the CareerUp Experience
              </h2>
            </div>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--accent)] text-white text-xs font-semibold hover:bg-[var(--accent-hover)] transition-all hover:scale-105 shadow-xl self-start md:self-auto"
            >
              <span>Launch Live Dashboard</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Realistic Mock Dashboard Container */}
          <SpotlightCard className="p-6 sm:p-8 shadow-2xl bg-[var(--bg-card)] border border-[var(--border-color)]">
            {/* Top Bar of Preview */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[var(--border-color)] gap-4">
              <div>
                <div className="text-lg sm:text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
                  Good morning, {studentProfile.name.split(" ")[0]} 👋
                </div>
                <div className="text-xs text-[var(--text-secondary)]">Your future is full of possibilities. Let&apos;s explore.</div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-[var(--text-secondary)]">Career Readiness:</span>
                <span className="px-3 py-1 rounded-full bg-[var(--accent)]/15 border border-[var(--accent)]/40 text-[var(--accent)] font-bold text-xs shimmer-badge">
                  {overallReadinessScore}% Verified
                </span>
              </div>
            </div>

            {/* Grid Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Your Career DNA */}
              <div className="rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] p-5 flex flex-col justify-between card-hover-effect">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-[var(--text-primary)]">Your Career DNA</span>
                  <Link href="/profile" className="text-[11px] text-[var(--accent)] hover:underline flex items-center gap-1">
                    Full Profile <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
                <div className="py-2 flex items-center justify-center">
                  <RadarChartDNA scores={studentProfile.radarScores} size={170} />
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-[var(--border-color)]">
                  <div className="flex justify-between text-[var(--text-secondary)]">
                    <span>Technical</span>
                    <span className="font-semibold text-[var(--text-primary)]">{studentProfile.radarScores.technical}%</span>
                  </div>
                  <div className="flex justify-between text-[var(--text-secondary)]">
                    <span>Analytical</span>
                    <span className="font-semibold text-[var(--text-primary)]">{studentProfile.radarScores.analytical}%</span>
                  </div>
                  <div className="flex justify-between text-[var(--text-secondary)]">
                    <span>Communication</span>
                    <span className="font-semibold text-[var(--text-primary)]">{studentProfile.radarScores.communication}%</span>
                  </div>
                  <div className="flex justify-between text-[var(--text-secondary)]">
                    <span>Leadership</span>
                    <span className="font-semibold text-[var(--text-primary)]">{studentProfile.radarScores.leadership}%</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Top Career Matches */}
              <div className="rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] p-5 flex flex-col justify-between card-hover-effect">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-[var(--text-primary)]">Top Career Matches</span>
                  <Link href="/career" className="text-[11px] text-[var(--accent)] hover:underline flex items-center gap-1">
                    See All <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>

                <div className="space-y-2.5">
                  {careerPaths.slice(0, 3).map((career) => (
                    <Link
                      key={career.id}
                      href="/career"
                      className="flex items-center justify-between p-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[var(--accent)] hover:bg-[var(--accent)]/10 transition-all group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/15 flex items-center justify-center text-[var(--accent)]">
                          <Compass className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-xs font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                            {career.title}
                          </div>
                          <div className="text-[10px] text-[var(--text-muted)]">{career.category}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-[var(--accent)]">{career.matchScore}%</span>
                        <span className="block text-[9px] text-[var(--text-muted)]">match</span>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="pt-3 border-t border-[var(--border-color)] text-[11px] text-[var(--text-secondary)] flex items-center justify-between">
                  <span>Demand: Explosive</span>
                  <span className="text-[var(--text-primary)] font-medium">$145k – $190k avg</span>
                </div>
              </div>

              {/* Card 3: Skill Gap Analysis */}
              <div className="rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] p-5 flex flex-col justify-between card-hover-effect">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-[var(--text-primary)]">Skill Gap Analysis</span>
                  <Link href="/skill-gap" className="text-[11px] text-[var(--accent)] hover:underline flex items-center gap-1">
                    Detailed View <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>

                <div className="flex items-center gap-4 py-2">
                  <CircularProgress value={68} size={90} strokeWidth={8} color="var(--accent)" />
                  <div className="space-y-1.5 flex-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[var(--text-secondary)] flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        Skills You Have
                      </span>
                      <span className="font-bold text-[var(--text-primary)]">11</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[var(--text-secondary)] flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        Skills to Improve
                      </span>
                      <span className="font-bold text-[var(--text-primary)]">3</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[var(--text-secondary)] flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                        Skills to Learn
                      </span>
                      <span className="font-bold text-[var(--text-primary)]">2</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[var(--border-color)]">
                  <span className="text-[11px] text-[var(--text-muted)]">Highest Impact Skill:</span>
                  <div className="text-xs font-medium text-[var(--text-primary)] truncate">Vector DBs &amp; Hybrid RAG (+12% match)</div>
                </div>
              </div>
            </div>

            {/* Bottom Row: Roadmap & What-If Teaser */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6 pt-6 border-t border-[var(--border-color)]">
              {/* Roadmap teaser */}
              <div className="md:col-span-8 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] p-5 card-hover-effect">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <GitBranch className="h-4 w-4 text-[var(--accent)]" />
                    <span className="text-xs font-semibold text-[var(--text-primary)]">Your Personalized 12-Week Roadmap</span>
                  </div>
                  <Link href="/roadmap" className="text-[11px] text-[var(--accent)] hover:underline">
                    View Interactive Timeline →
                  </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {roadmap.map((m) => (
                    <div
                      key={m.id}
                      className={`p-3 rounded-xl border text-xs transition-all hover:scale-105 ${
                        m.status === "in-progress"
                          ? "bg-[var(--bg-card)] border-[var(--accent)]/40"
                          : "bg-[var(--bg-card)] border-[var(--border-color)] opacity-80"
                      }`}
                    >
                      <div className="text-[10px] text-[var(--accent)] font-bold uppercase">{m.timeframe}</div>
                      <div className="font-medium text-[var(--text-primary)] line-clamp-2 mt-1">{m.title}</div>
                      <div className="mt-2 text-[10px] text-[var(--text-secondary)] flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                        <span>{m.tasks.filter((t) => t.completed).length}/{m.tasks.length} Done</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* What If banner */}
              <div className="md:col-span-4 rounded-2xl bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-card-subtle)] border border-[var(--accent)]/40 p-5 flex flex-col justify-between card-hover-effect">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--accent)] uppercase tracking-wider mb-2 shimmer-badge px-2 py-0.5 rounded w-fit">
                    <Zap className="h-3.5 w-3.5" />
                    <span>What-If Simulator</span>
                  </div>
                  <div className="text-sm font-semibold text-[var(--text-primary)]">What happens if you master LangGraph?</div>
                  <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                    Instantly unlocks 3 Tier-1 AI Engineer roles with average salary of $170k.
                  </p>
                </div>

                <Link
                  href="/what-if"
                  className="mt-4 inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[var(--accent)] text-white text-xs font-semibold hover:bg-[var(--accent-hover)] transition-all hover:scale-105 shadow-xl"
                >
                  <span>Simulate Now</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </section>

      {/* 6. FOOTER */}
      <Footer />
    </div>
  );
}
