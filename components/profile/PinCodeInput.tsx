'use client';

import { KeyboardEvent, useRef } from 'react';

export default function PinCodeInput({
  value,
  onChange,
  length = 6,
  autoFocus = false,
}: {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  autoFocus?: boolean;
}) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  function setDigit(index: number, digit: string) {
    const clean = digit.replace(/[^0-9]/g, '').slice(-1);
    const next = value.split('');
    next[index] = clean;
    const joined = next.join('').slice(0, length);
    onChange(joined);
    if (clean && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  }

  return (
    <div
      className="mx-auto grid w-full max-w-sm gap-2 sm:gap-3"
      style={{ gridTemplateColumns: `repeat(${length}, minmax(0, 1fr))` }}
    >
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => {
            inputsRef.current[i] = el;
          }}
          type="password"
          inputMode="numeric"
          maxLength={1}
          autoFocus={autoFocus && i === 0}
          value={value[i] ?? ''}
          onChange={(e) => setDigit(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          aria-label={`PIN digit ${i + 1}`}
          className="aspect-square w-full min-w-0 max-w-14 justify-self-center rounded-2xl border border-black/10 text-center text-lg font-bold text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100 sm:text-xl"
        />
      ))}
    </div>
  );
}