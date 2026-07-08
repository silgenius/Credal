import { MOCK_RECOMMENDATIONS } from "@/lib/creditScore";
import RecommendationCard from "./Recommendationcard";

export default function ImprovementPath() {
  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold text-ink-muted">
        How to raise your score
      </h2>
      <div className="flex flex-col gap-3">
        {MOCK_RECOMMENDATIONS.map((item) => (
          <RecommendationCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}