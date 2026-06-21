"use client";

import { motion } from "framer-motion";

const criteria = [
  { label: "Technical Knowledge", value: 40, color: "bg-slate-900" },
  { label: "Depth of Understanding", value: 30, color: "bg-slate-700" },
  { label: "Communication Skills", value: 20, color: "bg-slate-500" },
  { label: "Confidence & Clarity", value: 10, color: "bg-slate-400" },
];

export default function EvaluationCriteria() {
  return (
    <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.28em] text-slate-500">How You Will Be Evaluated</p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-900">How You Will Be Evaluated</h2>
      </div>

      <div className="space-y-6">
        {criteria.map((item) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center justify-between gap-4">
              <p className="text-base font-semibold text-slate-900">{item.label}</p>
              <p className="text-base font-semibold text-slate-900">{item.value}%</p>
            </div>
            <div className="mt-3 h-3 rounded-full bg-slate-100 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${item.value}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`${item.color} h-full rounded-full`}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
