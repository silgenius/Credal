import Link from "next/link";
import { Users, ChevronRight } from "lucide-react";
import {
  formatFrequency,
  getTurnLabel,
  type Contribution,
} from "@/lib/contributions";
import { formatNaira } from "@/lib/creditScore";
import StatusBadge from "./StatusBadge";

export default function ContributionCard({ c }: { c: Contribution }) {
  const turnLabel = getTurnLabel(c);

  return (
    <Link
      href={`/contributions/${c.id}`}
      className="flex items-center gap-3 rounded-3xl border border-black/5 bg-white p-4 shadow-header transition hover:bg-brand-50/40 active:scale-[0.99]"
    >
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-ink">{c.name}</p>
          <StatusBadge status={c.status} />
        </div>
        <p className="mt-1 text-xs text-ink-muted">
          {formatNaira(c.amountPerMember)} · {formatFrequency(c.frequency)}
        </p>
        <div className="mt-2 flex items-center gap-3 text-xs text-ink-muted">
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            {c.members.length} members
          </span>
          {c.status === "active" && (
            <span>
              Cycle {c.currentCycle} of {c.totalCycles}
            </span>
          )}
        </div>
        {turnLabel && (
          <p className="mt-2 inline-flex rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-medium text-brand-700">
            {turnLabel}
          </p>
        )}
      </div>
      <ChevronRight className="h-4 w-4 shrink-0 text-ink-muted" />
    </Link>
  );
}
