import { MOCK_PILLARS } from "@/lib/creditScore";
import PillarBar from "./Pillarbar";

export default function PillarBreakdown() {
  const totalEarned = MOCK_PILLARS.reduce((sum, p) => sum + p.earned, 0);
  const totalMax = MOCK_PILLARS.reduce((sum, p) => sum + p.max, 0);

  return (
    <section className="rounded-3xl border border-black/5 bg-white p-5 shadow-header sm:p-6">
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-sm font-semibold text-ink-muted">
          Score breakdown
        </h2>
        <span className="text-xs text-ink-muted tabular-nums">
          {totalEarned} / {totalMax} pts
        </span>
      </div>

      <div className="flex flex-col gap-5">
        {MOCK_PILLARS.map((pillar) => (
          <PillarBar key={pillar.id} pillar={pillar} />
        ))}
      </div>
    </section>
  );
}