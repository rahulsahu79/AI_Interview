"use client";

import { motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section className="relative overflow-hidden bg-white pt-32 pb-20 sm:pt-40 sm:pb-24 lg:pt-48 lg:pb-32">
      {/* Background accent */}
      <div className="absolute top-0 right-0 -z-10 h-96 w-96 rounded-full bg-blue-50 blur-3xl opacity-40"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2 text-sm font-medium text-[#2563EB]">
              <div className="h-2 w-2 rounded-full bg-[#10B981]"></div>
              AI-Powered Mock Interviews
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="mb-6 text-5xl font-bold tracking-tight text-[#0F172A] sm:text-6xl md:text-7xl"
          >
            Turn Your Resume Into a{" "}
            <span className="bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] bg-clip-text text-transparent">
              Personalized AI Interview
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="mb-12 text-lg text-[#64748B] sm:text-xl max-w-3xl mx-auto"
          >
            Upload your resume and experience realistic AI interviews tailored to your skills, projects, and career goals.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/interview/upload')}
                className="group flex items-center gap-2 rounded-lg bg-[#2563EB] px-8 py-4 text-lg font-semibold text-white shadow-lg hover:shadow-2xl hover:bg-[#1d4ed8] transition-all"
            >
              Start Free Interview
              <ArrowRight className="transition-transform group-hover:translate-x-1" size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-lg border border-[#E2E8F0] bg-white px-8 py-4 text-lg font-semibold text-[#2563EB] hover:bg-[#F8FAFC] transition-colors"
            >
              <PlayCircle size={20} />
              Watch Demo
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Hero Visual - Dashboard Preview */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-16 sm:mt-20"
        >
          <div className="relative rounded-2xl border border-[#E2E8F0] bg-gradient-to-br from-[#F8FAFC] to-[#FFFFFF] p-2 shadow-2xl overflow-hidden sm:p-4">
            {/* Glassmorphism effect */}
            <div className="absolute inset-0 bg-white/40 backdrop-blur-xl rounded-2xl"></div>

            <div className="relative rounded-xl bg-white border border-[#E2E8F0] overflow-hidden">
              {/* Mock Dashboard Content */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
                {/* Resume Upload Section */}
                <motion.div
                  whileHover={{ y: -4 }}
                  className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-6 cursor-pointer hover:shadow-md transition-all"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#2563EB] bg-opacity-10 mb-4">
                    <svg className="h-6 w-6 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-[#0F172A] mb-2">Upload Resume</h3>
                  <p className="text-sm text-[#64748B]">Drag & drop your resume</p>
                </motion.div>

                {/* AI Analysis Section */}
                <motion.div
                  whileHover={{ y: -4 }}
                  className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-6 cursor-pointer hover:shadow-md transition-all"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#2563EB] bg-opacity-10 mb-4">
                    <svg className="h-6 w-6 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-[#0F172A] mb-2">AI Analyzes Profile</h3>
                  <p className="text-sm text-[#64748B]">Smart parsing & insights</p>
                </motion.div>

                {/* Interview Session */}
                <motion.div
                  whileHover={{ y: -4 }}
                  className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-6 cursor-pointer hover:shadow-md transition-all"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#2563EB] bg-opacity-10 mb-4">
                    <svg className="h-6 w-6 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-[#0F172A] mb-2">Attend Interview</h3>
                  <p className="text-sm text-[#64748B]">Interactive AI questions</p>
                </motion.div>
              </div>

              {/* Mock Interview Card */}
              <div className="border-t border-[#E2E8F0] p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-[#0F172A]">Current Question</h4>
                    <span className="inline-flex items-center rounded-full bg-[#10B981] bg-opacity-10 px-3 py-1 text-xs font-medium text-[#10B981]">
                      Progress: 40%
                    </span>
                  </div>
                  <p className="text-[#64748B]">
                    "Explain the architecture of your FastAPI project."
                  </p>
                  <div className="mt-4 h-20 rounded-lg border border-dashed border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-center">
                    <span className="text-sm text-[#64748B]">Your answer here...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
