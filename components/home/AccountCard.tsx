import { useState } from "react";
import { CredalUser } from "./types";
import formatNaira from "./formatNaira";

import { EyeOff, Check, Copy, Eye } from "lucide-react";

export default function AccountCard({ user }: { user: CredalUser }) {
  const [hidden, setHidden] = useState(true);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(user.credalId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard not available — fail silently */
    }
  }

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-800 via-brand-800 to-brand-900 p-6 text-white shadow-header sm:p-7">
      {/* signature "trust web" texture — faint nodes + connecting lines,
          a nod to Credal turning informal trust networks into data */}
      <svg
        aria-hidden
        className="pointer-events-none absolute -right-6 -top-6 h-48 w-48 opacity-[0.16]"
        viewBox="0 0 200 200"
        fill="none"
      >
        <g stroke="white" strokeWidth="1">
          <line x1="20" y1="40" x2="90" y2="20" />
          <line x1="90" y1="20" x2="150" y2="55" />
          <line x1="90" y1="20" x2="70" y2="90" />
          <line x1="150" y1="55" x2="70" y2="90" />
          <line x1="70" y1="90" x2="30" y2="120" />
          <line x1="150" y1="55" x2="160" y2="130" />
          <line x1="70" y1="90" x2="160" y2="130" />
        </g>
        <g fill="white">
          <circle cx="20" cy="40" r="4" />
          <circle cx="90" cy="20" r="5" />
          <circle cx="150" cy="55" r="4" />
          <circle cx="70" cy="90" r="6" />
          <circle cx="30" cy="120" r="3" />
          <circle cx="160" cy="130" r="4" />
        </g>
      </svg>

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-brand-100/80">
            Credal ID
          </p>
          <button
            onClick={handleCopy}
            className="mt-1 flex items-center gap-2 rounded-lg text-sm font-medium tracking-wide text-white/95 transition hover:text-brand-100"
            aria-label="Copy Credal ID to clipboard"
          >
            {user.credalId}
            {copied ? (
              <Check className="h-4 w-4 text-brand-200" />
            ) : (
              <Copy className="h-4 w-4 opacity-80" />
            )}
          </button>
        </div>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide">
          Credal
        </span>
      </div>

      <div className="relative mt-8">
        <p className="text-xs font-medium uppercase tracking-wide text-brand-100/80">
          Available balance
        </p>
        <div className="mt-1 flex items-center gap-3">
          <span className="text-3xl font-bold tracking-tight sm:text-4xl">
            {hidden ? "₦ ••••••" : formatNaira(user.balance)}
          </span>
          <button
            onClick={() => setHidden((v) => !v)}
            aria-label={hidden ? "Show balance" : "Hide balance"}
            className="rounded-full p-1.5 text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            {hidden ? (
              <Eye className="h-5 w-5" />
            ) : (
              <EyeOff className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <div className="relative mt-7 flex items-center justify-between border-t border-white/10 pt-4">
        <div>
          <p className="text-xs text-brand-100/70">Account name</p>
          <p className="text-sm font-medium">{user.firstName} Balogun</p>
        </div>
        <div className="h-8 w-12 rounded-md bg-gradient-to-br from-brand-300 to-brand-500 opacity-90" />
      </div>
    </div>
  );
}
