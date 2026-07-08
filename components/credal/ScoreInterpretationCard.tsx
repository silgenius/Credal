import { Sparkles } from "lucide-react";
import { formatNaira, getScoreInterpretation } from "@/lib/creditScore";

export default function ScoreInterpretationCard({ score }: { score: number }) {
  const { headline, body, recommendedAmount } = getScoreInterpretation(score);

  return (
    <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-header sm:p-6">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
          <Sparkles className="h-4 w-4" strokeWidth={2.25} />
        </span>
        <h2 className="text-sm font-semibold text-ink-muted">
          What your score means
        </h2>
      </div>

      <p className="mt-3 text-[15px] leading-relaxed text-ink">{body}</p>

      <p className="mt-2 text-[15px] font-medium text-ink">{headline}.</p>

      {recommendedAmount > 0 && (
        <div className="mt-4 flex items-center justify-between rounded-2xl bg-brand-50 px-4 py-3">
          <span className="text-sm text-brand-700">
            You may be eligible for business financing of up to
          </span>
          <span className="text-base font-bold text-brand-700">
            {formatNaira(recommendedAmount)}
          </span>
        </div>
      )}
    </div>
  );
}