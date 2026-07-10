/**
 * Shared types + mock data for contributions (Ajo/Susu/Stokvel-style savings circles).
 * Swap the MOCK_* constants for real API data once wired up.
 */

export type FrequencyType = "daily" | "weekly" | "monthly" | "custom";

export interface Frequency {
  type: FrequencyType;
  /** Only used when type === "custom", e.g. 14 for "every 14 days" */
  customDays?: number;
}

export function formatFrequency(freq: Frequency): string {
  switch (freq.type) {
    case "daily":
      return "Daily";
    case "weekly":
      return "Weekly";
    case "monthly":
      return "Monthly";
    case "custom":
      return `Every ${freq.customDays ?? "-"} days`;
  }
}

export type ContributionStatus =
  | "pending_start"
  | "active"
  | "completed"
  | "cancelled";

export const STATUS_META: Record<
  ContributionStatus,
  { label: string; color: string; soft: string }
> = {
  pending_start: { label: "Starting soon", color: "#5B6B62", soft: "#EEF9F1" },
  active: { label: "Active", color: "#D97706", soft: "#FEF3C7" },
  completed: { label: "Completed", color: "#1F8B47", soft: "#DBF2E1" },
  cancelled: { label: "Cancelled", color: "#DC2626", soft: "#FEE2E2" },
};

export interface Member {
  id: string;
  name: string;
  /** last 10 digits, no leading 0 or country code */
  phone: string;
  avatarInitials: string;
  turnPosition: number;
  hasPaidCurrentCycle: boolean;
  isCreator?: boolean;
  isMe?: boolean;
}

export interface Contribution {
  id: string;
  name: string;
  description?: string;
  amountPerMember: number;
  frequency: Frequency;
  startDate: string;
  endDate: string;
  status: ContributionStatus;
  createdBy: string;
  createdByIsMe: boolean;
  members: Member[];
  currentCycle: number;
  totalCycles: number;
}

export function formatDate(iso: string) {
  if (!iso) return "-";
  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

export function cleanPhoneDigits(input: string) {
  return input.replace(/\D/g, "").slice(0, 10);
}

export function formatPhoneDisplay(last10: string) {
  const p = last10.padEnd(10, "•");
  return `0${p.slice(0, 3)} ${p.slice(3, 6)} ${p.slice(6, 10)}`;
}

export function isValidPhone(last10: string) {
  return /^\d{10}$/.test(last10);
}

export function getTurnLabel(c: Contribution) {
  const me = c.members.find((m) => m.isMe);
  if (!me) return null;
  const diff = me.turnPosition - c.currentCycle;
  if (c.status !== "active") return null;
  if (diff === 0) return "It's your turn this cycle";
  if (diff < 0) return "Your turn has passed this cycle";
  return `Your turn: cycle ${me.turnPosition} of ${c.totalCycles}`;
}

export function estimatedPool(amountPerMember: number, memberCount: number) {
  return amountPerMember * memberCount;
}

/* -------------------------------------------------------------------------- */
/*  Mock data                                                                  */
/* -------------------------------------------------------------------------- */

function makeMembers(
  names: [string, string][],
  meIndex: number,
  paidUpTo: number,
  creatorIndex = 0,
): Member[] {
  return names.map(([name, phone], i) => ({
    id: `m${i + 1}`,
    name,
    phone,
    avatarInitials: name
      .split(" ")
      .map((p) => p[0])
      .join("")
      .toUpperCase()
      .slice(0, 2),
    turnPosition: i + 1,
    hasPaidCurrentCycle: i < paidUpTo,
    isCreator: i === creatorIndex,
    isMe: i === meIndex,
  }));
}

export const MOCK_CONTRIBUTIONS: Contribution[] = [
  {
    id: "market-women-ajo",
    name: "Market Women Ajo",
    description: "Weekly contribution for the fabric sellers' wing",
    amountPerMember: 15000,
    frequency: { type: "weekly" },
    startDate: "2026-04-06",
    endDate: "2026-06-08",
    status: "active",
    createdBy: "Ada Balogun",
    createdByIsMe: true,
    currentCycle: 6,
    totalCycles: 10,
    members: makeMembers(
      [
        ["Ada Balogun", "8032147765"],
        ["Chinedu Okafor", "8123456789"],
        ["Bisi Adewale", "9081234567"],
        ["Femi Johnson", "7011122233"],
        ["Grace Nwosu", "8155566677"],
        ["Musa Ibrahim", "9021239876"],
      ],
      0,
      5,
      0,
    ),
  },
  {
    id: "lagos-traders-susu",
    name: "Lagos Traders Susu",
    description: "Monthly Susu for the electronics traders",
    amountPerMember: 30000,
    frequency: { type: "monthly" },
    startDate: "2025-06-01",
    endDate: "2026-05-01",
    status: "active",
    createdBy: "Chinedu Okafor",
    createdByIsMe: false,
    currentCycle: 8,
    totalCycles: 12,
    members: makeMembers(
      [
        ["Chinedu Okafor", "8123456789"],
        ["Ada Balogun", "8032147765"],
        ["Tunde Bakare", "8067788990"],
        ["Halima Suleiman", "9099887766"],
      ],
      1,
      7,
      0,
    ),
  },
  {
    id: "weekend-contributors",
    name: "Weekend Contributors Circle",
    description: "Every 14 days, small business owners",
    amountPerMember: 10000,
    frequency: { type: "custom", customDays: 14 },
    startDate: "2026-07-20",
    endDate: "2026-11-16",
    status: "pending_start",
    createdBy: "Ada Balogun",
    createdByIsMe: true,
    currentCycle: 0,
    totalCycles: 8,
    members: makeMembers(
      [
        ["Ada Balogun", "8032147765"],
        ["Grace Nwosu", "8155566677"],
        ["Femi Johnson", "7011122233"],
      ],
      0,
      0,
      0,
    ),
  },
  {
    id: "balogun-fabric-sellers",
    name: "Balogun Fabric Sellers Stokvel",
    amountPerMember: 27500,
    frequency: { type: "monthly" },
    startDate: "2025-03-01",
    endDate: "2025-11-01",
    status: "completed",
    createdBy: "Ada Balogun",
    createdByIsMe: true,
    currentCycle: 8,
    totalCycles: 8,
    members: makeMembers(
      [
        ["Ada Balogun", "8032147765"],
        ["Bisi Adewale", "9081234567"],
        ["Musa Ibrahim", "9021239876"],
      ],
      0,
      8,
      0,
    ),
  },
];

export interface ContributionRequest {
  id: string;
  contributionName: string;
  invitedBy: string;
  amountPerMember: number;
  frequency: Frequency;
  memberCount: number;
  createdAt: string;
}

export const MOCK_REQUESTS: ContributionRequest[] = [
  {
    id: "req-1",
    contributionName: "Yaba Tech Hub Contributors",
    invitedBy: "Halima Suleiman",
    amountPerMember: 20000,
    frequency: { type: "monthly" },
    memberCount: 5,
    createdAt: "2026-07-08",
  },
  {
    id: "req-2",
    contributionName: "Daily Bread Susu",
    invitedBy: "Tunde Bakare",
    amountPerMember: 2000,
    frequency: { type: "daily" },
    memberCount: 10,
    createdAt: "2026-07-09",
  },
];