export interface StudentProfile {
  id: string;
  name: string;
  avatarUrl: string;
  title: string;
  university: string;
  graduationYear: string;
  degree: string;
  summary: string;
  skills: {
    name: string;
    category: "Technical" | "Analytical" | "Communication" | "Leadership" | "Domain";
    proficiency: number; // 0-100
    verified: boolean;
  }[];
  radarScores: {
    analytical: number;
    communication: number;
    leadership: number;
    technical: number;
    domainKnowledge: number;
  };
  projects: {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    metrics: string;
    githubUrl?: string;
  }[];
  experience: {
    role: string;
    company: string;
    period: string;
    highlights: string[];
  }[];
  careerDNASummary: string;
  strengths: string[];
  blindspots: string[];
}

export interface CareerPath {
  id: string;
  title: string;
  matchScore: number;
  marketDemand: "Explosive" | "High" | "Moderate";
  avgSalary: string;
  openRolesCount: number;
  description: string;
  whyFit: string[];
  keyMissingSkills: string[];
  growthProjection: string;
  topCompanies: string[];
  icon: string;
  category: string;
}

export interface SkillGapItem {
  id: string;
  name: string;
  category: "Critical" | "Advantage" | "Bonus";
  currentLevel: number;
  requiredLevel: number;
  estimatedHours: number;
  relevanceScore: number;
  marketDemand: "Very High" | "High" | "Rising";
  recommendedAction: string;
  resources: { title: string; provider: string; url?: string }[];
}

export interface RoadmapTask {
  id: string;
  title: string;
  description: string;
  estimatedHours: number;
  completed: boolean;
  category: "Learn" | "Build" | "Publish";
  readinessDelta: number;
}

export interface RoadmapMilestone {
  id: string;
  phaseNumber: number;
  title: string;
  timeframe: string;
  description: string;
  status: "in-progress" | "locked" | "completed";
  tasks: RoadmapTask[];
}

export interface SimulationSkill {
  id: string;
  name: string;
  category: string;
  impactScore: number;
  description: string;
  added?: boolean;
}

export interface JobListing {
  id: string;
  company: string;
  companyLogo: string;
  title: string;
  location: string;
  workType: "Remote" | "Hybrid" | "On-site";
  salaryRange: string;
  matchPercentage: number;
  postedDate: string;
  requiredSkills: string[];
  matchedSkills: string[];
  missingSkills: string[];
  description: string;
  applied?: boolean;
}

export interface AIInsight {
  id: string;
  date: string;
  category: "Match Alert" | "Skill Milestone" | "Market Shift" | "Readiness Boost" | "System Update";
  title: string;
  message: string;
  actionText: string;
  actionHref: string;
  unread?: boolean;
}

