import os
import uuid
from datetime import datetime, timezone
from fastapi import UploadFile
from bson import ObjectId

from app.core.database import database
from app.models.resume import ResumeDocument
from app.services.resume_parser import parse_resume
from app.services.resume_service import analyze_resume_text

UPLOAD_DIR = "app/uploads"

async def save_and_analyze_resume(file: UploadFile):
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)

    file_content = await file.read()
    with open(file_path, "wb") as buffer:
        buffer.write(file_content)

    resume_text = parse_resume(file_path, file_extension)
    analysis = await analyze_resume_text(resume_text)

    doc_model = ResumeDocument(
        original_filename=file.filename,
        saved_filename=unique_filename,
        file_path=file_path,
        resume_text=resume_text,
        analysis=analysis,
        created_at=datetime.now(timezone.utc)
    )

    resume_dict = doc_model.model_dump(by_alias=True, exclude={"id"})
    result = await database["resumes"].insert_one(resume_dict)

    return {
        "resume_id": str(result.inserted_id),
        "original_filename": file.filename,
        "saved_filename": unique_filename,
        "analysis": analysis
    }

async def get_resume_by_id(resume_id: str):
    try:
        doc = await database["resumes"].find_one({"_id": ObjectId(resume_id)})
        if doc:
            doc["_id"] = str(doc["_id"])
            return doc
    except Exception:
        pass
    return None
