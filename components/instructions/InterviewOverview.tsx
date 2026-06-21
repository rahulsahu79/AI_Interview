"use client";

import { motion } from "framer-motion";

interface InterviewOverviewProps {
  stats: { label: string; value: string }[];
}

export default function InterviewOverview({ stats }: InterviewOverviewProps) {
  return (
    <section className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          whileHover={{ y: -6 }}
          transition={{ duration: 0.4 }}
          className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
            {item.label}
          </p>
          <p className="mt-4 text-3xl font-semibold text-slate-900">{item.value}</p>
        </motion.div>
      ))}
    </section>
  );
}
