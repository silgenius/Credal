'use client';

import { useState } from 'react';

interface TooltipProps {
  text: string;
}

export default function Tooltip({ text }: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <span className="relative inline-flex">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        onBlur={() => setIsOpen(false)}
        aria-label="More information"
        className="flex h-4.5 w-4.5 flex-shrink-0 items-center justify-center rounded-full bg-brand-100 text-[10px] font-bold leading-none text-brand-700"
      >
        i
      </button>
      {isOpen && (
        <span
          role="tooltip"
          className="absolute bottom-full left-1/2 z-10 mb-2 w-52 -translate-x-1/2 rounded-lg bg-ink px-3 py-2 text-xs leading-relaxed text-white shadow-lg animate-[fade-scale-in_0.15s_ease-out]"
        >
          {text}
          <span className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 bg-ink" />
        </span>
      )}
    </span>
  );
}