'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "What is ZenCart?",
    answer: "Zencart Store is your one-stop online destination for premium lifestyle, fashion, and home products. We offer a curated selection with quality and style in mind."
  },
  {
    question: "How long does shipping take?",
    answer: "Orders are typically processed within 24-48 hours and delivered within 3–7 business days depending on your location."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 7-day easy return policy for all eligible products. Items must be unused, with original tags and packaging."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order ships, you’ll receive a tracking link via email and SMS to monitor its delivery status."
  },
  {
    question: "Do you ship internationally?",
    answer: "Currently, we only ship within India. Stay tuned — global shipping is coming soon!"
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#fdf4ff] to-[#f4e4ff] text-gray-800 px-4 py-16 pt-25">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-[#a97ba5]">Frequently Asked Questions</h1>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-300 rounded-xl p-4 bg-white shadow-sm">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left flex justify-between items-center text-lg font-semibold"
              >
                <span>{faq.question}</span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  ▼
                </motion.span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="pt-2 text-sm text-gray-600"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
