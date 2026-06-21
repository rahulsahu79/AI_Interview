"use client";

import { motion } from "framer-motion";
import { Clock3, CheckCircle2 } from "lucide-react";

const planSteps = [
  "Resume Discussion",
  "Python & Backend Development",
  "Project Deep Dive",
  "Database & SQL Concepts",
  "Behavioral & HR Assessment",
];

export default function InterviewPlan() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.2 }}
      className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">AI Generated Interview Plan</p>
          <h3 className="mt-3 text-xl font-semibold text-slate-900">Interview rounds tailored to your profile</h3>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-2 text-sm text-slate-600">
          <Clock3 size={16} />
          5 rounds
        </div>
      </div>
      <div className="space-y-4">
        {planSteps.map((step, index) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.35, delay: index * 0.04 }}
            className="flex items-start gap-4 rounded-3xl border border-slate-100 bg-slate-50 p-5 shadow-sm"
          >
            <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <CheckCircle2 size={18} />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900">Round {index + 1}</div>
              <p className="mt-1 text-base font-semibold text-slate-800">{step}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
