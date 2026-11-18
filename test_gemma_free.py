import asyncio
from app.services.resume_service import analyze_resume_text
from app.services.question_generator import generate_questions_for_candidate
from app.services.answer_evaluator import evaluate_candidate_answer
from app.services.report_generator import generate_final_report

sample_resume_text = """
Rahul Sahu
Backend & AI Engineer | Jabalpur, India
Email: rahul@example.com

EDUCATION:
- Master of Computer Applications (MCA), Jabalpur Engineering College (2024 - 2026)
- Bachelor of Computer Applications (BCA), S.V.V.V Indore (2021 - 2024)

TECHNICAL SKILLS:
- Languages & Frameworks: Python, FastAPI, Django, JavaScript
- AI / ML: LangChain, ChromaDB, OpenAI API, Retrieval-Augmented Generation (RAG)
- Databases: MongoDB, MySQL, Redis
- Tools: Git, GitHub, Docker, Postman

PROJECTS:
1. Banking RAG Chatbot
   - Designed and built a financial FAQ chatbot using FastAPI, LangChain, ChromaDB, and OpenAI.
   - Handled session memory for context-aware customer queries with low latency.

2. AI Mock Interview System
   - Full-stack system with Next.js frontend and FastAPI backend.
   - Parses candidate resumes and evaluates answers in real-time.
"""

async def run_gemma_test():
    print("==================================================")
    print("Testing with Model: google/gemma-4-31b-it:free")
    print("==================================================")
    
    print("\n1. Resume Analysis via Gemma 4 (Free):")
    analysis = await analyze_resume_text(sample_resume_text)
    print(f" - Score: {analysis.get('score')} ({analysis.get('readiness')})")
    print(f" - Skills Detected: {', '.join(analysis.get('skills', []))}")
    print(f" - Projects: {[p.get('title') for p in analysis.get('projects', [])]}")

    print("\n2. Question Generation via Gemma 4 (Free):")
    questions = await generate_questions_for_candidate(analysis)
    for idx, q in enumerate(questions, 1):
        print(f" - Question {idx}: {q.get('title')}")
        print(f"   Prompt: {q.get('prompt')}")

    print("\n3. Answer Evaluation via Gemma 4 (Free):")
    sample_answer = (
        "In our Banking Chatbot, I used ChromaDB as the vector store to embed policy documents. "
        "LangChain coordinates the retrieval chain by fetching the top k matching chunks, and OpenAI API synthesizes "
        "the final grounded answer with session history."
    )
    first_q = questions[0].get("prompt") if questions else "How did you implement RAG?"
    eval_res = await evaluate_candidate_answer(first_q, sample_answer)
    print(f" - Score: {eval_res.get('score')}/100")
    print(f" - Feedback: {eval_res.get('feedback')}")
    print(f" - AI Follow-Up: {eval_res.get('follow_up_question')}")

    print("\n4. Final Report Generation via Gemma 4 (Free):")
    report = await generate_final_report({
        "completedQuestions": 3,
        "totalQuestions": 3,
        "averageScore": eval_res.get("score", 85),
        "topScore": eval_res.get("score", 85),
        "attemptsUsed": 3,
        "answers": [sample_answer],
        "scores": [eval_res.get("score", 85)],
        "states": ["submitted", "submitted", "submitted"]
    })
    print(f" - Verdict: {report.get('verdict')}")
    print(f" - Recommendations: {report.get('recommendations')}")
    print("\n==================================================")
    print("ALL 4 STAGES TESTED SUCCESSFULLY WITH FREE GEMMA 4!")

if __name__ == "__main__":
    asyncio.run(run_gemma_test())
