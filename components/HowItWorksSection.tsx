"use client";

import { motion } from "framer-motion";
import { Upload, Zap, Play, CheckCircle } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Upload Resume",
    description: "Share your resume and career details",
    icon: Upload,
  },
  {
    number: 2,
    title: "AI Analyzes Profile",
    description: "Our AI understands your skills and experience",
    icon: Zap,
  },
  {
    number: 3,
    title: "Attend Interview",
    description: "Answer personalized AI-generated questions",
    icon: Play,
  },
  {
    number: 4,
    title: "Receive Score & Feedback",
    description: "Get detailed performance analysis and insights",
    icon: CheckCircle,
  },
];

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative py-16 sm:py-24 bg-[#F8FAFC]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-20 text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0F172A] mb-4">
            How It Works
          </h2>
          <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
            Four simple steps to start your interview preparation journey
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="relative"
              >
                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{
                      delay: index * 0.1 + 0.3,
                      duration: 0.6,
                    }}
                    className="absolute top-12 left-[52%] right-[-100%] h-1 bg-gradient-to-r from-[#2563EB] to-transparent hidden md:block origin-left"
                  />
                )}

                {/* Step Card */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="rounded-xl border border-[#E2E8F0] bg-white p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all relative z-10 h-full"
                >
                  {/* Number Badge */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#2563EB] text-lg font-bold text-white mb-4"
                  >
                    {step.number}
                  </motion.div>

                  {/* Icon */}
                  <div className="mb-4">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-lg bg-[#2563EB] bg-opacity-10">
                      <Icon className="h-7 w-7 text-[#2563EB]" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-[#0F172A] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[#64748B]">{step.description}</p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
