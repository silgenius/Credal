"use client";

import Link from "next/link";
import { Pencil, ShieldCheck, BadgeCheck, Copy, Check } from "lucide-react";
import { useState } from "react";
import { getInitials, type ProfileData } from "@/lib/profile";
import { getRiskZone } from "@/lib/creditScore";

export default function ProfileHeader({
  profile,
  onEdit,
}: {
  profile: ProfileData;
  onEdit: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const zone = getRiskZone(profile.trustScore);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(profile.credalId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard not available — fail silently */
    }
  }

  return (
    <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-header">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 text-lg font-bold text-white">
              {getInitials(profile.fullName)}
            </div>
            {profile.verified && (
              <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-brand-500 text-white">
                <BadgeCheck className="h-3.5 w-3.5" strokeWidth={2.5} />
              </span>
            )}
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-ink">
              {profile.fullName}
            </h1>
            <p className="text-xs text-ink-muted">
              Member since {profile.memberSince}
            </p>
          </div>
        </div>

        <button
          onClick={onEdit}
          aria-label="Edit profile"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 transition hover:bg-brand-100"
        >
          <Pencil className="h-4 w-4" strokeWidth={2} />
        </button>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-medium text-brand-700 transition hover:bg-brand-100"
        >
          {profile.credalId}
          {copied ? (
            <Check className="h-3.5 w-3.5" />
          ) : (
            <Copy className="h-3.5 w-3.5 opacity-70" />
          )}
        </button>

        <Link
          href="/credal"
          className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition hover:opacity-80"
          style={{ color: zone.color, backgroundColor: zone.soft }}
        >
          <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2.25} />
          {profile.trustScore} · {zone.label}
        </Link>
      </div>
    </div>
  );
}