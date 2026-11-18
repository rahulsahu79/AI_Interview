const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface ProjectAnalysis {
  title: string;
  technologies: string[];
  description: string;
}

export interface ResumeAnalysisData {
  score: number;
  readiness: string;
  skills: string[];
  education: string[];
  experience: string;
  strengths: string[];
  improvements: string[];
  projects: ProjectAnalysis[];
}

export interface UploadResumeResponse {
  message: string;
  data: {
    resume_id: string;
    original_filename: string;
    saved_filename: string;
    analysis: ResumeAnalysisData;
  };
}

export interface InterviewQuestionItem {
  id: number;
  title: string;
  topic: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  timeLimitMinutes: number;
  prompt: string;
  hints: string[];
  expectedKeywords: string[];
}

export interface EvaluationResult {
  score: number;
  feedback: string;
  follow_up_question: string;
  suggested_improvements: string[];
}

export interface FinalReportResult {
  completedQuestions: number;
  totalQuestions: number;
  averageScore: number;
  topScore: number;
  attemptsUsed: number;
  answers: string[];
  scores: number[];
  states: string[];
  verdict: string;
  recommendations: string[];
}

export async function uploadAndAnalyzeResume(file: File): Promise<UploadResumeResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE_URL}/api/v1/resume/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || "Failed to upload and analyze resume");
  }

  return res.json();
}

export async function fetchResumeById(resumeId: string): Promise<UploadResumeResponse["data"]> {
  const res = await fetch(`${API_BASE_URL}/api/v1/resume/${resumeId}`);
  if (!res.ok) {
    throw new Error("Could not fetch resume details");
  }
  const data = await res.json();
  return data.data;
}

export async function fetchInterviewQuestions(
  resumeId?: string,
  skills?: string[]
): Promise<InterviewQuestionItem[]> {
  const res = await fetch(`${API_BASE_URL}/api/v1/interview/questions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resume_id: resumeId, skills }),
  });

  if (!res.ok) {
    throw new Error("Failed to generate interview questions");
  }

  const json = await res.json();
  return json.questions || [];
}

export async function evaluateAnswer(
  question: string,
  answer: string
): Promise<EvaluationResult> {
  const res = await fetch(`${API_BASE_URL}/api/v1/interview/evaluate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, answer }),
  });

  if (!res.ok) {
    throw new Error("Evaluation failed");
  }

  const json = await res.json();
  return json.data;
}

export async function generateFinalReport(payload: {
  completedQuestions: number;
  totalQuestions: number;
  averageScore: number;
  topScore: number;
  attemptsUsed: number;
  answers: string[];
  scores: number[];
  states: string[];
}): Promise<FinalReportResult> {
  const res = await fetch(`${API_BASE_URL}/api/v1/report/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Report generation failed");
  }

  const json = await res.json();
  return json.data;
}
