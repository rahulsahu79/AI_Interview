"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Timer } from "lucide-react";
import type { InterviewQuestion } from "./interviewData";

export type QuestionState = "pending" | "submitted" | "skipped";

export type QuestionStatusSummary = {
  attemptsLeft: number;
  score: number;
  state: QuestionState;
};

interface InterviewSidebarProps {
  questions: InterviewQuestion[];
  currentIndex: number;
  progress: number;
  currentAttemptsLeft: number;
  questionStatus: QuestionStatusSummary[];
  maxAccessibleIndex: number;
  onNavigate: (index: number) => void;
}

export default function InterviewSidebar({
  questions,
  currentIndex,
  progress,
  currentAttemptsLeft,
  questionStatus,
  maxAccessibleIndex,
  onNavigate,
}: InterviewSidebarProps) {
  return (
    <aside className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Interview progress</h3>
            <p className="mt-2 text-sm text-slate-500">
              Track your session, review active questions, and navigate quickly.
            </p>
          </div>
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-50 text-slate-700">
            <CheckCircle2 size={20} />
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="rounded-3xl bg-slate-50 p-4">
            <div className="flex items-center justify-between text-sm text-slate-500">
              <span>Session completion</span>
              <span>{progress}%</span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-slate-200">
              <div className="h-full rounded-full bg-gradient-to-r from-sky-600 to-indigo-600" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Current question</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{currentIndex + 1}</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Attempts left</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{currentAttemptsLeft}</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.05 }}
        className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Question navigation</h3>
            <p className="mt-2 text-sm text-slate-500">Jump between prompts and review progress at a glance.</p>
          </div>
          <Timer size={20} className="text-slate-400" />
        </div>

        <div className="mt-6 space-y-3">
          {questions.map((question, index) => {
            const status = questionStatus[index];
            const isActive = index === currentIndex;
            const isDisabled = index > maxAccessibleIndex;
            const statusLabel =
              status.state === "submitted"
                ? "Answered"
                : status.state === "skipped"
                ? "Skipped"
                : isDisabled
                ? "Locked"
                : "Open";
            const statusClass =
              status.state === "submitted"
                ? "text-emerald-600"
                : status.state === "skipped"
                ? "text-orange-600"
                : isDisabled
                ? "text-slate-400"
                : "text-slate-500";

            return (
              <button
                key={question.id}
                type="button"
                onClick={() => {
                  if (!isDisabled) {
                    onNavigate(index);
                  }
                }}
                disabled={isDisabled}
                className={`w-full rounded-3xl border px-4 py-3 text-left transition ${
                  isActive
                    ? "border-sky-500 bg-sky-50 text-slate-900"
                    : isDisabled
                    ? "border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                }`}
                aria-disabled={isDisabled}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">Question {index + 1}</p>
                    <p className="mt-1 text-xs text-slate-500">{question.category}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold">
                    <span className={statusClass}>{statusLabel}</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>
    </aside>
  );
}
