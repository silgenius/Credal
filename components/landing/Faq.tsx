'use client';

import { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'What is Credal?',
    answer:
      'Credal is a trust-native savings and credit infrastructure platform. It digitizes informal savings systems like Ajo, Susu, Tontines, and Stokvels, turning your participation into a portable, verifiable financial identity that banks and fintechs can trust.',
  },
  {
    question: 'How does Credal protect my savings?',
    answer:
      'Contributions are automated through direct account integration, and funds are managed securely and transparently at every step — removing the risk of a collector defaulting, mismanaging funds, or disappearing with the group\'s money.',
  },
  {
    question: 'What is the Trust Score and how is it calculated?',
    answer:
      'Your Trust Score is generated from your real financial behavior — completed savings cycles, timely contributions, and endorsements from your community. It reflects genuine discipline and character, not just traditional banking history.',
  },
  {
    question: 'Can I join Credal without an existing savings group?',
    answer:
      'Yes. You can create a new savings circle and invite members, or join an existing group that\'s already active on Credal — either way, your contributions start building your financial identity from day one.',
  },
  {
    question: 'How do banks and lenders use my Credal data?',
    answer:
      'Financial institutions can securely access your Trust Score through Credal\'s API to make data-driven lending decisions. This gives you access to formal credit while opening lenders up to a new, previously invisible customer segment.',
  },
  {
    question: 'Is my financial data secure and private?',
    answer:
      'Yes. Your data is encrypted and only shared with financial institutions when you choose to apply for credit through the platform. You stay in control of who can view your financial identity at all times.',
  },
];

function ToggleIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 9h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      {!isOpen && <path d="M9 2v14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />}
    </svg>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section id="faq" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
            Frequently asked questions
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">
            See how Credal turns your everyday savings habits into a trusted, verifiable
            financial identity.
          </p>
        </div>

        <div className="mt-14 flex flex-col gap-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-brand-100"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left sm:px-8"
                >
                  <span className="text-lg font-medium text-ink">{faq.question}</span>
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-ink">
                    <ToggleIcon isOpen={isOpen} />
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 sm:px-8">
                    <div className="rounded-2xl bg-brand-50 px-5 py-4 text-base leading-relaxed text-ink-muted">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}