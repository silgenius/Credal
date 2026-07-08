"use client";

import { useState } from "react";
import Link from "next/link";
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

/* -------------------------------------------------------------------------- */
/*  Types & mock data — swap these for real data from your API layer          */
/* -------------------------------------------------------------------------- */

interface CredalUser {
  firstName: string;
  credalId: string;
  balance: number;
  trustScore: number; // 0 - 1000
}

type ActivityType =
  | "contribution_created"
  | "contribution_joined"
  | "endorsement"
  | "payout"
  | "bvn_linked";

interface ActivityItem {
  id: string;
  type: ActivityType;
  text: string;
  time: string;
}

const MOCK_USER: CredalUser = {
  firstName: "Ada",
  credalId: "CR-4F82-KX01",
  balance: 284500,
  trustScore: 712,
};

const MOCK_ACTIVITY: ActivityItem[] = [
  {
    id: "1",
    type: "contribution_created",
    text: "You created the “Market Women Ajo” contribution",
    time: "2h ago",
  },
  {
    id: "2",
    type: "endorsement",
    text: "Chinedu Okafor endorsed your trust profile",
    time: "5h ago",
  },
  {
    id: "3",
    type: "contribution_joined",
    text: "You were added to “Lagos Traders Susu”",
    time: "1d ago",
  },
  {
    id: "4",
    type: "payout",
    text: "Payout of ₦45,000 was credited to your account",
    time: "3d ago",
  },
  {
    id: "5",
    type: "bvn_linked",
    text: "BVN verification completed successfully",
    time: "6d ago",
  },
];

