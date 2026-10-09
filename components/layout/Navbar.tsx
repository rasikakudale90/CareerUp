"use client";

import React, { useState } from "react";
import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Sparkles, ArrowRight, Menu, X, LogOut, User, Bell } from "lucide-react";
import { usePrototype } from "@/lib/prototype-state";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const {
    isAuthenticated,
    currentUser,
    signOut,
    unreadNotificationsCount,
  } = usePrototype();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Careers", href: "/career" },
    { label: "Skill Gap", href: "/skill-gap" },
    { label: "Roadmap", href: "/roadmap" },
    { label: "What-If", href: "/what-if" },
    { label: "Jobs", href: "/job-match" },
    { label: "Readiness", href: "/readiness" },
  ];

  const handleSignOut = () => {
    signOut();
    setMobileMenuOpen(false);
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 pt-3 pb-2">
        <nav className="flex items-center justify-between rounded-full bg-[var(--bg-nav)] backdrop-blur-2xl px-3.5 sm:px-5 py-2 sm:py-2.5 border border-[var(--border-color)] shadow-xl text-[var(--text-primary)] transition-colors duration-300">
          {/* Brand Logo: CareerUp */}
          <NextLink href="/" className="flex items-center gap-2 group shrink-0 mr-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)] text-white shadow-md transition-transform group-hover:scale-105">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm sm:text-base tracking-tight text-[var(--text-primary)] flex items-center gap-1">
                CareerUp
                <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent)]/20">
                  AI
                </span>
              </span>
            </div>
          </NextLink>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <NextLink
                  key={link.href}
                  href={link.href}
                  className={`relative px-2.5 xl:px-3 py-1.5 text-xs font-medium tracking-tight rounded-full transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? "text-[var(--text-primary)] bg-[var(--accent-soft)] font-bold border border-[var(--accent)]/30"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-subtle)]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-[var(--accent)]" />
                  )}
                </NextLink>
              );
            })}
          </div>

          {/* Right Action Controls & Auth */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* Notifications Icon (Desktop) */}
            {isAuthenticated && (
              <NextLink
                href="/notifications"
                className="p-2 rounded-full hover:bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all relative shrink-0"
                title="Notifications"
              >
                <Bell className="h-4 w-4" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                )}
              </NextLink>
            )}

            {/* Auth Buttons / User Avatar */}
            {isAuthenticated && currentUser ? (
              <div className="flex items-center gap-1.5 shrink-0">
                <NextLink
                  href="/profile"
                  className="flex items-center gap-1.5 p-1 pl-2 rounded-full bg-[var(--bg-card-subtle)] hover:bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[var(--accent)] transition-all text-xs text-[var(--text-primary)] shrink-0"
                  title="My Profile"
                >
                  <span className="hidden xl:inline font-medium text-xs">{currentUser.name.split(" ")[0]}</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={currentUser.avatarUrl}
                    alt={currentUser.name}
                    className="w-6 h-6 rounded-full object-cover border border-[var(--accent)]"
                  />
                </NextLink>

                <button
                  onClick={handleSignOut}
                  title="Sign Out"
                  className="p-1.5 rounded-full hover:bg-red-500/15 hover:text-red-500 text-[var(--text-secondary)] transition-colors border border-transparent hover:border-red-500/20 shrink-0"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1 shrink-0">
                <NextLink
                  href="/auth/signin"
                  className="px-2.5 py-1.5 rounded-full hover:bg-[var(--bg-card-subtle)] text-xs font-semibold text-[var(--text-primary)] transition-colors shrink-0"
                >
                  Sign In
                </NextLink>
              </div>
            )}

            {/* Upload Resume CTA */}
            <NextLink
              href="/onboarding"
              className="hidden sm:flex items-center gap-1.5 rounded-full bg-[var(--accent)] px-3.5 py-1.5 text-xs font-semibold text-white shadow-md hover:bg-[var(--accent-hover)] transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0"
            >
              <span>Upload Resume</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </NextLink>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-full lg:hidden text-[var(--text-secondary)] hover:text-[var(--text-primary)] shrink-0"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Hamburger Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 p-4 rounded-3xl bg-[var(--bg-nav)] border border-[var(--border-color)] backdrop-blur-2xl text-[var(--text-primary)] shadow-2xl flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
            {navLinks.map((link) => (
              <NextLink
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-2xl text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-[var(--accent)] text-white font-semibold shadow-md"
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-card-subtle)]"
                }`}
              >
                {link.label}
              </NextLink>
            ))}

            {isAuthenticated && (
              <>
                <NextLink
                  href="/notifications"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-2xl text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-card-subtle)] flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    <span>Notifications</span>
                  </div>
                  {unreadNotificationsCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-[var(--accent)] text-white text-xs font-bold">
                      {unreadNotificationsCount}
                    </span>
                  )}
                </NextLink>
                <NextLink
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-2xl text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-card-subtle)] flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  <span>My Profile &amp; Career DNA</span>
                </NextLink>
              </>
            )}

            <div className="pt-2 border-t border-[var(--border-color)] flex items-center justify-between">
              {isAuthenticated ? (
                <button
                  onClick={handleSignOut}
                  className="w-full py-2.5 rounded-2xl bg-red-500/15 hover:bg-red-500/25 text-red-500 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-2 w-full">
                  <NextLink
                    href="/auth/signin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 text-center rounded-2xl bg-[var(--bg-card-subtle)] text-xs font-semibold text-[var(--text-primary)]"
                  >
                    Sign In
                  </NextLink>
                  <NextLink
                    href="/auth/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 text-center rounded-2xl bg-[var(--accent)] text-xs font-semibold text-white shadow-md"
                  >
                    Register
                  </NextLink>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
