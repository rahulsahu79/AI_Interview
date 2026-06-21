"use client";

import { motion } from "framer-motion";
import { CheckCircle, AlertCircle, Lightbulb } from "lucide-react";

export default function InterviewExperienceSection() {
  const benefits = [
    {
      icon: CheckCircle,
      title: "Personalized Questions",
      description: "Questions tailored to your specific skills and experience",
    },
    {
      icon: AlertCircle,
      title: "Real-Time Evaluation",
      description: "Get instant feedback on your response quality and clarity",
    },
    {
      icon: Lightbulb,
      title: "Deep Technical Assessment",
      description: "Comprehensive evaluation of your technical knowledge",
    },
    {
      icon: CheckCircle,
      title: "Interview Readiness Score",
      description: "Know your exact readiness level for your target role",
    },
  ];

  return (
    <section className="relative py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-20 text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0F172A] mb-4">
            Interview Experience
          </h2>
          <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
            Get a realistic and immersive interview preparation experience
          </p>
        </motion.div>

        {/* Split Screen Layout */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left - Mock Interview UI */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="rounded-2xl border border-[#E2E8F0] bg-gradient-to-br from-white to-[#F8FAFC] p-6 shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="border-b border-[#E2E8F0] pb-4 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[#0F172A]">
                    Interview Session
                  </h3>
                  <span className="text-xs font-medium text-white bg-[#10B981] px-3 py-1 rounded-full">
                    Active
                  </span>
                </div>
              </div>

              {/* Question */}
              <div className="mb-6">
                <p className="text-xs font-semibold text-[#64748B] mb-2">
                  QUESTION 3 OF 10
                </p>
                <p className="text-lg font-semibold text-[#0F172A]">
                  Explain the architecture of your FastAPI project.
                </p>
              </div>

              {/* Answer Box */}
              <div className="mb-6">
                <label className="text-sm font-semibold text-[#0F172A] block mb-2">
                  Your Answer
                </label>
                <motion.textarea
                  whileFocus={{ scale: 1.01 }}
                  placeholder="Share your detailed response here..."
                  className="w-full h-32 rounded-lg border border-[#E2E8F0] bg-white p-4 text-[#0F172A] placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent resize-none"
                />
              </div>

              {/* Progress and Actions */}
              <div className="space-y-4">
                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-[#64748B]">Progress</span>
                    <span className="font-semibold text-[#0F172A]">40%</span>
                  </div>
                  <div className="h-2 rounded-full bg-[#E2E8F0] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "40%" }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, duration: 1 }}
                      className="h-full bg-gradient-to-r from-[#2563EB] to-[#1d4ed8]"
                    />
                  </div>
                </div>

                {/* Attempts */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#64748B]">Attempts Remaining</span>
                  <span className="font-semibold text-[#0F172A] bg-[#F8FAFC] px-3 py-1 rounded-lg">
                    5
                  </span>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 rounded-lg bg-[#2563EB] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1d4ed8] transition-colors"
                  >
                    Submit Answer
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 rounded-lg border border-[#E2E8F0] px-4 py-2 text-sm font-semibold text-[#2563EB] hover:bg-[#F8FAFC] transition-colors"
                  >
                    Skip
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Benefits List */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.6 }}
                  whileHover={{ x: 8 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2563EB] bg-opacity-10">
                      <Icon className="h-5 w-5 text-[#2563EB]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0F172A] mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-[#64748B]">{benefit.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
