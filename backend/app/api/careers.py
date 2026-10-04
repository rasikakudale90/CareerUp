from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.app.db.session import get_db
from backend.app.models.user import User
from backend.app.models.profile import StudentProfile
from backend.app.api.deps import get_current_user
from backend.app.ai.gemini_client import gemini_client
from backend.app.ai.prompts import CAREER_RECOMMENDATION_PROMPT

router = APIRouter(prefix="/careers", tags=["Career Recommendations"])

DEFAULT_CAREERS = [
    {
        "id": "ai-product-engineer",
        "slug": "ai-product-engineer",
        "title": "AI Product Engineer",
        "matchScore": 92,
        "marketDemand": "Explosive",
        "avgSalary": "$145,000 – $190,000",
        "openRolesCount": 1420,
        "category": "AI & Product",
        "description": "Bridges user-facing application architecture with generative AI models, agentic workflows, and real-time streaming interfaces.",
        "whyFit": [
            "94% proficiency in reactive UI systems & Next.js ecosystem",
            "Hands-on experience streaming multimodal AI responses",
            "High design craft matching modern AI SaaS standards"
        ],
        "keyMissingSkills": ["Vector Database Optimization", "LangGraph / Multi-Agent Frameworks"],
        "growthProjection": "+48% YoY hiring growth across tier-1 tech & funded startups",
        "topCompanies": ["OpenAI", "Anthropic", "Linear", "Vercel", "Scale AI"]
    },
    {
        "id": "fullstack-ai-dev",
        "slug": "fullstack-ai-dev",
        "title": "Full-Stack AI Developer",
        "matchScore": 88,
        "marketDemand": "Explosive",
        "avgSalary": "$135,000 – $175,000",
        "openRolesCount": 2150,
        "category": "Engineering",
        "description": "Builds resilient end-to-end cloud platforms, scalable backend services, and interactive frontend applications integrated with AI pipelines.",
        "whyFit": [
            "Solid dual-stack capability across TypeScript, Node.js, and Python/FastAPI",
            "Experience with relational data modeling and edge caching",
            "Strong API design and developer tooling mindset"
        ],
        "keyMissingSkills": ["Docker / Container Orchestration", "Redis Pub/Sub at scale"],
        "growthProjection": "+35% YoY expansion",
        "topCompanies": ["Microsoft", "Amazon", "Google", "Datadog", "Supabase"]
    },
    {
        "id": "applied-ml-engineer",
        "slug": "applied-ml-engineer",
        "title": "Applied Machine Learning Engineer",
        "matchScore": 78,
        "marketDemand": "High",
        "avgSalary": "$150,000 – $200,000",
        "openRolesCount": 980,
        "category": "Machine Learning",
        "description": "Designs, trains, fine-tunes, and evaluates domain-specific machine learning models and retrieval augmented generation (RAG) architectures.",
        "whyFit": [
            "Core Python proficiency and analytical rigor",
            "Solid mathematical foundations from CS coursework"
        ],
        "keyMissingSkills": ["PyTorch / Deep Learning Pipelines", "Model Evaluation Frameworks"],
        "growthProjection": "+28% YoY growth",
        "topCompanies": ["Meta", "Apple", "NVIDIA", "DeepMind", "Mistral AI"]
    },
    {
        "id": "ux-ai-designer",
        "slug": "ux-ai-designer",
        "title": "AI Interaction & UX Designer",
        "matchScore": 75,
        "marketDemand": "High",
        "avgSalary": "$125,000 – $165,000",
        "openRolesCount": 620,
        "category": "Design & UX",
        "description": "Crafts human-AI interaction paradigms, designing intuitive interfaces for non-deterministic model outputs.",
        "whyFit": [
            "Deep understanding of design tokens and microinteractions",
            "Strong empathy for cognitive friction in AI tools"
        ],
        "keyMissingSkills": ["Quantitative UX Benchmarking", "Figma Design System Tokens Orchestration"],
        "growthProjection": "+24% YoY growth",
        "topCompanies": ["Figma", "Airbnb", "Notion", "Canva"]
    },
    {
        "id": "solutions-architect-ai",
        "slug": "solutions-architect-ai",
        "title": "AI Solutions Architect",
        "matchScore": 72,
        "marketDemand": "Moderate",
        "avgSalary": "$140,000 – $185,000",
        "openRolesCount": 510,
        "category": "Cloud & Infrastructure",
        "description": "Consults enterprise clients to design tailored AI roadmaps, secure enterprise data pipelines, and scalable cloud architectures.",
        "whyFit": [
            "Excellent communication and technical breakdown skills",
            "Broad knowledge across web, database, and API ecosystems"
        ],
        "keyMissingSkills": ["Enterprise Security & SOC2 Compliance", "Cloud Well-Architected Frameworks"],
        "growthProjection": "+20% YoY growth",
        "topCompanies": ["AWS", "Google Cloud", "Snowflake", "Databricks"]
    },
    {
        "id": "mlops-platform-engineer",
        "slug": "mlops-platform-engineer",
        "title": "MLOps Platform Engineer",
        "matchScore": 68,
        "marketDemand": "High",
        "avgSalary": "$155,000 – $210,000",
        "openRolesCount": 840,
        "category": "Cloud & Infrastructure",
        "description": "Automates CI/CD for machine learning, model registry management, inference server optimization, and telemetry pipelines.",
        "whyFit": [
            "Strong software engineering discipline and version control workflows"
        ],
        "keyMissingSkills": ["Kubernetes & Helm", "vLLM / TensorRT-LLM Serving", "Prometheus & Grafana MLOps"],
        "growthProjection": "+42% YoY growth",
        "topCompanies": ["Databricks", "Snowflake", "Scale AI", "Anyscale"]
    }
]

@router.get("")
def get_career_recommendations(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    profile = db.query(StudentProfile).filter(StudentProfile.user_id == current_user.id).first()
    dna = profile.career_dna_summary if profile else "AI Product Engineer student"

    prompt = CAREER_RECOMMENDATION_PROMPT.format(student_dna=dna)
    ai_result = gemini_client.generate_json(prompt, fallback_data={"careers": DEFAULT_CAREERS})
    careers = ai_result.get("careers", DEFAULT_CAREERS)

    return {"status": "success", "count": len(careers), "data": careers}
