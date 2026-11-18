"use client";

import { motion } from "framer-motion";
import { User, Briefcase } from "lucide-react";

interface ExperienceSectionProps {
  experience: string;
}

export default function ExperienceSection({ experience }: ExperienceSectionProps) {
  const isExperienced = experience && !experience.toLowerCase().includes("fresher");

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.18 }}
      className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"
    >
      <div className="flex items-center gap-3 text-slate-900">
        <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-50 text-slate-700">
          <Briefcase size={22} />
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Experience Summary</p>
          <h3 className="mt-2 text-xl font-semibold">{experience || "1-2 Years"}</h3>
        </div>
      </div>
      <div className="mt-6 rounded-3xl bg-slate-50 p-6 text-slate-700 shadow-sm">
        <p className="text-sm leading-6">
          {isExperienced
            ? `Demonstrated hands-on industry experience: ${experience}. The interview questions will evaluate real-world design, delivery, and implementation details.`
            : "The interview will focus primarily on projects, technical core skills, problem-solving ability, and engineering communication."}
        </p>
        <span className="mt-4 inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">
          {isExperienced ? "Internship / Professional" : "Fresher"}
        </span>
      </div>
    </motion.div>
  );
}
