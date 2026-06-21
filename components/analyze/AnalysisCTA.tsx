"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AnalysisCTA() {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.26 }}
      className="rounded-[2rem] border border-slate-200 bg-slate-950 p-8 shadow-sm"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Your Personalized Interview Is Ready</p>
          <h3 className="mt-3 text-3xl font-semibold text-white">Begin your AI-powered interview experience</h3>
          <p className="mt-4 text-sm leading-6 text-slate-300">
            Begin your AI-powered interview experience and receive detailed performance feedback.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => router.push("/interview/instructions")}
            className="inline-flex items-center justify-center rounded-full bg-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-600"
          >
            Start Interview
          </button>
          <button
            type="button"
            onClick={() => router.push("/interview/upload")}
            className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-950 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-800"
          >
            Back to Upload
          </button>
        </div>
      </div>
    </motion.div>
  );
}
