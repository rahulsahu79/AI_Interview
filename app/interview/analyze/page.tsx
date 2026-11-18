"use client";

import { useEffect, useState } from "react";
import AnalysisHeader from "../../../components/analyze/AnalysisHeader";
import AIRecommendations from "../../../components/analyze/AIRecommendations";
import AnalysisCTA from "../../../components/analyze/AnalysisCTA";
import EducationSection from "../../../components/analyze/EducationSection";
import ExperienceSection from "../../../components/analyze/ExperienceSection";
import InterviewPlan from "../../../components/analyze/InterviewPlan";
import ProjectsSection from "../../../components/analyze/ProjectsSection";
import ReadinessScore from "../../../components/analyze/ReadinessScore";
import ResumeInsights from "../../../components/analyze/ResumeInsights";
import SkillsSection from "../../../components/analyze/SkillsSection";
import { ResumeAnalysisData } from "../../../lib/api";
import { Loader2 } from "lucide-react";

export default function AnalyzePage() {
  const [data, setData] = useState<ResumeAnalysisData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("resumeAnalysis");
      if (stored) {
        try {
          setData(JSON.parse(stored));
        } catch (e) {
          console.error("Failed to parse resumeAnalysis", e);
        }
      }
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const analysis = data || {
    score: 8.7,
    readiness: "Interview Ready",
    skills: ["Python", "FastAPI", "LangChain", "OpenAI API", "ChromaDB", "Django"],
    education: ["Master of Computer Applications (MCA)", "Bachelor of Computer Applications (BCA)"],
    experience: "AI / Backend Developer Intern",
    strengths: ["Expertise in Retrieval-Augmented Generation (RAG)", "FastAPI microservices & async endpoints"],
    improvements: ["Cloud deployment & DevOps (AWS/Docker)", "Distributed system scaling"],
    projects: [
      {
        title: "Banking Chatbot (RAG-Powered)",
        technologies: ["FastAPI", "LangChain", "OpenAI API", "ChromaDB"],
        description: "Conversational banking assistant using Retrieval-Augmented Generation with session memory.",
      },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <AnalysisHeader />

          <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
            <div className="space-y-6">
              <ReadinessScore score={analysis.score} readiness={analysis.readiness} />
              <SkillsSection skills={analysis.skills} />
              <ProjectsSection projects={analysis.projects} />
            </div>

            <div className="space-y-6">
              <EducationSection education={analysis.education && analysis.education.length > 0 ? analysis.education : ["Master of Computer Applications (MCA), JEC Jabalpur", "Bachelor of Computer Applications (BCA), S.V.V.V Indore"]} />
              <ExperienceSection experience={analysis.experience} />
              <InterviewPlan />
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <AIRecommendations />
              <ResumeInsights strengths={analysis.strengths} improvements={analysis.improvements} />
            </div>
            <AnalysisCTA />
          </div>
        </div>
      </div>
    </main>
  );
}
