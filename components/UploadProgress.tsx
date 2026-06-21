"use client";

import React from "react";

export interface UploadProgressProps {
  progress: number; // 0-100
  fileName?: string;
  fileSize?: number;
}

export default function UploadProgress({ progress, fileName, fileSize }: UploadProgressProps) {
  const sizeLabel = fileSize ? `${(fileSize / 1024).toFixed(1)} KB` : undefined;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="min-w-0">
          <div className="text-sm font-medium text-slate-700 truncate">{fileName || "Uploading..."}</div>
          {sizeLabel && <div className="text-xs text-slate-500">{sizeLabel}</div>}
        </div>
        <div className="ml-4 text-sm font-medium text-slate-700">{Math.round(progress)}%</div>
      </div>

      <div className="mt-3 h-2 w-full rounded-full bg-slate-100">
        <div className="h-2 rounded-full bg-blue-600 transition-all" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
