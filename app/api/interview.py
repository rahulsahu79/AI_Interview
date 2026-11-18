from fastapi import APIRouter, HTTPException
from app.schemas.interview import (
    EvaluateAnswerRequest,
    GenerateQuestionsRequest,
    GenerateQuestionsResponse,
    EvaluateAnswerResponse
)
from app.services.resume_storage import get_resume_by_id
from app.services.question_generator import generate_questions_for_candidate
from app.services.answer_evaluator import evaluate_candidate_answer

router = APIRouter(
    prefix="/api/v1/interview",
    tags=["Interview"]
)

@router.post("/questions")
async def get_questions(req: GenerateQuestionsRequest):
    analysis = {}
    if req.resume_id:
        doc = await get_resume_by_id(req.resume_id)
        if doc and "analysis" in doc:
            analysis = doc["analysis"]
    if not analysis and req.skills:
        analysis = {"skills": req.skills}
        
    questions = await generate_questions_for_candidate(analysis)
    return {
        "success": True,
        "questions": questions
    }

@router.post("/evaluate")
async def evaluate_answer(req: EvaluateAnswerRequest):
    if not req.answer.strip():
        raise HTTPException(status_code=400, detail="Answer cannot be empty")
    result = await evaluate_candidate_answer(req.question, req.answer)
    return {
        "success": True,
        "data": result
    }
