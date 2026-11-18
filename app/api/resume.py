from fastapi import APIRouter, File, UploadFile, HTTPException
from app.services.resume_storage import save_and_analyze_resume, get_resume_by_id

router = APIRouter(
    prefix="/api/v1/resume",
    tags=["Resume"]
)

ALLOWED_TYPES = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
]

@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Invalid file type. Only PDF and DOCX files are allowed."
        )
    result = await save_and_analyze_resume(file)
    return {
        "message": "Resume uploaded and analyzed successfully",
        "data": result
    }

@router.get("/{resume_id}")
async def get_resume(resume_id: str):
    resume = await get_resume_by_id(resume_id)
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    return {
        "message": "Resume retrieved successfully",
        "data": resume
    }
