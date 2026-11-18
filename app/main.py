from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import database
from app.api.resume import router as resume_router
from app.api.interview import router as interview_router
from app.api.report import router as report_router

app = FastAPI(
    title="AI Interview System",
    description="AI-powered interview platform",
    version="1.0.0"
)

# Enable CORS for Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://nextinterview-ai.vercel.app",
    ],
    allow_origin_regex=r"^https:\/\/.*\.vercel\.app$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(resume_router)
app.include_router(interview_router)
app.include_router(report_router)

@app.get("/")
def home():
    return {
        "message": "AI Interview System Backend is running",
        "status": "online"
    }

@app.get("/health")
async def health_check():
    try:
        await database.command("ping")
        return {
            "status": "healthy",
            "database": "connected"
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "database": "disconnected",
            "error": str(e)
        }
