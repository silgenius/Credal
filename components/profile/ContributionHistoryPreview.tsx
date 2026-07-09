import Link from "next/link";
import { MOCK_CONTRIBUTION_HISTORY, STATUS_STYLES } from "@/lib/profile";
import { formatNaira } from "@/lib/creditScore";

export default function ContributionHistoryPreview() {
  const items = MOCK_CONTRIBUTION_HISTORY.slice(0, 3);

  return (
    <section>
      <div className="mb-2 flex items-baseline justify-between px-1">
        <h2 className="text-sm font-semibold text-ink-muted">
          Contribution history
        </h2>
        <Link
          href="/contributions/history"
          className="text-xs font-medium text-brand-600 hover:text-brand-700"
        >
          View all
        </Link>
      </div>

      <div className="divide-y divide-black/5 overflow-hidden rounded-3xl border border-black/5 bg-white shadow-header">
        {items.map((item) => {
          const status = STATUS_STYLES[item.status];
          return (
            <div key={item.id} className="flex items-center gap-3 px-4 py-3.5">
              <div className="flex-1">
                <p className="text-sm font-medium text-ink">{item.name}</p>
                <p className="mt-0.5 text-xs text-ink-muted">
                  {item.progressLabel} · {item.date}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-sm font-semibold text-ink tabular-nums">
                  {formatNaira(item.amount)}
                </span>
                <span
                  className="rounded-full px-2 py-0.5 text-[11px] font-medium"
                  style={{ color: status.color, backgroundColor: status.soft }}
                >
                  {status.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}