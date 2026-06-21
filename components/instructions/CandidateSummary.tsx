"use client";

import { motion } from "framer-motion";

interface CandidateSummaryProps {
  profile: string;
  skills: string[];
  projectsDetected: number;
  focusAreas: string[];
}

export default function CandidateSummary({ profile, skills, projectsDetected, focusAreas }: CandidateSummaryProps) {
  return (
    <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Personalized Interview Summary</p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-900">Personalized Interview Summary</h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6"
        >
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Candidate Profile</p>
            <p className="mt-3 text-xl font-semibold text-slate-900">{profile}</p>
          </div>
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Skills Detected</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span key={skill} className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Projects</p>
            <p className="mt-3 rounded-3xl bg-white px-4 py-3 text-xl font-semibold text-slate-900 shadow-sm">{projectsDetected} Projects Detected</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="rounded-[1.75rem] border border-slate-200 bg-white p-6"
        >
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Interview Focus Areas</p>
          <div className="mt-6 space-y-4">
            {focusAreas.map((area) => (
              <div key={area} className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-700">
                {area}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
