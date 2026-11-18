"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, ClipboardList, Sparkles, Trophy } from "lucide-react";
import { useRouter } from "next/navigation";

type InterviewReportData = {
  completedQuestions: number;
  totalQuestions: number;
  averageScore: number;
  topScore: number;
  attemptsUsed: number;
  answers: string[];
  scores: number[];
  states: Array<"pending" | "submitted" | "skipped">;
};

export default function InterviewReportPage() {
  const router = useRouter();
  const [report, setReport] = useState<InterviewReportData | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("interviewReport");
    if (!stored) {
      router.replace("/interview/instructions");
      return;
    }

    try {
      const parsed = JSON.parse(stored) as InterviewReportData;
      setReport(parsed);
    } catch {
      router.replace("/interview/instructions");
    }
  }, [router]);

  if (!report) {
    return null;
  }

  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Interview report</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                Your interview assessment is complete.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
                Review your locked answers, overall performance, and actionable next steps for a hiring-ready interview presentation.
              </p>
            </div>
            <button
              type="button"
              onClick={() => router.push("/interview/instructions")}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              <ArrowLeft size={18} /> Back to instructions
            </button>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
              <div className="flex items-center gap-3 text-slate-700">
                <CheckCircle2 size={20} />
                <span className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Session summary</span>
              </div>
              <div className="mt-6 space-y-4">
                <div className="rounded-3xl bg-white p-4">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Completed</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900">{report.completedQuestions}/{report.totalQuestions}</p>
                </div>
                <div className="rounded-3xl bg-white p-4">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Average score</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900">{report.averageScore}%</p>
                </div>
                <div className="rounded-3xl bg-white p-4">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Highest score</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900">{report.topScore}%</p>
                </div>
                <div className="rounded-3xl bg-white p-4">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Attempts recorded</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900">{report.attemptsUsed}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-900 p-6 text-white">
              <div className="flex items-center gap-3 text-white">
                <Trophy size={20} />
                <span className="text-sm font-semibold uppercase tracking-[0.24em]">Next steps</span>
              </div>
              <div className="mt-6 space-y-4 text-sm leading-7 text-slate-200">
                <div>
                  <p className="font-semibold text-white">Refine your delivery</p>
                  <p>Review each locked answer and ensure your examples follow the STAR format.</p>
                </div>
                <div>
                  <p className="font-semibold text-white">Strengthen impact statements</p>
                  <p>Use measurable outcomes and emphasize collaboration, ownership, and results.</p>
                </div>
                <div>
                  <p className="font-semibold text-white">Practice pacing</p>
                  <p>Keep responses structured, clear, and concise while reinforcing technical depth.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 space-y-6">
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Locked question review</p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-900">Responses and scores</h2>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">
                  <ClipboardList size={18} /> Review all responses
                </div>
              </div>

              <div className="mt-6 space-y-5">
                {report.answers.map((answer, index) => (
                  <div key={index} className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-5">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Question {index + 1}</p>
                        <p className="mt-1 text-lg font-semibold text-slate-900">{report.states[index] === "submitted" ? "Answered" : "Skipped"}</p>
                      </div>
                      <div className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
                        {report.states[index] === "submitted" ? `${report.scores[index]}%` : "Skipped"}
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-slate-700 whitespace-pre-line">
                      {answer || "No response recorded for this question."}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
