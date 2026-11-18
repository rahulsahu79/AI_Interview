from pydantic import BaseModel, Field
from typing import List, Optional

class ReportRequest(BaseModel):
    completedQuestions: int = Field(..., description="Number of questions answered")
    totalQuestions: int = Field(..., description="Total questions in session")
    averageScore: float = Field(..., description="Average session score")
    topScore: float = Field(..., description="Highest round score")
    attemptsUsed: int = Field(..., description="Attempts or questions completed")
    answers: List[str] = Field(default_factory=list, description="List of submitted candidate answers")
    scores: List[float] = Field(default_factory=list, description="Scores per answered round")
    states: List[str] = Field(default_factory=list, description="Status tags per question")

class ReportResultData(BaseModel):
    completedQuestions: int
    totalQuestions: int
    averageScore: float
    topScore: float
    attemptsUsed: int
    answers: List[str]
    scores: List[float]
    states: List[str]
    verdict: str
    recommendations: List[str]

class ReportResponse(BaseModel):
    success: bool = True
    data: ReportResultData
