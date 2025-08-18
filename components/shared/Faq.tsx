"use client"

import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const App: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "What is Breezi?",
      answer: "Breezi is a smart link-in-bio platform that helps creators, brands, and businesses organize, promote, and track all their content from one personalized page."
    },
    {
      question: "How is Breezi different from other link-in-bio tools?",
      answer: "Breezi offers automated content syncing, real-time analytics, social integrations, and customizable designs that help your page stand out."
    },
    {
      question: "Can I track how many people click my links?",
      answer: "Yes! Breezi provides detailed click tracking and visitor insights so you can see which content drives the most engagement."
    },
    {
      question: "Is Breezi free to use?",
      answer: "Breezi offers both a free plan with essential features and paid plans for advanced customization, analytics, and automation."
    },
    {
      question: "Can I customize my Breezi page?",
      answer: "Absolutely. You can change colors, fonts, layouts, and even add your own branding to make your page match your identity."
    },
    {
      question: "What platforms can I connect to Breezi?",
      answer: "You can connect social media accounts, e-commerce stores, blogs, YouTube channels, podcasts, and more. All in one platform!"
    }
  ];


  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold md:text-start mb-12 text-gray-900">
          Frequently Asked Questions
        </h1>

        <div className="bg-white overflow-hidden">
          {faqs.map((faq, index) => (
            <div key={faq.question} className="border-b border-gray-50/30 last:border-b-0">
              <button
                type="button"
                className="w-full py-5 text-left flex justify-between items-center cursor-pointer duration-200 hover:bg-gray-50"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span className="text-base md:text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <span className={`transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-700"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <title>Toggle FAQ</title>
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index
                    ? 'max-h-96 pb-6 opacity-100'
                    : 'max-h-0 opacity-0'
                  }`}
              >
                <p className="text-gray-600 leading-relaxed text-base">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;