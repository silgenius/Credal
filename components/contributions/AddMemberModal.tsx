"use client";

import { useState } from "react";
import ModalShell from "@/components/profile/ModalShell";
import PhoneNumberField, { type PendingMember } from "./PhoneNumberField";

export default function AddMemberModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (phones: string[]) => void;
}) {
  const [pending, setPending] = useState<PendingMember[]>([]);

  function handleSave() {
    if (pending.length === 0) return;
    onAdd(pending.map((p) => p.phone));
    onClose();
  }

  return (
    <ModalShell title="Add members" onClose={onClose}>
      <PhoneNumberField
        members={pending}
        onAdd={(phone) => setPending((m) => [...m, { phone }])}
        onRemove={(phone) =>
          setPending((m) => m.filter((x) => x.phone !== phone))
        }
      />

      <button
        onClick={handleSave}
        disabled={pending.length === 0}
        className="mt-6 w-full rounded-2xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:opacity-50"
      >
        Add {pending.length > 0 ? pending.length : ""} member
        {pending.length === 1 ? "" : "s"}
      </button>
    </ModalShell>
  );
}
