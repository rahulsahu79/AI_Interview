"use client";

import { motion } from "framer-motion";
import { Bubbles, CircleDot, Sparkles, Trophy } from "lucide-react";

interface InterviewFeedbackPanelProps {
  feedback: string;
  questionIndex: number;
  submitted: boolean;
}

export default function InterviewFeedbackPanel({
  feedback,
  questionIndex,
  submitted,
}: InterviewFeedbackPanelProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.05 }}
      className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">AI feedback</p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900">Insight for question {questionIndex + 1}</h3>
        </div>
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-sky-50 text-sky-600">
          <Bubbles size={20} />
        </div>
      </div>

      <div className="mt-6 space-y-4 text-slate-700">
        <p>{feedback}</p>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { label: "Clarity", value: "High", icon: CircleDot },
            { label: "Impact", value: "Optimized", icon: Trophy },
            { label: "Structure", value: "Balanced", icon: Sparkles },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="rounded-3xl bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Icon size={16} />
                  <span>{item.label}</span>
                </div>
                <p className="mt-3 text-lg font-semibold text-slate-900">{item.value}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
        {submitted ? (
          <p>This feedback reflects the current draft and the latest submitted attempt.</p>
        ) : (
          <p>Submit an answer to get tailored AI feedback for this question.</p>
        )}
      </div>
    </motion.section>
  );
}
