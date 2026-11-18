"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What types of interviews are supported?",
    answer:
      "We support technical interviews for various tech stacks (Python, JavaScript, Java, C++), behavioral interviews, HR rounds, and system design interviews. Our AI adapts to your specific tech stack and experience level.",
  },
  {
    question: "How does AI evaluate answers?",
    answer:
      "Our AI uses natural language processing and machine learning to evaluate responses on technical accuracy, communication clarity, depth of knowledge, problem-solving approach, and confidence. You get real-time scores and detailed feedback.",
  },
  {
    question: "Can I upload any resume?",
    answer:
      "Yes, our platform supports PDF, DOC, and DOCX formats. The AI intelligently parses your resume to extract key information about your skills, experience, projects, and generates relevant interview questions.",
  },
  {
    question: "Will I receive detailed feedback?",
    answer:
      "Absolutely! After each interview session, you'll receive comprehensive feedback including your overall score, performance in different dimensions, highlighted strengths, areas for improvement, and personalized recommendations.",
  },
  {
    question: "How many interview sessions can I take?",
    answer:
      "With a free account, you can take 3 full interview sessions per month. Premium members get unlimited sessions plus access to specialized interview prep for specific companies and roles.",
  },
  {
    question: "Is my resume and data secure?",
    answer:
      "Yes, we use industry-standard encryption and security practices. Your resume and interview data are stored securely and only used to personalize your interview preparation experience.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-16 sm:py-24 bg-[#F8FAFC]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-20 text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0F172A] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-[#64748B]">
            Everything you need to know about InterviewAI
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.05, duration: 0.6 }}
            >
              <motion.button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full text-left"
              >
                <div
                  className={`rounded-xl border transition-all ${
                    openIndex === index
                      ? "border-[#2563EB] bg-blue-50 shadow-md"
                      : "border-[#E2E8F0] bg-white hover:shadow-md"
                  } p-6`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-[#0F172A]">
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{
                        rotate: openIndex === index ? 180 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown
                        size={24}
                        className={`transition-colors ${
                          openIndex === index
                            ? "text-[#2563EB]"
                            : "text-[#64748B]"
                        }`}
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="rounded-b-xl border border-t-0 border-[#E2E8F0] bg-white p-6 text-[#64748B] leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
