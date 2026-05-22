"use client";

import { useState } from "react";

export interface FAQ {
  question: string;
  answer: string;
}

export default function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, i) => (
        <div key={i} className="bg-white border border-gray-100 rounded-xl p-6 transition-colors hover:border-gray-200">
          <div 
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleFAQ(i)}
          >
            <h4 className="font-bold text-sm md:text-base text-gray-900">{faq.question}</h4>
            <svg 
              className={`w-5 h-5 text-gray-500 transform transition-transform ${openIndex === i ? 'rotate-180' : ''}`} 
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          {openIndex === i && (
            <p className="text-sm md:text-base text-gray-600 mt-4 leading-relaxed">
              {faq.answer}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