export const INITIAL_STUDENT_PROFILE: StudentProfile = {
  id: "student-aditi",
  name: "Aditi Sharma",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
  title: "Aspiring AI Product Engineer",
  university: "Indian Institute of Technology / Stanford Online Scholar",
  graduationYear: "2026",
  degree: "B.Tech in Computer Science & Engineering",
  summary: "Frontend and full-stack software engineer with an emphasis on applied AI, LLM tooling, and reactive user interfaces. Proven track record of building performant client experiences and integrating model APIs.",
  skills: [
    { name: "React / Next.js", category: "Technical", proficiency: 92, verified: true },
    { name: "TypeScript", category: "Technical", proficiency: 88, verified: true },
    { name: "Python & FastApi", category: "Technical", proficiency: 82, verified: true },
    { name: "Tailwind CSS & UI Systems", category: "Technical", proficiency: 94, verified: true },
    { name: "SQL & PostgreSQL", category: "Technical", proficiency: 75, verified: true },
    { name: "REST & GraphQL APIs", category: "Technical", proficiency: 84, verified: true },
    { name: "Git Workflow & CI/CD", category: "Technical", proficiency: 80, verified: true },
    { name: "Problem Decomposition", category: "Analytical", proficiency: 85, verified: true },
    { name: "User Experience Architecture", category: "Analytical", proficiency: 88, verified: true },
    { name: "Technical Storytelling", category: "Communication", proficiency: 82, verified: true },
    { name: "Sprint Ownership & Agility", category: "Leadership", proficiency: 78, verified: true },
  ],
  radarScores: {
    technical: 84,
    analytical: 78,
    communication: 80,
    leadership: 72,
    domainKnowledge: 75,
  },
  projects: [
    {
      id: "p-1",
      title: "PulseAI — Real-time Multimodal Meeting Assistant",
      description: "Built Next.js 15 client orchestrating Gemini Live API streaming with canvas-based audio waveform visualization and sub-50ms latency transcript caching.",
      technologies: ["Next.js", "TypeScript", "WebSockets", "Gemini Live API", "Tailwind CSS"],
      metrics: "Used by 1,200+ campus peers, 99.4% uptime",
      githubUrl: "https://github.com/example/pulse-ai",
    },
    {
      id: "p-2",
      title: "Synapse — Graph-Based Student Course Planner",
      description: "Interactive visual prerequisite graph connecting university curricula with automated degree audit verification.",
      technologies: ["React Flow", "Python", "FastAPI", "PostgreSQL"],
      metrics: "Reduced planning friction by 40% in departmental pilot",
      githubUrl: "https://github.com/example/synapse-planner",
    },
    {
      id: "p-3",
      title: "OmniCart — Edge-Cached Micro-Storefront",
      description: "High-performance headless e-commerce store with optimistic UI updates and Stripe integration.",
      technologies: ["Next.js", "Redis", "Tailwind CSS", "Stripe API"],
      metrics: "100/100 Google Lighthouse performance score",
    },
  ],
  experience: [
    {
      role: "Frontend & AI Engineering Intern",
      company: "Nexus Labs",
      period: "May 2025 – August 2025",
      highlights: [
        "Architected core dashboard widgets processing 20k+ daily events.",
        "Integrated LLM streaming responses with custom fallback recovery strategies.",
        "Collaborated with product designers to implement 15+ accessible design system components.",
      ],
    },
    {
      role: "Open Source Contributor & Campus Tech Lead",
      company: "Developer Student Club",
      period: "2024 – Present",
      highlights: [
        "Mentored 60+ junior students across modern React and web APIs.",
        "Organized 4 hackathons with 800+ total active participants.",
      ],
    },
  ],
  careerDNASummary: "A high-leverage product builder sitting at the exact intersection of robust frontend engineering, clean system architecture, and applied AI interfaces. Highly proactive, self-directed, and rapidly adaptable.",
  strengths: [
    "Exceptional frontend craft & user empathy",
    "Rapid prototyping of AI-powered workflows",
    "Strong technical communication and presentation clarity",
    "Solid software engineering fundamentals (TypeScript/Python/SQL)",
  ],
  blindspots: [
    "Production MLOps & model fine-tuning orchestration (e.g., vLLM, Triton)",
    "Distributed systems telemetry & large-scale Kubernetes deployment",
    "Advanced Vector DB indexing & hybrid RAG at scale",
  ],
};

