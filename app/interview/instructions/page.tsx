import { metadata as _metadata } from "next";
import { instructionsData } from "@/constants/instructionsData";
import InstructionsHero from "@/components/instructions/InstructionsHero";
import InterviewOverview from "@/components/instructions/InterviewOverview";
import InterviewTimeline from "@/components/instructions/InterviewTimeline";
import GuidelinesSection from "@/components/instructions/GuidelinesSection";
import EvaluationCriteria from "@/components/instructions/EvaluationCriteria";
import InterviewProcess from "@/components/instructions/InterviewProcess";
import CandidateSummary from "@/components/instructions/CandidateSummary";
import InstructionsInteractiveSection from "@/components/instructions/InstructionsInteractiveSection";

export const metadata = {
  title: "Interview Instructions — InterviewAI",
};

export default function InterviewInstructionsPage() {
  const overviewStats = [
    { label: "Questions", value: instructionsData.totalQuestions.toString() },
    { label: "Attempts Per Question", value: instructionsData.attemptsPerQuestion.toString() },
    { label: "Estimated Duration", value: instructionsData.estimatedDuration },
    { label: "Scoring Scale", value: instructionsData.scoringScale },
  ];

  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <InstructionsHero />
        <InterviewOverview stats={overviewStats} />
        <InterviewTimeline />
        <GuidelinesSection />
        <EvaluationCriteria />
        <InterviewProcess />
        <CandidateSummary
          profile={instructionsData.candidateProfile}
          skills={instructionsData.skills}
          projectsDetected={instructionsData.projectsDetected}
          focusAreas={instructionsData.focusAreas}
        />
        <InstructionsInteractiveSection />
      </div>
    </main>
  );
}
