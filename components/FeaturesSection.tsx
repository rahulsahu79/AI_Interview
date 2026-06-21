"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Brain,
  MessageSquare,
  BarChart3,
  Zap,
  TrendingUp,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Resume-Based Questions",
    description:
      "AI generates targeted interview questions based on your specific resume, skills, and project experience.",
  },
  {
    icon: Brain,
    title: "Adaptive Follow-Up Questions",
    description:
      "Smart AI adjusts follow-up questions based on your responses to test deeper understanding.",
  },
  {
    icon: MessageSquare,
    title: "Technical & HR Interviews",
    description:
      "Prepare for both technical rounds and HR conversations with specialized question sets.",
  },
  {
    icon: BarChart3,
    title: "Detailed Performance Reports",
    description:
      "Get comprehensive analysis of your strengths, areas for improvement, and personalized feedback.",
  },
  {
    icon: Zap,
    title: "AI-Powered Scoring",
    description:
      "Receive instant scores across multiple dimensions including clarity, depth, and technical accuracy.",
  },
  {
    icon: TrendingUp,
    title: "Career Improvement Insights",
    description:
      "Actionable recommendations to improve your interview performance and career prospects.",
  },
];

export default function FeaturesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="features" className="relative py-16 sm:py-24 bg-white">
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
            Powerful Features
          </h2>
          <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
            Everything you need to master technical interviews and land your dream job
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div key={index} variants={itemVariants}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="group rounded-xl border border-[#E2E8F0] bg-white p-8 shadow-sm hover:shadow-lg transition-all cursor-pointer"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="inline-flex h-14 w-14 items-center justify-center rounded-lg bg-[#2563EB] bg-opacity-10 mb-4 group-hover:bg-opacity-20 transition-colors"
                  >
                    <Icon className="h-7 w-7 text-[#2563EB]" />
                  </motion.div>

                  <h3 className="text-xl font-semibold text-[#0F172A] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-[#64748B] leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
