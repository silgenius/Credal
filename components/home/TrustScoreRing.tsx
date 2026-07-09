import Link from "next/link";
import {
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import getRiskZone from "./getRiskZone";

export default function TrustScoreRing({ score }: { score: number }) {
  const zone = getRiskZone(score);
  const pct = Math.min(100, Math.max(0, (score / 1000) * 100));

  const size = 176;
  const stroke = 12;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;

  // three faint zone bands, drawn first, so the coloured arc reads like a
  // gauge sweeping across low / medium / high risk territory
  const bandLen = circumference / 3;
  const gap = 4; // visual gap between bands

  const dashOffset = circumference - (pct / 100) * circumference;

  return (
    <Link
      href="/credal"
      aria-label="View your Credal Trust Score details"
      className="group relative flex flex-col items-center gap-3 rounded-3xl p-2 outline-none transition focus-visible:ring-2 focus-visible:ring-brand-400"
    >
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90 transition-transform duration-300 group-active:scale-[0.97]"
        >
          {/* background zone bands */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="#FEE2E2"
            strokeWidth={stroke}
            strokeDasharray={`${bandLen - gap} ${circumference - bandLen + gap}`}
            strokeDashoffset={0}
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
          {/* progress arc */}
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
            className="transition-[stroke-dashoffset] duration-700 ease-out"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold tracking-tight text-ink">
            {score}
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

      <span className="flex items-center gap-0.5 text-sm font-medium text-brand-600 opacity-0 transition-opacity group-hover:opacity-100">
        View Credal score details
        <ChevronRight className="h-4 w-4" />
      </span>
    </Link>
  );
}