export const CAREER_PATHS: CareerPath[] = [
  {
    id: "ai-product-engineer",
    title: "AI Product Engineer",
    matchScore: 92,
    marketDemand: "Explosive",
    avgSalary: "$145,000 – $190,000",
    openRolesCount: 1420,
    description: "Bridges user-facing application architecture with generative AI models, agentic workflows, and real-time streaming interfaces.",
    whyFit: [
      "94% proficiency in reactive UI systems & Next.js ecosystem",
      "Hands-on experience streaming multimodal AI responses (Gemini & WebSockets)",
      "High design craft and product intuition matching modern AI SaaS standards",
    ],
    keyMissingSkills: ["Vector Database Optimization", "LangGraph / Multi-Agent Frameworks"],
    growthProjection: "+48% YoY hiring growth across tier-1 tech & funded startups",
    topCompanies: ["OpenAI", "Anthropic", "Linear", "Vercel", "Scale AI", "Stripe"],
    icon: "Sparkles",
    category: "AI & Product",
  },
  {
    id: "fullstack-ai-dev",
    title: "Full-Stack AI Developer",
    matchScore: 88,
    marketDemand: "Explosive",
    avgSalary: "$135,000 – $175,000",
    openRolesCount: 2150,
    description: "Builds resilient end-to-end cloud platforms, scalable backend services, and interactive frontend applications integrated with AI pipelines.",
    whyFit: [
      "Solid dual-stack capability across TypeScript, Node.js, and Python/FastAPI",
      "Experience with relational data modeling and edge caching",
      "Strong API design and developer tooling mindset",
    ],
    keyMissingSkills: ["Docker / Container Orchestration", "Redis Pub/Sub at scale"],
    growthProjection: "+35% YoY expansion",
    topCompanies: ["Microsoft", "Amazon", "Google", "Datadog", "Supabase"],
    icon: "Layers",
    category: "Engineering",
  },
  {
    id: "data-scientist-applied-ml",
    title: "Applied Machine Learning Engineer",
    matchScore: 78,
    marketDemand: "High",
    avgSalary: "$150,000 – $200,000",
    openRolesCount: 980,
    description: "Designs, trains, fine-tunes, and evaluates domain-specific machine learning models and retrieval augmented generation (RAG) architectures.",
    whyFit: [
      "Core Python proficiency and analytical rigor",
      "Solid mathematical foundations from CS coursework",
    ],
    keyMissingSkills: ["PyTorch / Deep Learning Pipelines", "Model Evaluation Frameworks (Ragas/Giskard)", "Vector DB Indexing"],
    growthProjection: "+28% YoY growth",
    topCompanies: ["Meta", "Apple", "NVIDIA", "DeepMind", "Mistral AI"],
    icon: "BrainCircuit",
    category: "Machine Learning",
  },
  {
    id: "ux-ai-researcher",
    title: "AI Interaction & UX Designer",
    matchScore: 75,
    marketDemand: "High",
    avgSalary: "$125,000 – $165,000",
    openRolesCount: 620,
    description: "Crafts the human-AI interaction paradigms of tomorrow, designing intuitive interfaces for ambiguous and non-deterministic model outputs.",
    whyFit: [
      "Deep understanding of design tokens, layout hierarchy, and microinteractions",
      "Strong storytelling and empathy for cognitive friction in AI tools",
    ],
    keyMissingSkills: ["Quantitative UX Benchmarking", "Figma Design System Tokens Orchestration"],
    growthProjection: "+24% YoY growth",
    topCompanies: ["Figma", "Airbnb", "Notion", "Canva", "Apple"],
    icon: "Palette",
    category: "Design & UX",
  },
  {
    id: "mlops-platform-engineer",
    title: "MLOps Platform Engineer",
    matchScore: 68,
    marketDemand: "High",
    avgSalary: "$155,000 – $210,000",
    openRolesCount: 840,
    description: "Automates CI/CD for machine learning, model registry management, inference server optimization, and telemetry pipelines.",
    whyFit: [
      "Strong software engineering discipline and version control workflows",
    ],
    keyMissingSkills: ["Kubernetes & Helm", "vLLM / TensorRT-LLM Serving", "Prometheus & Grafana MLOps Monitoring"],
    growthProjection: "+42% YoY growth",
    topCompanies: ["Snowflake", "Databricks", "Amazon AWS", "Cloudflare"],
    icon: "Server",
    category: "Cloud & Infrastructure",
  },
  {
    id: "solutions-architect-ai",
    title: "AI Solutions Architect",
    matchScore: 72,
    marketDemand: "Moderate",
    avgSalary: "$140,000 – $185,000",
    openRolesCount: 510,
    description: "Consults enterprise clients to design tailored AI roadmaps, secure enterprise data pipelines, and scalable multi-cloud architectures.",
    whyFit: [
      "Excellent communication and technical breakdown skills",
      "Broad knowledge across web, database, and API ecosystems",
    ],
    keyMissingSkills: ["Enterprise Security & SOC2 Compliance", "Cloud Well-Architected Frameworks"],
    growthProjection: "+18% YoY growth",
    topCompanies: ["Accenture", "TCS", "IBM", "Infosys", "Deloitte"],
    icon: "Network",
    category: "Strategy & Cloud",
  },
];

