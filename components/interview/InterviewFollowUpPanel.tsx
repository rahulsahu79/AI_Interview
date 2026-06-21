"use client";

import { motion } from "framer-motion";
import { ArrowRightCircle, Layers, Lightbulb, Sparkles } from "lucide-react";

interface InterviewFollowUpPanelProps {
  followUps: string[];
}

export default function InterviewFollowUpPanel({ followUps }: InterviewFollowUpPanelProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.1 }}
      className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Follow-up questions</p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900">Prepare for deeper discussion</h3>
        </div>
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-50 text-slate-700">
          <ArrowRightCircle size={20} />
        </div>
      </div>

      <div className="mt-6 grid gap-4">
        {followUps.map((followUp, index) => (
          <div key={followUp} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-3 text-slate-700">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-600 text-white">
                {index + 1}
              </span>
              <p className="text-sm leading-6">{followUp}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-3 rounded-3xl bg-slate-50 p-4 text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm">
          <Layers size={16} />
          <span>Anticipate follow-up depth and maintain structure in your response.</span>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white">
          <Lightbulb size={16} /> Next-level readiness
        </div>
      </div>
    </motion.section>
  );
}
