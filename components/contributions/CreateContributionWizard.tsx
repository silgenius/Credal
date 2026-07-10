"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Users } from "lucide-react";

import FrequencySelector from "./FrequencySelector";
import PhoneNumberField, { type PendingMember } from "./PhoneNumberField";
import {
  formatFrequency,
  formatPhoneDisplay,
  estimatedPool,
  type Frequency,
} from "@/lib/contributions";
import { formatNaira } from "@/lib/creditScore";

const STEPS = ["Basics", "Schedule", "Members", "Review"] as const;

export default function CreateContributionWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [frequency, setFrequency] = useState<Frequency>({ type: "monthly" });
  const [startDate, setStartDate] = useState("");
  const [members, setMembers] = useState<PendingMember[]>([]);

  const canContinue = [
    name.trim().length > 0,
    Number(amount) > 0 && startDate.length > 0,
    members.length >= 1,
    true,
  ][step];

  function next() {
    if (step < STEPS.length - 1) setStep(step + 1);
  }
  function back() {
    if (step > 0) setStep(step - 1);
  }

  async function handleCreate() {
    setSubmitting(true);
    // In production: POST the new contribution to your API here.
    await new Promise((resolve) => setTimeout(resolve, 700));
    router.push("/contributions");
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-md px-4 pb-10 pt-6 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => (step === 0 ? router.push("/contributions") : back())}
            aria-label="Back"
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink-muted transition hover:bg-brand-50"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <p className="text-xs text-ink-muted">
              Step {step + 1} of {STEPS.length}
            </p>
            <h1 className="text-lg font-bold text-ink">{STEPS[step]}</h1>
          </div>
        </div>

        <div className="mt-4 flex gap-1.5">
          {STEPS.map((s, i) => (
            <span
              key={s}
              className={`h-1.5 flex-1 rounded-full ${
                i <= step ? "bg-brand-500" : "bg-brand-100"
              }`}
            />
          ))}
        </div>

        <div className="mt-6">
          {step === 0 && (
            <div className="flex flex-col gap-4">
              <label className="block">
                <span className="text-xs font-medium text-ink-muted">
                  Contribution name
                </span>
                <input
                  type="text"
                  placeholder="e.g. Market Women Ajo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-2xl border border-black/10 px-4 py-3 text-sm text-ink outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-ink-muted">
                  Description (optional)
                </span>
                <textarea
                  placeholder="What's this contribution for?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="mt-1 w-full resize-none rounded-2xl border border-black/10 px-4 py-3 text-sm text-ink outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                />
              </label>
            </div>
          )}

          {step === 1 && (
            <div className="flex flex-col gap-5">
              <label className="block">
                <span className="text-xs font-medium text-ink-muted">
                  Amount per member, per cycle
                </span>
                <div className="mt-1 flex items-center rounded-2xl border border-black/10 px-4 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100">
                  <span className="text-sm text-ink-muted">₦</span>
                  <input
                    type="number"
                    min={0}
                    placeholder="15,000"
                    value={amount}
                    onChange={(e) =>
                      setAmount(e.target.value ? Number(e.target.value) : "")
                    }
                    className="w-full bg-transparent py-3 pl-2 text-sm text-ink outline-none"
                  />
                </div>
              </label>

              <FrequencySelector value={frequency} onChange={setFrequency} />

              <label className="block">
                <span className="text-xs font-medium text-ink-muted">
                  Start date
                </span>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mt-1 w-full rounded-2xl border border-black/10 px-4 py-3 text-sm text-ink outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                />
              </label>
            </div>
          )}

          {step === 2 && (
            <div>
              <PhoneNumberField
                members={members}
                onAdd={(phone) => setMembers((m) => [...m, { phone }])}
                onRemove={(phone) =>
                  setMembers((m) => m.filter((x) => x.phone !== phone))
                }
              />
              <p className="mt-4 flex items-center gap-1.5 rounded-2xl bg-brand-50 px-3 py-2.5 text-xs text-brand-700">
                <Users className="h-3.5 w-3.5 shrink-0" />
                You'll be added automatically as the creator and first
                administrator.
              </p>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-4">
              <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-header">
                <p className="text-base font-bold text-ink">{name}</p>
                {description && (
                  <p className="mt-1 text-sm text-ink-muted">{description}</p>
                )}

                <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="text-xs text-ink-muted">Amount</dt>
                    <dd className="font-medium text-ink">
                      {formatNaira(Number(amount) || 0)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-ink-muted">Frequency</dt>
                    <dd className="font-medium text-ink">
                      {formatFrequency(frequency)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-ink-muted">Start date</dt>
                    <dd className="font-medium text-ink">
                      {startDate || "-"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-ink-muted">Members</dt>
                    <dd className="font-medium text-ink">
                      {members.length + 1} (incl. you)
                    </dd>
                  </div>
                </dl>

                <div className="mt-4 flex items-center justify-between rounded-2xl bg-brand-50 px-4 py-3">
                  <span className="text-sm text-brand-700">
                    Estimated pool per cycle
                  </span>
                  <span className="text-base font-bold text-brand-700">
                    {formatNaira(
                      estimatedPool(Number(amount) || 0, members.length + 1),
                    )}
                  </span>
                </div>
              </div>

              {members.length > 0 && (
                <div className="rounded-3xl border border-black/5 bg-white p-4 shadow-header">
                  <p className="mb-2 text-xs font-semibold text-ink-muted">
                    Invited members
                  </p>
                  <ul className="flex flex-col gap-1.5">
                    {members.map((m) => (
                      <li key={m.phone} className="text-sm text-ink">
                        {formatPhoneDisplay(m.phone)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-8 flex gap-3">
          {step > 0 && (
            <button
              onClick={back}
              className="flex-1 rounded-2xl border border-black/10 px-4 py-3.5 text-sm font-semibold text-ink transition hover:bg-brand-50/50"
            >
              Back
            </button>
          )}
          {step < STEPS.length - 1 ? (
            <button
              onClick={next}
              disabled={!canContinue}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl bg-brand-500 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:opacity-50"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleCreate}
              disabled={submitting}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl bg-brand-500 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:opacity-60"
            >
              <Check className="h-4 w-4" />
              {submitting ? "Creating..." : "Create contribution"}
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
