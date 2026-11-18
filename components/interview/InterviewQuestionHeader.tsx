"use client";

import { ArrowRight, Clock3, ShieldCheck, Sparkles } from "lucide-react";
import type { InterviewQuestion } from "./interviewData";

interface InterviewQuestionHeaderProps {
  question: InterviewQuestion;
  currentStep: number;
  totalSteps: number;
  progress: number;
  attemptsLeft: number;
  score: number;
}

export default function InterviewQuestionHeader({
  question,
  currentStep,
  totalSteps,
  progress,
  attemptsLeft,
  score,
}: InterviewQuestionHeaderProps) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">
            Interview Question {currentStep} of {totalSteps}
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
            {question.title}
          </h2>
        </div>
        <div className="inline-flex gap-2 text-sm text-slate-600">
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-2 font-medium text-slate-700">
            <ShieldCheck size={16} /> {question.difficulty}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-2 font-medium text-slate-700">
            <Sparkles size={16} /> {question.category}
          </span>
        </div>
      </div>

      <div className="mt-6 rounded-3xl bg-slate-50 p-5">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">Prompt</p>
        <p className="mt-3 text-base leading-7 text-slate-700">{question.prompt}</p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm text-slate-500">Progress</p>
          <p className="mt-2 text-xl font-semibold text-slate-900">{progress}%</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm text-slate-500">Attempts left</p>
          <p className="mt-2 text-xl font-semibold text-slate-900">{attemptsLeft}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm text-slate-500">Current score</p>
          <p className="mt-2 text-xl font-semibold text-slate-900">{score} / 100</p>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2 text-sm text-slate-600">
        <Clock3 size={16} />
        <span>Professional SaaS experience designed for interview confidence.</span>
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
        <ArrowRight size={16} />
        <span>Enterprise-ready UI with responsive interview workflow.</span>
      </div>
    </div>
  );
}
