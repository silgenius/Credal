"use client";

import { useState } from "react";
import { Check, ShieldAlert } from "lucide-react";
import ModalShell from "./ModalShell";
import PinCodeInput from "./PinCodeInput";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updatePin } from "@/store/slices/authSlice";

type Step = "current" | "new" | "confirm" | "success";

const STEP_COPY: Record<Exclude<Step, "success">, string> = {
  current: "Enter your current 6-digit PIN",
  new: "Choose a new 6-digit PIN",
  confirm: "Re-enter your new PIN to confirm",
};

export default function ChangePinModal({ onClose }: { onClose: () => void }) {
  const dispatch = useAppDispatch();
  const storedPin = useAppSelector((s) => s.auth.pin);

  const [step, setStep] = useState<Step>("current");
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleContinue() {
    setError(null);

    if (step === "current") {
      if (currentPin.length !== 6) {
        setError("Enter your 6-digit PIN to continue.");
        return;
      }
      if (storedPin && currentPin !== storedPin) {
        setError("That PIN doesn't match your current PIN.");
        return;
      }
      setStep("new");
      return;
    }

    if (step === "new") {
      if (newPin.length !== 6) {
        setError("Your new PIN must be 6 digits.");
        return;
      }
      if (newPin === currentPin) {
        setError("Your new PIN must be different from your current PIN.");
        return;
      }
      setStep("confirm");
      return;
    }

    if (step === "confirm") {
      if (confirmPin !== newPin) {
        setError("PINs don't match. Try again.");
        setConfirmPin("");
        return;
      }
      dispatch(updatePin(newPin));
      setStep("success");
    }
  }

  if (step === "success") {
    return (
      <ModalShell title="PIN updated" onClose={onClose}>
        <div className="flex flex-col items-center py-4 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-600">
            <Check className="h-7 w-7" strokeWidth={2.5} />
          </span>
          <p className="mt-4 text-sm text-ink-muted">
            Your transaction PIN has been changed successfully.
          </p>
          <button
            onClick={onClose}
            className="mt-6 w-full rounded-2xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
          >
            Done
          </button>
        </div>
      </ModalShell>
    );
  }

  const pinValue =
    step === "current" ? currentPin : step === "new" ? newPin : confirmPin;
  const setPinValue =
    step === "current" ? setCurrentPin : step === "new" ? setNewPin : setConfirmPin;

  return (
    <ModalShell title="Change PIN" onClose={onClose}>
      <p className="text-center text-sm text-ink-muted">{STEP_COPY[step]}</p>

      <div className="mt-6">
        <PinCodeInput value={pinValue} onChange={setPinValue} autoFocus />
      </div>

      {error && (
        <p className="mt-4 flex items-center justify-center gap-1.5 text-xs font-medium text-red-600">
          <ShieldAlert className="h-3.5 w-3.5" />
          {error}
        </p>
      )}

      <button
        onClick={handleContinue}
        className="mt-6 w-full rounded-2xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:opacity-50"
        disabled={pinValue.length !== 6}
      >
        {step === "confirm" ? "Confirm new PIN" : "Continue"}
      </button>

      <div className="mt-4 flex justify-center gap-1.5">
        {(["current", "new", "confirm"] as const).map((s) => (
          <span
            key={s}
            className={`h-1.5 w-6 rounded-full ${
              s === step ? "bg-brand-500" : "bg-brand-100"
            }`}
          />
        ))}
      </div>
    </ModalShell>
  );
}