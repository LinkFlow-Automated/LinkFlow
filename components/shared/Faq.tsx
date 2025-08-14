'use client';

import { useState } from 'react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
    {
        id: 1,
        question: "What is Breezi?",
        answer: "Breezi is a smart link-in-bio platform that helps creators, brands, and businesses organize, promote, and track all their content from one personalized page."
    },
    {
        id: 2,
        question: "How is Breezi different from other link-in-bio tools?",
        answer: "Breezi offers automated content syncing, real-time analytics, social integrations, and customizable designs that help your page stand out."
    },
    {
        id: 3,
        question: "Can I track how many people click my links?",
        answer: "Yes! Breezi provides detailed click tracking and visitor insights so you can see which content drives the most engagement."
    },
    {
        id: 4,
        question: "Is Breezi free to use?",
        answer: "Breezi offers both a free plan with essential features and paid plans for advanced customization, analytics, and automation."
    },
    {
        id: 5,
        question: "Can I customize my Breezi page?",
        answer: "Absolutely. You can change colors, fonts, layouts, and even add your own branding to make your page match your identity."
    },
    {
        id: 6,
        question: "What platforms can I connect to Breezi?",
        answer: "You can connect social media accounts, e-commerce stores, blogs, YouTube channels, podcasts, and more. All in one place."
    }
];


export default function FAQ() {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    setOpenItem(prev => prev === id ? null : id);
  };

  const handleKeyDown = (event: React.KeyboardEvent, id: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleItem(id);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-start select-none">
      <h2 className="text-3xl font-semibold md:text-4xl text-gray-900 mb-8 text-start">
        Frequently asked questions
      </h2>

      <div className="space-y-0">
        {faqData.map((item, index) => (
          <div key={item.id}>
            <button
              className="w-full flex items-center justify-between py-4 cursor-pointer transition-colors text-left bg-transparent border-none"
              onClick={() => toggleItem(item.id)}
              onKeyDown={(e) => handleKeyDown(e, item.id)}
              aria-expanded={openItem === item.id}
              aria-controls={`faq-answer-${item.id}`}
              type="button"
            >
              <h3 className="text-lg font-medium text-gray-900 pr-4">
                {item.question}
              </h3>
              <div className="flex-shrink-0">
                <span className="text-gray-400 hover:text-gray-600 transition-colors">
                  {openItem === item.id ? (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <title>Collapse answer</title>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 12h12"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <title>Expand answer</title>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  )}
                </span>
              </div>
            </button>

            {openItem === item.id && (
              <div 
                id={`faq-answer-${item.id}`}
                className="pb-4 md:text-start"
                role="region"
                aria-labelledby={`faq-question-${item.id}`}
              >
                <p className="text-gray-600">{item.answer}</p>
              </div>
            )}

            {index < faqData.length - 1 && <hr className="border-gray-200" />}
          </div>
        ))}
      </div>
    </div>
  );
}
