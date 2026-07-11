import Link from 'next/link';

const PRODUCT_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#features' },
  { label: 'Trust Score', href: '#features' },
  { label: 'Testimonials', href: '#testimonials' },
];

const OTHER_LINKS = [
  { label: 'Blog', href: '#' },
  { label: 'FAQs', href: '#faq' },
  { label: 'Contact', href: '#contact' },
  { label: 'Help Center', href: '#' },
];

const SOCIAL_LINKS = [
  {
    label: 'Facebook',
    href: '#',
    path: 'M14 3h-2.5C9.6 3 8 4.6 8 6.7V9H6v3h2v9h3v-9h2.5l.5-3H11V6.9c0-.6.4-1 1-1H14V3Z',
  },
  {
    label: 'Twitter',
    href: '#',
    path: 'M20 5.9c-.6.3-1.3.5-2 .6.7-.5 1.3-1.2 1.6-2.1-.7.4-1.5.7-2.3.9A3.6 3.6 0 0 0 11.5 8c0 .3 0 .6.1.8-3-.1-5.6-1.6-7.4-3.7-.3.5-.5 1.2-.5 1.8 0 1.2.6 2.3 1.6 3-.6 0-1.1-.2-1.6-.4v.1c0 1.8 1.3 3.2 2.9 3.6-.3.1-.6.1-1 .1-.2 0-.5 0-.7-.1.5 1.5 1.9 2.5 3.5 2.5A7.3 7.3 0 0 1 3 17.5 10.3 10.3 0 0 0 8.6 19c6.7 0 10.4-5.6 10.4-10.4v-.5c.7-.5 1.3-1.2 1.8-1.9Z',
  },
  {
    label: 'Instagram',
    href: '#',
    path: 'M12 8.4a3.6 3.6 0 1 0 0 7.2 3.6 3.6 0 0 0 0-7.2ZM12 10a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm4.7-3.7a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8ZM12 4c-2.2 0-2.5 0-3.4.1-.9 0-1.5.2-2 .4-.6.2-1 .5-1.5 1s-.7.9-1 1.5c-.2.5-.3 1.1-.4 2C3.6 9.5 3.6 9.8 3.6 12s0 2.5.1 3.4c0 .9.2 1.5.4 2 .2.6.5 1 1 1.5s.9.7 1.5 1c.5.2 1.1.3 2 .4.9.1 1.2.1 3.4.1s2.5 0 3.4-.1c.9 0 1.5-.2 2-.4.6-.2 1-.5 1.5-1s.7-.9 1-1.5c.2-.5.3-1.1.4-2 .1-.9.1-1.2.1-3.4s0-2.5-.1-3.4c0-.9-.2-1.5-.4-2-.2-.6-.5-1-1-1.5s-.9-.7-1.5-1c-.5-.2-1.1-.3-2-.4C14.5 4 14.2 4 12 4Z',
  },
  {
    label: 'LinkedIn',
    href: '#',
    path: 'M6.9 8.5H4V19h2.9V8.5ZM5.4 4a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4ZM19.9 19h.1v-6c0-2.9-.6-5.1-4-5.1-1.6 0-2.7.9-3.2 1.7h0V8.5H9.9V19h2.9v-5.3c0-1.4.3-2.7 2-2.7 1.6 0 1.7 1.5 1.7 2.8V19h3.4Z',
  },
];

export default function Footer() {
  return (
    <footer className="bg-brand-50/50">
      <div className="mx-auto max-w-container px-6 py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand column */}
          <div>
            <Link href="/" className="flex flex-shrink-0 items-center gap-2.5" aria-label="Credal home">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500 text-sm font-bold text-white">
            C
          </span>
          <span className="text-[22px] font-bold tracking-tight text-ink">Credal</span>
        </Link>

            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-ink-muted">
              Turning everyday savings into a trusted, verifiable financial identity —
              built for how you actually save.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink transition-colors hover:bg-brand-100"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d={social.path} fill="currentColor" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Product links */}
          <div>
            <h3 className="text-base font-bold text-ink">Product</h3>
            <ul className="mt-5 flex flex-col gap-4">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[15px] font-medium text-ink-muted transition-colors hover:text-ink">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Others links */}
          <div>
            <h3 className="text-base font-bold text-ink">Others</h3>
            <ul className="mt-5 flex flex-col gap-4">
              {OTHER_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[15px] font-medium text-ink-muted transition-colors hover:text-ink">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Auth CTA column */}
          <div>
            <h3 className="text-base font-bold text-ink">Join Credal Today</h3>
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-ink-muted">
              Create your account and start building your financial trust in minutes.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/login"
                className="whitespace-nowrap rounded-full border border-brand-100 bg-white px-6 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-brand-100"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="whitespace-nowrap rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-brand-100 pt-8 sm:flex-row">
          <p className="text-sm text-ink-muted">&copy; 2026 Credal. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm font-medium text-ink-muted transition-colors hover:text-ink">
              Terms &amp; Conditions
            </a>
            <a href="#" className="text-sm font-medium text-ink-muted transition-colors hover:text-ink">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}