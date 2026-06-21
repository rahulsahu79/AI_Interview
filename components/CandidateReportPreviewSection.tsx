"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";

interface ScoreData {
  label: string;
  value: number;
  max: number;
}

const scores: ScoreData[] = [
  { label: "Technical", value: 9.0, max: 10 },
  { label: "Communication", value: 8.2, max: 10 },
  { label: "Problem Solving", value: 8.5, max: 10 },
  { label: "Confidence", value: 8.8, max: 10 },
];

function ProgressBar({ value, max }: { value: number; max: number }) {
  const percentage = (value / max) * 100;

  return (
    <div className="space-y-2">
      <div className="h-2 rounded-full bg-[#E2E8F0] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="h-full bg-gradient-to-r from-[#2563EB] to-[#1d4ed8]"
        />
      </div>
      <div className="text-right text-sm font-semibold text-[#2563EB]">
        {value.toFixed(1)}/{max}
      </div>
    </div>
  );
}

export default function CandidateReportPreviewSection() {
  return (
    <section className="relative py-16 sm:py-24 bg-[#F8FAFC]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-20 text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0F172A] mb-4">
            Performance Reports
          </h2>
          <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
            Comprehensive analysis of your interview performance with actionable insights
          </p>
        </motion.div>

        {/* Report Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-8 sm:p-12 shadow-xl">
            {/* Header */}
            <div className="mb-8 pb-8 border-b border-[#E2E8F0]">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
                    Overall Score
                  </h3>
                  <p className="text-[#64748B]">Your interview performance</p>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] shadow-lg"
                >
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white">8.6</div>
                    <div className="text-xs font-medium text-blue-100">/10</div>
                  </div>
                </motion.div>
              </div>

              <div className="flex items-center gap-3 inline-flex bg-[#10B981] bg-opacity-10 px-4 py-2 rounded-lg">
                <Award className="h-5 w-5 text-[#10B981]" />
                <span className="text-sm font-semibold text-[#10B981]">
                  Strong Performance
                </span>
              </div>
            </div>

            {/* Detailed Scores */}
            <div className="space-y-6">
              {scores.map((score, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.6 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-[#0F172A]">
                      {score.label}
                    </h4>
                  </div>
                  <ProgressBar value={score.value} max={score.max} />
                </motion.div>
              ))}
            </div>

            {/* Action Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-10 w-full rounded-lg bg-[#2563EB] px-6 py-3 text-center font-semibold text-white hover:bg-[#1d4ed8] transition-colors"
            >
              View Full Report
            </motion.button>
          </div>
        </motion.div>

        {/* Additional Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-12 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {[
            {
              title: "Interview Transcript",
              description: "Complete Q&A transcript for review",
            },
            {
              title: "Detailed Feedback",
              description: "Expert analysis of each response",
            },
            {
              title: "Improvement Plan",
              description: "Personalized recommendations",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -4 }}
              className="rounded-lg border border-[#E2E8F0] bg-white p-4 text-center shadow-sm hover:shadow-md transition-all"
            >
              <h4 className="font-semibold text-[#0F172A] mb-2">
                {feature.title}
              </h4>
              <p className="text-sm text-[#64748B]">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
