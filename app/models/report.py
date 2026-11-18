"""Data models representing synthesized Interview Reports stored in database."""
from datetime import datetime, timezone
from typing import List, Optional
from pydantic import BaseModel, Field

class CandidateReportDocument(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    session_id: Optional[str] = None
    completed_questions: int
    total_questions: int
    average_score: float
    top_score: float
    attempts_used: int
    answers: List[str] = Field(default_factory=list)
    scores: List[float] = Field(default_factory=list)
    states: List[str] = Field(default_factory=list)
    verdict: str
    recommendations: List[str] = Field(default_factory=list)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    model_config = {
        "populate_by_name": True,
        "arbitrary_types_allowed": True
    }
