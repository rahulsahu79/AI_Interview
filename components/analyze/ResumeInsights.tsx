"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp } from "lucide-react";

interface ResumeInsightsProps {
  strengths: string[];
  improvements: string[];
}

export default function ResumeInsights({ strengths, improvements }: ResumeInsightsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.24 }}
      className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Resume Insights</p>
          <h3 className="mt-3 text-xl font-semibold text-slate-900">Strengths and areas to amplify</h3>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-2 text-sm text-slate-600">
          <BarChart3 size={16} />
          AI insight summary
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl bg-slate-50 p-6">
          <div className="mb-4 flex items-center gap-2 text-slate-900 font-semibold">
            <TrendingUp size={18} />
            Strengths
          </div>
          <ul className="space-y-3 text-sm text-slate-600">
            {strengths.map((item) => (
              <li key={item} className="rounded-2xl bg-white p-4 shadow-sm">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl bg-slate-50 p-6">
          <div className="mb-4 flex items-center gap-2 text-slate-900 font-semibold">
            <TrendingUp size={18} />
            Areas for Improvement
          </div>
          <ul className="space-y-3 text-sm text-slate-600">
            {improvements.map((item) => (
              <li key={item} className="rounded-2xl bg-white p-4 shadow-sm">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
