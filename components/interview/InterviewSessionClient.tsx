"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import InterviewAnswerEditor from "./InterviewAnswerEditor";
import InterviewFeedbackPanel from "./InterviewFeedbackPanel";
import InterviewFollowUpPanel from "./InterviewFollowUpPanel";
import InterviewQuestionHeader from "./InterviewQuestionHeader";
import InterviewSidebar, { QuestionStatusSummary, QuestionState } from "./InterviewSidebar";
import InterviewStatsPanel from "./InterviewStatsPanel";
import type { InterviewQuestion } from "./interviewData";
import {
  fetchInterviewQuestions,
  evaluateAnswer,
  generateFinalReport,
  InterviewQuestionItem,
  EvaluationResult,
} from "../../lib/api";

const MAX_ATTEMPTS = 5;

export default function InterviewSessionClient() {
  const router = useRouter();
  const [accessChecked, setAccessChecked] = useState(false);
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [answers, setAnswers] = useState<string[]>([]);
  const [attempts, setAttempts] = useState<number[]>([]);
  const [questionStates, setQuestionStates] = useState<QuestionState[]>([]);
  const [scores, setScores] = useState<number[]>([]);
  const [feedbackList, setFeedbackList] = useState<Array<EvaluationResult | null>>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>("");

  useEffect(() => {
    const sessionStarted = sessionStorage.getItem("interviewSessionStarted");
    if (sessionStarted !== "true") {
      router.replace("/interview/instructions");
      return;
    }

    const resumeId = sessionStorage.getItem("activeResumeId") || undefined;
    let skills: string[] = [];
    const analysisRaw = sessionStorage.getItem("resumeAnalysis");
    if (analysisRaw) {
      try {
        const parsed = JSON.parse(analysisRaw);
        if (parsed.skills) skills = parsed.skills;
      } catch (e) {
        console.error(e);
      }
    }

    fetchInterviewQuestions(resumeId, skills)
      .then((data) => {
        const formatted: InterviewQuestion[] = data.map((q) => ({
          id: q.id,
          title: q.title,
          category: q.category || "Technical Core",
          difficulty: q.difficulty || "Intermediate",
          tags: [q.topic || "Engineering"],
          prompt: q.prompt,
          feedback: "Answer concisely and highlight trade-offs, architecture decisions, and code safety.",
          followUps: q.hints || [
            "How would this change under 10x traffic volume?",
            "What metrics or logs would you monitor in production?",
          ],
          idealAnswer: "A structured answer with problem context, architectural approach, and measurable outcome.",
        }));

        setQuestions(formatted);
        const count = formatted.length;
        setAnswers(Array(count).fill(""));
        setAttempts(Array(count).fill(MAX_ATTEMPTS));
        setQuestionStates(Array(count).fill("pending"));
        setScores(Array(count).fill(0));
        setFeedbackList(Array(count).fill(null));
        setLoadingQuestions(false);
        setAccessChecked(true);
      })
      .catch((err) => {
        console.error("Failed to load questions:", err);
        setLoadingQuestions(false);
        setAccessChecked(true);
      });
  }, [router]);

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentIndex] || {
    id: 1,
    title: "Loading Question...",
    category: "Technical",
    difficulty: "Intermediate" as const,
    tags: ["Backend"],
    prompt: "Initializing question...",
    feedback: "",
    followUps: [],
    idealAnswer: "",
  };

  const currentState = questionStates[currentIndex] || "pending";
  const isLocked = currentState !== "pending";

  const charCount = (answers[currentIndex] || "").length;
  const wordCount = (answers[currentIndex] || "").trim().split(/\s+/).filter(Boolean).length;
  const completedQuestions = useMemo(
    () => questionStates.filter((state) => state !== "pending").length,
    [questionStates]
  );
  const progress = useMemo(
    () => (totalQuestions > 0 ? Math.round((completedQuestions / totalQuestions) * 100) : 0),
    [completedQuestions, totalQuestions]
  );

  const averageScore = useMemo(() => {
    const scored = scores.filter((_, idx) => questionStates[idx] === "submitted");
    if (scored.length === 0) return 0;
    return Math.round(scored.reduce((sum, score) => sum + score, 0) / scored.length);
  }, [scores, questionStates]);

  const topScore = useMemo(() => {
    return scores.length ? Math.max(...scores) : 0;
  }, [scores]);

  const attemptsUsed = useMemo(() => {
    return attempts.reduce((used, rem) => used + (MAX_ATTEMPTS - rem), 0);
  }, [attempts]);

  const attemptsLeft = attempts[currentIndex] ?? MAX_ATTEMPTS;

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(""), 2800);
  };

  const handleAnswerChange = (value: string) => {
    if (isLocked) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[currentIndex] = value;
      return next;
    });
  };

  const handleSaveDraft = () => {
    sessionStorage.setItem("interviewDraft", JSON.stringify(answers));
    showToast("Draft saved locally");
  };

  const handleSubmitAnswer = async () => {
    if (isLocked || isSubmitting) return;
    const answer = (answers[currentIndex] || "").trim();

    if (!answer) {
      showToast("Please provide an answer before submitting.");
      return;
    }

    setIsSubmitting(true);
    try {
      const evalResult = await evaluateAnswer(currentQuestion.prompt, answer);

      setScores((prev) => {
        const next = [...prev];
        next[currentIndex] = evalResult.score;
        return next;
      });

      setFeedbackList((prev) => {
        const next = [...prev];
        next[currentIndex] = evalResult;
        return next;
      });

      setQuestionStates((prev) => {
        const next = [...prev];
        next[currentIndex] = "submitted";
        return next;
      });

      setAttempts((prev) => {
        const next = [...prev];
        next[currentIndex] = Math.max(0, next[currentIndex] - 1);
        return next;
      });

      showToast(`Answer evaluated! Score: ${evalResult.score}/100`);
    } catch (e: any) {
      console.error(e);
      showToast("Evaluation completed with fallback score.");
      setScores((prev) => {
        const next = [...prev];
        next[currentIndex] = 75;
        return next;
      });
      setQuestionStates((prev) => {
        const next = [...prev];
        next[currentIndex] = "submitted";
        return next;
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkipQuestion = () => {
    if (isLocked) return;
    setQuestionStates((prev) => {
      const next = [...prev];
      next[currentIndex] = "skipped";
      return next;
    });
    setScores((prev) => {
      const next = [...prev];
      next[currentIndex] = 0;
      return next;
    });
    showToast("Question skipped.");
  };

  const handleFinishInterview = async () => {
    const reportPayload = {
      completedQuestions,
      totalQuestions,
      averageScore,
      topScore,
      attemptsUsed,
      answers,
      scores,
      states: questionStates,
    };

    try {
      const fullReport = await generateFinalReport(reportPayload);
      sessionStorage.setItem("interviewReport", JSON.stringify(fullReport));
    } catch {
      sessionStorage.setItem("interviewReport", JSON.stringify(reportPayload));
    }
    sessionStorage.removeItem("interviewSessionStarted");
    router.push("/interview/report");
  };

  if (!accessChecked || loadingQuestions) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center space-y-3">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto" />
          <p className="text-sm font-medium text-slate-600">Generating live interview questions from your profile...</p>
        </div>
      </div>
    );
  }

  const currentFeedback = feedbackList[currentIndex];
  const questionStatusSummaries: QuestionStatusSummary[] = questions.map((_, idx) => ({
    attemptsLeft: attempts[idx] ?? MAX_ATTEMPTS,
    score: scores[idx] || 0,
    state: questionStates[idx] || "pending",
  }));

  return (
    <main className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {toastMessage && (
          <div className="fixed top-6 right-6 z-50 rounded-lg bg-slate-900 px-4 py-3 text-sm text-white shadow-lg">
            {toastMessage}
          </div>
        )}

        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/interview/instructions")}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              <ArrowLeft size={16} /> Exit
            </button>
            <span className="text-slate-300">|</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
              Live AI Interview Session
            </span>
          </div>

          <button
            onClick={handleFinishInterview}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
          >
            Finish & View Report
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            <InterviewQuestionHeader
              question={currentQuestion}
              currentStep={currentIndex + 1}
              totalSteps={totalQuestions}
              progress={progress}
              attemptsLeft={attemptsLeft}
              score={scores[currentIndex] || 0}
            />

            <InterviewAnswerEditor
              answer={answers[currentIndex] || ""}
              charCount={charCount}
              wordCount={wordCount}
              attemptsLeft={attemptsLeft}
              onAnswerChange={handleAnswerChange}
              onSubmit={handleSubmitAnswer}
              onSaveDraft={handleSaveDraft}
              onSkip={handleSkipQuestion}
              isSubmitting={isSubmitting}
              isLocked={isLocked}
            />

            {currentFeedback && (
              <div className="space-y-4">
                <InterviewFeedbackPanel
                  feedback={currentFeedback.feedback}
                  questionIndex={currentIndex}
                  submitted={true}
                />
                {currentFeedback.follow_up_question && (
                  <InterviewFollowUpPanel
                    followUps={[currentFeedback.follow_up_question]}
                  />
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <InterviewStatsPanel
              completedQuestions={completedQuestions}
              averageScore={averageScore}
              topScore={topScore}
              attemptsUsed={attemptsUsed}
              totalQuestions={totalQuestions}
            />

            <InterviewSidebar
              questions={questions}
              currentIndex={currentIndex}
              progress={progress}
              currentAttemptsLeft={attemptsLeft}
              questionStatus={questionStatusSummaries}
              maxAccessibleIndex={totalQuestions - 1}
              onNavigate={(idx: number) => setCurrentIndex(idx)}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
