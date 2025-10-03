import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS } from '../../data/faqData';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 px-6 md:px-8 w-full max-w-7xl">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-xl mb-6">
          <HelpCircle className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">Questions</span>
        </h2>
        <p className="text-slate-400 text-lg">
          Find answers to common questions about SmartSanstha
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {FAQS.map((faq, index) => (
          <div
            key={index}
            className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden hover:border-orange-500/50 transition-colors"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex justify-between items-center text-left p-5 font-semibold text-white hover:text-orange-400 transition-colors"
            >
              <span className="pr-4">{faq.question}</span>
              <ChevronDown
                className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180 text-orange-400' : ''
                }`}
              />
            </button>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                openIndex === index ? 'max-h-48' : 'max-h-0'
              }`}
            >
              <div className="px-5 pb-5 text-slate-400 leading-relaxed">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};