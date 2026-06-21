"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  feedback: string;
  avatar: string;
  initials: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Chen",
    role: "Software Engineer at Google",
    feedback:
      "InterviewAI helped me prepare for my technical interviews at Google. The personalized questions based on my resume were incredibly relevant. I got the job!",
    avatar: "SC",
    initials: "SC",
  },
  {
    name: "Rahul Kapoor",
    role: "Product Manager at Meta",
    feedback:
      "The detailed feedback after each mock interview was game-changing. I could see exactly where I was losing points and improved significantly.",
    avatar: "RK",
    initials: "RK",
  },
  {
    name: "Alex Johnson",
    role: "Data Scientist at Amazon",
    feedback:
      "Best investment for interview prep. The AI's follow-up questions are incredibly realistic. Felt fully prepared when I walked into my actual interviews.",
    avatar: "AJ",
    initials: "AJ",
  },
];

export default function TestimonialsSection() {
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
    <section className="relative py-16 sm:py-24 bg-white">
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
            Trusted by Thousands
          </h2>
          <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
            See what successful candidates and software engineers are saying
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={itemVariants}>
              <motion.div
                whileHover={{ y: -4 }}
                className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-8 shadow-sm hover:shadow-lg transition-all h-full flex flex-col"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className="fill-[#FDB022] text-[#FDB022]"
                    />
                  ))}
                </div>

                {/* Feedback */}
                <p className="text-[#0F172A] mb-6 flex-grow">
                  "{testimonial.feedback}"
                </p>

                {/* Author */}
                <div className="border-t border-[#E2E8F0] pt-6 flex items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2563EB] text-sm font-bold text-white"
                  >
                    {testimonial.initials}
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-[#0F172A]">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-[#64748B]">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
