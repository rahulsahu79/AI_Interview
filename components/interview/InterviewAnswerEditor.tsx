"use client";

import { motion } from "framer-motion";
import { AlignLeft, MessageSquare, Repeat, Sparkles } from "lucide-react";

interface InterviewAnswerEditorProps {
  answer: string;
  onAnswerChange: (value: string) => void;
  charCount: number;
  wordCount: number;
  attemptsLeft: number;
  onSubmit: () => void;
  onSaveDraft: () => void;
  onSkip: () => void;
  isSubmitting: boolean;
  isLocked: boolean;
}

export default function InterviewAnswerEditor({
  answer,
  onAnswerChange,
  charCount,
  wordCount,
  attemptsLeft,
  onSubmit,
  onSaveDraft,
  onSkip,
  isSubmitting,
  isLocked,
}: InterviewAnswerEditorProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Answer editor</p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900">Compose your response</h3>
        </div>
        <div className="inline-flex items-center gap-3 rounded-full bg-slate-50 px-4 py-2 text-sm text-slate-700">
          <Repeat size={16} />
          {attemptsLeft} attempts remaining
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-4">
        <label htmlFor="answer-editor" className="sr-only">
          Interview answer text area
        </label>
        <textarea
          id="answer-editor"
          value={answer}
          onChange={(event) => onAnswerChange(event.target.value)}
          rows={12}
          disabled={isLocked}
          className="w-full resize-none rounded-3xl border border-slate-200 bg-white p-5 text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-500"
          placeholder="Write your detailed interview response here. Focus on structure, clarity, and leadership impact."
        />
      </div>

      {isLocked ? (
        <div className="mt-4 rounded-3xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
          This question has been finalized and is now locked for review.
        </div>
      ) : null}

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center gap-2 text-slate-500">
            <AlignLeft size={16} />
            <span className="text-sm font-semibold">Characters</span>
          </div>
          <p className="mt-2 text-lg font-semibold text-slate-900">{charCount}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center gap-2 text-slate-500">
            <MessageSquare size={16} />
            <span className="text-sm font-semibold">Words</span>
          </div>
          <p className="mt-2 text-lg font-semibold text-slate-900">{wordCount}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center gap-2 text-slate-500">
            <Sparkles size={16} />
            <span className="text-sm font-semibold">Recommendation</span>
          </div>
          <p className="mt-2 text-lg font-semibold text-slate-900">Keep answers concise and structured</p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting || isLocked}
          className="inline-flex min-w-[160px] items-center justify-center rounded-3xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-200 transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Submit Answer
        </button>
        <button
          type="button"
          onClick={onSaveDraft}
          disabled={isLocked}
          className="inline-flex min-w-[160px] items-center justify-center rounded-3xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
        >
          Save Draft
        </button>
        <button
          type="button"
          onClick={onSkip}
          disabled={isLocked}
          className="inline-flex min-w-[160px] items-center justify-center rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Skip Question
        </button>
      </div>
    </motion.section>
  );
}
