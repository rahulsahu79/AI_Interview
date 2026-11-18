"""Data models representing Interview rounds, evaluations, and sessions."""
from datetime import datetime, timezone
from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field

class InterviewQuestionModel(BaseModel):
    id: int
    title: str
    topic: str
    category: str
    difficulty: str
    timeLimitMinutes: int
    prompt: str
    hints: List[str] = Field(default_factory=list)
    expectedKeywords: List[str] = Field(default_factory=list)

class InterviewAnswerEvaluationModel(BaseModel):
    question: str
    answer: str
    score: int
    feedback: str
    follow_up_question: str
    suggested_improvements: List[str] = Field(default_factory=list)

class InterviewSessionModel(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    resume_id: Optional[str] = None
    questions: List[InterviewQuestionModel] = Field(default_factory=list)
    evaluations: List[InterviewAnswerEvaluationModel] = Field(default_factory=list)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    model_config = {
        "populate_by_name": True,
        "arbitrary_types_allowed": True
    }
