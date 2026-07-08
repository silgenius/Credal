"use client";

import { useEffect, useRef, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { getRiskZone } from "@/lib/creditScore";

interface ScoreCircleProps {
  score: number;
  size?: number;
  durationMs?: number;
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export default function ScoreCircle({
  score,
  size = 224,
  durationMs = 1500,
}: ScoreCircleProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / durationMs);
      setDisplayScore(Math.round(easeOutCubic(t) * score));
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [score, durationMs]);

  const zone = getRiskZone(displayScore);

  const stroke = 14;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const pct = Math.min(100, Math.max(0, (displayScore / 1000) * 100));
  const dashOffset = circumference - (pct / 100) * circumference;

  const bandLen = circumference / 3;
  const gap = 4;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="#FEE2E2"
            strokeWidth={stroke}
            strokeDasharray={`${bandLen - gap} ${circumference - bandLen + gap}`}
            strokeLinecap="round"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="#FEF3C7"
            strokeWidth={stroke}
            strokeDasharray={`${bandLen - gap} ${circumference - bandLen + gap}`}
            strokeDashoffset={-bandLen}
            strokeLinecap="round"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="#DBF2E1"
            strokeWidth={stroke}
            strokeDasharray={`${bandLen - gap} ${circumference - bandLen + gap}`}
            strokeDashoffset={-bandLen * 2}
            strokeLinecap="round"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={zone.color}
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-bold tabular-nums tracking-tight text-ink">
            {displayScore}
          </span>
          <span className="text-xs text-ink-muted">out of 1000</span>
        </div>
      </div>

      <span
        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium"
        style={{ color: zone.color, backgroundColor: zone.soft }}
      >
        <ShieldCheck className="h-4 w-4" strokeWidth={2.25} />
        {zone.label}
      </span>
    </div>
  );
}