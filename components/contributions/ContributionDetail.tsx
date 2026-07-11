"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, UserPlus, LogOut } from "lucide-react";

import StatusBadge from "./StatusBadge";
import CycleProgressCard from "./CycleProgressCard";
import ContributionInfoGrid from "./ContributionInfoGrid";
import MemberList from "./MemberList";
import AddMemberModal from "./AddMemberModal";
import RemoveMemberConfirm from "./RemoveMemberConfirm";
import LeaveContributionConfirm from "./LeaveContributionConfirm";
import { type Member } from "@/lib/contributions";
import { formatNaira } from "@/lib/creditScore";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  removeMemberFromContribution,
  leaveContribution,
} from "@/store/slices/contributionsSlice";

export default function ContributionDetail({ id }: { id: string }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const c = useAppSelector((s) =>
    s.contributions.contributions.find((item) => item.id === id),
  );

  const [addOpen, setAddOpen] = useState(false);
  const [removeTarget, setRemoveTarget] = useState<Member | null>(null);
  const [leaveOpen, setLeaveOpen] = useState(false);

  if (!c) {
    return (
      <main className="mx-auto max-w-md px-4 pt-10 text-center">
        <p className="text-sm text-ink-muted">Contribution not found.</p>
      </main>
    );
  }

  // Pull out primitives here so the handlers below close over plain,
  // always-defined values instead of `c` itself (TS won't carry the
  // `if (!c)` narrowing into nested function declarations).
  const contributionId = c.id;
  const contributionName = c.name;
  const canManageMembers = c.status === "pending_start" && c.createdByIsMe;
  const canLeave = c.status === "active" && !c.createdByIsMe;

  function handleRemove(member: Member) {
    dispatch(
      removeMemberFromContribution({ contributionId, memberId: member.id }),
    );
    setRemoveTarget(null);
  }

  function handleLeave() {
    // In production: call the API to leave first, then dispatch on success.
    dispatch(leaveContribution({ contributionId }));
    setLeaveOpen(false);
    router.push("/contributions");
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-md px-4 pb-10 pt-6 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/contributions")}
            aria-label="Back"
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink-muted transition hover:bg-brand-50"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-ink">{c.name}</h1>
              <StatusBadge status={c.status} />
            </div>
            {c.description && (
              <p className="text-xs text-ink-muted">{c.description}</p>
            )}
          </div>
        </div>

        <div className="mt-5 rounded-3xl bg-gradient-to-br from-brand-800 to-brand-900 p-5 text-white shadow-header">
          <p className="text-xs uppercase tracking-wide text-brand-100/80">
            Amount per cycle
          </p>
          <p className="mt-1 text-3xl font-bold tracking-tight">
            {formatNaira(c.amountPerMember)}
          </p>
        </div>

        <div className="mt-5">
          <CycleProgressCard c={c} />
        </div>

        <div className="mt-5">
          <ContributionInfoGrid c={c} />
        </div>

        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-semibold text-ink-muted">
              Members ({c.members.length})
            </p>
            {canManageMembers && (
              <button
                onClick={() => setAddOpen(true)}
                className="flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700"
              >
                <UserPlus className="h-3.5 w-3.5" />
                Add member
              </button>
            )}
          </div>

          <MemberList
            members={c.members}
            status={c.status}
            editable={canManageMembers}
            onRemove={(m) => setRemoveTarget(m)}
          />

          {canManageMembers && (
            <p className="mt-2 text-xs text-ink-muted">
              You can add or remove members until this contribution's first
              cycle begins.
            </p>
          )}
        </div>

        {canLeave && (
          <button
            onClick={() => setLeaveOpen(true)}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-red-100 bg-red-50 px-4 py-3.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
          >
            <LogOut className="h-4 w-4" />
            Leave contribution
          </button>
        )}
      </main>

      {addOpen && (
        <AddMemberModal
          contributionId={contributionId}
          onClose={() => setAddOpen(false)}
        />
      )}
      {removeTarget && (
        <RemoveMemberConfirm
          member={removeTarget}
          onClose={() => setRemoveTarget(null)}
          onConfirm={() => handleRemove(removeTarget)}
        />
      )}
      {leaveOpen && (
        <LeaveContributionConfirm
          contributionName={contributionName}
          onClose={() => setLeaveOpen(false)}
          onConfirm={handleLeave}
        />
      )}
    </div>
  );
}