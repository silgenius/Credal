import { formatDate, formatFrequency, type Contribution } from "@/lib/contributions";
import { formatNaira } from "@/lib/creditScore";

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-ink-muted">{label}</dt>
      <dd className="mt-0.5 text-sm font-medium text-ink">{value}</dd>
    </div>
  );
}

export default function ContributionInfoGrid({ c }: { c: Contribution }) {
  return (
    <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-header">
      <p className="mb-4 text-sm font-semibold text-ink-muted">Details</p>
      <dl className="grid grid-cols-2 gap-4">
        <Stat label="Amount per cycle" value={formatNaira(c.amountPerMember)} />
        <Stat label="Frequency" value={formatFrequency(c.frequency)} />
        <Stat label="Start date" value={formatDate(c.startDate)} />
        <Stat label="End date (est.)" value={formatDate(c.endDate)} />
        <Stat label="Created by" value={c.createdByIsMe ? "You" : c.createdBy} />
        <Stat label="Members" value={String(c.members.length)} />
      </dl>
    </div>
  );
}
