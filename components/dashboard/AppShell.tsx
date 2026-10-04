"use client";

import React, { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Compass,
  BarChart3,
  GitBranch,
  Sparkles,
  Briefcase,
  ShieldCheck,
  User,
  Search,
  Bell,
  ChevronRight,
  RotateCcw,
  Users,
} from "lucide-react";
import { usePrototype } from "@/lib/prototype-state";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

interface AppShellProps {
  children: ReactNode;
  headerTitle?: string;
  headerSubtitle?: string;
}

export function AppShell({ children, headerTitle, headerSubtitle }: AppShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { studentProfile, overallReadinessScore, resetState, signIn, greeting } = usePrototype();
  const [searchQuery, setSearchQuery] = useState("");

  const isAlex = studentProfile.id === "student-alex";

  const menuItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Career Paths", href: "/career", icon: Compass },
    { label: "Skill Gap", href: "/skill-gap", icon: BarChart3 },
    { label: "Roadmap", href: "/roadmap", icon: GitBranch },
    { label: "What If Simulator", href: "/what-if", icon: Sparkles },
    { label: "Job Match", href: "/job-match", icon: Briefcase },
    { label: "Job Readiness", href: "/readiness", icon: ShieldCheck },
    { label: "Profile", href: "/profile", icon: User },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const q = searchQuery.toLowerCase();
    if (q.includes("skill") || q.includes("gap")) router.push("/skill-gap");
    else if (q.includes("road") || q.includes("learn") || q.includes("task")) router.push("/roadmap");
    else if (q.includes("what") || q.includes("sim") || q.includes("future")) router.push("/what-if");
    else if (q.includes("job") || q.includes("match") || q.includes("apply")) router.push("/job-match");
    else if (q.includes("career") || q.includes("role") || q.includes("path")) router.push("/career");
    else if (q.includes("ready") || q.includes("score")) router.push("/readiness");
    else router.push("/career");
  };

  const handleTogglePersona = () => {
    if (isAlex) {
      signIn("aditi.sharma@iit.ac.in", "", "aditi");
    } else {
      signIn("alex.morgan@stanford.edu", "", "alex");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex relative overflow-hidden selection:bg-[var(--accent)] selection:text-white transition-colors duration-300">
      {/* ATMOSPHERIC BACKGROUND (career1.png) WITH DYNAMIC THEME OVERLAY */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/career1.png"
          alt="Cinematic Landscape"
          className="w-full h-full object-cover object-center opacity-15 filter blur-[2px] scale-105"
        />
        {/* Gradients Overlay for Depth & Dynamic Theme Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/85 to-[var(--bg-primary)]/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--accent-soft),transparent_50%)]" />
      </div>

      {/* Left Sidebar */}
      <aside className="w-64 border-r border-[var(--border-color)] bg-[var(--bg-secondary)]/90 backdrop-blur-2xl flex flex-col justify-between hidden md:flex shrink-0 relative z-20 transition-colors duration-300">
        <div>
          {/* Logo: CareerUp */}
          <div className="p-6 border-b border-[var(--border-subtle)]">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)] text-white shadow-lg transition-transform group-hover:scale-105">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="font-bold text-base tracking-tight text-[var(--text-primary)] flex items-center gap-1.5">
                CareerUp
                <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent)]/20">
                  AI
                </span>
              </span>
            </Link>
          </div>

          {/* Quick Persona Switcher Bar in Sidebar */}
          <div className="px-4 pt-3 pb-1">
            <button
              onClick={handleTogglePersona}
              className="w-full flex items-center justify-between px-3 py-2 rounded-2xl bg-[var(--bg-card-subtle)] hover:bg-[var(--bg-card)] border border-[var(--border-color)] text-xs transition-all hover:border-[var(--accent)]"
              title="Switch Persona between Aditi & Alex"
            >
              <div className="flex items-center gap-2">
                <Users className="h-3.5 w-3.5 text-[var(--accent)]" />
                <span className="text-[11px] font-medium text-[var(--text-secondary)]">Persona:</span>
                <span className="text-[11px] font-bold text-[var(--text-primary)]">{isAlex ? "Alex" : "Aditi"}</span>
              </div>
              <span className="text-[10px] uppercase font-bold text-[var(--accent)] hover:underline">Switch</span>
            </button>
          </div>

          {/* Nav List */}
          <nav className="p-4 space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-medium transition-all duration-200 hover:translate-x-1.5 active:scale-95 ${
                    isActive
                      ? "bg-[var(--accent-soft)] text-[var(--text-primary)] font-bold border border-[var(--accent)]/30 shadow-md"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-subtle)] hover:border hover:border-[var(--border-color)]"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 transition-transform duration-200 group-hover:scale-110 ${
                      isActive ? "text-[var(--accent)]" : "text-[var(--text-secondary)] group-hover:text-[var(--accent)]"
                    }`}
                  />
                  <span className="transition-colors">{item.label}</span>
                  {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-ping" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Student Profile Card */}
        <div className="p-4 border-t border-[var(--border-color)] space-y-3">
          <Link
            href="/profile"
            className="flex items-center gap-3 p-2 rounded-2xl hover:bg-[var(--bg-card-subtle)] transition-colors group"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={studentProfile.avatarUrl}
              alt={studentProfile.name}
              className="w-9 h-9 rounded-full object-cover border border-[var(--accent)]"
            />
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs font-semibold text-[var(--text-primary)] truncate group-hover:text-[var(--accent)] transition-colors">
                {studentProfile.name}
              </span>
              <span className="text-[10px] text-[var(--text-secondary)] truncate">{studentProfile.title}</span>
            </div>
            <ChevronRight className="h-3.5 w-3.5 text-[var(--text-secondary)]" />
          </Link>

          <div className="px-3.5 py-2 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] flex items-center justify-between text-xs">
            <span className="text-[var(--text-secondary)] text-[11px]">Readiness Score</span>
            <span className="font-bold text-[var(--accent)] shimmer-text">{overallReadinessScore}%</span>
          </div>

          <div className="flex items-center justify-between pt-1 text-[11px] text-[var(--text-secondary)]">
            <button
              onClick={() => {
                if (confirm("Reset demo data to default student profile?")) {
                  resetState();
                }
              }}
              className="flex items-center gap-1.5 hover:text-[var(--text-primary)] transition-colors"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset State</span>
            </button>
            <Link href="/" className="hover:text-[var(--text-primary)] transition-colors">
              Exit App
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        {/* Top Header Bar */}
        <header className="h-16 border-b border-[var(--border-color)] bg-[var(--bg-secondary)]/85 backdrop-blur-2xl px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 transition-colors duration-300">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Mobile Home link */}
            <Link href="/" className="md:hidden flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent)] text-white">
                <Sparkles className="h-3.5 w-3.5" />
              </div>
            </Link>

            {/* Title / Greeting */}
            <div>
              <h1 className="text-xs sm:text-base font-bold text-[var(--text-primary)] tracking-tight flex items-center gap-2">
                {headerTitle || `${greeting}, ${studentProfile.name.split(" ")[0]} 👋`}
              </h1>
              <p className="text-[11px] text-[var(--text-secondary)] hidden sm:block">
                {headerSubtitle || "Your future is full of possibilities. Let's explore."}
              </p>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Switch Persona Pill (Mobile & Desktop) */}
            <button
              onClick={handleTogglePersona}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--bg-card-subtle)] hover:bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[var(--accent)] text-xs text-[var(--text-primary)] transition-all hover:scale-105 active:scale-95 shadow-sm"
              title="Toggle Persona"
            >
              <Users className="h-3.5 w-3.5 text-[var(--accent)]" />
              <span className="hidden sm:inline text-[11px] font-medium text-[var(--text-secondary)]">Persona:</span>
              <span className="text-[11px] font-bold">{isAlex ? "Alex" : "Aditi"}</span>
            </button>

            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* Search Input */}
            <form onSubmit={handleSearch} className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--text-secondary)]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ask anything about careers..."
                className="w-44 lg:w-56 pl-9 pr-3 py-1.5 rounded-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-all hover:border-[var(--accent)]/50"
              />
            </form>

            {/* Notification Bell */}
            <Link
              href="/dashboard"
              className="p-2 rounded-full bg-[var(--bg-card-subtle)] hover:bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all hover:scale-110 active:scale-95 relative"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            </Link>

            {/* User Avatar */}
            <Link href="/profile" className="hover:scale-110 active:scale-95 transition-transform">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={studentProfile.avatarUrl}
                alt={studentProfile.name}
                className="w-8 h-8 rounded-full object-cover border-2 border-[var(--accent)] shadow-md"
              />
            </Link>
          </div>
        </header>

        {/* Mobile Horizontal Navigation Strip */}
        <div className="md:hidden border-b border-[var(--border-color)] bg-[var(--bg-secondary)]/95 backdrop-blur-xl px-3 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 active:scale-95 ${
                  isActive
                    ? "bg-[var(--accent)] text-white shadow-md border border-[var(--accent)]"
                    : "text-[var(--text-secondary)] bg-[var(--bg-card-subtle)] hover:bg-[var(--bg-card)] border border-[var(--border-color)]"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Page Content Container with Mobile-First Padding */}
        <main className="flex-1 p-3.5 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">{children}</main>
      </div>
    </div>
  );
}
