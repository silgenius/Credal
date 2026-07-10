"use client";

import { LogOut } from "lucide-react";
import ModalShell from "@/components/profile/ModalShell";

export default function LeaveContributionConfirm({
  contributionName,
  onClose,
  onConfirm,
}: {
  contributionName: string;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <ModalShell title="Leave contribution" onClose={onClose}>
      <div className="flex flex-col items-center py-2 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
          <LogOut className="h-6 w-6" strokeWidth={2} />
        </span>
        <p className="mt-4 text-sm text-ink-muted">
          Leave{" "}
          <span className="font-semibold text-ink">{contributionName}</span>?
          If cycles have already started, please settle any outstanding
          payments with the group first.
        </p>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 rounded-2xl border border-black/10 px-4 py-3 text-sm font-semibold text-ink transition hover:bg-brand-50/50"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 rounded-2xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
        >
          Leave
        </button>
      </div>
    </ModalShell>
  );
}
