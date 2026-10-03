"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, CheckCircle2, Globe, Share2, Send } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-[var(--bg-secondary)] text-[var(--text-secondary)] border-t border-[var(--border-color)] overflow-hidden pt-16 pb-12 transition-colors duration-300">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-[var(--accent-soft)] blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial High-Impact CTA Banner with career1.png Landscape */}
        <div className="rounded-3xl border border-[var(--border-color)] p-8 sm:p-14 mb-16 text-center relative overflow-hidden shadow-2xl group">
          {/* Background image from career1.png */}
          <div className="absolute inset-0 z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/career1.png"
              alt="Misty Landscape"
              className="w-full h-full object-cover object-center opacity-30 scale-105 group-hover:scale-110 transition-transform duration-700 filter blur-[0.5px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] via-[var(--bg-card)]/85 to-[var(--bg-card)]/70" />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-xs text-[var(--text-secondary)] mb-4 backdrop-blur-md shimmer-border">
              <Sparkles className="h-3.5 w-3.5 text-[var(--accent)]" />
              <span>Transform Your Career Trajectory</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight max-w-2xl mx-auto mb-4 drop-shadow-md">
              Ready to turn your skills into real opportunities?
            </h2>

            <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-xl mx-auto mb-8 drop-shadow">
              Upload your resume or GitHub profile to generate your dynamic Career DNA, pinpoint missing skill bridges, and simulate your readiness.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/onboarding"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[var(--accent)] text-white font-semibold text-sm hover:bg-[var(--accent-hover)] transition-all hover:scale-105 shadow-2xl border border-[var(--border-color)]"
              >
                <span>Get Your Career DNA</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[var(--bg-card-subtle)] backdrop-blur-xl text-[var(--text-primary)] font-medium text-sm hover:bg-[var(--bg-card)] border border-[var(--border-color)] transition-all hover:scale-105 shadow-xl"
              >
                <span>Explore Live Dashboard</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Col: CareerUp */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)] text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="font-bold text-lg text-[var(--text-primary)] tracking-tight">CareerUp</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] max-w-sm mb-4 leading-relaxed">
              A resume tells you where you are. CareerUp tells you where you can go, what is missing, and what to do next.
            </p>
            <div className="flex items-center gap-3 text-[var(--text-secondary)]">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 rounded-full hover:bg-[var(--bg-card-subtle)] hover:text-[var(--text-primary)] transition-colors" title="GitHub">
                <Globe className="h-4 w-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 rounded-full hover:bg-[var(--bg-card-subtle)] hover:text-[var(--text-primary)] transition-colors" title="LinkedIn">
                <Share2 className="h-4 w-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 rounded-full hover:bg-[var(--bg-card-subtle)] hover:text-[var(--text-primary)] transition-colors" title="Community">
                <Send className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Nav 1 */}
          <div>
            <h4 className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-3">Intelligence</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/dashboard" className="hover:text-[var(--text-primary)] transition-colors">Command Center</Link></li>
              <li><Link href="/profile" className="hover:text-[var(--text-primary)] transition-colors">Career DNA Matrix</Link></li>
              <li><Link href="/career" className="hover:text-[var(--text-primary)] transition-colors">Career Landscape</Link></li>
              <li><Link href="/skill-gap" className="hover:text-[var(--text-primary)] transition-colors">Skill Gap Engine</Link></li>
            </ul>
          </div>

          {/* Nav 2 */}
          <div>
            <h4 className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-3">Interactive</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/what-if" className="hover:text-[var(--text-primary)] transition-colors">What-If Simulator</Link></li>
              <li><Link href="/roadmap" className="hover:text-[var(--text-primary)] transition-colors">12-Week Roadmap</Link></li>
              <li><Link href="/job-match" className="hover:text-[var(--text-primary)] transition-colors">ATS &amp; Job Matcher</Link></li>
              <li><Link href="/readiness" className="hover:text-[var(--text-primary)] transition-colors">Readiness Index</Link></li>
            </ul>
          </div>

          {/* Nav 3 */}
          <div>
            <h4 className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-3">Company</h4>
            <ul className="space-y-2 text-xs">
              <li><span className="text-[var(--text-secondary)]">Built for Students</span></li>
              <li><span className="text-[var(--text-secondary)]">CareerUp Spec v1.0</span></li>
              <li><span className="text-[var(--text-secondary)]">Privacy &amp; Mock Mode</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[var(--text-muted)] gap-4">
          <p>© 2026 CareerUp. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Powered by Next.js &amp; Gemini Intelligence</span>
            <span>•</span>
            <span>Cinematic Design System</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
