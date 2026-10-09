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

interface PrototypeContextType {
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

const LOCAL_STORAGE_KEY = "careerup_state_v3";

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

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY) || localStorage.getItem("careerup_state_v2");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.isAuthenticated === "boolean") {
          setIsAuthenticated(parsed.isAuthenticated);
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
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({
          isAuthenticated,
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
    } catch (e) {
      console.warn("Could not save prototype state:", e);
    }
  }, [
    isAuthenticated,
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

  // Strictly ONE Single User Sign-In (No persona switching)
  const signIn = (email: string, password?: string) => {
    const userEmail = email.trim() || "student@careerup.ai";
    const userName = userEmail.includes("@")
      ? userEmail.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
      : "Student Candidate";

    const userProfile: StudentProfile = {
      ...INITIAL_STUDENT_PROFILE,
      id: `user-${Date.now()}`,
      name: userName,
      avatarUrl: getAIAvatarUrl(userName),
    };

    setStudentProfile(userProfile);
    setCurrentUser({
      id: userProfile.id,
      name: userName,
      email: userEmail,
      avatarUrl: userProfile.avatarUrl,
      role: "student",
    });
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
      summary: `Motivated student at ${data.university || "University"} targeting ${data.targetRole || "AI Engineering"} positions.`,
    };

    setStudentProfile(newProfile);
    setCurrentUser({
      id: newProfile.id,
      name: data.name,
      email: data.email,
      avatarUrl: avatar,
      role: "student",
    });
    setIsAuthenticated(true);
    return true;
  };

  const signOut = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
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

  // Resume Ingestion / Profile Updating
  const updateProfileFromResume = (parsed: Partial<StudentProfile>) => {
    setStudentProfile((prev) => {
      const updated: StudentProfile = {
        ...prev,
        ...parsed,
        skills: parsed.skills && parsed.skills.length > 0 ? parsed.skills : prev.skills,
        radarScores: parsed.radarScores || prev.radarScores,
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

    // Add a notification about resume update
    addNotification({
      category: "System Update",
      title: "Career DNA Updated from New Resume",
      message: `Extracted ${parsed.skills?.length || 10}+ skills and recalculated your multidimensional readiness score.`,
      actionText: "View Profile",
      actionHref: "/profile",
    });
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
  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const addNotification = (notification: Omit<AIInsight, "id" | "date">) => {
    const newNotif: AIInsight = {
      ...notification,
      id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      date: "Just now",
      unread: true,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const resetState = () => {
    setStudentProfile(INITIAL_STUDENT_PROFILE);
    setCurrentUser({
      id: INITIAL_STUDENT_PROFILE.id,
      name: INITIAL_STUDENT_PROFILE.name,
      email: "student@careerup.ai",
      avatarUrl: INITIAL_STUDENT_PROFILE.avatarUrl,
      role: "student",
    });
    setIsAuthenticated(true);
    setSelectedCareerId(CAREER_PATHS[0].id);
    setCareerPaths(CAREER_PATHS);
    setSkillGaps(SKILL_GAPS);
    setRoadmap(INITIAL_ROADMAP);
    setActiveSimSkillIds([]);
    setCustomSimulatedSkills([]);
    setJobMatches(SAMPLE_JOB_MATCHES);
    setNotifications(
      AI_INSIGHTS.map((item, idx) => ({
        ...item,
        unread: idx === 0,
      }))
    );
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      localStorage.removeItem("careerup_state_v2");
      localStorage.removeItem("careerup_state_v1");
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
  const taskDelta = completedTasks.reduce((sum, t) => sum + (t.readinessDelta || 2), 0);

  const allAvailableSkills = [...AVAILABLE_SIMULATION_SKILLS, ...customSimulatedSkills];
  const simDelta = activeSimSkillIds.reduce((sum, id) => {
    const item = allAvailableSkills.find((s) => s.id === id);
    return sum + (item ? Math.round(item.impactScore * 0.4) : 0);
  }, 0);

  const overallReadinessScore = Math.min(99, Math.max(45, baselineScore + taskDelta + simDelta));

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
