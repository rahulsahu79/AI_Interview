from pydantic import BaseModel, Field
from typing import List, Optional, Any
from datetime import datetime

class ProjectAnalysisSchema(BaseModel):
    title: str = Field(..., description="Project title")
    technologies: List[str] = Field(default_factory=list, description="Technologies and frameworks used")
    description: str = Field(..., description="Short summary of the project scope and accomplishments")

class ResumeAnalysisData(BaseModel):
    score: float = Field(..., ge=0, le=10, description="Readiness score from 0 to 10")
    readiness: str = Field(default="Interview Ready", description="Readiness status label")
    skills: List[str] = Field(default_factory=list, description="Extracted technical skills")
    education: List[str] = Field(default_factory=list, description="Degrees, colleges, and CGPA")
    experience: str = Field(..., description="Summary of work experience and internships")
    strengths: List[str] = Field(default_factory=list, description="Key technical strengths")
    improvements: List[str] = Field(default_factory=list, description="Constructive improvement areas")
    projects: List[ProjectAnalysisSchema] = Field(default_factory=list, description="Highlighted projects")

class ResumeUploadData(BaseModel):
    resume_id: str
    original_filename: str
    saved_filename: str
    analysis: ResumeAnalysisData

class ResumeUploadResponse(BaseModel):
    message: str
    data: ResumeUploadData

class ResumeDetailResponse(BaseModel):
    message: str
    data: Any
