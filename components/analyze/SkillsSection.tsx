"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface SkillsSectionProps {
  skills: string[];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.12 }}
      className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Skills Identified</p>
          <h3 className="mt-3 text-xl font-semibold text-slate-900">Skill set highlighted from your resume</h3>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-2 text-sm text-slate-600">
          <Sparkles size={16} />
          {skills.length} skills
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {skills.map((skill) => (
          <motion.div
            key={skill}
            whileHover={{ y: -4 }}
            className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition"
          >
            {skill}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
