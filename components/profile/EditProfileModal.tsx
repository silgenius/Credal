"use client";

import { useState } from "react";
import ModalShell from "./ModalShell";
import type { ProfileData } from "@/lib/profile";

interface EditProfileModalProps {
  profile: ProfileData;
  onClose: () => void;
  onSave: (updated: ProfileData) => void;
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-ink-muted">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-2xl border border-black/10 px-4 py-3 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
      />
    </label>
  );
}

export default function EditProfileModal({
  profile,
  onClose,
  onSave,
}: EditProfileModalProps) {
  const [form, setForm] = useState(profile);
  const [saving, setSaving] = useState(false);

  function update<K extends keyof ProfileData>(key: K, value: ProfileData[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSave() {
    setSaving(true);
    // In production: PATCH the profile to your API here.
    await new Promise((resolve) => setTimeout(resolve, 500));
    onSave(form);
    setSaving(false);
    onClose();
  }

  return (
    <ModalShell title="Edit profile" onClose={onClose}>
      <div className="flex flex-col gap-4">
        <Field
          label="Full name"
          value={form.fullName}
          onChange={(v) => update("fullName", v)}
        />
        <Field
          label="Phone number"
          value={form.phone}
          onChange={(v) => update("phone", v)}
          type="tel"
        />
        <Field
          label="Email address"
          value={form.email}
          onChange={(v) => update("email", v)}
          type="email"
        />
        <Field
          label="Business name"
          value={form.businessName}
          onChange={(v) => update("businessName", v)}
        />
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="mt-6 w-full rounded-2xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save changes"}
      </button>
    </ModalShell>
  );
}