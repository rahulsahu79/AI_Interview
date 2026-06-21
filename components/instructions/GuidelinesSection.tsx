"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const guidelines = [
  "Answer in complete sentences",
  "Explain your thought process clearly",
  "Use project examples whenever possible",
  "Technical depth improves your score",
  "You have a maximum of 5 attempts per question",
  "The AI may ask follow-up questions",
  "Stay focused on the topic being discussed",
  "Detailed answers receive higher evaluations",
];

export default function GuidelinesSection() {
  return (
    <section className="mt-10">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Important Guidelines</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">Important Guidelines</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {guidelines.map((item) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4 }}
              className="flex items-start gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-5"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-600">
                <CheckCircle2 size={20} />
              </div>
              <p className="text-sm leading-7 text-slate-700">{item}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
