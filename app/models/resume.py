"""Data models representing Resume entities stored in MongoDB."""
from datetime import datetime, timezone
from typing import Dict, Any, Optional
from pydantic import BaseModel, Field

class ResumeDocument(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    original_filename: str
    saved_filename: str
    file_path: str
    resume_text: str
    analysis: Dict[str, Any]
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    model_config = {
        "populate_by_name": True,
        "arbitrary_types_allowed": True
    }
