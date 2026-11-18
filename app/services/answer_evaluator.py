import json
from typing import Dict, Any, List
from openai import OpenAI
from app.core.config import settings

def get_ai_client():
    if settings.OPENROUTER_API_KEY:
        return OpenAI(
            api_key=settings.OPENROUTER_API_KEY,
            base_url=settings.OPENROUTER_BASE_URL
        )
    return None

def fallback_answer_evaluation(question_prompt: str, answer: str) -> Dict[str, Any]:
    words = len(answer.strip().split())
    if words < 15:
        score = 45
        feedback = "The answer is brief and lacks technical depth. Please elaborate with concrete examples, architecture patterns, and trade-offs."
        follow_up = "Could you walk through a specific implementation scenario or code construct to demonstrate this?"
    elif words < 50:
        score = 72
        feedback = "Good foundation. You covered the core concept well, though touching upon edge cases, performance, or failure modes would elevate this to a top answer."
        follow_up = "How would this solution scale if traffic or data volume increases by a factor of 10x?"
    else:
        score = 88
        feedback = "Comprehensive and structured response! You clearly articulated the mechanisms and reasoning behind your approach."
        follow_up = "What would be your primary monitoring metric in production to verify this behavior is optimal?"

    return {
        "score": score,
        "feedback": feedback,
        "follow_up_question": follow_up,
        "suggested_improvements": [
            "Highlight real-world failure recovery or retry mechanisms",
            "Mention concurrency safety and thread/coroutine considerations"
        ]
    }

async def evaluate_candidate_answer(question: str, answer: str) -> Dict[str, Any]:
    client = get_ai_client()
    if not client:
        return fallback_answer_evaluation(question, answer)

    prompt = f"""
    You are an AI technical interviewer evaluating a candidate's answer.
    
    Question:
    "{question}"
    
    Candidate Answer:
    "{answer}"
    
    Provide an accurate, constructive technical evaluation in valid JSON with these keys:
    {{
      "score": <integer from 0 to 100>,
      "feedback": "<concise actionable critique explaining strengths and omissions>",
      "follow_up_question": "<a sharp technical follow-up digging deeper into their answer>",
      "suggested_improvements": ["improvement 1", "improvement 2"]
    }}
    """
    try:
        response = client.chat.completions.create(
            model=settings.AI_MODEL,
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"},
            max_tokens=600,
            temperature=0.3
        )
        return json.loads(response.choices[0].message.content)
    except Exception as e:
        print(f"Error in evaluate_candidate_answer: {e}")
        return fallback_answer_evaluation(question, answer)
