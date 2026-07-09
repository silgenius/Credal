'use client';

import { useEffect } from 'react';

interface SuccessStepProps {
  onComplete: () => void;
}

export default function SuccessStep({ onComplete }: SuccessStepProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1400);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center py-6 text-center">
      <div className="relative flex h-20 w-20 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-brand-100 animate-[ring-expand_1.2s_ease-out_infinite]" />
        <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-brand-600 [animation:check-pop_0.5s_cubic-bezier(0.34,1.56,0.64,1)_both]">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5 13l4 4L19 7"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      <h2 className="mt-6 text-2xl font-semibold text-ink">
        Your Credal account has been created
      </h2>
      <p className="mt-2 text-sm text-ink-muted">Taking you to your dashboard…</p>
    </div>
  );
}