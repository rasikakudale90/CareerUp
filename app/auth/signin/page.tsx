"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Lock,
  Mail,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Zap,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { usePrototype } from "@/lib/prototype-state";

export default function SignInPage() {
  const router = useRouter();
  const { signIn } = usePrototype();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setTimeout(() => {
      signIn(email, password);
      setLoading(false);
      router.push("/dashboard");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col relative overflow-hidden selection:bg-[var(--accent)] selection:text-white">
      {/* ATMOSPHERIC BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/career2.png"
          alt="Collaborative Student Hub"
          className="w-full h-full object-cover object-center opacity-15 filter blur-[1.5px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/85 to-[var(--bg-primary)]/75" />
      </div>

      <div className="relative z-20">
        <Navbar />
      </div>

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative z-10">
        <div className="w-full max-w-md">
          <SpotlightCard className="p-8 sm:p-10 shadow-2xl backdrop-blur-2xl bg-[var(--bg-card)] border border-[var(--border-color)]">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-2xl bg-[var(--accent)]/15 text-[var(--accent)] flex items-center justify-center mx-auto mb-4 border border-[var(--accent)]/30 shadow-lg">
                <Sparkles className="h-6 w-6" />
              </div>
              <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">Sign In to CareerUp</h1>
              <p className="text-xs text-[var(--text-secondary)] mt-1.5">
                Access your personalized Career DNA, skill roadmap, and live job matches.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@university.edu"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-[var(--text-secondary)]">Password</label>
                  <a href="#" className="text-[11px] text-[var(--accent)] hover:underline">Forgot?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold text-xs transition-all shadow-xl flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] mt-2"
              >
                {loading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span className="shimmer-text">Sign In to Dashboard</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            {/* Footer switcher */}
            <div className="mt-6 pt-6 border-t border-[var(--border-color)] text-center text-xs text-[var(--text-secondary)]">
              Don&apos;t have an account?{" "}
              <Link href="/auth/register" className="font-semibold text-[var(--accent)] hover:underline">
                Create Free Student Profile
              </Link>
            </div>
          </SpotlightCard>
        </div>
      </main>
    </div>
  );
}
