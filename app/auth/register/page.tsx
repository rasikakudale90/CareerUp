"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  ArrowRight,
  User,
  Mail,
  Lock,
  GraduationCap,
  Building,
  CheckCircle2,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { usePrototype } from "@/lib/prototype-state";

export default function RegisterPage() {
  const router = useRouter();
  const { signUp } = usePrototype();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    university: "",
    degree: "B.Tech Computer Science",
    graduationYear: "2026",
    targetRole: "AI Product Engineer",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setLoading(true);
    setTimeout(() => {
      signUp({
        name: formData.name,
        email: formData.email,
        university: formData.university || "Stanford / IIT Scholar",
        degree: formData.degree,
        graduationYear: formData.graduationYear,
        targetRole: formData.targetRole,
      });
      setLoading(false);
      router.push("/dashboard");
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col relative overflow-hidden selection:bg-[var(--accent)] selection:text-white">
      {/* ATMOSPHERIC BACKGROUND (career2.png) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/career2.png"
          alt="Student Hub"
          className="w-full h-full object-cover object-center opacity-15 filter blur-[1.5px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/85 to-[var(--bg-primary)]/75" />
      </div>

      <div className="relative z-20">
        <Navbar />
      </div>

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative z-10 my-4">
        <div className="w-full max-w-lg">
          <SpotlightCard className="p-8 sm:p-10 shadow-2xl backdrop-blur-2xl bg-[var(--bg-card)] border border-[var(--border-color)]">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[var(--accent)]/15 text-[var(--accent)] flex items-center justify-center mx-auto mb-3 border border-[var(--accent)]/30 shadow-lg">
                <Sparkles className="h-6 w-6" />
              </div>
              <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">Join CareerUp Platform</h1>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Start discovering tailored AI career tracks, skill gap bridges, and ATS roadmaps.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--text-muted)]" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Maya Patel"
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                    University / College
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--text-muted)]" />
                    <input
                      type="text"
                      value={formData.university}
                      onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                      placeholder="e.g. Stanford University"
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--text-muted)]" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="student@university.edu"
                    className="w-full pl-10 pr-3 py-2 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                    Major / Degree
                  </label>
                  <input
                    type="text"
                    value={formData.degree}
                    onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                    Graduation Year
                  </label>
                  <select
                    value={formData.graduationYear}
                    onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                  >
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                  Target AI / Tech Specialization
                </label>
                <select
                  value={formData.targetRole}
                  onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                >
                  <option value="AI Product Engineer">AI Product Engineer (Fullstack + LLM)</option>
                  <option value="Applied Machine Learning Engineer">Applied Machine Learning Engineer</option>
                  <option value="AI Infrastructure & Distributed Systems">AI Infrastructure &amp; Distributed Systems</option>
                  <option value="Full-Stack Engineer (GenAI Native)">Full-Stack Engineer (GenAI Native)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                  Create Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--text-muted)]" />
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Min 8 characters"
                    className="w-full pl-10 pr-3 py-2 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold text-xs transition-all shadow-xl flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] mt-2"
              >
                {loading ? (
                  <span>Creating Career DNA Profile...</span>
                ) : (
                  <>
                    <span className="shimmer-text">Create Free Student Profile</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            {/* Footer switcher */}
            <div className="mt-6 pt-6 border-t border-[var(--border-color)] text-center text-xs text-[var(--text-secondary)]">
              Already have a profile?{" "}
              <Link href="/auth/signin" className="font-semibold text-[var(--accent)] hover:underline">
                Sign In to CareerUp
              </Link>
            </div>
          </SpotlightCard>
        </div>
      </main>
    </div>
  );
}
