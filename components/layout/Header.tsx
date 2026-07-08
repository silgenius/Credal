'use client';

import { useState } from 'react';
import Link from 'next/link';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
] as const;

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-5 z-[100] px-6">
      <div className="mx-auto flex max-w-container items-center justify-between gap-6 rounded-2xl bg-white px-5 py-3.5 shadow-header">
        <Link href="/" className="flex flex-shrink-0 items-center gap-2.5" aria-label="Credal home">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-white">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6 4h13a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H9v3h9a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H9v3a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span className="text-[22px] font-bold tracking-tight text-ink">Credal</span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-[15px] font-medium text-ink-muted transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden flex-shrink-0 items-center gap-3 md:flex">
          <Link
            href="/login"
            className="whitespace-nowrap rounded-full border border-brand-100 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-brand-50"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="whitespace-nowrap rounded-full bg-brand-600 px-5.5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Sign up
          </Link>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-brand-100 transition-colors hover:bg-brand-50 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1 1l16 16M17 1L1 17"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                className="text-ink"
              />
            </svg>
          ) : (
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1 1h16M1 7h16M1 13h16"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                className="text-ink"
              />
            </svg>
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div className="mx-auto mt-3 max-w-container rounded-2xl bg-white px-6 pb-6 pt-2 shadow-header md:hidden">
          <nav className="flex flex-col items-center" aria-label="Mobile">
            {NAV_LINKS.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                className={`w-full py-4 text-center text-lg transition-colors hover:text-ink ${
                  index === 0 ? 'font-semibold text-ink' : 'font-medium text-ink-muted'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-2 flex flex-col gap-3">
            <Link
              href="/login"
              className="w-full rounded-full border border-brand-100 px-5 py-3.5 text-center text-base font-semibold text-ink"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="w-full rounded-full bg-brand-600 px-5 py-3.5 text-center text-base font-semibold text-white"
            >
              Sign up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}