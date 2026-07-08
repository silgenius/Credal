"use client";

import { useState } from "react";
import Link from "next/link";
import { Share2, FileText } from "lucide-react";
import ShareScoreModal from "./Sharescoremodal";

export default function ShareApplyActions({ credalId }: { credalId: string }) {
  const [shareOpen, setShareOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={() => setShareOpen(true)}
        className="flex items-center justify-center gap-2 rounded-2xl bg-brand-500 px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-600 active:scale-[0.98]"
      >
        <Share2 className="h-4 w-4" />
        Share my score with a lender
      </button>

      <Link
        href="/loans/apply"
        className="flex items-center justify-center gap-2 rounded-2xl border border-brand-200 bg-white px-4 py-3.5 text-sm font-semibold text-brand-700 transition hover:bg-brand-50 active:scale-[0.98]"
      >
        <FileText className="h-4 w-4" />
        Apply for a loan
      </Link>

      {shareOpen && (
        <ShareScoreModal
          credalId={credalId}
          onClose={() => setShareOpen(false)}
        />
      )}
    </div>
  );
}