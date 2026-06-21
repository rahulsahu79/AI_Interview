"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import InterviewAnswerEditor from "./InterviewAnswerEditor";
import InterviewFeedbackPanel from "./InterviewFeedbackPanel";
import InterviewFollowUpPanel from "./InterviewFollowUpPanel";
import InterviewQuestionHeader from "./InterviewQuestionHeader";
import InterviewSidebar, { QuestionStatusSummary, QuestionState } from "./InterviewSidebar";
import InterviewStatsPanel from "./InterviewStatsPanel";
import { interviewQuestions, type InterviewQuestion } from "./interviewData";

const MAX_ATTEMPTS = 5;
const TOTAL_QUESTIONS = interviewQuestions.length;

function getMockScore(answer: string, difficulty: InterviewQuestion["difficulty"]) {
  const base = Math.min(100, Math.max(30, Math.floor(answer.trim().length / 2)));
  const difficultyModifier = difficulty === "Advanced" ? 10 : difficulty === "Intermediate" ? 5 : 0;
  return Math.min(100, base + difficultyModifier);
}

type InterviewReportData = {
  completedQuestions: number;
  totalQuestions: number;
  averageScore: number;
  topScore: number;
  attemptsUsed: number;
  answers: string[];
  scores: number[];
  states: QuestionState[];
};

