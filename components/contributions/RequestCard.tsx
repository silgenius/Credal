"use client";

import { Users, Check, X } from "lucide-react";
import {
  formatFrequency,
  type ContributionRequest,
} from "@/lib/contributions";
import { formatNaira } from "@/lib/creditScore";

export default function RequestCard({
  request,
  onAccept,
  onDecline,
}: {
  request: ContributionRequest;
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
}) {
  return (
    <div className="rounded-3xl border border-black/5 bg-white p-4 shadow-header">
      <p className="text-sm font-semibold text-ink">
        {request.contributionName}
      </p>
      <p className="mt-0.5 text-xs text-ink-muted">
        Invited by {request.invitedBy}
      </p>

      <div className="mt-2 flex items-center gap-3 text-xs text-ink-muted">
        <span>{formatNaira(request.amountPerMember)}</span>
        <span>·</span>
        <span>{formatFrequency(request.frequency)}</span>
        <span>·</span>
        <span className="flex items-center gap-1">
          <Users className="h-3.5 w-3.5" />
          {request.memberCount} members
        </span>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onDecline(request.id)}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl border border-black/10 px-4 py-2.5 text-sm font-semibold text-ink transition hover:bg-black/5"
        >
          <X className="h-4 w-4" />
          Decline
        </button>
        <button
          onClick={() => onAccept(request.id)}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600"
        >
          <Check className="h-4 w-4" />
          Accept
        </button>
      </div>
    </div>
  );
}