"""Prompt templates for interview question generation and answer evaluation."""
import json
from typing import List, Any

QUESTION_GENERATION_PROMPT = """You are an elite technical interviewer designing a 5-round comprehensive technical interview for this candidate:
Candidate Profile:
- Skills: {skills}
- Experience: {experience}
- Projects: {projects}

You MUST generate EXACTLY 5 questions, corresponding to the 5 standard interview rounds:
Round 1 Category: "Resume Discussion" (Title: Resume & Prior Experience)
Round 2 Category: "Technical Skills Assessment" (Title: Core Technical & Language Mastery)
Round 3 Category: "Project Deep Dive" (Title: Project Architecture & Implementation)
Round 4 Category: "Problem Solving & Concepts" (Title: System Design, Scalability & Databases)
Round 5 Category: "Behavioral & HR Questions" (Title: Collaboration & Behavioral Scenarios)

Return ONLY a JSON list with exactly 5 objects matching this structure:
[
  {{
    "id": 1,
    "title": "<Concise descriptive title>",
    "topic": "<Core topic>",
    "category": "Resume Discussion",
    "difficulty": "Intermediate",
    "timeLimitMinutes": 8,
    "prompt": "<Detailed, personalized question referencing candidate background>",
    "hints": ["hint 1", "hint 2"],
    "expectedKeywords": ["keyword1", "keyword2"]
  }},
  ...
]"""

ANSWER_EVALUATION_PROMPT = """You are an AI technical interviewer evaluating a candidate's answer.

Question:
\"{question}\"

Candidate Answer:
\"{answer}\"

Provide an accurate, constructive technical evaluation in valid JSON with these keys:
{{
  "score": <integer from 0 to 100>,
  "feedback": "<concise actionable critique explaining strengths and omissions>",
  "follow_up_question": "<a sharp technical follow-up digging deeper into their answer>",
  "suggested_improvements": ["improvement 1", "improvement 2"]
}}"""

def build_question_generation_prompt(skills: List[str], experience: str, projects: List[Any]) -> str:
    """Build prompt for generating candidate-specific interview rounds."""
    formatted_skills = ', '.join(skills[:8]) if skills else 'Python, FastAPI, LangChain, MySQL'
    formatted_experience = experience if experience else 'Backend & AI Engineering'
    formatted_projects = json.dumps(projects[:3]) if projects else 'Full-stack AI/Backend Projects'
    
    return QUESTION_GENERATION_PROMPT.format(
        skills=formatted_skills,
        experience=formatted_experience,
        projects=formatted_projects
    )

def build_answer_evaluation_prompt(question: str, answer: str) -> str:
    """Build prompt for evaluating candidate's spoken or written answer."""
    return ANSWER_EVALUATION_PROMPT.format(
        question=question,
        answer=answer
    )
