"use client";

import React, { useCallback, useRef, useState } from "react";
import { Upload } from "lucide-react";

export interface UploadDropzoneProps {
  onFileSelected: (file: File) => void;
  accept?: string;
}

export default function UploadDropzone({
  onFileSelected,
  accept = ".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
}: UploadDropzoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const openFilePicker = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    onFileSelected(files[0]);
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFiles(e.dataTransfer.files);
  }, []);

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={onDrop}
        onClick={openFilePicker}
        role="button"
        tabIndex={0}
        className={`w-full rounded-xl border-2 border-dashed p-10 text-center transition-shadow focus:outline-none cursor-pointer ${
          isDragOver ? "border-blue-400 shadow-lg" : "border-slate-200"
        } bg-white`}
      >
        <div className="mx-auto max-w-xs">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <Upload size={20} />
          </div>
          <h3 className="text-lg font-semibold">Drag & drop your resume</h3>
          <p className="mt-2 text-sm text-slate-500">PDF or DOCX, up to 10MB</p>
          <div className="mt-4">
            <button type="button" className="text-sm font-medium text-blue-600 underline">
              Browse files
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