export const SKILL_GAPS: SkillGapItem[] = [
  {
    id: "gap-1",
    name: "Vector Databases & Hybrid RAG (Pinecone / Qdrant)",
    category: "Critical",
    currentLevel: 25,
    requiredLevel: 85,
    estimatedHours: 20,
    relevanceScore: 96,
    marketDemand: "Very High",
    recommendedAction: "Build a production RAG application with hybrid BM25 + dense semantic search and reciprocal rank fusion.",
    resources: [
      { title: "Vector Search Foundations & Chunking Strategies", provider: "DeepLearning.AI" },
      { title: "Building Scalable RAG with Qdrant & LangChain", provider: "Official Documentation" },
    ],
  },
  {
    id: "gap-2",
    name: "Agentic Workflows & Multi-Agent Orchestration (LangGraph)",
    category: "Critical",
    currentLevel: 30,
    requiredLevel: 80,
    estimatedHours: 25,
    relevanceScore: 92,
    marketDemand: "Very High",
    recommendedAction: "Construct a multi-step agent with tool calling, persistent state memory, and human-in-the-loop validation.",
    resources: [
      { title: "LangGraph from Scratch: Cyclic AI Agents", provider: "LangChain Academy" },
      { title: "Building Reliable Agentic Systems", provider: "Anthropic Engineering" },
    ],
  },
  {
    id: "gap-3",
    name: "Docker & Containerized Microservices",
    category: "Advantage",
    currentLevel: 45,
    requiredLevel: 80,
    estimatedHours: 15,
    relevanceScore: 84,
    marketDemand: "High",
    recommendedAction: "Dockerize full-stack apps with multi-stage builds and deploy to AWS ECS or Railway with health checks.",
    resources: [
      { title: "Docker for Modern Web & AI Developers", provider: "Frontend Masters" },
    ],
  },
  {
    id: "gap-4",
    name: "Model Evaluation & Guardrails (Ragas, NeMo Guardrails)",
    category: "Advantage",
    currentLevel: 15,
    requiredLevel: 75,
    estimatedHours: 18,
    relevanceScore: 82,
    marketDemand: "Rising",
    recommendedAction: "Implement automated evaluation metrics (faithfulness, answer relevance, context recall) on test datasets.",
    resources: [
      { title: "LLM Evaluation & Synthetic Data Generation", provider: "Weights & Biases" },
    ],
  },
  {
    id: "gap-5",
    name: "PyTorch & Fine-Tuning LoRA Adapters",
    category: "Bonus",
    currentLevel: 35,
    requiredLevel: 70,
    estimatedHours: 35,
    relevanceScore: 74,
    marketDemand: "High",
    recommendedAction: "Fine-tune an open-source model (Llama-3-8B / Gemma 2) using PEFT/LoRA on domain dataset using Hugging Face.",
    resources: [
      { title: "Fine-tuning Large Language Models", provider: "DeepLearning.AI" },
    ],
  },
];

