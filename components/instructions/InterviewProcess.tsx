"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, Zap, Send, CheckCircle2, ClipboardCheck } from "lucide-react";

const steps = [
  { label: "AI Asks a Question", icon: Zap },
  { label: "Candidate Submits Answer", icon: Send },
  { label: "AI Evaluates Response", icon: ClipboardCheck },
  { label: "AI Generates Follow-Up Questions", icon: ArrowDownRight },
  { label: "Final Score & Feedback Report", icon: CheckCircle2 },
];

export default function InterviewProcess() {
  return (
    <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.28em] text-slate-500">How the AI Interview Works</p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-900">How the AI Interview Works</h2>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-900 text-white">
                  <Icon size={20} />
                </div>
                <p className="text-lg font-semibold text-slate-900">{step.label}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
