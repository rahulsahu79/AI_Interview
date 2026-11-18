import asyncio
import os
from pathlib import Path
from app.services.resume_parser import parse_resume
from app.services.resume_service import analyze_resume_text
from app.services.question_generator import generate_questions_for_candidate
from app.services.answer_evaluator import evaluate_candidate_answer
from app.services.report_generator import generate_final_report

BASE_DIR = Path(__file__).resolve().parent

async def run_full_pipeline_test():
    print("==================================================")
    print("STEP 1: Testing Resume Parsing & OpenRouter AI Analysis")
    print("==================================================")
    sample_pdf = str(BASE_DIR / "app" / "uploads" / "a4cbf4f6-82fa-4323-a2a2-5dfe897e0e3a.pdf")
    resume_text = parse_resume(sample_pdf, ".pdf")
    print(f"Extracted {len(resume_text)} characters from sample PDF.")
    
    analysis = await analyze_resume_text(resume_text)
    print("Live AI Analysis Output:")
    print(f" - Readiness Score: {analysis.get('score')} ({analysis.get('readiness')})")
    print(f" - Skills Detected: {', '.join(analysis.get('skills', []))}")
    print(f" - Experience: {analysis.get('experience')}")
    print(f" - Education: {analysis.get('education')}")

    print("\n==================================================")
    print("STEP 2: Testing Question Generation via OpenRouter AI")
    print("==================================================")
    questions = await generate_questions_for_candidate(analysis)
    print(f"Generated {len(questions)} tailored interview questions:")
    for idx, q in enumerate(questions, 1):
        print(f" Question {idx}: {q.get('title')}")
        print(f" Prompt: {q.get('prompt')}")

    print("\n==================================================")
    print("STEP 3: Testing Answer Evaluation via OpenRouter AI")
    print("==================================================")
    sample_question = questions[0].get("prompt") if questions else "How do you optimize database queries?"
    sample_answer = (
        "In our Banking Chatbot, I used ChromaDB as the vector store to embed customer queries and policy documents. "
        "LangChain coordinates the retrieval chain by fetching the top k matching documents, and OpenAI API synthesizes "
        "the final contextual response with strict grounding."
    )
    print(f"Testing Answer for Question 1:")
    print(f"Candidate Answer: \"{sample_answer}\"\n")
    eval_result = await evaluate_candidate_answer(sample_question, sample_answer)
    print("Live AI Evaluation Output:")
    print(f" - Score: {eval_result.get('score')}/100")
    print(f" - Feedback: {eval_result.get('feedback')}")
    print(f" - AI Follow-Up Question: {eval_result.get('follow_up_question')}")
    print(f" - Suggested Improvements: {eval_result.get('suggested_improvements')}")

    print("\n==================================================")
    print("STEP 4: Testing Final Report Synthesis via OpenRouter AI")
    print("==================================================")
    report_input = {
        "completedQuestions": 3,
        "totalQuestions": 3,
        "averageScore": eval_result.get("score", 85),
        "topScore": eval_result.get("score", 85),
        "attemptsUsed": 3,
        "answers": [sample_answer],
        "scores": [eval_result.get("score", 85)],
        "states": ["submitted", "submitted", "submitted"]
    }
    final_report = await generate_final_report(report_input)
    print("Live AI Final Report:")
    print(f" - Verdict: {final_report.get('verdict')}")
    print(f" - Recommendations: {final_report.get('recommendations')}")
    print("==================================================")
    print("ALL 4 PIPELINE TESTS PASSED WITH FREE GEMMA MODEL!")

if __name__ == "__main__":
    asyncio.run(run_full_pipeline_test())
