"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

interface EducationSectionProps {
  education: string[];
}

export default function EducationSection({ education }: EducationSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.16 }}
      className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"
    >
      <div className="flex items-center gap-3 text-slate-900">
        <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-50 text-slate-700">
          <GraduationCap size={22} />
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Education</p>
          <h3 className="mt-2 text-xl font-semibold">Academic Foundation</h3>
        </div>
      </div>
      <div className="mt-6 space-y-4">
        {education.map((degree, idx) => (
          <div key={degree} className="flex items-start gap-4">
            <div className="mt-1 h-3 w-3 rounded-full bg-slate-400" />
            <div>
              <p className="text-base font-semibold text-slate-900">{degree}</p>
              <p className="text-sm text-slate-500">Relevant coursework, projects, and AI research focus.</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
