"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function AnalysisHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-600 shadow-sm">
            <CheckCircle2 size={28} />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Analysis completed</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Resume Analysis Complete</h1>
          </div>
        </div>
        <div className="rounded-3xl bg-slate-50 px-5 py-3 text-sm font-medium text-slate-700 shadow-sm">
          Success: AI has generated your interview plan
        </div>
      </div>
      <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600">
        Our AI has analyzed your resume and prepared a personalized interview plan based on your skills, projects, and experience.
      </p>
    </motion.div>
  );
}
