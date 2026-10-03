import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { PrototypeProvider } from "@/lib/prototype-state";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CareerUp — AI Career Intelligence Platform",
  description:
    "A resume tells you where you are. CareerUp tells you where you can go, what is missing, and what to do next. Personalized career paths, skill-gap roadmaps, and What-If simulation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${plusJakarta.variable} ${inter.variable} antialiased dark`}>
      <body className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[var(--accent)] selection:text-white transition-colors duration-300">
        <ThemeProvider>
          <LenisProvider>
            <PrototypeProvider>{children}</PrototypeProvider>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
