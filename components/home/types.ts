export interface CredalUser {
  firstName: string;
  credalId: string;
  balance: number;
  trustScore: number; // 0 - 1000
}

export type ActivityType =
  | "contribution_created"
  | "contribution_joined"
  | "endorsement"
  | "payout"
  | "bvn_linked";

export interface ActivityItem {
  id: string;
  type: ActivityType;
  text: string;
  time: string;
}