"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
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

interface SignUpData {
  name: string;
  email: string;
  university: string;
  degree: string;
  graduationYear: string;
  targetRole?: string;
}

interface PrototypeContextType {
  isAuthenticated: boolean;
  currentUser: AuthUser | null;
  signIn: (email: string, password?: string, persona?: "aditi" | "alex") => boolean;
  signUp: (data: SignUpData) => boolean;
  signOut: () => void;
  studentProfile: StudentProfile;
  setStudentProfile: React.Dispatch<React.SetStateAction<StudentProfile>>;
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
  toggleSimulatedSkill: (skillId: string) => void;
  isSimulatedSkillActive: (skillId: string) => boolean;
  jobMatches: JobListing[];
  addCustomJobMatch: (job: JobListing) => void;
  applyToJob: (jobId: string) => void;
  insights: AIInsight[];
  overallReadinessScore: number;
  completedTasksCount: number;
  totalTasksCount: number;
  resetState: () => void;
  isLoaded: boolean;
  greeting: string;
}

const PrototypeContext = createContext<PrototypeContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "careerup_state_v1";

export function getTimeBasedGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) {
    return "Good morning";
  } else if (hour >= 12 && hour < 17) {
    return "Good afternoon";
  } else if (hour >= 17 && hour < 22) {
    return "Good evening";
  } else {
    return "Good evening";
  }
}

