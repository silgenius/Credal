import NavRail from "@/components/layout/Navrail";
import ScoreCircle from "@/components/credal/ScoreCircle";
import ScoreInterpretationCard from "@/components/credal/ScoreInterpretationCard";
import PillarBreakdown from "@/components/credal/PillarBreakdown";
import ImprovementPath from "@/components/credal/Improvementpath";
import ShareApplyActions from "@/components/credal/Shareapplyactions";

// Swap for real data from your API layer
const MOCK_USER = {
  credalId: "CR-4F82-KX01",
  trustScore: 781,
};

export default function CredalScorePage() {
  const { credalId, trustScore } = MOCK_USER;

  return (
    <div className="min-h-screen bg-white">
      <NavRail active="/credal" />

      <main className="mx-auto max-w-container px-4 pb-28 pt-6 sm:px-6 md:pl-28 md:pr-8 lg:pl-[15.5rem] lg:pr-10">
        <div>
          <p className="text-sm text-ink-muted">Your financial identity</p>
          <h1 className="text-xl font-bold tracking-tight text-ink">
            Credal Score
          </h1>
        </div>

        {/* Section A — Score display */}
        <section className="mt-5 flex flex-col items-center rounded-3xl border border-black/5 bg-white px-4 py-8 shadow-header sm:px-8">
          <ScoreCircle score={trustScore} />
        </section>

        {/* Section B — Plain-language interpretation */}
        <div className="mt-5">
          <ScoreInterpretationCard score={trustScore} />
        </div>

        {/* Section C — Five pillars breakdown */}
        <div className="mt-5">
          <PillarBreakdown />
        </div>

        {/* Section D — Improvement path */}
        <div className="mt-8">
          <ImprovementPath />
        </div>

        {/* Section E — Share & apply */}
        <div className="mt-8 mb-6">
          <ShareApplyActions credalId={credalId} />
        </div>
      </main>
    </div>
  );
}