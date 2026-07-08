"use client";

import { useState } from "react";
import { X, Copy, Check, Link2 } from "lucide-react";

interface ShareScoreModalProps {
  credalId: string;
  onClose: () => void;
}

/**
 * Deterministic pseudo-QR grid generated from the Credal ID.
 * This is a visual placeholder — swap for a real QR library (e.g. `qrcode`)
 * once this screen is wired to the live share-link endpoint.
 */
function PseudoQr({ seed }: { seed: string }) {
  const size = 9;
  const cells: boolean[] = [];
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  for (let i = 0; i < size * size; i++) {
    hash = (hash * 1103515245 + 12345) >>> 0;
    cells.push((hash >>> 16) % 3 !== 0);
  }

  return (
    <div
      className="grid gap-[3px] rounded-xl bg-white p-3"
      style={{ gridTemplateColumns: `repeat(${size}, 1fr)`, width: 176 }}
    >
      {cells.map((on, i) => (
        <div
          key={i}
          className={`aspect-square rounded-[2px] ${on ? "bg-ink" : "bg-transparent"}`}
        />
      ))}
    </div>
  );
}

export default function ShareScoreModal({
  credalId,
  onClose,
}: ShareScoreModalProps) {
  const [copied, setCopied] = useState(false);
  const shareLink = `https://credal.app/verify/${credalId}`;

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard not available — fail silently */
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Share your Credal score"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-t-3xl bg-white p-6 shadow-header sm:rounded-3xl"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-ink">Share with a lender</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-full text-ink-muted transition hover:bg-brand-50 hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-1 text-sm text-ink-muted">
          Let a lender scan this code or open the link to pull your Credal
          score report.
        </p>

        <div className="mt-5 flex justify-center rounded-2xl bg-brand-50 py-5">
          <PseudoQr seed={credalId} />
        </div>

        <div className="mt-5">
          <p className="text-xs font-medium uppercase tracking-wide text-ink-muted">
            Credal ID
          </p>
          <p className="mt-1 text-sm font-semibold text-ink">{credalId}</p>
        </div>

        <button
          onClick={handleCopyLink}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-brand-200 bg-white px-4 py-3 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              Link copied
            </>
          ) : (
            <>
              <Link2 className="h-4 w-4" />
              Copy shareable link
            </>
          )}
        </button>
      </div>
    </div>
  );
}