export function PrototypeProvider({ children }: { children: ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [greeting, setGreeting] = useState<string>("Good day");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

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
    email: "aditi.sharma@iit.ac.in",
    avatarUrl: INITIAL_STUDENT_PROFILE.avatarUrl,
    role: "student",
  });

  const [studentProfile, setStudentProfile] = useState<StudentProfile>(INITIAL_STUDENT_PROFILE);
  const [careerPaths] = useState<CareerPath[]>(CAREER_PATHS);
  const [selectedCareerId, setSelectedCareerId] = useState<string>(CAREER_PATHS[0].id);
  const [skillGaps] = useState<SkillGapItem[]>(SKILL_GAPS);
  const [roadmap, setRoadmap] = useState<RoadmapMilestone[]>(INITIAL_ROADMAP);
  const [activeSimSkillIds, setActiveSimSkillIds] = useState<string[]>([]);
  const [jobMatches, setJobMatches] = useState<JobListing[]>(SAMPLE_JOB_MATCHES);
  const [insights] = useState<AIInsight[]>(AI_INSIGHTS);

  // Load from LocalStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.isAuthenticated !== undefined) setIsAuthenticated(parsed.isAuthenticated);
        if (parsed.currentUser) setCurrentUser(parsed.currentUser);
        if (parsed.studentProfile) setStudentProfile(parsed.studentProfile);
        if (parsed.selectedCareerId) setSelectedCareerId(parsed.selectedCareerId);
        if (parsed.roadmap) setRoadmap(parsed.roadmap);
        if (parsed.activeSimSkillIds) setActiveSimSkillIds(parsed.activeSimSkillIds);
        if (parsed.jobMatches) setJobMatches(parsed.jobMatches);
      }
    } catch (e) {
      console.warn("Could not load stored prototype state:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({
          isAuthenticated,
          currentUser,
          studentProfile,
          selectedCareerId,
          roadmap,
          activeSimSkillIds,
          jobMatches,
        })
      );
    } catch (e) {
      console.warn("Could not save prototype state:", e);
    }
  }, [isAuthenticated, currentUser, studentProfile, selectedCareerId, roadmap, activeSimSkillIds, jobMatches, isLoaded]);

  const selectedCareer = careerPaths.find((c) => c.id === selectedCareerId) || careerPaths[0];

  const signIn = (email: string, password?: string, persona?: "aditi" | "alex") => {
    if (persona === "alex") {
      const alexProfile: StudentProfile = {
        id: "student-alex",
        name: "Alex Morgan",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
        title: "Aspiring Applied Machine Learning Engineer",
        university: "UC Berkeley / CS 2025",
        graduationYear: "2025",
        degree: "B.S. in Computer Science",
        summary: "Data scientist and machine learning practitioner with strong mathematical modeling, Python, and SQL experience.",
        skills: [
          { name: "Python & Pandas", category: "Technical", proficiency: 90, verified: true },
          { name: "SQL & Data Warehouses", category: "Technical", proficiency: 88, verified: true },
          { name: "PyTorch & Scikit-Learn", category: "Technical", proficiency: 78, verified: true },
          { name: "Statistical Modeling", category: "Analytical", proficiency: 85, verified: true },
          { name: "Technical Writing", category: "Communication", proficiency: 80, verified: true },
        ],
        radarScores: {
          technical: 82,
          analytical: 88,
          communication: 76,
          leadership: 70,
          domainKnowledge: 84,
        },
        projects: [
          {
            id: "p-alex-1",
            title: "MarketPulse — Stock Sentiment Predictor",
            description: "Built transformer pipeline analyzing financial SEC filings and Reddit mentions.",
            technologies: ["Python", "HuggingFace", "FastAPI", "PostgreSQL"],
            metrics: "Achieved 78% directional accuracy in backtests",
          },
        ],
        experience: [
          {
            role: "Data Science Intern",
            company: "QuantEdge Analytics",
            period: "June 2025 – August 2025",
            highlights: ["Engineered features for 10M+ rows of transactional data."],
          },
        ],
        careerDNASummary: "Analytical thinker with deep statistical foundations, seeking applied machine learning engineering roles.",
        strengths: ["Strong math & probability", "Fast data pipelining", "Clean Python engineering"],
        blindspots: ["Frontend UI design", "Kubernetes cluster administration"],
      };

      setStudentProfile(alexProfile);
      setCurrentUser({
        id: "student-alex",
        name: "Alex Morgan",
        email: email || "alex.morgan@berkeley.edu",
        avatarUrl: alexProfile.avatarUrl,
        role: "student",
      });
      setSelectedCareerId("data-scientist-applied-ml");
    } else {
      setStudentProfile(INITIAL_STUDENT_PROFILE);
      setCurrentUser({
        id: INITIAL_STUDENT_PROFILE.id,
        name: INITIAL_STUDENT_PROFILE.name,
        email: email || "aditi.sharma@iit.ac.in",
        avatarUrl: INITIAL_STUDENT_PROFILE.avatarUrl,
        role: "student",
      });
      setSelectedCareerId("ai-product-engineer");
    }

    setIsAuthenticated(true);
    return true;
  };

  const signUp = (data: SignUpData) => {
    const newProfile: StudentProfile = {
      ...INITIAL_STUDENT_PROFILE,
      id: `student-${Date.now()}`,
      name: data.name,
      university: data.university || "Global Tech Scholar",
      degree: data.degree || "B.Tech Computer Science",
      graduationYear: data.graduationYear || "2026",
      summary: `Motivated student at ${data.university} preparing for high-impact ${data.targetRole || "AI Software Engineering"} positions.`,
    };

    setStudentProfile(newProfile);
    setCurrentUser({
      id: newProfile.id,
      name: data.name,
      email: data.email,
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80",
      role: "student",
    });
    setIsAuthenticated(true);
    return true;
  };

  const signOut = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
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
    setRoadmap(INITIAL_ROADMAP);
  };

  const toggleSimulatedSkill = (skillId: string) => {
    setActiveSimSkillIds((prev) =>
      prev.includes(skillId) ? prev.filter((id) => id !== skillId) : [...prev, skillId]
    );
  };

  const isSimulatedSkillActive = (skillId: string) => activeSimSkillIds.includes(skillId);

  const addCustomJobMatch = (job: JobListing) => {
    setJobMatches((prev) => [job, ...prev]);
  };

  const applyToJob = (jobId: string) => {
    setJobMatches((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, applied: true } : j))
    );
  };

  const resetState = () => {
    setStudentProfile(INITIAL_STUDENT_PROFILE);
    setCurrentUser({
      id: INITIAL_STUDENT_PROFILE.id,
      name: INITIAL_STUDENT_PROFILE.name,
      email: "aditi.sharma@iit.ac.in",
      avatarUrl: INITIAL_STUDENT_PROFILE.avatarUrl,
      role: "student",
    });
    setIsAuthenticated(true);
    setSelectedCareerId(CAREER_PATHS[0].id);
    setRoadmap(INITIAL_ROADMAP);
    setActiveSimSkillIds([]);
    setJobMatches(SAMPLE_JOB_MATCHES);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  // Calculate dynamic readiness score
  const allTasks = roadmap.flatMap((m) => m.tasks);
  const completedTasks = allTasks.filter((t) => t.completed);
  const totalTasksCount = allTasks.length;
  const completedTasksCount = completedTasks.length;

  const baselineScore = 68;
  const taskDelta = completedTasks.reduce((sum, t) => sum + t.readinessDelta, 0);
  const simDelta = activeSimSkillIds.reduce((sum, id) => {
    const item = AVAILABLE_SIMULATION_SKILLS.find((s) => s.id === id);
    return sum + (item ? Math.round(item.impactScore * 0.4) : 0);
  }, 0);

  const overallReadinessScore = Math.min(99, baselineScore + taskDelta + simDelta);

  const simulatedSkillsWithActiveState = AVAILABLE_SIMULATION_SKILLS.map((s) => ({
    ...s,
    added: activeSimSkillIds.includes(s.id),
  }));

  return (
    <PrototypeContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        signIn,
        signUp,
        signOut,
        studentProfile,
        setStudentProfile,
        careerPaths,
        selectedCareerId,
        setSelectedCareerId,
        selectedCareer,
        skillGaps,
        roadmap,
        toggleRoadmapTask,
        completeAllRoadmapTasks,
        resetRoadmapTasks,
        simulatedSkills: simulatedSkillsWithActiveState,
        toggleSimulatedSkill,
        isSimulatedSkillActive,
        jobMatches,
        addCustomJobMatch,
        applyToJob,
        insights,
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
