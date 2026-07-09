import {
  Copy,
  Check,
  Eye,
  EyeOff,
  Bell,
  ChevronRight,
  Landmark,
  History,
  Fingerprint,
  UserPlus,
  HandCoins,
  Users,
  Home,
  ShieldCheck,
  User,
  Wallet,
  Headphones,
} from "lucide-react";
import { ActivityType } from "./types";
import { ActivityItem } from "./types";

const ACTIVITY_ICON: Record<ActivityType, React.ElementType> = {
  contribution_created: HandCoins,
  contribution_joined: Users,
  endorsement: UserPlus,
  payout: Wallet,
  bvn_linked: Fingerprint,
};

export default function ActivityRow({ item }: { item: ActivityItem }) {
  const Icon = ACTIVITY_ICON[item.type];
  return (
    <li className="flex items-start gap-3 py-3">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
        <Icon className="h-4 w-4" strokeWidth={2} />
      </span>
      <div className="flex-1">
        <p className="text-sm leading-snug text-ink">{item.text}</p>
        <p className="mt-0.5 text-xs text-ink-muted">{item.time}</p>
      </div>
    </li>
  );
}