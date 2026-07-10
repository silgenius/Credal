"use client";

import { useState } from "react";
import { Plus, X, Phone } from "lucide-react";
import {
  cleanPhoneDigits,
  formatPhoneDisplay,
  isValidPhone,
} from "@/lib/contributions";

export interface PendingMember {
  phone: string;
}

export default function PhoneNumberField({
  members,
  onAdd,
  onRemove,
}: {
  members: PendingMember[];
  onAdd: (phone: string) => void;
  onRemove: (phone: string) => void;
}) {
  const [draft, setDraft] = useState("");
  const [error, setError] = useState<string | null>(null);

  function formatDraft(digits: string) {
  const a = digits.slice(0, 3);
  const b = digits.slice(3, 6);
  const c = digits.slice(6, 10);
  return [a, b, c].filter(Boolean).join(" ");
}

function handleAdd() {
    const digits = cleanPhoneDigits(draft);
    if (!isValidPhone(digits)) {
      setError("Enter the last 10 digits of a valid phone number.");
      return;
    }
    if (members.some((m) => m.phone === digits)) {
      setError("This number has already been added.");
      return;
    }
    onAdd(digits);
    setDraft("");
    setError(null);
  }

  return (
    <div>
      <span className="text-xs font-medium text-ink-muted">
        Add member by phone number
      </span>
      <div className="mt-1 flex gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-2xl border border-black/10 px-3 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100">
          <span className="text-sm text-ink-muted">0</span>
          <input
            type="tel"
            inputMode="numeric"
            placeholder="803 214 7765"
            value={formatDraft(draft)}
            onChange={(e) => setDraft(cleanPhoneDigits(e.target.value))}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            className="w-full py-3 text-sm text-ink outline-none"
          />
        </div>
        <button
          type="button"
          onClick={handleAdd}
          aria-label="Add member"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-500 text-white transition hover:bg-brand-600"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}

      {members.length > 0 && (
        <ul className="mt-3 flex flex-col gap-2">
          {members.map((m) => (
            <li
              key={m.phone}
              className="flex items-center gap-3 rounded-2xl bg-brand-50 px-3 py-2.5"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-brand-600">
                <Phone className="h-3.5 w-3.5" />
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium text-ink">
                  {formatPhoneDisplay(m.phone)}
                </p>
                <p className="text-[11px] text-ink-muted">
                  Will receive an invite to join
                </p>
              </div>
              <button
                type="button"
                onClick={() => onRemove(m.phone)}
                aria-label="Remove member"
                className="flex h-7 w-7 items-center justify-center rounded-full text-ink-muted transition hover:bg-white hover:text-red-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}