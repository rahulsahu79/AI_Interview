"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function InstructionsHero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"
    >
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Interview Ready</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Your Personalized AI Interview Is Ready
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
            Our AI has analyzed your resume and prepared a customized interview based on your skills, projects, education, and career profile.
          </p>
        </div>

        <div className="rounded-[1.75rem] border border-slate-100 bg-slate-50 p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Resume Analyzed</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">Your profile is fully reviewed</p>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-3 rounded-3xl border border-emerald-100 bg-white p-5 text-slate-700">
            <div className="flex items-center justify-between text-sm font-medium text-slate-900">
              <span>Interview questions aligned to your resume</span>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-700">Ready</span>
            </div>
            <p className="text-sm leading-6 text-slate-600">
              The AI will focus on your most relevant strengths and provide a realistic assessment experience.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
