"use client";

import { useEffect, useState } from "react";
import type { Pillar } from "@/lib/creditScore";

/** Bar colour follows how complete this pillar is, echoing the score's risk-zone language. */
function getBarColor(ratio: number) {
  if (ratio >= 0.8) return "#1F8B47"; // brand-500 — strong
  if (ratio >= 0.5) return "#D97706"; // amber — developing
  return "#DC2626"; // red — needs attention
}

export default function PillarBar({ pillar }: { pillar: Pillar }) {
  const [filled, setFilled] = useState(false);
  const ratio = pillar.earned / pillar.max;

  useEffect(() => {
    const id = requestAnimationFrame(() => setFilled(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="text-sm font-medium text-ink">{pillar.label}</p>
        <p className="text-sm text-ink-muted tabular-nums">
          <span className="font-semibold text-ink">{pillar.earned}</span>
          {" / "}
          {pillar.max}
        </p>
      </div>

      <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-brand-50">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: filled ? `${ratio * 100}%` : "0%",
            backgroundColor: getBarColor(ratio),
          }}
        />
      </div>

      <p className="mt-1.5 text-xs leading-snug text-ink-muted">
        {pillar.note}
      </p>
    </div>
  );
}