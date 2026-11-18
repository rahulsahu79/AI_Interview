from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Any
from app.services.report_generator import generate_final_report

router = APIRouter(
    prefix="/api/v1/report",
    tags=["Report"]
)

class ReportRequest(BaseModel):
    completedQuestions: int
    totalQuestions: int
    averageScore: float
    topScore: float
    attemptsUsed: int
    answers: List[str]
    scores: List[float]
    states: List[str]

@router.post("/generate")
async def create_report(req: ReportRequest):
    result = await generate_final_report(req.model_dump())
    return {
        "success": True,
        "data": result
    }
