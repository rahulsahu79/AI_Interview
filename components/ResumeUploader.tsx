"use client";

import React, { useCallback, useMemo, useState } from "react";
import UploadDropzone from "./UploadDropzone";
import UploadProgress from "./UploadProgress";
import { motion } from "framer-motion";
import { FileText, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export type UploaderState = "empty" | "uploading" | "uploaded";

interface UploadedMeta {
  name: string;
  size: number;
}

export default function ResumeUploader() {
  const [state, setState] = useState<UploaderState>("empty");
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState<UploadedMeta | null>(null);
  const router = useRouter();

  const onFileSelected = useCallback((f: File) => {
    const meta: UploadedMeta = { name: f.name, size: f.size };
    setFile(meta);
    setState("uploading");
    setProgress(0);

    // Mock upload
    const total = 1200; // ms per step
    let uploaded = 0;
    const interval = setInterval(() => {
      uploaded += Math.random() * 15 + 5;
      const pct = Math.min(100, uploaded);
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(interval);
        setState("uploaded");
        setProgress(100);
      }
    }, 150);
  }, []);

  const onAnalyze = useCallback(() => {
    router.push("/interview/analyze");
  }, [router]);

  const fileDisplay = useMemo(() => {
    if (!file) return null;
    return `${file.name} • ${(file.size / 1024).toFixed(1)} KB`;
  }, [file]);

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-2xl border border-slate-100 bg-gradient-to-b from-white to-slate-50 p-6 shadow"
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <FileText size={18} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Upload your resume</h3>
              <p className="text-sm text-slate-500">Get tailored feedback and mock interviews.</p>
            </div>
          </div>
        </div>

        <div>
          {state === "empty" && (
            <UploadDropzone onFileSelected={onFileSelected} />
          )}

          {state === "uploading" && (
            <div className="space-y-4">
              <UploadProgress progress={progress} fileName={file?.name} fileSize={file?.size} />
            </div>
          )}

          {state === "uploaded" && (
            <motion.div initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
              <div className="flex items-center gap-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green-50 text-green-600">
                  <CheckCircle size={20} />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-800">{fileDisplay}</div>
                  <div className="text-xs text-slate-500">Uploaded successfully</div>
                </div>
                <div>
                  <button onClick={() => { setState("empty"); setFile(null); setProgress(0); }} className="text-sm text-slate-500 underline">Replace</button>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end">
                <button onClick={onAnalyze} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold shadow hover:bg-blue-700">
                  Analyze Resume
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
