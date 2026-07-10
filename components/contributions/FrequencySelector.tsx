"use client";

import type { Frequency, FrequencyType } from "@/lib/contributions";

const OPTIONS: { type: FrequencyType; label: string }[] = [
  { type: "daily", label: "Per day" },
  { type: "weekly", label: "Weekly" },
  { type: "monthly", label: "Per month" },
  { type: "custom", label: "Custom" },
];

export default function FrequencySelector({
  value,
  onChange,
}: {
  value: Frequency;
  onChange: (freq: Frequency) => void;
}) {
  return (
    <div>
      <span className="text-xs font-medium text-ink-muted">
        Contribution frequency
      </span>
      <div className="mt-1.5 grid grid-cols-4 gap-2">
        {OPTIONS.map((opt) => {
          const active = value.type === opt.type;
          return (
            <button
              key={opt.type}
              type="button"
              onClick={() =>
                onChange(
                  opt.type === "custom"
                    ? { type: "custom", customDays: value.customDays ?? 14 }
                    : { type: opt.type },
                )
              }
              className={`rounded-2xl border px-2 py-2.5 text-xs font-medium transition ${
                active
                  ? "border-brand-500 bg-brand-50 text-brand-700"
                  : "border-black/10 text-ink-muted hover:bg-brand-50/50"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {value.type === "custom" && (
        <div className="mt-3 flex items-center gap-2 rounded-2xl border border-black/10 px-3 py-2.5">
          <span className="text-sm text-ink-muted">Every</span>
          <input
            type="number"
            min={2}
            max={90}
            value={value.customDays ?? 14}
            onChange={(e) =>
              onChange({
                type: "custom",
                customDays: Math.max(2, Number(e.target.value) || 2),
              })
            }
            className="w-16 rounded-lg border border-black/10 px-2 py-1 text-center text-sm text-ink outline-none focus:border-brand-500"
          />
          <span className="text-sm text-ink-muted">days</span>
        </div>
      )}
    </div>
  );
}