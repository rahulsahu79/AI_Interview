import json
from typing import Dict, Any, List
from app.core.config import settings, get_ai_client
from app.prompts.interview_prompts import build_answer_evaluation_prompt

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

    prompt = build_answer_evaluation_prompt(question, answer)
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