export const INITIAL_ROADMAP: RoadmapMilestone[] = [
  {
    id: "m-1",
    phaseNumber: 1,
    title: "Phase 1: Advanced Vector Search & Production RAG",
    timeframe: "Weeks 1 – 3",
    description: "Master modern embedding representations, semantic search indexing, and evaluation benchmarking.",
    status: "in-progress",
    tasks: [
      {
        id: "t-101",
        title: "Implement Dense + Sparse Hybrid Search with Reciprocal Rank Fusion",
        description: "Connect Qdrant vector database with BM25 keyword matching for resilient retrieval precision.",
        estimatedHours: 8,
        completed: false,
        category: "Build",
        readinessDelta: 3,
      },
      {
        id: "t-102",
        title: "Build Document Chunking Pipeline with Metadata Enrichment",
        description: "Create semantic chunking strategy with hierarchical parent-child relationships.",
        estimatedHours: 6,
        completed: false,
        category: "Build",
        readinessDelta: 2,
      },
      {
        id: "t-103",
        title: "Benchmark Retrieval Accuracy using Ragas Framework",
        description: "Generate synthetic test suites and calculate context recall & precision scorecards.",
        estimatedHours: 7,
        completed: false,
        category: "Publish",
        readinessDelta: 4,
      },
    ],
  },
  {
    id: "m-2",
    phaseNumber: 2,
    title: "Phase 2: Agentic Orchestration & State Machines",
    timeframe: "Weeks 4 – 6",
    description: "Transition from linear LLM prompts to cyclical, autonomous tool-using agent graphs.",
    status: "in-progress",
    tasks: [
      {
        id: "t-201",
        title: "Master LangGraph Core Concepts (Nodes, Edges, State Reducers)",
        description: "Construct a deterministic workflow graph with fallback recovery branches.",
        estimatedHours: 10,
        completed: false,
        category: "Learn",
        readinessDelta: 3,
      },
      {
        id: "t-202",
        title: "Build Multi-Agent Research Assistant with Human-in-the-Loop approval",
        description: "Create Planner -> Researcher -> Reviewer pipeline with live frontend intervention modal.",
        estimatedHours: 12,
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
    description: "Package services into immutable containers, setup observability and automated CI/CD deployment.",
    status: "locked",
    tasks: [
      {
        id: "t-301",
        title: "Multi-stage Dockerfile Optimization for Next.js & FastAPI",
        description: "Reduce container image footprint by 70% and enforce non-root security boundaries.",
        estimatedHours: 6,
        completed: false,
        category: "Build",
        readinessDelta: 3,
      },
      {
        id: "t-302",
        title: "Distributed Rate Limiting & Token Caching with Redis",
        description: "Protect LLM endpoints with token-bucket rate limiters and semantic cache layers.",
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
    title: "Phase 4: Capstone AI Product & Interview Defense",
    timeframe: "Weeks 10 – 12",
    description: "Launch public production showcase and complete mock system design interviews.",
    status: "locked",
    tasks: [
      {
        id: "t-401",
        title: "Deploy Capstone AI Application with Live User Telemetry",
        description: "Publish high-craft AI web application with OpenTelemetry tracing and public demo video.",
        estimatedHours: 16,
        completed: false,
        category: "Publish",
        readinessDelta: 6,
      },
      {
        id: "t-402",
        title: "Pass 3 End-to-End AI System Design Mock Interviews",
        description: "Defend architecture trade-offs (Latency vs Accuracy vs Cost) with senior engineers.",
        estimatedHours: 8,
        completed: false,
        category: "Learn",
        readinessDelta: 5,
      },
    ],
  },
];

export const AVAILABLE_SIMULATION_SKILLS: SimulationSkill[] = [
  {
    id: "sim-langgraph",
    name: "LangGraph & Agentic Workflows",
    category: "AI Architecture",
    impactScore: 14,
    description: "Enables autonomous multi-step reasoning, cyclic memory, and tool execution.",
  },
  {
    id: "sim-vectordb",
    name: "Vector Databases & Hybrid RAG",
    category: "Search & Retrieval",
    impactScore: 12,
    description: "Allows semantic indexing, hybrid filtering, and enterprise context grounding.",
  },
  {
    id: "sim-docker",
    name: "Docker & Container Orchestration",
    category: "Infrastructure",
    impactScore: 8,
    description: "Bridges the gap between local prototypes and production cloud microservices.",
  },
  {
    id: "sim-pytorch",
    name: "PyTorch & PEFT / LoRA Fine-Tuning",
    category: "Model Customization",
    impactScore: 11,
    description: "Unlocks applied ML roles and domain-specific model adaptation capabilities.",
  },
  {
    id: "sim-system-design",
    name: "Distributed AI System Design",
    category: "Architecture",
    impactScore: 9,
    description: "Increases readiness for Senior and Staff engineering hiring bars.",
  },
  {
    id: "sim-redis",
    name: "Redis Semantic Caching & PubSub",
    category: "Data & Performance",
    impactScore: 7,
    description: "Cuts LLM latency by 80% for repetitive queries with token cost reduction.",
  },
];

export const SAMPLE_JOB_MATCHES: JobListing[] = [
  {
    id: "job-1",
    company: "Linear",
    companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80",
    title: "Product Engineer, AI Experiences",
    location: "San Francisco, CA / Remote",
    workType: "Remote",
    salaryRange: "$160,000 – $195,000",
    matchPercentage: 91,
    postedDate: "2 days ago",
    requiredSkills: ["Next.js", "TypeScript", "Tailwind CSS", "LLM APIs", "Streaming UI", "Vector DB"],
    matchedSkills: ["Next.js", "TypeScript", "Tailwind CSS", "LLM APIs", "Streaming UI"],
    missingSkills: ["Vector DB"],
    description: "We are looking for a high-craft product engineer to shape the next generation of intelligent issue tracking and conversational project insights.",
  },
  {
    id: "job-2",
    company: "Scale AI",
    companyLogo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=80",
    title: "Frontend AI Applications Engineer",
    location: "New York, NY / Hybrid",
    workType: "Hybrid",
    salaryRange: "$150,000 – $185,000",
    matchPercentage: 86,
    postedDate: "Just now",
    requiredSkills: ["React", "TypeScript", "Python / FastAPI", "Agentic Tooling", "WebSockets"],
    matchedSkills: ["React", "TypeScript", "Python / FastAPI", "WebSockets"],
    missingSkills: ["Agentic Tooling"],
    description: "Join our core applications team to build mission-critical human-in-the-loop annotation and generative evaluation cockpits.",
  },
  {
    id: "job-3",
    company: "Vercel",
    companyLogo: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=100&auto=format&fit=crop&q=80",
    title: "AI Ecosystem Developer",
    location: "Remote Worldwide",
    workType: "Remote",
    salaryRange: "$155,000 – $190,000",
    matchPercentage: 88,
    postedDate: "1 week ago",
    requiredSkills: ["Next.js", "AI SDK", "React Server Components", "TypeScript", "Design Systems"],
    matchedSkills: ["Next.js", "React Server Components", "TypeScript", "Design Systems"],
    missingSkills: ["AI SDK (Advanced v3)"],
    description: "Help hundreds of thousands of developers ship bleeding-edge AI user interfaces on the frontend cloud.",
  },
  {
    id: "job-4",
    company: "Anthropic",
    companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80",
    title: "Full-Stack AI Interface Engineer",
    location: "San Francisco, CA",
    workType: "On-site",
    salaryRange: "$175,000 – $220,000",
    matchPercentage: 79,
    postedDate: "3 days ago",
    requiredSkills: ["TypeScript", "React", "Python", "Tool Use APIs", "RAG Systems", "Docker"],
    matchedSkills: ["TypeScript", "React", "Python"],
    missingSkills: ["Tool Use APIs", "RAG Systems", "Docker"],
    description: "Work alongside research scientists and designers to build Claude's web and desktop canvas environments.",
  },
];

export const AI_INSIGHTS: AIInsight[] = [
  {
    id: "ins-1",
    date: "Today at 09:30 AM",
    category: "Match Alert",
    title: "Linear posted a 91% Match Role",
    message: "Your profile strongly matches Linear's 'Product Engineer, AI Experiences'. Acquiring 1 critical skill (Vector DBs) will elevate your match to 96%.",
    actionText: "Analyze Role Match",
    actionHref: "/job-match",
  },
  {
    id: "ins-2",
    date: "Yesterday",
    category: "Readiness Boost",
    title: "Phase 1 Milestone Progress: 66%",
    message: "You have verified 2 of 3 foundation tasks. Complete 'Benchmark Retrieval Accuracy' to unlock Phase 2.",
    actionText: "Open Roadmap",
    actionHref: "/roadmap",
  },
  {
    id: "ins-3",
    date: "3 days ago",
    category: "Market Shift",
    title: "Agentic AI demand surged +48%",
    message: "Hiring managers are prioritizing candidates with LangGraph / Tool Calling experience over pure prompt engineering.",
    actionText: "Simulate LangGraph Skill",
    actionHref: "/what-if",
  },
];
