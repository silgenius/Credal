import { Crown, Check, Clock, Trash2 } from "lucide-react";
import type { Member, ContributionStatus } from "@/lib/contributions";

export default function MemberList({
  members,
  status,
  editable,
  onRemove,
}: {
  members: Member[];
  status: ContributionStatus;
  editable: boolean;
  onRemove?: (member: Member) => void;
}) {
  return (
    <div className="rounded-3xl border border-black/5 bg-white p-2 shadow-header">
      <ul className="divide-y divide-black/5">
        {members
          .slice()
          .sort((a, b) => a.turnPosition - b.turnPosition)
          .map((m) => (
            <li key={m.id} className="flex items-center gap-3 px-3 py-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-300 to-brand-600 text-xs font-bold text-white">
                {m.avatarInitials}
              </span>

              <div className="flex-1">
                <p className="flex items-center gap-1.5 text-sm font-medium text-ink">
                  {m.name}
                  {m.isMe && (
                    <span className="rounded-full bg-brand-50 px-1.5 py-0.5 text-[10px] font-semibold text-brand-700">
                      You
                    </span>
                  )}
                  {m.isCreator && (
                    <Crown
                      className="h-3.5 w-3.5 text-amber-500"
                      aria-label="Creator"
                    />
                  )}
                </p>
                <p className="mt-0.5 text-xs text-ink-muted">
                  Turn {m.turnPosition}
                </p>
              </div>

              {status === "active" &&
                (m.hasPaidCurrentCycle ? (
                  <span className="flex items-center gap-1 rounded-full bg-brand-50 px-2 py-1 text-[11px] font-medium text-brand-700">
                    <Check className="h-3 w-3" />
                    Paid
                  </span>
                ) : (
                  <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-[11px] font-medium text-amber-700">
                    <Clock className="h-3 w-3" />
                    Pending
                  </span>
                ))}

              {editable && !m.isCreator && onRemove && (
                <button
                  onClick={() => onRemove(m)}
                  aria-label={`Remove ${m.name}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-ink-muted transition hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}
