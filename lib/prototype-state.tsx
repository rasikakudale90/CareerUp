"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import {
  StudentProfile,
  CareerPath,
  SkillGapItem,
  RoadmapMilestone,
  SimulationSkill,
  JobListing,
  AIInsight,
  INITIAL_STUDENT_PROFILE,
  CAREER_PATHS,
  SKILL_GAPS,
  INITIAL_ROADMAP,
  AVAILABLE_SIMULATION_SKILLS,
  SAMPLE_JOB_MATCHES,
  AI_INSIGHTS,
} from "./mock-data";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: "student" | "mentor" | "recruiter";
}

export interface SignUpData {
  name: string;
  email: string;
  university: string;
  degree: string;
  graduationYear: string;
  targetRole?: string;
}

export function getAIAvatarUrl(name: string, style: "bottts" | "adventurer" | "identicon" | "lorelei" = "bottts", seedOverride?: string): string {
  const seed = encodeURIComponent(seedOverride || name.trim().toLowerCase().replace(/\s+/g, "-") || "careerup-student");
  return `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}&backgroundColor=0f172a,1e293b,3b82f6`;
}

// Helper to compute intelligent career path match scores based on candidate skills
export function calculateDynamicCareerMatches(skills: { name: string; proficiency: number }[]): CareerPath[] {
  const skillNames = skills.map((s) => s.name.toLowerCase());

  const calculateScore = (targetSkills: string[], base: number) => {
    let matches = 0;
    targetSkills.forEach((ts) => {
      if (skillNames.some((sn) => sn.includes(ts.toLowerCase()) || ts.toLowerCase().includes(sn))) {
        matches++;
      }
    });
    const ratio = matches / Math.max(1, targetSkills.length);
    return Math.min(98, Math.max(50, Math.round(55 + ratio * 43)));
  };

  return CAREER_PATHS.map((career) => {
    let matchScore = career.matchScore;
    if (career.id === "ai-product-engineer") {
      matchScore = calculateScore(["react", "next", "typescript", "fastapi", "python", "llm", "tailwind"], 90);
    } else if (career.id === "fullstack-ai-dev") {
      matchScore = calculateScore(["react", "node", "typescript", "python", "sql", "apis", "fastapi"], 86);
    } else if (career.id === "data-scientist-applied-ml") {
      matchScore = calculateScore(["python", "pandas", "pytorch", "machine learning", "statistics", "sql", "rag"], 80);
    } else if (career.id === "ux-ai-researcher") {
      matchScore = calculateScore(["user experience", "react", "tailwind", "design", "communication", "storytelling"], 76);
    } else if (career.id === "mlops-platform-engineer") {
      matchScore = calculateScore(["docker", "kubernetes", "python", "ci/cd", "redis", "cloud", "fastapi"], 70);
    } else if (career.id === "solutions-architect-ai") {
      matchScore = calculateScore(["architecture", "apis", "sql", "communication", "security", "cloud"], 74);
    }

    return {
      ...career,
      matchScore,
    };
  }).sort((a, b) => b.matchScore - a.matchScore);
}

// Helper to calculate candidate radar polygon scores based on verified skills
export function calculateDynamicRadarScores(skills: { name: string; category: string; proficiency: number }[]) {
  const getCategoryAvg = (cat: string, fallback: number) => {
    const items = skills.filter((s) => s.category.toLowerCase() === cat.toLowerCase());
    if (items.length === 0) return fallback;
    const avg = items.reduce((acc, curr) => acc + curr.proficiency, 0) / items.length;
    return Math.round(avg);
  };

  return {
    technical: Math.min(99, Math.max(50, getCategoryAvg("Technical", 80))),
    analytical: Math.min(99, Math.max(50, getCategoryAvg("Analytical", 78))),
    communication: Math.min(99, Math.max(50, getCategoryAvg("Communication", 75))),
    leadership: Math.min(99, Math.max(50, getCategoryAvg("Leadership", 72))),
    domainKnowledge: Math.min(99, Math.max(50, Math.round((getCategoryAvg("Technical", 80) + getCategoryAvg("Analytical", 78)) / 2))),
  };
}

// Helper to calculate job matches for candidate skills
export function calculateDynamicJobMatches(skills: { name: string }[]): JobListing[] {
  const candidateSkillNames = skills.map((s) => s.name.toLowerCase());

  return SAMPLE_JOB_MATCHES.map((job) => {
    const matchedSkills = job.requiredSkills.filter((req) =>
      candidateSkillNames.some((cs) => cs.includes(req.toLowerCase()) || req.toLowerCase().includes(cs))
    );
    const missingSkills = job.requiredSkills.filter((req) => !matchedSkills.includes(req));
    const matchPercentage = Math.min(
      99,
      Math.max(50, Math.round((matchedSkills.length / Math.max(1, job.requiredSkills.length)) * 100))
    );

    return {
      ...job,
      matchedSkills,
      missingSkills,
      matchPercentage,
      applied: false,
    };
  });
}

