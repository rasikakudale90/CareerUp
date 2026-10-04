# Dedicated AI Prompt Registry for Career Intelligence

RESUME_ANALYSIS_PROMPT = """
You are the AI Career Intelligence Engine for CareerUp.
Analyze the following student resume text and extract their multi-dimensional Career DNA.

Resume Content:
{resume_text}

Respond ONLY with valid JSON in this exact structure:
{{
  "title": "Short professional headline (e.g. AI Product Engineer)",
  "summary": "2-3 sentence executive summary of the student profile",
  "career_dna_summary": "In-depth multi-dimensional evaluation of technical depth, architecture, and execution velocity",
  "overall_readiness_score": 75,
  "radar_scores": {{
    "technical": 84,
    "analytical": 78,
    "communication": 80,
    "leadership": 72,
    "domainKnowledge": 75
  }},
  "strengths": [
    "Identified candidate strength 1",
    "Identified candidate strength 2",
    "Identified candidate strength 3"
  ],
  "blindspots": [
    "Identified critical gap 1",
    "Identified critical gap 2"
  ],
  "skills": [
    {{"name": "Skill Name", "category": "Technical", "proficiency": 85}}
  ]
}}
"""

CAREER_RECOMMENDATION_PROMPT = """
You are the AI Career Intelligence Engine for CareerUp.
Given the student Career DNA below, generate 6 customized high-growth AI and engineering career trajectories matching their profile.

Student Career DNA:
{student_dna}

Respond ONLY with valid JSON in this exact structure:
{{
  "careers": [
    {{
      "slug": "ai-product-engineer",
      "title": "AI Product Engineer",
      "match_score": 92,
      "market_demand": "Explosive",
      "avg_salary": "$145,000 – $190,000",
      "open_roles_count": 1420,
      "category": "AI & Product",
      "description": "Bridges user-facing application architecture with generative AI models and streaming interfaces.",
      "growth_projection": "+48% YoY hiring growth",
      "why_fit": [
        "Reason 1 based on actual student skills",
        "Reason 2 based on projects"
      ],
      "key_missing_skills": ["Missing Skill 1", "Missing Skill 2"],
      "top_companies": ["OpenAI", "Anthropic", "Linear", "Vercel"]
    }}
  ]
}}
"""

SKILL_GAP_PROMPT = """
You are the AI Skill Gap Engine for CareerUp.
Given the student profile and their target career track: "{target_track}", identify critical skill gaps separating them from Tier-1 readiness.

Student Profile:
{student_dna}

Respond ONLY with valid JSON in this exact structure:
{{
  "skill_gaps": [
    {{
      "name": "Vector Databases & Hybrid RAG",
      "category": "Critical",
      "current_level": 35,
      "required_level": 85,
      "estimated_hours": 24,
      "market_demand": "Very High",
      "recommended_action": "Build a hybrid keyword + semantic search pipeline using pgvector or Pinecone.",
      "resources": [
        {{"title": "Vector Search Masterclass", "provider": "DeepLearning.AI"}}
      ]
    }}
  ]
}}
"""

ROADMAP_PROMPT = """
You are the AI Learning Path Architect for CareerUp.
Create a personalized 12-week, 4-phase milestone action plan to bridge the student's gaps for "{target_track}".

Student Profile:
{student_dna}

Respond ONLY with valid JSON in this exact structure:
{{
  "milestones": [
    {{
      "phase_number": 1,
      "title": "Phase 1: Advanced Vector Search & Semantic Pipelines",
      "timeframe": "Weeks 1-3",
      "description": "Master high-scale embedding retrieval, hybrid ranking, and chunking strategies.",
      "tasks": [
        {{
          "title": "Implement Hybrid Keyword + Vector Retrieval",
          "description": "Deploy pgvector with Reciprocal Rank Fusion (RRF) in Next.js.",
          "estimated_hours": 8,
          "category": "Build",
          "readiness_delta": 4
        }}
      ]
    }}
  ]
}}
"""

WHAT_IF_PROMPT = """
You are the AI What-If Simulation Sandbox for CareerUp.
Evaluate how acquiring the following hypothetical skills: {simulated_skills} affects the student's target career readiness and compensation.

Student Profile:
{student_dna}

Respond ONLY with valid JSON in this exact structure:
{{
  "projected_readiness_score": 88,
  "readiness_delta": 14,
  "projected_salary_increase": "+$25,000",
  "unlocked_career_matches": [
    {{
      "title": "Senior AI Systems Builder",
      "new_match_score": 94,
      "lift": 12
    }}
  ],
  "reasoning": "Adding LangGraph and Vector DBs closes the two most critical blockers for Tier-1 AI Product roles."
}}
"""

JOB_MATCH_PROMPT = """
You are the AI ATS Compatibility Engine for CareerUp.
Compare the student's Career DNA against the following target Job Description.

Job Description:
{job_description}

Student Career DNA:
{student_dna}

Respond ONLY with valid JSON in this exact structure:
{{
  "match_percentage": 87,
  "fit_status": "Strong Fit",
  "matched_skills": ["Next.js", "TypeScript", "FastAPI"],
  "missing_skills": ["Vector Search", "LangGraph"],
  "summary": "Strong core full-stack foundations with high ATS relevance. Minor gaps in multi-agent orchestration.",
  "interview_talking_points": [
    "Highlight experience with streaming LLM responses and edge latency reduction."
  ]
}}
"""
