"use client";

import Link from "next/link";
import { Home, ShieldCheck, Users, User } from "lucide-react";

const NAV_ITEMS = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/credal", label: "Credal", icon: ShieldCheck },
  { href: "/contributions", label: "Active", icon: Users },
  { href: "/profile", label: "Profile", icon: User },
];

export default function NavRail({ active = "/" }: { active?: string }) {
  return (
    <>
      {/* Mobile: floating pill nav, bottom of screen */}
      <nav
        className="fixed inset-x-4 bottom-4 z-40 flex items-center justify-between rounded-full border border-black/5 bg-white/95 px-2 py-2 shadow-header backdrop-blur md:hidden"
        aria-label="Primary"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = item.href === active;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-1 flex-col items-center gap-0.5 rounded-full py-2 text-[11px] font-medium transition ${
                isActive
                  ? "bg-brand-500 text-white"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              <item.icon className="h-5 w-5" strokeWidth={2.2} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Desktop / tablet: fixed left rail */}
      <nav
        className="fixed inset-y-0 left-0 z-40 hidden w-20 flex-col items-center gap-1 border-r border-black/5 bg-white py-8 md:flex lg:w-60 lg:items-stretch lg:px-4"
        aria-label="Primary"
      >
        <div className="mb-8 flex items-center gap-2 px-2 lg:px-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 text-sm font-bold text-white">
            C
          </span>
          <span className="hidden text-lg font-bold tracking-tight text-ink lg:inline">
            Credal
          </span>
        </div>
        {NAV_ITEMS.map((item) => {
          const isActive = item.href === active;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition lg:px-4 ${
                isActive
                  ? "bg-brand-50 text-brand-700"
                  : "text-ink-muted hover:bg-brand-50/60 hover:text-ink"
              }`}
            >
              <item.icon className="h-5 w-5 shrink-0" strokeWidth={2.2} />
              <span className="hidden lg:inline">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}