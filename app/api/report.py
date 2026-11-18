from fastapi import APIRouter
from app.schemas.report import ReportRequest, ReportResponse
from app.services.report_generator import generate_final_report

router = APIRouter(
    prefix="/api/v1/report",
    tags=["Report"]
)

@router.post("/generate")
async def create_report(req: ReportRequest):
    result = await generate_final_report(req.model_dump())
    return {
        "success": True,
        "data": result
    }
