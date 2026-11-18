"""Prompt templates for interview performance and final candidate report."""

FINAL_REPORT_PROMPT = """You are an executive engineering hiring committee chair.
Summarize the interview results for a candidate:
Average Score: {avg_score}/100
Top Score: {top_score}/100
Completed Questions: {completed} of {total}

Return a JSON object:
{{
  "verdict": "<concise 2-sentence hiring readiness verdict>",
  "recommendations": ["recommendation 1", "recommendation 2", "recommendation 3"]
}}"""

def build_final_report_prompt(avg_score: float, top_score: float, completed: int, total: int) -> str:
    """Build prompt for synthesizing final evaluation and recommendations."""
    return FINAL_REPORT_PROMPT.format(
        avg_score=avg_score,
        top_score=top_score,
        completed=completed,
        total=total
    )
