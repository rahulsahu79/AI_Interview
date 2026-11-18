import React from "react";
import { CheckCircle } from "lucide-react";

export default function SecurityInfo() {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
          <CheckCircle size={18} />
        </div>
        <div>
          <h4 className="text-lg font-semibold">Security & Privacy</h4>
          <p className="text-sm text-slate-500">Your resume is private and processed securely.</p>
        </div>
      </div>

      <ul className="mt-4 space-y-3 text-sm text-slate-600">
        <li>Files are encrypted in transit.</li>
        <li>We never share your resume without permission.</li>
        <li>Uploaded files are removed after analysis.</li>
      </ul>
    </div>
  );
}
