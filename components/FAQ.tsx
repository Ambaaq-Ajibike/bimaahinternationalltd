'use client';

import { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What services does Bimaah International Ltd offer?",
      answer: "We provide free, accessible support in: Immigration advice and document preparation; Benefits applications and appeals (e.g. Universal Credit, PIP); Legal drafting (e.g. flexible working requests); Advocacy for fair treatment in employment."
    },
    {
      question: "Who can access your services?",
      answer: "Our services are open to all, especially migrants, vulnerable individuals, and those facing financial hardship. We believe everyone deserves dignified, professional support—regardless of background or income."
    },
    {
      question: "Do I need to pay for a consultation?",
      answer: "No. We offer free initial consultations and aim to keep our services accessible. If a case requires specialist legal input or external referrals, we'll explain any potential costs upfront."
    },
    {
      question: "How do I book an appointment?",
      answer: "You can book online using our Booking Form, call us directly, or email us. We offer phone, video, and in-person consultations (subject to availability). We'll always try to accommodate your preferred method and time."
    },
    {
      question: "What documents should I bring to my appointment?",
      answer: "Depending on your issue, we may ask for: ID and immigration documents; Benefit letters or decision notices; Any correspondence related to your case. Don't worry—we'll guide you through what's needed."
    },
    {
      question: "Can you help me write legal letters or fill out forms?",
      answer: "Yes. We specialize in drafting clear, assertive documents including: Flexible working requests; Immigration representations; Benefits appeals. We'll work with you to ensure your voice is heard."
    },
    {
      question: "Do you offer support in other languages?",
      answer: "We aim to be inclusive. If you need translation or interpretation support, please let us know when booking—we'll do our best to accommodate."
    },
    {
      question: "Is my information kept confidential?",
      answer: "Absolutely. We treat all client information with the highest level of confidentiality inline with Immigration Advice Authority  code of  standards."
    },
    {
      question: "What if I need urgent help?",
      answer: "If your situation is urgent—such as risk of eviction, loss of benefits, or immigration deadlines—please contact us directly. We'll prioritize urgent cases wherever possible."
    },
    {
      question: "How can I support your work?",
      answer: "We welcome volunteers, referrals, and donations to help us continue offering free services. You can also share our resources or attend one of our community workshops."
    }
  ];

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
          {faqs.map((faq, index) => (
            <div key={index} className="border border-[#97C5D9] rounded-lg overflow-hidden">
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
