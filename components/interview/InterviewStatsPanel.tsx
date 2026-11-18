"use client";

import { motion } from "framer-motion";
import { BarChart3, ChartPie, TrendingUp, Zap } from "lucide-react";

interface InterviewStatsPanelProps {
  completedQuestions: number;
  averageScore: number;
  topScore: number;
  attemptsUsed: number;
  totalQuestions: number;
}

export default function InterviewStatsPanel({
  completedQuestions,
  averageScore,
  topScore,
  attemptsUsed,
  totalQuestions,
}: InterviewStatsPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.1 }}
      className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900">Interview statistics</h3>
          <p className="mt-2 text-sm text-slate-500">Performance insights for your current session.</p>
        </div>
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-50 text-slate-700">
          <ChartPie size={20} />
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl bg-slate-50 p-4">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Completed</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{completedQuestions}/{totalQuestions}</p>
        </div>
        <div className="rounded-3xl bg-slate-50 p-4">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Average score</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{averageScore}%</p>
        </div>
        <div className="rounded-3xl bg-slate-50 p-4">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Top score</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{topScore}%</p>
        </div>
        <div className="rounded-3xl bg-slate-50 p-4">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Attempts used</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{attemptsUsed}</p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="rounded-3xl bg-slate-50 p-4">
          <div className="flex items-center justify-between text-sm text-slate-500">
            <span>Session efficiency</span>
            <span>{Math.min(100, completedQuestions * 10)}%</span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full rounded-full bg-gradient-to-r from-sky-600 to-indigo-600" style={{ width: `${Math.min(100, completedQuestions * 10)}%` }} />
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <Zap size={16} />
            <span>Enterprise-grade insights keep your response quality aligned to hiring standards.</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
