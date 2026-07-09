"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface MenuItemProps {
  icon: React.ElementType;
  label: string;
  subtitle?: string;
  href?: string;
  onClick?: () => void;
  destructive?: boolean;
  trailing?: React.ReactNode;
}

export default function MenuItem({
  icon: Icon,
  label,
  subtitle,
  href,
  onClick,
  destructive = false,
  trailing,
}: MenuItemProps) {
  const content = (
    <>
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${
          destructive ? "bg-red-50 text-red-600" : "bg-brand-50 text-brand-600"
        }`}
      >
        <Icon className="h-5 w-5" strokeWidth={2} />
      </span>
      <div className="flex-1 text-left">
        <p
          className={`text-sm font-medium ${
            destructive ? "text-red-600" : "text-ink"
          }`}
        >
          {label}
        </p>
        {subtitle && (
          <p className="mt-0.5 text-xs text-ink-muted">{subtitle}</p>
        )}
      </div>
      {trailing ?? (
        <ChevronRight
          className={`h-4 w-4 shrink-0 ${
            destructive ? "text-red-300" : "text-ink-muted"
          }`}
        />
      )}
    </>
  );

  const className =
    "flex w-full items-center gap-3 px-4 py-3.5 text-left transition hover:bg-brand-50/50 active:bg-brand-50";

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={className}>
      {content}
    </button>
  );
}