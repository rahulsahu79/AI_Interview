"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";

interface ExperienceSectionProps {
  experience: string;
}

export default function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.18 }}
      className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"
    >
      <div className="flex items-center gap-3 text-slate-900">
        <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-50 text-slate-700">
          <User size={22} />
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Experience Summary</p>
          <h3 className="mt-2 text-xl font-semibold">{experience}</h3>
        </div>
      </div>
      <div className="mt-6 rounded-3xl bg-slate-50 p-6 text-slate-700 shadow-sm">
        <p className="text-sm leading-6">
          No professional experience detected. The interview will focus primarily on projects, technical skills, problem-solving ability, and communication.
        </p>
        <span className="mt-4 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
          Fresher
        </span>
      </div>
    </motion.div>
  );
}
