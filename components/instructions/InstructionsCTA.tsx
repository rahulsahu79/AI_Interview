"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function InstructionsCTA({ ready }: { ready: boolean }) {
  const router = useRouter();

  return (
    <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Ready to Begin?</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">Begin your AI interview with confidence.</h2>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <motion.button
            whileHover={{ scale: ready ? 1.02 : 1 }}
            whileTap={{ scale: ready ? 0.98 : 1 }}
            disabled={!ready}
            onClick={() => {
              sessionStorage.setItem("interviewSessionStarted", "true");
              sessionStorage.removeItem("interviewReport");
              sessionStorage.removeItem("interviewDraft");
              router.push("/interview/session");
            }}
            className={`rounded-full px-6 py-4 text-sm font-semibold text-white shadow-lg transition disabled:cursor-not-allowed disabled:bg-slate-300 ${
              ready ? "bg-slate-900 hover:bg-slate-800" : "bg-slate-300"
            }`}
          >
            Begin Interview
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push("/interview/analyze")}
            className="rounded-full border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
          >
            Back to Resume Analysis
          </motion.button>
        </div>
      </div>
    </section>
  );
}
