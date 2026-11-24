const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://ai-interview-qjs2.onrender.com";

function getAuthHeaders(): Record<string, string> {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("auth_token");
    if (token) {
      return { Authorization: `Bearer ${token}` };
    }
  }
  return {};
}

async function apiRequest<T>(
  path: string,
  options: RequestInit,
  fallbackError: string
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, options);
  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(json.detail || fallbackError);
  }

  return json as T;
}

export function saveAuthSession(data: AuthResponseData["data"]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("auth_token", data.access_token);
  localStorage.setItem("user", JSON.stringify(data.user));
  document.cookie = `auth_token=${data.access_token}; path=/; max-age=604800; SameSite=Lax`;
}

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

export async function uploadAndAnalyzeResume(
  file: File
): Promise<UploadResumeResponse> {
  const formData = new FormData();
  formData.append("file", file);

  return apiRequest<UploadResumeResponse>(
    "/api/v1/resume/upload",
    {
      method: "POST",
      headers: { ...getAuthHeaders() },
      body: formData,
    },
    "Failed to upload and analyze resume"
  );
}

export async function fetchResumeById(
  resumeId: string
): Promise<UploadResumeResponse["data"]> {
  const res = await apiRequest<{ data: UploadResumeResponse["data"] }>(
    `/api/v1/resume/${resumeId}`,
    { headers: { ...getAuthHeaders() } },
    "Could not fetch resume details"
  );
  return res.data;
}

export async function fetchInterviewQuestions(
  resumeId?: string,
  skills?: string[]
): Promise<InterviewQuestionItem[]> {
  const json = await apiRequest<{ questions?: InterviewQuestionItem[] }>(
    "/api/v1/interview/questions",
    {
      method: "POST",
      headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      body: JSON.stringify({ resume_id: resumeId, skills }),
    },
    "Failed to generate interview questions"
  );
  return json.questions || [];
}

export async function evaluateAnswer(
  question: string,
  answer: string
): Promise<EvaluationResult> {
  const json = await apiRequest<{ data: EvaluationResult }>(
    "/api/v1/interview/evaluate",
    {
      method: "POST",
      headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      body: JSON.stringify({ question, answer }),
    },
    "Evaluation failed"
  );
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
  const json = await apiRequest<{ data: FinalReportResult }>(
    "/api/v1/report/generate",
    {
      method: "POST",
      headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      body: JSON.stringify(payload),
    },
    "Report generation failed"
  );
  return json.data;
}

export interface UserData {
  id: string;
  username: string;
  email: string;
  full_name?: string | null;
  created_at?: string;
}

export interface AuthResponseData {
  message: string;
  data: {
    access_token: string;
    token_type: string;
    user: UserData;
  };
}

export async function registerUser(payload: {
  username: string;
  email: string;
  password: string;
  full_name?: string;
}): Promise<AuthResponseData> {
  return apiRequest<AuthResponseData>(
    "/api/v1/auth/register",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
    "Registration failed"
  );
}

export async function loginUser(payload: {
  email: string;
  password: string;
}): Promise<AuthResponseData> {
  return apiRequest<AuthResponseData>(
    "/api/v1/auth/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
    "Login failed"
  );
}

export async function fetchCurrentUser(token: string): Promise<UserData> {
  const json = await apiRequest<{ data: UserData }>(
    "/api/v1/auth/me",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    "Failed to fetch user profile"
  );
  return json.data;
}
