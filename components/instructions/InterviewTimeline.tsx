"use client";

import { motion } from "framer-motion";
import { CircleDot, Code2, Layers, ClipboardCheck, UserCheck } from "lucide-react";

const timeline = [
  {
    title: "Resume Discussion",
    description: "Questions based on your resume and prior experience.",
    icon: CircleDot,
  },
  {
    title: "Technical Skills Assessment",
    description: "Deep technical questions to evaluate your coding knowledge.",
    icon: Code2,
  },
  {
    title: "Project Deep Dive",
    description: "Discuss architecture, decisions, and project impact.",
    icon: Layers,
  },
  {
    title: "Problem Solving & Concepts",
    description: "Evaluate reasoning, algorithms, and system design concepts.",
    icon: ClipboardCheck,
  },
  {
    title: "Behavioral & HR Questions",
    description: "Assess communication, motivation, and team fit.",
    icon: UserCheck,
  },
];

export default function InterviewTimeline() {
  return (
    <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Interview Structure</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">Interview Structure</h2>
        </div>
      </div>

      <div className="space-y-6">
        {timeline.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="flex gap-6 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-900 text-white">
                <Icon size={20} />
              </div>
              <div>
                <p className="text-lg font-semibold text-slate-900">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
