"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FinalCTASection() {
  const router = useRouter();
  return (
    <section className="relative py-16 sm:py-24 bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-white blur-3xl"></div>
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-white blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
            Start Your AI Interview Today
          </h2>

          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto">
            Prepare smarter, improve faster, and land your dream job with InterviewAI
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/interview/upload')}
              className="group flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-[#2563EB] shadow-xl hover:shadow-2xl hover:bg-blue-50 transition-all"
            >
              Start Free Interview
              <ArrowRight className="transition-transform group-hover:translate-x-1" size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Learn More
            </motion.button>
          </motion.div>

          {/* Small Text */}
          <p className="text-sm text-blue-100">
            No credit card required. Start for free and upgrade anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
