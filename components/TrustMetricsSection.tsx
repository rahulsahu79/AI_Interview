"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface MetricData {
  value: string;
  label: string;
  suffix?: string;
}

const metrics: MetricData[] = [
  { value: "10000", label: "Interviews Conducted", suffix: "+" },
  { value: "95", label: "Candidate Satisfaction", suffix: "%" },
  { value: "500", label: "Skills Evaluated", suffix: "+" },
  { value: "24", label: "AI Availability", suffix: "/7" },
];

function AnimatedCounter({ target, suffix = "" }: { target: string; suffix?: string }) {
  const [count, setCount] = useState("0");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    const targetNum = parseInt(target);
    const duration = 2000;
    const steps = 60;
    const stepValue = targetNum / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const currentValue = Math.floor(stepValue * currentStep);
      setCount(currentValue.toString());

      if (currentStep >= steps) {
        setCount(target);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function TrustMetricsSection() {
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
    <section className="relative py-16 sm:py-24 bg-[#F8FAFC]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8"
        >
          {metrics.map((metric, index) => (
            <motion.div key={index} variants={itemVariants}>
              <div className="rounded-xl bg-white border border-[#E2E8F0] p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl sm:text-5xl font-bold text-[#2563EB] mb-2">
                  <AnimatedCounter target={metric.value} suffix={metric.suffix} />
                </div>
                <p className="text-sm sm:text-base text-[#64748B] font-medium">
                  {metric.label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
