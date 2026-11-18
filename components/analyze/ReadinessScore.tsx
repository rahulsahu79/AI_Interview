"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

interface ReadinessScoreProps {
  score: number;
  readiness: string;
}

export default function ReadinessScore({ score, readiness }: ReadinessScoreProps) {
  const percentage = Math.round((score / 10) * 100);
  const circumference = 2 * Math.PI * 48;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.08 }}
      className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Interview Readiness Score</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">{score.toFixed(1)} / 10</h2>
          <p className="mt-2 text-sm text-slate-500 max-w-xl">
            You have a strong technical foundation. Focus on SQL optimization, backend scalability, and system design concepts to improve your performance.
          </p>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative h-40 w-40">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="48"
                stroke="rgba(226,232,240,0.8)"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="60"
                cy="60"
                r="48"
                stroke="#2563EB"
                strokeWidth="12"
                strokeLinecap="round"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                transform="rotate(-90 60 60)"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-4xl font-semibold text-slate-900">{percentage}%</p>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Ready</p>
            </div>
          </div>
          <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700 shadow-sm">
            <div className="flex items-center gap-2 text-slate-900 font-semibold">
              <ShieldCheck size={18} />
              <span>{readiness}</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Confident profile scoring strong on backend and AI project experience.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
