import Link from "next/link";
import { ChevronRight, RefreshCw, UserCheck, Fingerprint } from "lucide-react";
import type { Recommendation } from "@/lib/creditScore";

const ICON_BY_ID: Record<string, React.ElementType> = {
  cycle: RefreshCw,
  vouch: UserCheck,
  bvn: Fingerprint,
};

export default function RecommendationCard({ item }: { item: Recommendation }) {
  const Icon = ICON_BY_ID[item.id] ?? RefreshCw;

  const content = (
    <>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
        <Icon className="h-5 w-5" strokeWidth={2} />
      </span>
      <div className="flex-1">
        <p className="text-sm font-semibold text-ink">{item.title}</p>
        <p className="mt-1 text-xs leading-relaxed text-ink-muted">
          {item.body}
        </p>
      </div>
      {item.href && (
        <ChevronRight className="h-4 w-4 shrink-0 self-center text-ink-muted" />
      )}
    </>
  );

  const className =
    "flex items-start gap-3 rounded-2xl border border-black/5 bg-white p-4 shadow-header transition";

  if (item.href) {
    return (
      <Link href={item.href} className={`${className} hover:bg-brand-50/60 active:scale-[0.99]`}>
        {content}
      </Link>
    );
  }

  return <div className={className}>{content}</div>;
}