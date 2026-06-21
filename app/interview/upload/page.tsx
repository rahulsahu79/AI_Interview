import React from "react";
import ResumeUploader from "../../../components/ResumeUploader";
import ResumeTips from "../../../components/ResumeTips";
import SecurityInfo from "../../../components/SecurityInfo";

export const metadata = {
  title: "Upload Resume — InterviewAI",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">Upload Resume</h1>
          <p className="mt-1 text-sm text-slate-600">Prepare a resume for AI-powered mock interviews and analysis.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <ResumeUploader />
          </div>

          <div className="space-y-6">
            <ResumeTips />
            <SecurityInfo />
          </div>
        </div>
      </div>
    </main>
  );
}
