"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Bell,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Briefcase,
  Layers,
  Trash2,
  CheckCheck,
  AlertCircle,
  ArrowRight,
  Filter,
  Bot,
  Zap,
} from "lucide-react";
import { AppShell } from "@/components/dashboard/AppShell";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { usePrototype } from "@/lib/prototype-state";

export default function NotificationsPage() {
  const {
    notifications,
    unreadNotificationsCount,
    markNotificationRead,
    markAllNotificationsRead,
    clearAllNotifications,
    addNotification,
    overallReadinessScore,
    studentProfile,
  } = usePrototype();

  const [activeTab, setActiveTab] = useState<string>("All");

  // Automatically mark all notifications as read when viewing the notifications page so the counter badge disappears immediately
  useEffect(() => {
    markAllNotificationsRead();
  }, [markAllNotificationsRead]);

  const categories = ["All", "Unread", "Match Alert", "Skill Milestone", "Market Shift", "Readiness Boost", "System Update"];

  const filteredNotifications = notifications.filter((notif) => {
    if (activeTab === "All") return true;
    if (activeTab === "Unread") return !!notif.unread;
    return notif.category === activeTab;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Match Alert":
        return <Briefcase className="h-4 w-4 text-emerald-400" />;
      case "Skill Milestone":
        return <Layers className="h-4 w-4 text-cyan-400" />;
      case "Market Shift":
        return <TrendingUp className="h-4 w-4 text-amber-400" />;
      case "Readiness Boost":
        return <Zap className="h-4 w-4 text-[var(--accent)]" />;
      default:
        return <Sparkles className="h-4 w-4 text-[var(--accent)]" />;
    }
  };

  const handleSimulateNewAlert = () => {
    const alerts = [
      {
        category: "Match Alert" as const,
        title: "Anthropic posted a new AI Interface Role (94% Fit)",
        message: "Your recent Next.js and API architecture score matches Claude Canvas requirements.",
        actionText: "Check ATS Match",
        actionHref: "/job-match",
      },
      {
        category: "Market Shift" as const,
        title: "OpenAI Operator benchmark added to industry standards",
        message: "Computer-using agents and browser automation skills are surging in demand across SF startups.",
        actionText: "Explore What-If",
        actionHref: "/what-if",
      },
      {
        category: "Readiness Boost" as const,
        title: "Interview Readiness Diagnostic available",
        message: "Your portfolio has passed 90% benchmark. Take the mock technical interview defense.",
        actionText: "View Readiness",
        actionHref: "/readiness",
      },
      {
        category: "Skill Milestone" as const,
        title: "New Vector DB benchmark module ready",
        message: "Complete the hybrid search indexing task in your roadmap to close your top critical blocker.",
        actionText: "Open Roadmap",
        actionHref: "/roadmap",
      },
    ];

    const random = alerts[Math.floor(Math.random() * alerts.length)];
    addNotification(random);
  };

  return (
    <AppShell
      headerTitle="AI Career Intelligence Notifications"
      headerSubtitle="Real-time alerts, market shifts, roadmap milestones, and interview readiness triggers."
    >
      <div className="space-y-6">
        {/* Header Notification Center Banner */}
        <div className="rounded-3xl bg-gradient-to-br from-[var(--bg-card-subtle)] via-[var(--bg-card)] to-[var(--bg-primary)] border border-[var(--border-color)] p-6 sm:p-8 shadow-2xl relative overflow-hidden card-hover-effect">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--accent-soft)] rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--accent-soft)] border border-[var(--accent)]/30 text-xs text-[var(--accent)] font-bold mb-3 shimmer-badge">
                <Bell className="h-3.5 w-3.5" />
                <span>Live Career Intelligence Feed</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
                Notifications &amp; Strategic Alerts
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-xl mt-1 leading-relaxed">
                Stay synchronized with live AI market analytics, urgent skill gap alerts, and hiring opportunities tailored to {studentProfile.name}.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 flex-wrap">
              <button
                onClick={handleSimulateNewAlert}
                className="px-4 py-2.5 rounded-2xl bg-[var(--bg-card-subtle)] hover:bg-[var(--border-color)] border border-[var(--border-color)] text-xs font-semibold text-[var(--text-primary)] transition-all flex items-center gap-2 shadow-sm hover:scale-105 active:scale-95"
              >
                <Bot className="h-4 w-4 text-[var(--accent)]" />
                <span>Trigger New Alert</span>
              </button>

              <button
                onClick={markAllNotificationsRead}
                className="px-4 py-2.5 rounded-2xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-semibold transition-all flex items-center gap-2 shadow-md hover:scale-105 active:scale-95"
              >
                <CheckCheck className="h-4 w-4" />
                <span>Mark All Read</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Controls & Stats Strip */}
        <SpotlightCard className="p-4 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto">
            {categories.map((cat) => {
              const count =
                cat === "All"
                  ? notifications.length
                  : cat === "Unread"
                  ? unreadNotificationsCount
                  : notifications.filter((n) => n.category === cat).length;

              if (count === 0 && cat !== "All" && cat !== "Unread") return null;

              return (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === cat
                      ? "bg-[var(--accent)] text-white shadow-md"
                      : "bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent)]/40 border border-transparent"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      activeTab === cat ? "bg-white/20 text-white" : "bg-black/10 dark:bg-white/10 text-[var(--text-secondary)]"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
            {notifications.length > 0 && (
              <button
                onClick={() => {
                  if (confirm("Clear all notifications?")) {
                    clearAllNotifications();
                  }
                }}
                className="text-xs text-[var(--text-secondary)] hover:text-red-500 transition-colors flex items-center gap-1 p-1.5 rounded-xl hover:bg-red-500/10"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Clear All</span>
              </button>
            )}
          </div>
        </SpotlightCard>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <SpotlightCard className="p-12 text-center bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl space-y-3">
              <div className="w-12 h-12 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-[var(--text-primary)]">All Caught Up!</h3>
              <p className="text-xs text-[var(--text-secondary)] max-w-sm mx-auto">
                No active notifications in this category. You are in optimal sync with your roadmap and market benchmarks.
              </p>
              <button
                onClick={handleSimulateNewAlert}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--accent)] text-white text-xs font-semibold hover:bg-[var(--accent-hover)] transition-all shadow-md"
              >
                <Zap className="h-3.5 w-3.5" />
                <span>Trigger Live AI Alert</span>
              </button>
            </SpotlightCard>
          ) : (
            filteredNotifications.map((notif) => (
              <SpotlightCard
                key={notif.id}
                onClick={() => markNotificationRead(notif.id)}
                className={`p-5 rounded-3xl border transition-all card-hover-effect cursor-pointer ${
                  notif.unread
                    ? "bg-[var(--accent-soft)]/20 border-[var(--accent)]/60 shadow-xl ring-1 ring-[var(--accent)]/20"
                    : "bg-[var(--bg-card)] border-[var(--border-color)] hover:border-[var(--accent)]/40"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${
                        notif.unread
                          ? "bg-[var(--accent)] text-white"
                          : "bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] border border-[var(--border-color)]"
                      }`}
                    >
                      {getCategoryIcon(notif.category)}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] border border-[var(--border-color)]">
                          {notif.category}
                        </span>
                        <h4 className="text-sm font-bold text-[var(--text-primary)] tracking-tight">
                          {notif.title}
                        </h4>
                        {notif.unread && (
                          <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-ping" />
                        )}
                      </div>

                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                        {notif.message}
                      </p>

                      <div className="text-[10px] text-[var(--text-muted)] pt-1">{notif.date}</div>
                    </div>
                  </div>

                  {/* Action Link */}
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    {notif.actionHref && (
                      <Link
                        href={notif.actionHref}
                        onClick={(e) => {
                          e.stopPropagation();
                          markNotificationRead(notif.id);
                        }}
                        className="px-4 py-2 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-semibold transition-all flex items-center gap-1.5 shadow-md hover:scale-105 active:scale-95"
                      >
                        <span>{notif.actionText || "View Details"}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              </SpotlightCard>
            ))
          )}
        </div>
      </div>
    </AppShell>
  );
}
