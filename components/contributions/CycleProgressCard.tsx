import { CalendarClock } from "lucide-react";
import { formatFrequency, getTurnLabel, type Contribution } from "@/lib/contributions";

export default function CycleProgressCard({ c }: { c: Contribution }) {
  const pct =
    c.totalCycles > 0
      ? Math.min(100, Math.round((c.currentCycle / c.totalCycles) * 100))
      : 0;
  const turnLabel = getTurnLabel(c);

  return (
    <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-header">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-ink-muted">Cycle progress</p>
        <span className="text-sm font-medium text-ink tabular-nums">
          {c.status === "pending_start"
            ? `Not started · ${c.totalCycles} cycles`
            : `Cycle ${c.currentCycle} of ${c.totalCycles}`}
        </span>
      </div>

      <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-brand-50">
        <div
          className="h-full rounded-full bg-brand-500 transition-all duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="mt-3 flex items-center gap-1.5 text-xs text-ink-muted">
        <CalendarClock className="h-3.5 w-3.5" />
        {formatFrequency(c.frequency)} contributions
      </div>

      {turnLabel && (
        <div className="mt-4 rounded-2xl bg-brand-50 px-4 py-3 text-sm font-medium text-brand-700">
          {turnLabel}
        </div>
      )}
    </div>
  );
}