const ACTIVITY_ICON: Record<ActivityType, React.ElementType> = {
  contribution_created: HandCoins,
  contribution_joined: Users,
  endorsement: UserPlus,
  payout: Wallet,
  bvn_linked: Fingerprint,
};

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function formatNaira(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

function getRiskZone(score: number) {
  if (score < 334) {
    return { label: "High Risk", color: "#DC2626", soft: "#FEE2E2" };
  }
  if (score < 667) {
    return { label: "Medium Risk", color: "#D97706", soft: "#FEF3C7" };
  }
  return { label: "Low Risk", color: "#1F8B47", soft: "#DBF2E1" };
}

/* -------------------------------------------------------------------------- */
/*  Trust score ring                                                          */
/* -------------------------------------------------------------------------- */

function TrustScoreRing({ score }: { score: number }) {
  const zone = getRiskZone(score);
  const pct = Math.min(100, Math.max(0, (score / 1000) * 100));

  const size = 176;
  const stroke = 12;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;

  // three faint zone bands, drawn first, so the coloured arc reads like a
  // gauge sweeping across low / medium / high risk territory
  const bandLen = circumference / 3;
  const gap = 4; // visual gap between bands

  const dashOffset = circumference - (pct / 100) * circumference;

  return (
    <Link
      href="/credal"
      aria-label="View your Credal Trust Score details"
      className="group relative flex flex-col items-center gap-3 rounded-3xl p-2 outline-none transition focus-visible:ring-2 focus-visible:ring-brand-400"
    >
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90 transition-transform duration-300 group-active:scale-[0.97]"
        >
          {/* background zone bands */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="#FEE2E2"
            strokeWidth={stroke}
            strokeDasharray={`${bandLen - gap} ${circumference - bandLen + gap}`}
            strokeDashoffset={0}
            strokeLinecap="round"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="#FEF3C7"
            strokeWidth={stroke}
            strokeDasharray={`${bandLen - gap} ${circumference - bandLen + gap}`}
            strokeDashoffset={-bandLen}
            strokeLinecap="round"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="#DBF2E1"
            strokeWidth={stroke}
            strokeDasharray={`${bandLen - gap} ${circumference - bandLen + gap}`}
            strokeDashoffset={-bandLen * 2}
            strokeLinecap="round"
          />
          {/* progress arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={zone.color}
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            className="transition-[stroke-dashoffset] duration-700 ease-out"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold tracking-tight text-ink">
            {score}
          </span>
          <span className="text-xs text-ink-muted">out of 1000</span>
        </div>
      </div>

      <span
        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium"
        style={{ color: zone.color, backgroundColor: zone.soft }}
      >
        <ShieldCheck className="h-4 w-4" strokeWidth={2.25} />
        {zone.label}
      </span>

      <span className="flex items-center gap-0.5 text-sm font-medium text-brand-600 opacity-0 transition-opacity group-hover:opacity-100">
        View Credal score details
        <ChevronRight className="h-4 w-4" />
      </span>
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/*  ATM-style account card                                                    */
/* -------------------------------------------------------------------------- */

function AccountCard({ user }: { user: CredalUser }) {
  const [hidden, setHidden] = useState(true);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(user.credalId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard not available — fail silently */
    }
  }

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-800 via-brand-800 to-brand-900 p-6 text-white shadow-header sm:p-7">
      {/* signature "trust web" texture — faint nodes + connecting lines,
          a nod to Credal turning informal trust networks into data */}
      <svg
        aria-hidden
        className="pointer-events-none absolute -right-6 -top-6 h-48 w-48 opacity-[0.16]"
        viewBox="0 0 200 200"
        fill="none"
      >
        <g stroke="white" strokeWidth="1">
          <line x1="20" y1="40" x2="90" y2="20" />
          <line x1="90" y1="20" x2="150" y2="55" />
          <line x1="90" y1="20" x2="70" y2="90" />
          <line x1="150" y1="55" x2="70" y2="90" />
          <line x1="70" y1="90" x2="30" y2="120" />
          <line x1="150" y1="55" x2="160" y2="130" />
          <line x1="70" y1="90" x2="160" y2="130" />
        </g>
        <g fill="white">
          <circle cx="20" cy="40" r="4" />
          <circle cx="90" cy="20" r="5" />
          <circle cx="150" cy="55" r="4" />
          <circle cx="70" cy="90" r="6" />
          <circle cx="30" cy="120" r="3" />
          <circle cx="160" cy="130" r="4" />
        </g>
      </svg>

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-brand-100/80">
            Credal ID
          </p>
          <button
            onClick={handleCopy}
            className="mt-1 flex items-center gap-2 rounded-lg text-sm font-medium tracking-wide text-white/95 transition hover:text-brand-100"
            aria-label="Copy Credal ID to clipboard"
          >
            {user.credalId}
            {copied ? (
              <Check className="h-4 w-4 text-brand-200" />
            ) : (
              <Copy className="h-4 w-4 opacity-80" />
            )}
          </button>
        </div>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide">
          Credal
        </span>
      </div>

      <div className="relative mt-8">
        <p className="text-xs font-medium uppercase tracking-wide text-brand-100/80">
          Available balance
        </p>
        <div className="mt-1 flex items-center gap-3">
          <span className="text-3xl font-bold tracking-tight sm:text-4xl">
            {hidden ? "₦ •••,•••" : formatNaira(user.balance)}
          </span>
          <button
            onClick={() => setHidden((v) => !v)}
            aria-label={hidden ? "Show balance" : "Hide balance"}
            className="rounded-full p-1.5 text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            {hidden ? (
              <Eye className="h-5 w-5" />
            ) : (
              <EyeOff className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <div className="relative mt-7 flex items-center justify-between border-t border-white/10 pt-4">
        <div>
          <p className="text-xs text-brand-100/70">Account name</p>
          <p className="text-sm font-medium">{user.firstName} Balogun</p>
        </div>
        <div className="h-8 w-12 rounded-md bg-gradient-to-br from-brand-300 to-brand-500 opacity-90" />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Services grid                                                             */
/* -------------------------------------------------------------------------- */

function ServiceTile({
  icon: Icon,
  label,
  href,
}: {
  icon: React.ElementType;
  label: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col items-center gap-2 rounded-2xl p-3 text-center transition hover:bg-brand-50 active:scale-[0.97]"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 transition group-hover:bg-brand-100">
        <Icon className="h-5 w-5" strokeWidth={2} />
      </span>
      <span className="text-xs font-medium leading-tight text-ink">
        {label}
      </span>
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/*  Recent activity                                                           */
/* -------------------------------------------------------------------------- */

function ActivityRow({ item }: { item: ActivityItem }) {
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

/* -------------------------------------------------------------------------- */
/*  Bottom pill nav (mobile) / side rail (desktop)                            */
/* -------------------------------------------------------------------------- */

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/credal", label: "Credal", icon: ShieldCheck },
  { href: "/contributions", label: "Active", icon: Users },
  { href: "/profile", label: "Profile", icon: User },
];

function NavRail({ active = "/" }: { active?: string }) {
  return (
    <>
      {/* Mobile: floating pill nav, bottom of screen */}
      <nav
        className="fixed inset-x-4 bottom-4 z-40 flex items-center justify-between rounded-full border border-black/5 bg-white/95 px-2 py-2 shadow-header backdrop-blur md:hidden"
        aria-label="Primary"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = item.href === active;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-1 flex-col items-center gap-0.5 rounded-full py-2 text-[11px] font-medium transition ${
                isActive
                  ? "bg-brand-500 text-white"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              <item.icon className="h-5 w-5" strokeWidth={2.2} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Desktop / tablet: fixed left rail */}
      <nav
        className="fixed inset-y-0 left-0 z-40 hidden w-20 flex-col items-center gap-1 border-r border-black/5 bg-white py-8 md:flex lg:w-60 lg:items-stretch lg:px-4"
        aria-label="Primary"
      >
        <div className="mb-8 flex items-center gap-2 px-2 lg:px-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 text-sm font-bold text-white">
            C
          </span>
          <span className="hidden text-lg font-bold tracking-tight text-ink lg:inline">
            Credal
          </span>
        </div>
        {NAV_ITEMS.map((item) => {
          const isActive = item.href === active;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition lg:px-4 ${
                isActive
                  ? "bg-brand-50 text-brand-700"
                  : "text-ink-muted hover:bg-brand-50/60 hover:text-ink"
              }`}
            >
              <item.icon className="h-5 w-5 shrink-0" strokeWidth={2.2} />
              <span className="hidden lg:inline">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function CredalHomeScreen() {
  const user = MOCK_USER;

  return (
    <div className="min-h-screen bg-white">
      <NavRail active="/" />

      <main className="mx-auto max-w-container px-4 pb-28 pt-6 sm:px-6 md:pl-28 md:pr-8 lg:pl-[15.5rem] lg:pr-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-muted">Good morning</p>
            <h1 className="text-xl font-bold tracking-tight text-ink">
              {user.firstName} 👋
            </h1>
          </div>
          <button
            aria-label="Notifications"
            className="relative flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-brand-700 transition hover:bg-brand-100"
          >
            <Bell className="h-5 w-5" strokeWidth={2} />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-500" />
          </button>
        </div>

        {/* Account card */}
        <div className="mt-5">
          <AccountCard user={user} />
        </div>

        {/* Quick actions */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Link
            href="/contributions/new"
            className="flex items-center justify-center gap-2 rounded-2xl bg-brand-500 px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-600 active:scale-[0.98]"
          >
            <HandCoins className="h-5 w-5" />
            Create contribution
          </Link>
          <Link
            href="/contributions"
            className="flex items-center justify-center gap-2 rounded-2xl border border-brand-200 bg-white px-4 py-3.5 text-sm font-semibold text-brand-700 transition hover:bg-brand-50 active:scale-[0.98]"
          >
            <Users className="h-5 w-5" />
            View active
          </Link>
        </div>

        {/* Trust score */}
        <section className="mt-8 flex flex-col items-center rounded-3xl border border-black/5 bg-white px-4 py-7 shadow-header sm:px-8">
          <p className="mb-1 text-sm font-medium text-ink-muted">
            Your Credal Trust Score
          </p>
          <TrustScoreRing score={user.trustScore} />
        </section>

        {/* Services */}
        <section className="mt-8">
          <h2 className="mb-3 text-sm font-semibold text-ink-muted">
            Services
          </h2>
          <div className="grid grid-cols-4 gap-1 rounded-3xl border border-black/5 bg-white p-3 shadow-header sm:grid-cols-5">
            <ServiceTile icon={Landmark} label="Connect bank" href="/banking/connect" />
            <ServiceTile icon={History} label="Payment history" href="/payments/history" />
            <ServiceTile icon={Fingerprint} label="Link BVN" href="/verification/bvn" />
            <ServiceTile icon={UserPlus} label="Endorsements" href="/endorsements" />
            <ServiceTile icon={Headphones} label="Support" href="/support" />
          </div>
        </section>

        {/* Recent activity */}
        <section className="mt-8 mb-6">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-ink-muted">
              Recent activity
            </h2>
            <Link
              href="/activity"
              className="text-xs font-medium text-brand-600 hover:text-brand-700"
            >
              See all
            </Link>
          </div>
          <ul className="divide-y divide-black/5 rounded-3xl border border-black/5 bg-white px-4 shadow-header">
            {MOCK_ACTIVITY.map((item) => (
              <ActivityRow key={item.id} item={item} />
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}