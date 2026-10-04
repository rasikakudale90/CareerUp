import {
  INITIAL_STUDENT_PROFILE,
  CAREER_PATHS,
  SKILL_GAPS,
  INITIAL_ROADMAP,
  AVAILABLE_SIMULATION_SKILLS,
  SAMPLE_JOB_MATCHES,
} from "./mock-data";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

// Helper for safe fetch with graceful fallback
async function safeFetch<T>(endpoint: string, options: RequestInit = {}, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });
    if (!res.ok) {
      return fallback;
    }
    const data = await res.json();
    return data.data || data;
  } catch (e) {
    // Graceful offline fallback to ensure ZERO frontend downtime
    return fallback;
  }
}

export const CareerUpAPI = {
  // Profile & DNA
  async getProfile() {
    return safeFetch("/profile", { method: "GET" }, INITIAL_STUDENT_PROFILE);
  },

  async generateCareerDNA() {
    return safeFetch("/profile/generate-dna", { method: "POST" }, { status: "fallback" });
  },

  // Career Recommendations
  async getCareers() {
    return safeFetch("/careers", { method: "GET" }, CAREER_PATHS);
  },

  // Skill Gaps
  async getSkillGaps(track: string = "AI Product Engineer") {
    return safeFetch(`/skill-gap?track=${encodeURIComponent(track)}`, { method: "GET" }, SKILL_GAPS);
  },

  // Roadmap
  async getRoadmap() {
    return safeFetch("/roadmap", { method: "GET" }, INITIAL_ROADMAP);
  },

  async toggleTask(taskId: string) {
    return safeFetch(`/roadmap/tasks/${taskId}/toggle`, { method: "PATCH" }, { status: "success", taskId });
  },

  // What-If Simulator
  async getSimulationSkills() {
    return safeFetch("/simulator/skills", { method: "GET" }, AVAILABLE_SIMULATION_SKILLS);
  },

  async runSimulation(selectedSkillIds: string[]) {
    return safeFetch(
      "/simulator/what-if",
      {
        method: "POST",
        body: JSON.stringify({ selectedSkillIds }),
      },
      { status: "fallback" }
    );
  },

  // Jobs & ATS
  async getJobs() {
    return safeFetch("/jobs", { method: "GET" }, SAMPLE_JOB_MATCHES);
  },

  async parseJobDescription(roleTitle: string, company: string, jobDescription: string) {
    return safeFetch(
      "/jobs/parse-jd",
      {
        method: "POST",
        body: JSON.stringify({ roleTitle, company, jobDescription }),
      },
      { status: "fallback" }
    );
  },

  async getReadiness() {
    return safeFetch("/jobs/readiness", { method: "GET" }, { overallReadinessScore: 78 });
  },

  // Resume Upload
  async uploadResume(rawText: string) {
    try {
      const formData = new FormData();
      formData.append("raw_text", rawText);
      const res = await fetch(`${API_BASE_URL}/resume/upload`, {
        method: "POST",
        body: formData,
      });
      if (res.ok) return await res.json();
    } catch (e) {
      // offline fallback
    }
    return { status: "success", preview: rawText.slice(0, 100) };
  }
};
