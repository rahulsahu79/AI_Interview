"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function ReadinessConfirmation({ onReadyChange }: { onReadyChange: (ready: boolean) => void }) {
  const [checked, setChecked] = useState(false);

  return (
    <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-6"
      >
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Readiness Confirmation</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">Confirm you are ready to begin.</h2>
        </div>
        <label className="group flex cursor-pointer items-start gap-4 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 transition hover:border-slate-300">
          <input
            type="checkbox"
            checked={checked}
            onChange={(event) => {
              const ready = event.target.checked;
              setChecked(ready);
              onReadyChange(ready);
            }}
            className="mt-1 h-5 w-5 rounded border-slate-300 text-slate-900 focus:ring-emerald-500"
          />
          <div className="space-y-3">
            <p className="text-base font-semibold text-slate-900">I understand the interview process and I am ready to begin.</p>
            <p className="text-sm leading-6 text-slate-600">Enable the Begin Interview button to proceed when you are prepared.</p>
          </div>
        </label>
      </motion.div>
    </section>
  );
}