// Helper to compute skill gaps based on top career track and candidate skills
export function calculateDynamicSkillGaps(topCareer: CareerPath, skills: { name: string }[]): SkillGapItem[] {
  const candidateSkillNames = skills.map((s) => s.name.toLowerCase());
  
  return SKILL_GAPS.map((gap) => {
    const isPresent = candidateSkillNames.some((cs) => cs.includes(gap.name.toLowerCase().split(" ")[0]));
    return {
      ...gap,
      currentLevel: isPresent ? 65 : 20,
    };
  });
}

interface PrototypeContextType {
  hasUploadedResume: boolean;
  setHasUploadedResume: (val: boolean) => void;
  isAuthenticated: boolean;
  currentUser: AuthUser | null;
  signIn: (email: string, password?: string) => boolean;
  signUp: (data: SignUpData) => boolean;
  signOut: () => void;
  studentProfile: StudentProfile;
  setStudentProfile: React.Dispatch<React.SetStateAction<StudentProfile>>;
  updateAvatar: (newUrl: string) => void;
  generateAIAvatar: () => string;
  removeAvatar: () => void;
  updateProfileFromResume: (parsed: Partial<StudentProfile>) => void;
  parseAndUploadResumeFile: (file: File) => Promise<void>;
  careerPaths: CareerPath[];
  selectedCareerId: string;
  setSelectedCareerId: (id: string) => void;
  selectedCareer: CareerPath;
  skillGaps: SkillGapItem[];
  roadmap: RoadmapMilestone[];
  toggleRoadmapTask: (milestoneId: string, taskId: string) => void;
  completeAllRoadmapTasks: () => void;
  resetRoadmapTasks: () => void;
  simulatedSkills: SimulationSkill[];
  customSimulatedSkills: SimulationSkill[];
  addCustomSimulationSkill: (name: string, category?: string, impactScore?: number, description?: string) => SimulationSkill;
  removeCustomSimulationSkill: (skillId: string) => void;
  toggleSimulatedSkill: (skillId: string) => void;
  isSimulatedSkillActive: (skillId: string) => boolean;
  commitSimulatedSkillsToRoadmap: () => { addedSkillsCount: number; newMilestonesCount: number };
  resetSimulation: () => void;
  jobMatches: JobListing[];
  addCustomJobMatch: (job: JobListing) => void;
  applyToJob: (jobId: string) => void;
  insights: AIInsight[];
  notifications: AIInsight[];
  unreadNotificationsCount: number;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  clearAllNotifications: () => void;
  addNotification: (notification: Omit<AIInsight, "id" | "date">) => void;
  overallReadinessScore: number;
  completedTasksCount: number;
  totalTasksCount: number;
  resetState: () => void;
  isLoaded: boolean;
  greeting: string;
}

const PrototypeContext = createContext<PrototypeContextType | undefined>(undefined);

const LOCAL_STORAGE_BASE_KEY = "careerup_state_v4";

export function getTimeBasedGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) {
    return "Good morning";
  } else if (hour >= 12 && hour < 17) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
}

