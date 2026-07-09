'use client';

import { ChangeEvent, ClipboardEvent, KeyboardEvent, useRef } from 'react';

interface OtpFieldProps {
  length?: number;
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
}

export default function OtpField({ length = 6, value, onChange, error }: OtpFieldProps) {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const char = event.target.value.replace(/\D/g, '').slice(-1);
    const next = [...value];
    next[index] = char;
    onChange(next);

    if (char && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, length).split('');
    if (pasted.length === 0) return;

    event.preventDefault();
    const next = Array.from({ length }, (_, i) => pasted[i] ?? '');
    onChange(next);
    inputsRef.current[Math.min(pasted.length, length) - 1]?.focus();
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2 sm:gap-3">
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            ref={(el) => {
              inputsRef.current[index] = el;
            }}
            value={value[index] ?? ''}
            onChange={(event) => handleChange(index, event)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            onPaste={handlePaste}
            inputMode="numeric"
            maxLength={1}
            aria-label={`Digit ${index + 1}`}
            className={`h-14 w-full flex-1 rounded-xl border bg-white text-center text-xl font-semibold text-ink outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-100 sm:h-16 ${
              error ? 'border-red-400' : 'border-brand-100'
            }`}
          />
        ))}
      </div>
      {error && <span className="text-xs font-medium text-red-500">{error}</span>}
    </div>
  );
}