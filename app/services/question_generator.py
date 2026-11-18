import json
from typing import List, Dict, Any
from openai import OpenAI
from app.core.config import settings
from app.prompts.interview_prompts import build_question_generation_prompt

def get_ai_client():
    if settings.OPENROUTER_API_KEY:
        return OpenAI(
            api_key=settings.OPENROUTER_API_KEY,
            base_url=settings.OPENROUTER_BASE_URL
        )
    return None

def fallback_questions(skills: List[str], projects: List[Any]) -> List[Dict[str, Any]]:
    primary_skill = skills[0] if skills else "Python"
    primary_proj = projects[0]["title"] if projects and isinstance(projects[0], dict) else "Banking Chatbot (RAG)"
    
    return [
        {
            "id": 1,
            "title": "Resume & Career Overview",
            "topic": "Professional Background",
            "category": "Resume Discussion",
            "difficulty": "Intermediate",
            "timeLimitMinutes": 8,
            "prompt": "Could you walk me through your engineering journey, your core focus in backend and AI development, and the key highlights from your recent internship experience?",
            "hints": ["Highlight your technical stack", "Discuss key achievements and internship impact", "Demonstrate passion for engineering"],
            "expectedKeywords": ["backend", "AI", "microservices", "internship", "architecture"]
        },
        {
            "id": 2,
            "title": f"Technical Mastery: {primary_skill} & Concurrency",
            "topic": "Backend Core",
            "category": "Technical Skills Assessment",
            "difficulty": "Intermediate",
            "timeLimitMinutes": 10,
            "prompt": f"In {primary_skill} and modern web frameworks like FastAPI, explain how the asynchronous event loop manages concurrent I/O operations without blocking. Where can bottlenecks emerge?",
            "hints": ["Discuss asyncio event loop", "Explain async/await vs thread workers", "Mention connection pooling and GIL"],
            "expectedKeywords": ["asyncio", "event loop", "non-blocking", "concurrency", "thread pool"]
        },
        {
            "id": 3,
            "title": f"Architecture Deep Dive: {primary_proj}",
            "topic": "Project Implementation",
            "category": "Project Deep Dive",
            "difficulty": "Advanced",
            "timeLimitMinutes": 12,
            "prompt": f"In your project '{primary_proj}', walk me through the end-to-end architecture. How did you handle document chunking, embeddings, vector indexing, and session memory?",
            "hints": ["Explain vector database integration (e.g. ChromaDB)", "Discuss retrieval accuracy and chunk size", "Address latency and memory management"],
            "expectedKeywords": ["vector database", "embeddings", "retrieval", "chunking", "LangChain", "memory"]
        },
        {
            "id": 4,
            "title": "System Design: Scaling & Database Optimization",
            "topic": "Problem Solving & Database",
            "category": "Problem Solving & Concepts",
            "difficulty": "Advanced",
            "timeLimitMinutes": 12,
            "prompt": "Suppose your service experiences a sudden 10x traffic spike with heavy read/write operations on MySQL/MongoDB. What indexing, caching, and rate-limiting strategies would you implement to maintain sub-100ms response times?",
            "hints": ["Explain EXPLAIN query plans", "Describe Redis caching patterns", "Discuss read replicas and connection pools"],
            "expectedKeywords": ["indexing", "redis", "caching", "rate limiting", "query plan", "replicas"]
        },
        {
            "id": 5,
            "title": "Engineering Collaboration & Incident Response",
            "topic": "Behavioral & Communication",
            "category": "Behavioral & HR Questions",
            "difficulty": "Intermediate",
            "timeLimitMinutes": 8,
            "prompt": "Tell me about a time during a project or internship when a feature failed in development or you disagreed with a design decision. How did you troubleshoot it and align with your team?",
            "hints": ["Use the STAR method (Situation, Task, Action, Result)", "Focus on constructive technical communication", "Highlight ownership and lessons learned"],
            "expectedKeywords": ["collaboration", "ownership", "debugging", "STAR method", "communication"]
        }
    ]

async def generate_questions_for_candidate(analysis: Dict[str, Any]) -> List[Dict[str, Any]]:
    client = get_ai_client()
    skills = analysis.get("skills", [])
    projects = analysis.get("projects", [])
    experience = analysis.get("experience", "")

    if not client:
        return fallback_questions(skills, projects)

    prompt = build_question_generation_prompt(skills, experience, projects)
    try:
        response = client.chat.completions.create(
            model=settings.AI_MODEL,
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"},
            max_tokens=1400,
            temperature=0.3
        )
        content = json.loads(response.choices[0].message.content)
        items = []
        if isinstance(content, list):
            items = content
        else:
            for key in ["questions", "interviewQuestions", "items", "rounds"]:
                if key in content and isinstance(content[key], list):
                    items = content[key]
                    break
        if len(items) >= 5:
            return items[:5]
        return fallback_questions(skills, projects)
    except Exception as e:
        print(f"Error in generate_questions_for_candidate: {e}")
        return fallback_questions(skills, projects)