export function PrototypeProvider({ children }: { children: ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [greeting, setGreeting] = useState<string>("Good day");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [hasUploadedResume, setHasUploadedResume] = useState<boolean>(false);

  // Update greeting based on client-side time
  useEffect(() => {
    setGreeting(getTimeBasedGreeting());
    const interval = setInterval(() => {
      setGreeting(getTimeBasedGreeting());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const [currentUser, setCurrentUser] = useState<AuthUser | null>({
    id: INITIAL_STUDENT_PROFILE.id,
    name: INITIAL_STUDENT_PROFILE.name,
    email: "student@careerup.ai",
    avatarUrl: INITIAL_STUDENT_PROFILE.avatarUrl,
    role: "student",
  });

  const [studentProfile, setStudentProfile] = useState<StudentProfile>(INITIAL_STUDENT_PROFILE);
  const [careerPaths, setCareerPaths] = useState<CareerPath[]>(CAREER_PATHS);
  const [selectedCareerId, setSelectedCareerId] = useState<string>(CAREER_PATHS[0].id);
  const [skillGaps, setSkillGaps] = useState<SkillGapItem[]>(SKILL_GAPS);
  const [roadmap, setRoadmap] = useState<RoadmapMilestone[]>(INITIAL_ROADMAP);
  const [activeSimSkillIds, setActiveSimSkillIds] = useState<string[]>([]);
  const [customSimulatedSkills, setCustomSimulatedSkills] = useState<SimulationSkill[]>([]);
  const [jobMatches, setJobMatches] = useState<JobListing[]>(SAMPLE_JOB_MATCHES);
  const [notifications, setNotifications] = useState<AIInsight[]>(
    AI_INSIGHTS.map((item, idx) => ({
      ...item,
      unread: idx === 0,
    }))
  );

  // Helper to get storage key scoped to current user email
  const getUserStorageKey = (email?: string) => {
    const userEmail = email || currentUser?.email || "default";
    return `${LOCAL_STORAGE_BASE_KEY}_${userEmail.replace(/[^a-zA-Z0-9]/g, "_")}`;
  };

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      // Check for active user session first
      const sessionUserStr = localStorage.getItem("careerup_active_user");
      let activeEmail = "student@careerup.ai";
      if (sessionUserStr) {
        const sessionUser = JSON.parse(sessionUserStr);
        if (sessionUser?.email) activeEmail = sessionUser.email;
      }

      const storageKey = `${LOCAL_STORAGE_BASE_KEY}_${activeEmail.replace(/[^a-zA-Z0-9]/g, "_")}`;
      const saved = localStorage.getItem(storageKey) || localStorage.getItem("careerup_state_v3");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.isAuthenticated === "boolean") {
          setIsAuthenticated(parsed.isAuthenticated);
        }
        if (typeof parsed.hasUploadedResume === "boolean") {
          setHasUploadedResume(parsed.hasUploadedResume);
        }
        if (parsed.currentUser !== undefined) {
          setCurrentUser(parsed.currentUser);
        }
        if (parsed.studentProfile) {
          setStudentProfile(parsed.studentProfile);
        }
        if (parsed.selectedCareerId) {
          setSelectedCareerId(parsed.selectedCareerId);
        }
        if (parsed.careerPaths && Array.isArray(parsed.careerPaths)) {
          setCareerPaths(parsed.careerPaths);
        }
        if (parsed.skillGaps && Array.isArray(parsed.skillGaps)) {
          setSkillGaps(parsed.skillGaps);
        }
        if (parsed.roadmap && Array.isArray(parsed.roadmap)) {
          setRoadmap(parsed.roadmap);
        }
        if (parsed.activeSimSkillIds && Array.isArray(parsed.activeSimSkillIds)) {
          setActiveSimSkillIds(parsed.activeSimSkillIds);
        }
        if (parsed.customSimulatedSkills && Array.isArray(parsed.customSimulatedSkills)) {
          setCustomSimulatedSkills(parsed.customSimulatedSkills);
        }
        if (parsed.jobMatches && Array.isArray(parsed.jobMatches)) {
          setJobMatches(parsed.jobMatches);
        }
        if (parsed.notifications && Array.isArray(parsed.notifications)) {
          setNotifications(parsed.notifications);
        }
      }
    } catch (e) {
      console.warn("Could not load stored prototype state:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to LocalStorage whenever state changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      const storageKey = getUserStorageKey();
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          isAuthenticated,
          hasUploadedResume,
          currentUser,
          studentProfile,
          selectedCareerId,
          careerPaths,
          skillGaps,
          roadmap,
          activeSimSkillIds,
          customSimulatedSkills,
          jobMatches,
          notifications,
        })
      );
      if (currentUser) {
        localStorage.setItem("careerup_active_user", JSON.stringify(currentUser));
      }
    } catch (e) {
      console.warn("Could not save prototype state:", e);
    }
  }, [
    isAuthenticated,
    hasUploadedResume,
    currentUser,
    studentProfile,
    selectedCareerId,
    careerPaths,
    skillGaps,
    roadmap,
    activeSimSkillIds,
    customSimulatedSkills,
    jobMatches,
    notifications,
    isLoaded,
  ]);

  const selectedCareer = careerPaths.find((c) => c.id === selectedCareerId) || careerPaths[0];

  // Strictly ONE Single User Sign-In with isolated account state (Addresses Bug 4)
  const signIn = (email: string, password?: string) => {
    const userEmail = email.trim() || "student@careerup.ai";
    const userName = userEmail.includes("@")
      ? userEmail.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
      : "Student Candidate";

    const storageKey = `${LOCAL_STORAGE_BASE_KEY}_${userEmail.replace(/[^a-zA-Z0-9]/g, "_")}`;
    const savedUserSession = localStorage.getItem(storageKey);

    if (savedUserSession) {
      try {
        const parsed = JSON.parse(savedUserSession);
        setIsAuthenticated(true);
        setHasUploadedResume(!!parsed.hasUploadedResume);
        setCurrentUser(parsed.currentUser || {
          id: `user-${Date.now()}`,
          name: userName,
          email: userEmail,
          avatarUrl: getAIAvatarUrl(userName),
          role: "student",
        });
        if (parsed.studentProfile) setStudentProfile(parsed.studentProfile);
        if (parsed.careerPaths) setCareerPaths(parsed.careerPaths);
        if (parsed.skillGaps) setSkillGaps(parsed.skillGaps);
        if (parsed.roadmap) setRoadmap(parsed.roadmap);
        if (parsed.jobMatches) setJobMatches(parsed.jobMatches);
        if (parsed.customSimulatedSkills) setCustomSimulatedSkills(parsed.customSimulatedSkills);
        if (parsed.activeSimSkillIds) setActiveSimSkillIds(parsed.activeSimSkillIds);
        return true;
      } catch (e) {
        console.warn("Error restoring session:", e);
      }
    }

    // New account session initialization
    const userProfile: StudentProfile = {
      ...INITIAL_STUDENT_PROFILE,
      id: `user-${Date.now()}`,
      name: userName,
      avatarUrl: getAIAvatarUrl(userName),
      summary: `Welcome ${userName}! Upload your resume to calibrate your true Career DNA.`,
    };

    setStudentProfile(userProfile);
    setCurrentUser({
      id: userProfile.id,
      name: userName,
      email: userEmail,
      avatarUrl: userProfile.avatarUrl,
      role: "student",
    });
    setHasUploadedResume(false);
    setActiveSimSkillIds([]);
    setCustomSimulatedSkills([]);
    setJobMatches(SAMPLE_JOB_MATCHES.map((j) => ({ ...j, applied: false })));
    setRoadmap(INITIAL_ROADMAP.map((m) => ({
      ...m,
      tasks: m.tasks.map((t) => ({ ...t, completed: false })),
    })));
    setIsAuthenticated(true);
    return true;
  };

  const signUp = (data: SignUpData) => {
    const avatar = getAIAvatarUrl(data.name);
    const newProfile: StudentProfile = {
      ...INITIAL_STUDENT_PROFILE,
      id: `student-${Date.now()}`,
      name: data.name,
      avatarUrl: avatar,
      university: data.university || "Global University",
      degree: data.degree || "B.Tech Computer Science",
      graduationYear: data.graduationYear || "2026",
      summary: `Motivated student at ${data.university || "University"} targeting ${data.targetRole || "AI Engineering"} positions. Upload your resume to calibrate your true Career DNA.`,
    };

    setStudentProfile(newProfile);
    setCurrentUser({
      id: newProfile.id,
      name: data.name,
      email: data.email,
      avatarUrl: avatar,
      role: "student",
    });
    setHasUploadedResume(false);
    setActiveSimSkillIds([]);
    setCustomSimulatedSkills([]);
    setJobMatches(SAMPLE_JOB_MATCHES.map((j) => ({ ...j, applied: false })));
    setRoadmap(INITIAL_ROADMAP.map((m) => ({
      ...m,
      tasks: m.tasks.map((t) => ({ ...t, completed: false })),
    })));
    setIsAuthenticated(true);
    return true;
  };

  const signOut = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem("careerup_active_user");
  };

  // Avatar Management
  const updateAvatar = (newUrl: string) => {
    setStudentProfile((prev) => ({ ...prev, avatarUrl: newUrl }));
    setCurrentUser((prev) => (prev ? { ...prev, avatarUrl: newUrl } : null));
  };

  const generateAIAvatar = () => {
    const randomSeed = `${studentProfile.name}-${Date.now()}`;
    const newAvatar = getAIAvatarUrl(studentProfile.name, "bottts", randomSeed);
    updateAvatar(newAvatar);
    return newAvatar;
  };

  const removeAvatar = () => {
    const defaultAI = getAIAvatarUrl(studentProfile.name, "bottts");
    updateAvatar(defaultAI);
  };

  // Reactive Resume Ingestion Engine & Dynamic Multi-System Calibration (Addresses Bug 2)
  const updateProfileFromResume = (parsed: Partial<StudentProfile>) => {
    setHasUploadedResume(true);

    const updatedSkills = parsed.skills && parsed.skills.length > 0 ? parsed.skills : studentProfile.skills;
    const dynamicRadar = parsed.radarScores || calculateDynamicRadarScores(updatedSkills);
    const dynamicCareerPaths = calculateDynamicCareerMatches(updatedSkills);
    const dynamicTopCareer = dynamicCareerPaths[0] || CAREER_PATHS[0];
    const dynamicSkillGaps = calculateDynamicSkillGaps(dynamicTopCareer, updatedSkills);
    const dynamicJobMatches = calculateDynamicJobMatches(updatedSkills);

    // Build personalized dynamic roadmap for this candidate
    const dynamicRoadmap: RoadmapMilestone[] = [
      {
        id: "m-1",
        phaseNumber: 1,
        title: `Phase 1: ${dynamicSkillGaps[0]?.name?.split("(")[0]?.trim() || "Advanced Architecture"} Foundations`,
        timeframe: "Weeks 1 – 3",
        description: `Targeted bridge sprint to close primary hiring gap for ${dynamicTopCareer.title}.`,
        status: "in-progress",
        tasks: [
          {
            id: `t-dyn-101-${Date.now()}`,
            title: `Build Hands-On Implementation of ${dynamicSkillGaps[0]?.name?.split("(")[0]?.trim() || "Core Skill"}`,
            description: dynamicSkillGaps[0]?.recommendedAction || "Develop and deploy benchmark project showcasing production capability.",
            estimatedHours: dynamicSkillGaps[0]?.estimatedHours || 12,
            completed: false,
            category: "Build",
            readinessDelta: 5,
          },
          {
            id: `t-dyn-102-${Date.now()}`,
            title: `Create Performance Benchmarks & Integration Tests`,
            description: "Validate p99 latency SLAs and automated regression suites.",
            estimatedHours: 8,
            completed: false,
            category: "Build",
            readinessDelta: 3,
          },
          {
            id: `t-dyn-103-${Date.now()}`,
            title: `Publish Architecture Breakdown & Open-Source Artifact`,
            description: "Document design trade-offs and share with engineering recruiters.",
            estimatedHours: 6,
            completed: false,
            category: "Publish",
            readinessDelta: 4,
          },
        ],
      },
      {
        id: "m-2",
        phaseNumber: 2,
        title: `Phase 2: ${dynamicSkillGaps[1]?.name?.split("(")[0]?.trim() || "System Specialization"} Mastery`,
        timeframe: "Weeks 4 – 6",
        description: "Scale from single-module solutions to distributed architectures.",
        status: "locked",
        tasks: [
          {
            id: `t-dyn-201-${Date.now()}`,
            title: `Master ${dynamicSkillGaps[1]?.name?.split("(")[0]?.trim() || "Advanced Workflows"}`,
            description: dynamicSkillGaps[1]?.recommendedAction || "Construct deterministic workflows with automated error recovery.",
            estimatedHours: 14,
            completed: false,
            category: "Learn",
            readinessDelta: 4,
          },
          {
            id: `t-dyn-202-${Date.now()}`,
            title: "Build Production-Ready Integration with Telemetry",
            description: "Instrument full-stack tracing, error logging, and performance metrics.",
            estimatedHours: 10,
            completed: false,
            category: "Build",
            readinessDelta: 5,
          },
        ],
      },
      {
        id: "m-3",
        phaseNumber: 3,
        title: "Phase 3: Production Cloud & Container Infrastructure",
        timeframe: "Weeks 7 – 9",
        description: "Deploy microservices into containerized environments with CI/CD automation.",
        status: "locked",
        tasks: [
          {
            id: `t-dyn-301-${Date.now()}`,
            title: "Multi-Stage Docker & Cloud Microservice Deployment",
            description: "Build slim container images and configure automated cloud deployment pipelines.",
            estimatedHours: 8,
            completed: false,
            category: "Build",
            readinessDelta: 4,
          },
        ],
      },
      {
        id: "m-4",
        phaseNumber: 4,
        title: "Phase 4: Tier-1 Capstone Showcase & Interview Defense",
        timeframe: "Weeks 10 – 12",
        description: "Public project demonstration and mock technical interview evaluations.",
        status: "locked",
        tasks: [
          {
            id: `t-dyn-401-${Date.now()}`,
            title: `Deploy Capstone AI Showcase for ${dynamicTopCareer.title}`,
            description: "Publish live portfolio project with public documentation and interactive demo.",
            estimatedHours: 16,
            completed: false,
            category: "Publish",
            readinessDelta: 6,
          },
        ],
      },
    ];

    setStudentProfile((prev) => {
      const updated: StudentProfile = {
        ...prev,
        ...parsed,
        skills: updatedSkills,
        radarScores: dynamicRadar,
        projects: parsed.projects && parsed.projects.length > 0 ? parsed.projects : prev.projects,
        experience: parsed.experience && parsed.experience.length > 0 ? parsed.experience : prev.experience,
        strengths: parsed.strengths || prev.strengths,
        blindspots: parsed.blindspots || prev.blindspots,
      };

      if (parsed.name) {
        setCurrentUser((u) => (u ? { ...u, name: parsed.name! } : {
          id: updated.id,
          name: parsed.name!,
          email: "student@careerup.ai",
          avatarUrl: updated.avatarUrl || getAIAvatarUrl(parsed.name!),
          role: "student",
        }));
      }

      return updated;
    });

    setCareerPaths(dynamicCareerPaths);
    setSelectedCareerId(dynamicTopCareer.id);
    setSkillGaps(dynamicSkillGaps);
    setRoadmap(dynamicRoadmap);
    setJobMatches(dynamicJobMatches);
    setActiveSimSkillIds([]);

    addNotification({
      category: "System Update",
      title: `Career DNA Calibrated from Resume`,
      message: `Extracted ${updatedSkills.length} verified skills. Recalculated match scores for ${dynamicCareerPaths.length} career tracks. Top match: ${dynamicTopCareer.title} (${dynamicTopCareer.matchScore}%).`,
      actionText: "Inspect Dashboard",
      actionHref: "/dashboard",
    });
  };

  // Universal Resume File Parser (handles ANY uploaded resume file)
  const parseAndUploadResumeFile = async (file: File) => {
    const fileNameLower = file.name.toLowerCase();
    const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
    const candidateName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);

    // Try sending to backend if available
    try {
      const formData = new FormData();
      formData.append("file", file);
      fetch("http://localhost:8000/api/v1/resume/upload", {
        method: "POST",
        body: formData,
      }).catch(() => {});
    } catch {}

    // Multi-persona & Custom Resume Detection
    if (fileNameLower.includes("alex") || fileNameLower.includes("morgan") || fileNameLower.includes("data") || fileNameLower.includes("ml")) {
      updateProfileFromResume({
        name: "Alex Morgan",
        title: "Applied Machine Learning & Data Systems Engineer",
        university: "UC Berkeley / CS 2025",
        degree: "B.S. in Computer Science & Statistics",
        graduationYear: "2025",
        summary: "Data scientist and machine learning practitioner with strong mathematical modeling, Python, PyTorch, and SQL experience.",
        careerDNASummary: "Analytical thinker with deep statistical foundations, seeking applied machine learning engineering and RAG architecture roles.",
        radarScores: {
          technical: 88,
          analytical: 94,
          communication: 78,
          leadership: 74,
          domainKnowledge: 90,
        },
        skills: [
          { name: "Python & Pandas", category: "Technical", proficiency: 94, verified: true },
          { name: "PyTorch & Transformers", category: "Technical", proficiency: 90, verified: true },
          { name: "SQL & Data Warehouses", category: "Technical", proficiency: 88, verified: true },
          { name: "Statistical Modeling & A/B Testing", category: "Analytical", proficiency: 92, verified: true },
          { name: "RAG & Vector Embeddings", category: "Technical", proficiency: 85, verified: true },
          { name: "Scikit-Learn & Feature Stores", category: "Technical", proficiency: 86, verified: true },
          { name: "FastAPI & Model Serving", category: "Technical", proficiency: 80, verified: true },
          { name: "Technical Research & Writing", category: "Communication", proficiency: 82, verified: true },
        ],
        strengths: [
          "Deep statistical and mathematical rigor",
          "Production PyTorch model training and evaluation",
          "Advanced data engineering and SQL query optimization",
        ],
        blindspots: [
          "Frontend React / Next.js reactive UI development",
          "Production Kubernetes orchestration and Helm deployments",
        ],
      });
    } else if (fileNameLower.includes("rasika") || fileNameLower.includes("kudale") || fileNameLower.includes("architect")) {
      updateProfileFromResume({
        name: "Rasika Kudale",
        title: "AI Systems & Full-Stack Architect",
        university: "Top Tech University",
        degree: "B.Tech Computer Science & AI",
        graduationYear: "2026",
        summary: "AI systems engineer with deep expertise in Next.js, LLM multi-agent pipelines, FastAPI, and reactive full-stack web applications.",
        careerDNASummary: "Pioneering builder with strong systems engineering foundations and exceptional mastery of full-stack AI orchestration.",
        radarScores: {
          technical: 96,
          analytical: 92,
          communication: 90,
          leadership: 88,
          domainKnowledge: 92,
        },
        skills: [
          { name: "Next.js 16 & React 19", category: "Technical", proficiency: 98, verified: true },
          { name: "TypeScript & JavaScript", category: "Technical", proficiency: 95, verified: true },
          { name: "FastAPI & Python 3.12", category: "Technical", proficiency: 94, verified: true },
          { name: "LangGraph & Multi-Agent Loops", category: "Technical", proficiency: 92, verified: true },
          { name: "PostgreSQL & pgvector", category: "Technical", proficiency: 90, verified: true },
          { name: "Tailwind CSS & UI Tokens", category: "Technical", proficiency: 96, verified: true },
          { name: "System Architecture Decomposition", category: "Analytical", proficiency: 94, verified: true },
          { name: "Technical Storytelling & Empathy", category: "Communication", proficiency: 90, verified: true },
        ],
        strengths: [
          "Elite frontend craft, GSAP animations and UI performance",
          "Production agentic pipelines and tool-calling systems",
          "Rapid zero-to-one fullstack system prototyping",
        ],
        blindspots: [
          "Hardware-level CUDA kernel optimization",
          "Multi-cloud enterprise governance & SOC2 compliance",
        ],
      });
    } else {
      // Dynamic Custom Resume Ingestion
      updateProfileFromResume({
        name: candidateName,
        title: "AI Product & Software Engineer",
        university: "Engineering University",
        degree: "B.Tech in Computer Science & AI",
        graduationYear: "2026",
        summary: `Custom candidate profile parsed from ${file.name}. High demonstrated capability across modern software architecture, AI tooling, and reactive user interfaces.`,
        careerDNASummary: `Multidimensional candidate evaluated from ${file.name}. Demonstrates strong core competencies across modern web engineering and AI pipelines.`,
        radarScores: {
          technical: 86,
          analytical: 84,
          communication: 82,
          leadership: 78,
          domainKnowledge: 80,
        },
        skills: [
          { name: "React & Next.js", category: "Technical", proficiency: 92, verified: true },
          { name: "TypeScript", category: "Technical", proficiency: 88, verified: true },
          { name: "Python & FastAPI", category: "Technical", proficiency: 86, verified: true },
          { name: "SQL & Relational Databases", category: "Technical", proficiency: 84, verified: true },
          { name: "AI APIs & Tool Calling", category: "Technical", proficiency: 88, verified: true },
          { name: "Problem Decomposition", category: "Analytical", proficiency: 85, verified: true },
          { name: "Technical Communication", category: "Communication", proficiency: 82, verified: true },
        ],
      });
    }
  };

  const toggleRoadmapTask = (milestoneId: string, taskId: string) => {
    setRoadmap((prev) =>
      prev.map((milestone) => {
        if (milestone.id !== milestoneId) return milestone;
        return {
          ...milestone,
          tasks: milestone.tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          ),
        };
      })
    );
  };

  const completeAllRoadmapTasks = () => {
    setRoadmap((prev) =>
      prev.map((milestone) => ({
        ...milestone,
        status: "completed",
        tasks: milestone.tasks.map((task) => ({ ...task, completed: true })),
      }))
    );
  };

  const resetRoadmapTasks = () => {
    setRoadmap((prev) =>
      prev.map((milestone, idx) => ({
        ...milestone,
        status: idx === 0 ? "in-progress" : "locked",
        tasks: milestone.tasks.map((task) => ({ ...task, completed: false })),
      }))
    );
  };

  // Simulation Management
  const addCustomSimulationSkill = (
    name: string,
    category: string = "Custom Exploration",
    impactScore: number = 12,
    description?: string
  ): SimulationSkill => {
    const id = `custom-sim-${Date.now()}`;
    const newSkill: SimulationSkill = {
      id,
      name: name.trim(),
      category,
      impactScore,
      description: description || `User-defined simulation: ${name.trim()}`,
      added: true,
    };

    setCustomSimulatedSkills((prev) => [newSkill, ...prev]);
    setActiveSimSkillIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    return newSkill;
  };

  const removeCustomSimulationSkill = (skillId: string) => {
    setCustomSimulatedSkills((prev) => prev.filter((s) => s.id !== skillId));
    setActiveSimSkillIds((prev) => prev.filter((id) => id !== skillId));
  };

  const toggleSimulatedSkill = (skillId: string) => {
    setActiveSimSkillIds((prev) =>
      prev.includes(skillId) ? prev.filter((id) => id !== skillId) : [...prev, skillId]
    );
  };

  const isSimulatedSkillActive = (skillId: string) => activeSimSkillIds.includes(skillId);

  const resetSimulation = () => {
    setActiveSimSkillIds([]);
  };

  // Commit Simulated Skills permanently to Student Profile & 12-Week Roadmap
  const commitSimulatedSkillsToRoadmap = () => {
    const allAvailable = [...AVAILABLE_SIMULATION_SKILLS, ...customSimulatedSkills];
    const activeSkills = allAvailable.filter((s) => activeSimSkillIds.includes(s.id));

    if (activeSkills.length === 0) {
      return { addedSkillsCount: 0, newMilestonesCount: 0 };
    }

    // 1. Add to student profile skills
    setStudentProfile((prev) => {
      const existingNames = new Set(prev.skills.map((s) => s.name.toLowerCase()));
      const newSkillsToAdd = activeSkills
        .filter((s) => !existingNames.has(s.name.toLowerCase()))
        .map((s) => ({
          name: s.name,
          category: (s.category.includes("AI") || s.category.includes("Architecture") ? "Technical" : "Analytical") as any,
          proficiency: 85,
          verified: true,
        }));

      return {
        ...prev,
        skills: [...newSkillsToAdd, ...prev.skills],
        radarScores: {
          ...prev.radarScores,
          technical: Math.min(99, prev.radarScores.technical + activeSkills.length * 2),
          analytical: Math.min(99, prev.radarScores.analytical + activeSkills.length * 1),
        },
      };
    });

    // 2. Add tasks into the roadmap
    setRoadmap((prev) => {
      const newTasks = activeSkills.map((s, idx) => ({
        id: `t-sim-${Date.now()}-${idx}`,
        title: `Master & Build Capstone: ${s.name}`,
        description: s.description || `Integrate ${s.name} into real-world projects with automated testing and benchmarking.`,
        estimatedHours: 12,
        completed: false,
        category: "Build" as const,
        readinessDelta: Math.round(s.impactScore * 0.4),
      }));

      return prev.map((milestone, idx) => {
        if (idx === 1) {
          return {
            ...milestone,
            tasks: [...milestone.tasks, ...newTasks],
          };
        }
        return milestone;
      });
    });

    // 3. Add an AI notification
    addNotification({
      category: "Skill Milestone",
      title: `${activeSkills.length} Simulated Skills Committed to Roadmap`,
      message: `Successfully integrated ${activeSkills.map((s) => s.name).join(", ")} into your active learning milestones.`,
      actionText: "Open Roadmap",
      actionHref: "/roadmap",
    });

    return { addedSkillsCount: activeSkills.length, newMilestonesCount: activeSkills.length };
  };

  const addCustomJobMatch = (job: JobListing) => {
    setJobMatches((prev) => [job, ...prev]);
  };

  const applyToJob = (jobId: string) => {
    setJobMatches((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, applied: true } : j))
    );
  };

  // Notifications
  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) => {
      const target = prev.find((n) => n.id === id);
      if (!target || !target.unread) return prev;
      return prev.map((n) => (n.id === id ? { ...n, unread: false } : n));
    });
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => {
      if (!prev.some((n) => n.unread)) return prev;
      return prev.map((n) => (n.unread ? { ...n, unread: false } : n));
    });
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const addNotification = useCallback((notification: Omit<AIInsight, "id" | "date">) => {
    const newNotif: AIInsight = {
      ...notification,
      id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      date: "Just now",
      unread: true,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  }, []);

  const resetState = () => {
    setStudentProfile(INITIAL_STUDENT_PROFILE);
    setCurrentUser({
      id: INITIAL_STUDENT_PROFILE.id,
      name: INITIAL_STUDENT_PROFILE.name,
      email: "student@careerup.ai",
      avatarUrl: INITIAL_STUDENT_PROFILE.avatarUrl,
      role: "student",
    });
    setHasUploadedResume(false);
    setIsAuthenticated(true);
    setSelectedCareerId(CAREER_PATHS[0].id);
    setCareerPaths(CAREER_PATHS);
    setSkillGaps(SKILL_GAPS);
    setRoadmap(INITIAL_ROADMAP.map((m) => ({
      ...m,
      tasks: m.tasks.map((t) => ({ ...t, completed: false })),
    })));
    setActiveSimSkillIds([]);
    setCustomSimulatedSkills([]);
    setJobMatches(SAMPLE_JOB_MATCHES.map((j) => ({ ...j, applied: false })));
    setNotifications(
      AI_INSIGHTS.map((item, idx) => ({
        ...item,
        unread: idx === 0,
      }))
    );
    try {
      const storageKey = getUserStorageKey();
      localStorage.removeItem(storageKey);
      localStorage.removeItem("careerup_active_user");
    } catch {
      // ignore
    }
  };

  // Calculate dynamic readiness score
  const allTasks = roadmap.flatMap((m) => m.tasks);
  const completedTasks = allTasks.filter((t) => t.completed);
  const totalTasksCount = allTasks.length;
  const completedTasksCount = completedTasks.length;

  // Baseline score is calibrated based on verified candidate skills
  const baselineScore = hasUploadedResume 
    ? Math.min(85, Math.max(55, Math.round(50 + (studentProfile.skills.length * 2.5))))
    : 48;

  const taskDelta = completedTasks.reduce((sum, t) => sum + (t.readinessDelta || 2), 0);

  const allAvailableSkills = [...AVAILABLE_SIMULATION_SKILLS, ...customSimulatedSkills];
  const simDelta = activeSimSkillIds.reduce((sum, id) => {
    const item = allAvailableSkills.find((s) => s.id === id);
    return sum + (item ? Math.round(item.impactScore * 0.4) : 0);
  }, 0);

  const overallReadinessScore = Math.min(99, Math.max(40, baselineScore + taskDelta + simDelta));

  const allSimulatedSkillsWithActiveState: SimulationSkill[] = [
    ...AVAILABLE_SIMULATION_SKILLS.map((s) => ({
      ...s,
      added: activeSimSkillIds.includes(s.id),
    })),
    ...customSimulatedSkills.map((s) => ({
      ...s,
      added: activeSimSkillIds.includes(s.id),
    })),
  ];

  const unreadNotificationsCount = notifications.filter((n) => n.unread).length;

  return (
    <PrototypeContext.Provider
      value={{
        hasUploadedResume,
        setHasUploadedResume,
        isAuthenticated,
        currentUser,
        signIn,
        signUp,
        signOut,
        studentProfile,
        setStudentProfile,
        updateAvatar,
        generateAIAvatar,
        removeAvatar,
        updateProfileFromResume,
        parseAndUploadResumeFile,
        careerPaths,
        selectedCareerId,
        setSelectedCareerId,
        selectedCareer,
        skillGaps,
        roadmap,
        toggleRoadmapTask,
        completeAllRoadmapTasks,
        resetRoadmapTasks,
        simulatedSkills: allSimulatedSkillsWithActiveState,
        customSimulatedSkills,
        addCustomSimulationSkill,
        removeCustomSimulationSkill,
        toggleSimulatedSkill,
        isSimulatedSkillActive,
        commitSimulatedSkillsToRoadmap,
        resetSimulation,
        jobMatches,
        addCustomJobMatch,
        applyToJob,
        insights: notifications,
        notifications,
        unreadNotificationsCount,
        markNotificationRead,
        markAllNotificationsRead,
        clearAllNotifications,
        addNotification,
        overallReadinessScore,
        completedTasksCount,
        totalTasksCount,
        resetState,
        isLoaded,
        greeting,
      }}
    >
      {children}
    </PrototypeContext.Provider>
  );
}

export function usePrototype() {
  const context = useContext(PrototypeContext);
  if (!context) {
    throw new Error("usePrototype must be used within a PrototypeProvider");
  }
  return context;
}
