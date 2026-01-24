'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQItem } from '@/types/content';

interface FAQProps {
  faqs: FAQItem[];
}

export default function FAQ({ faqs }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-4">
          <HelpCircle className="w-10 h-10 text-[#1A7EB9]" />
          <h2 className="text-4xl font-bold text-center text-[#1C478A]">
            Frequently Asked Questions
          </h2>
        </div>
        <p className="text-center text-[#718A9D] mb-12 text-lg">
          Find answers to common questions
        </p>
        <div className="space-y-4">
          {faqs.length === 0 && (
            <div className="text-center text-[#718A9D]">
              FAQs will appear here once added in the admin dashboard.
            </div>
          )}
          {faqs.map((faq, index) => (
            <div key={faq.id} className="border border-[#97C5D9] rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left bg-[#F4F7F8] hover:bg-[#97C5D9]/20 transition flex justify-between items-center"
              >
                <span className="font-semibold text-[#1C478A] pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#1A7EB9] flex-shrink-0 transition-transform ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-white">
                  <p className="text-[#1C478A] leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
