import json
from typing import Dict, Any, List
from openai import OpenAI
from app.core.config import settings
from app.prompts.report_prompts import build_final_report_prompt

def get_ai_client():
    if settings.OPENROUTER_API_KEY:
        return OpenAI(
            api_key=settings.OPENROUTER_API_KEY,
            base_url=settings.OPENROUTER_BASE_URL
        )
    return None

async def generate_final_report(session_data: Dict[str, Any]) -> Dict[str, Any]:
    scores = session_data.get("scores", [])
    completed = session_data.get("completedQuestions", 0)
    total = session_data.get("totalQuestions", max(len(scores), 1))
    avg_score = round(sum(scores) / len(scores), 1) if scores else 0
    top_score = max(scores) if scores else 0

    client = get_ai_client()
    if not client:
        return {
            "completedQuestions": completed,
            "totalQuestions": total,
            "averageScore": avg_score,
            "topScore": top_score,
            "attemptsUsed": session_data.get("attemptsUsed", completed),
            "answers": session_data.get("answers", []),
            "scores": scores,
            "states": session_data.get("states", []),
            "verdict": "Candidate demonstrated strong engineering capabilities with solid fundamentals.",
            "recommendations": [
                "Practice high-level distributed systems design discussions",
                "Be ready to articulate performance bottlenecks and profiling tools"
            ]
        }

    prompt = build_final_report_prompt(avg_score, top_score, completed, total)
    try:
        response = client.chat.completions.create(
            model=settings.AI_MODEL,
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"},
            max_tokens=500,
            temperature=0.3
        )
        data = json.loads(response.choices[0].message.content)
        return {
            "completedQuestions": completed,
            "totalQuestions": total,
            "averageScore": avg_score,
            "topScore": top_score,
            "attemptsUsed": session_data.get("attemptsUsed", completed),
            "answers": session_data.get("answers", []),
            "scores": scores,
            "states": session_data.get("states", []),
            "verdict": data.get("verdict", "Candidate demonstrates good engineering skills."),
            "recommendations": data.get("recommendations", [])
        }
    except Exception:
        return {
            "completedQuestions": completed,
            "totalQuestions": total,
            "averageScore": avg_score,
            "topScore": top_score,
            "attemptsUsed": session_data.get("attemptsUsed", completed),
            "answers": session_data.get("answers", []),
            "scores": scores,
            "states": session_data.get("states", []),
            "verdict": "Solid performance across all assessed dimensions.",
            "recommendations": ["Continue refining deep architecture explanations."]
        }
