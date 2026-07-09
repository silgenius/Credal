"use client";

import ActivityRow from "@/components/home/ActivityRow";
import AccountCard from "@/components/home/AccountCard";
import Link from "next/link";
import {
  Bell,
  Landmark,
  History,
  Fingerprint,
  UserPlus,
  HandCoins,
  Users,
  Headphones,
} from "lucide-react";
import NavRail from "@/components/layout/Navrail";
import { CredalUser } from "@/components/home/types"
import { ActivityItem } from "@/components/home/types";
import ServiceTile from "@/components/home/ServiceTile";
import TrustScoreRing from "@/components/home/TrustScoreRing";

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

export default function CredalHomeScreen() {
  const user = MOCK_USER;
  return (
    <div className="min-h-screen bg-white">
      <NavRail active="/home" />

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