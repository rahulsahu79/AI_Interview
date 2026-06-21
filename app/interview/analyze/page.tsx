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
import { analysisData } from "../../../components/analyze/analysisData";

export const metadata = {
  title: "Resume Analysis — InterviewAI",
};

export default function AnalyzePage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <AnalysisHeader />

          <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
            <div className="space-y-6">
              <ReadinessScore score={analysisData.score} readiness={analysisData.readiness} />
              <SkillsSection skills={analysisData.skills} />
              <ProjectsSection projects={analysisData.projects} />
            </div>

            <div className="space-y-6">
              <EducationSection education={analysisData.education} />
              <ExperienceSection experience={analysisData.experience} />
              <InterviewPlan />
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <AIRecommendations />
              <ResumeInsights strengths={analysisData.strengths} improvements={analysisData.improvements} />
            </div>
            <AnalysisCTA />
          </div>
        </div>
      </div>
    </main>
  );
}
