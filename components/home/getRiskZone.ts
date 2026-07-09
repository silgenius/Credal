export default function getRiskZone(score: number) {
  if (score < 334) {
    return { label: "High Risk", color: "#DC2626", soft: "#FEE2E2" };
  }
  if (score < 667) {
    return { label: "Medium Risk", color: "#D97706", soft: "#FEF3C7" };
  }
  return { label: "Low Risk", color: "#1F8B47", soft: "#DBF2E1" };
}
