/**
 * Shared types + mock data for the Profile page.
 * Swap the MOCK_* constants for real API/session data once wired up.
 */

export interface ProfileData {
  fullName: string;
  credalId: string;
  phone: string;
  email: string;
  businessName: string;
  memberSince: string;
  trustScore: number;
  verified: boolean;
}

export const MOCK_PROFILE: ProfileData = {
  fullName: "Ada Balogun",
  credalId: "CR-4F82-KX01",
  phone: "+234 803 214 7765",
  email: "ada.balogun@email.com",
  businessName: "Ada's Fabrics, Balogun Market",
  memberSince: "March 2025",
  trustScore: 781,
  verified: true,
};

export function getInitials(fullName: string) {
  return fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export type ContributionStatus = "active" | "completed" | "defaulted";

export interface ContributionHistoryItem {
  id: string;
  name: string;
  status: ContributionStatus;
  amount: number;
  progressLabel: string;
  date: string;
}

export const MOCK_CONTRIBUTION_HISTORY: ContributionHistoryItem[] = [
  {
    id: "c1",
    name: "Market Women Ajo",
    status: "active",
    amount: 150000,
    progressLabel: "6 of 10 cycles",
    date: "Started Apr 2026",
  },
  {
    id: "c2",
    name: "Lagos Traders Susu",
    status: "completed",
    amount: 90000,
    progressLabel: "12 of 12 cycles",
    date: "Completed Jan 2026",
  },
  {
    id: "c3",
    name: "Balogun Fabric Sellers Stokvel",
    status: "completed",
    amount: 220000,
    progressLabel: "8 of 8 cycles",
    date: "Completed Nov 2025",
  },
  {
    id: "c4",
    name: "Weekend Contributors Circle",
    status: "defaulted",
    amount: 40000,
    progressLabel: "3 of 8 cycles",
    date: "Exited Jul 2025",
  },
];

export const STATUS_STYLES: Record<
  ContributionStatus,
  { label: string; color: string; soft: string }
> = {
  active: { label: "Active", color: "#D97706", soft: "#FEF3C7" },
  completed: { label: "Completed", color: "#1F8B47", soft: "#DBF2E1" },
  defaulted: { label: "Defaulted", color: "#DC2626", soft: "#FEE2E2" },
};