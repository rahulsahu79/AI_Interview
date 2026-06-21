"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const recommendations = [
  "Review SQL Joins and Indexes",
  "Revise FastAPI Architecture",
  "Prepare Project Explanations",
  "Practice API Design Questions",
  "Review Database Normalization",
];

export default function AIRecommendations() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.22 }}
      className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"
    >
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Recommendations Before Interview</p>
        <h3 className="mt-3 text-xl font-semibold text-slate-900">Key preparation items from AI review</h3>
      </div>
      <div className="space-y-3">
        {recommendations.map((recommendation) => (
          <div key={recommendation} className="flex items-start gap-3 rounded-3xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-700 shadow-sm">
            <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={18} />
            </div>
            <p>{recommendation}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
