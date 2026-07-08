/**
 * Shared helpers + mock data for anything related to the Credal Trust Score.
 * Swap the MOCK_* constants for real API data once the scoring service is wired up.
 */

export interface RiskZone {
  label: string;
  color: string;
  soft: string;
}

/** Higher score = lower risk. Thresholds split the 0-1000 scale into thirds. */
export function getRiskZone(score: number): RiskZone {
  if (score < 334) {
    return { label: "High Risk", color: "#DC2626", soft: "#FEE2E2" };
  }
  if (score < 667) {
    return { label: "Medium Risk", color: "#D97706", soft: "#FEF3C7" };
  }
  return { label: "Low Risk", color: "#1F8B47", soft: "#DBF2E1" };
}

export function formatNaira(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

export interface ScoreInterpretation {
  headline: string;
  body: string;
  recommendedAmount: number;
}

/** Plain-language read-out of what a score means, plus a suggested financing ceiling. */
export function getScoreInterpretation(score: number): ScoreInterpretation {
  if (score >= 850) {
    return {
      headline: "Exceptional financial trustworthiness",
      body: `Your Credal Score of ${score} places you among the most trusted members of your community. Your history shows near-perfect consistency, and Credal partner lenders see this clearly.`,
      recommendedAmount: 2000000,
    };
  }
  if (score >= 667) {
    return {
      headline: "Strong financial trustworthiness",
      body: `Your Credal Score of ${score} shows strong financial trustworthiness. Your community knows you as someone who keeps their word. Credal partner lenders can see this — and you may now be eligible for business financing.`,
      recommendedAmount: 750000,
    };
  }
  if (score >= 500) {
    return {
      headline: "Building a solid track record",
      body: `Your Credal Score of ${score} shows a growing, dependable pattern of behaviour. A few more consistent cycles and vouches will unlock larger financing.`,
      recommendedAmount: 250000,
    };
  }
  if (score >= 334) {
    return {
      headline: "Early, but promising",
      body: `Your Credal Score of ${score} shows you're building a financial identity. Completing more savings cycles and gathering vouches will grow this quickly.`,
      recommendedAmount: 100000,
    };
  }
  return {
    headline: "Just getting started",
    body: `Your Credal Score of ${score} reflects a new profile. Complete your first savings cycle and connect with your community to start building trust.`,
    recommendedAmount: 0,
  };
}

export interface Pillar {
  id: string;
  label: string;
  earned: number;
  max: number;
  note: string;
}

export const MOCK_PILLARS: Pillar[] = [
  {
    id: "repayment",
    label: "Repayment Consistency",
    earned: 33,
    max: 35,
    note: "9 completed Susu cycles, zero defaults",
  },
  {
    id: "vouching",
    label: "Community Vouching",
    earned: 22,
    max: 25,
    note: "3 confirmed vouches from trusted community members",
  },
  {
    id: "network",
    label: "Network Depth",
    earned: 16,
    max: 20,
    note: "Active in 2 savings circles across 1 market community",
  },
  {
    id: "business",
    label: "Business Stability",
    earned: 8,
    max: 15,
    note: "Trading for 14 months — building a longer track record will increase this",
  },
  {
    id: "digital",
    label: "Digital Footprint",
    earned: 2,
    max: 5,
    note: "No formal banking history linked yet — adding your BVN will increase this",
  },
];

export interface Recommendation {
  id: string;
  title: string;
  body: string;
  href?: string;
}

export const MOCK_RECOMMENDATIONS: Recommendation[] = [
  {
    id: "cycle",
    title: "Complete your next Susu cycle",
    body: "Your next completed cycle without default will add up to 4 points to your Repayment Consistency score.",
  },
  {
    id: "vouch",
    title: "Get one more vouch",
    body: "A vouch from a community leader or market association official carries extra weight. Add one to potentially gain 5 more points.",
  },
  {
    id: "bvn",
    title: "Link your BVN",
    body: "Linking your BVN adds verified formal identity to your profile. Tap here to add it now.",
    href: "/verification/bvn",
  },
];