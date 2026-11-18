import React from "react";
import { Lightbulb } from "lucide-react";

export default function ResumeTips() {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-50 text-yellow-600">
          <Lightbulb size={18} />
        </div>
        <div>
          <h4 className="text-lg font-semibold">Resume Tips</h4>
          <p className="text-sm text-slate-500">Short, relevant, and results-oriented.</p>
        </div>
      </div>

      <ul className="mt-4 space-y-3 text-sm text-slate-600">
        <li>Highlight measurable accomplishments (metrics where possible).</li>
        <li>Keep role descriptions concise and focused on impact.</li>
        <li>Include technologies and projects relevant to the role.</li>
      </ul>
    </div>
  );
}