export default function InterviewSessionClient() {
  const router = useRouter();
  const [accessChecked, setAccessChecked] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(() => Array(TOTAL_QUESTIONS).fill(""));
  const [attempts, setAttempts] = useState<number[]>(() => Array(TOTAL_QUESTIONS).fill(MAX_ATTEMPTS));
  const [questionStates, setQuestionStates] = useState<QuestionState[]>(() => Array(TOTAL_QUESTIONS).fill("pending"));
  const [scores, setScores] = useState<number[]>(() => Array(TOTAL_QUESTIONS).fill(0));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>("");

  useEffect(() => {
    const sessionStarted = sessionStorage.getItem("interviewSessionStarted");
    if (sessionStarted !== "true") {
      router.replace("/interview/instructions");
      return;
    }

    const savedDraft = sessionStorage.getItem("interviewDraft");
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        if (Array.isArray(parsed) && parsed.length === TOTAL_QUESTIONS) {
          setAnswers(parsed);
        }
      } catch {
        // ignore invalid draft data
      }
    }

    setAccessChecked(true);
  }, [router]);

  const currentQuestion = interviewQuestions[currentIndex];
  const currentState = questionStates[currentIndex];
  const isLocked = currentState !== "pending";

  const charCount = answers[currentIndex].length;
  const wordCount = answers[currentIndex].trim().split(/\s+/).filter(Boolean).length;
  const completedQuestions = useMemo(
    () => questionStates.filter((state) => state !== "pending").length,
    [questionStates]
  );
  const progress = useMemo(
    () => Math.round((completedQuestions / TOTAL_QUESTIONS) * 100),
    [completedQuestions]
  );
  const averageScore = useMemo(() => {
    const scored = scores.filter((value) => value > 0);
    if (scored.length === 0) return 0;
    return Math.round(scored.reduce((sum, value) => sum + value, 0) / scored.length);
  }, [scores]);

  const firstPendingIndex = questionStates.findIndex((state) => state === "pending");
  const maxAccessibleIndex = firstPendingIndex === -1 ? TOTAL_QUESTIONS - 1 : firstPendingIndex;
  const currentAttemptsLeft = currentState === "pending" ? attempts[currentIndex] : 0;
  const isComplete = questionStates.every((state) => state !== "pending");

  const questionStatus: QuestionStatusSummary[] = interviewQuestions.map((_, index) => ({
    attemptsLeft: attempts[index],
    score: scores[index],
    state: questionStates[index],
  }));

  const saveDraft = (draftAnswers: string[]) => {
    sessionStorage.setItem("interviewDraft", JSON.stringify(draftAnswers));
  };

  const handleNavigate = (index: number) => {
    if (index > maxAccessibleIndex) {
      setToastMessage("Complete the current question before moving ahead.");
      return;
    }
    setCurrentIndex(index);
    setToastMessage("");
  };

  const handleAnswerChange = (value: string) => {
    if (isLocked) return;

    setAnswers((previous) => {
      const next = [...previous];
      next[currentIndex] = value;
      saveDraft(next);
      return next;
    });
  };

  const finalizeReport = (updatedStates: QuestionState[], updatedScores: number[]) => {
    const completed = updatedStates.filter((state) => state !== "pending").length;
    const scored = updatedScores.filter((value) => value > 0);
    const average = scored.length === 0 ? 0 : Math.round(scored.reduce((sum, value) => sum + value, 0) / scored.length);
    const report: InterviewReportData = {
      completedQuestions: completed,
      totalQuestions: TOTAL_QUESTIONS,
      averageScore: average,
      topScore: Math.max(0, ...updatedScores),
      attemptsUsed: scored.length,
      answers,
      scores: updatedScores,
      states: updatedStates,
    };

    sessionStorage.setItem("interviewReport", JSON.stringify(report));
    sessionStorage.removeItem("interviewSessionStarted");
    router.push("/interview/report");
  };

  const handleSubmit = () => {
    if (isSubmitting || isLocked) return;

    const answer = answers[currentIndex].trim();
    if (!answer) {
      setToastMessage("Please enter your response before submitting.");
      return;
    }

    setIsSubmitting(true);

    const score = getMockScore(answer, currentQuestion.difficulty);

    const updatedStates = [...questionStates];
    updatedStates[currentIndex] = "submitted";
    const updatedScores = [...scores];
    updatedScores[currentIndex] = score;
    const updatedAttempts = [...attempts];
    updatedAttempts[currentIndex] = 0;

    setTimeout(() => {
      setIsSubmitting(false);
      setQuestionStates(updatedStates);
      setScores(updatedScores);
      setAttempts(updatedAttempts);

      if (currentIndex < TOTAL_QUESTIONS - 1) {
        setCurrentIndex(currentIndex + 1);
        setToastMessage("Answer submitted. Proceeding to the next question.");
      } else {
        setToastMessage("Final question submitted. Preparing your interview report.");
        finalizeReport(updatedStates, updatedScores);
      }
    }, 350);
  };

  const handleSaveDraft = () => {
    if (isLocked) return;
    saveDraft(answers);
    setToastMessage("Draft saved securely for this question.");
  };

  const handleSkip = () => {
    if (isLocked) return;

    const updatedStates = [...questionStates];
    updatedStates[currentIndex] = "skipped";
    setQuestionStates(updatedStates);

    if (currentIndex < TOTAL_QUESTIONS - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    setToastMessage("Question skipped. You can review it later from the sidebar.");

    if (currentIndex === TOTAL_QUESTIONS - 1 && updatedStates.every((state) => state !== "pending")) {
      finalizeReport(updatedStates, scores);
    }
  };

  if (!accessChecked) {
    return null;
  }

  return (
    <main className="min-h-screen bg-slate-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">AI Interview Session</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Practice with an enterprise-ready interview workflow.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
              Move through 10 mock interview questions with AI-driven feedback, follow-up prompts, and enterprise-grade status tracking.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-200">
            <ShieldCheck size={18} /> SaaS-grade mock interview
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.85fr_1.15fr]">
          <section className="space-y-6">
            <InterviewQuestionHeader
              question={currentQuestion}
              currentStep={currentIndex + 1}
              totalSteps={TOTAL_QUESTIONS}
              progress={progress}
              attemptsLeft={currentAttemptsLeft}
              score={scores[currentIndex]}
            />

            <InterviewAnswerEditor
              answer={answers[currentIndex]}
              onAnswerChange={handleAnswerChange}
              charCount={charCount}
              wordCount={wordCount}
              attemptsLeft={currentAttemptsLeft}
              onSubmit={handleSubmit}
              onSaveDraft={handleSaveDraft}
              onSkip={handleSkip}
              isSubmitting={isSubmitting}
              isLocked={isLocked}
            />

            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <InterviewFeedbackPanel
                feedback={currentQuestion.feedback}
                questionIndex={currentIndex}
                submitted={currentState === "submitted"}
              />
              <InterviewFollowUpPanel followUps={currentQuestion.followUps} />
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Session navigation</p>
                  <h2 className="mt-2 text-xl font-semibold text-slate-900">Mock question flow</h2>
                </div>
                <button
                  type="button"
                  onClick={() => handleNavigate(Math.max(0, currentIndex - 1))}
                  disabled={currentIndex === 0}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ArrowLeft size={16} /> Previous question
                </button>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Active question</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">{currentQuestion.title}</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Session status</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">
                    {isComplete ? "Session is complete" : currentState === "skipped" ? "This question was skipped" : currentState === "submitted" ? "Answer locked" : "Review the AI feedback and continue"}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <InterviewSidebar
              questions={interviewQuestions}
              currentIndex={currentIndex}
              progress={progress}
              currentAttemptsLeft={currentAttemptsLeft}
              questionStatus={questionStatus}
              maxAccessibleIndex={maxAccessibleIndex}
              onNavigate={handleNavigate}
            />
            <InterviewStatsPanel
              completedQuestions={completedQuestions}
              averageScore={averageScore}
              topScore={Math.max(...scores)}
              attemptsUsed={scores.filter((value) => value > 0).length}
              totalQuestions={TOTAL_QUESTIONS}
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="rounded-[2rem] border border-slate-200 bg-slate-900 p-6 shadow-sm text-white"
            >
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Interview coaching</p>
              <h3 className="mt-3 text-xl font-semibold text-white">Stay on pace with a confident delivery</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                This mock session is designed for modern interview preparation. Use the editor, progress tracking, and AI feedback to refine your narrative and technical depth.
              </p>
            </motion.div>
          </aside>
        </div>

        {toastMessage ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-8 rounded-[1.75rem] border border-slate-200 bg-white px-6 py-4 text-sm text-slate-700 shadow-sm"
          >
            {toastMessage}
          </motion.div>
        ) : null}
      </div>
    </main>
  );
}
