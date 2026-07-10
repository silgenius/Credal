import { STATUS_META, type ContributionStatus } from "@/lib/contributions";

export default function StatusBadge({ status }: { status: ContributionStatus }) {
  const meta = STATUS_META[status];
  return (
    <span
      className="rounded-full px-2.5 py-1 text-xs font-medium"
      style={{ color: meta.color, backgroundColor: meta.soft }}
    >
      {meta.label}
    </span>
  );
}