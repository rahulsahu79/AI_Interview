from pydantic import BaseModel, Field
from typing import List, Optional, Literal

class GenerateQuestionsRequest(BaseModel):
    resume_id: Optional[str] = Field(None, description="Uploaded resume ID from MongoDB")
    skills: Optional[List[str]] = Field(None, description="Optional custom skills override")

class InterviewQuestionItem(BaseModel):
    id: int = Field(..., description="Question index (1-5)")
    title: str = Field(..., description="Short descriptive title of the interview round")
    topic: str = Field(..., description="Core assessment area")
    category: str = Field(..., description="Category: Resume Discussion, Technical Skills Assessment, etc.")
    difficulty: Literal["Beginner", "Intermediate", "Advanced"] = Field("Intermediate", description="Round difficulty")
    timeLimitMinutes: int = Field(default=10, description="Suggested time allocation in minutes")
    prompt: str = Field(..., description="The main question for the candidate")
    hints: List[str] = Field(default_factory=list, description="Guidance hints for candidate")
    expectedKeywords: List[str] = Field(default_factory=list, description="Key concepts expected in good answers")

class GenerateQuestionsResponse(BaseModel):
    success: bool = True
    questions: List[InterviewQuestionItem]

class EvaluateAnswerRequest(BaseModel):
    question: str = Field(..., description="The interview question being answered")
    answer: str = Field(..., description="The candidate's response")

class EvaluationResult(BaseModel):
    score: int = Field(..., ge=0, le=100, description="Evaluated score from 0 to 100")
    feedback: str = Field(..., description="Constructive feedback and omissions")
    follow_up_question: str = Field(..., description="Technical follow-up question")
    suggested_improvements: List[str] = Field(default_factory=list, description="Actionable points to improve")

class EvaluateAnswerResponse(BaseModel):
    success: bool = True
    data: EvaluationResult
