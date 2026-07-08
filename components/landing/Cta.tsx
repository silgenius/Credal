import Image from 'next/image';
import Link from 'next/link';

export default function Cta() {
  return (
    <section className="px-6 pb-6">
      <div className="relative mx-auto max-w-container overflow-hidden rounded-3xl bg-gradient-to-br from-brand-50 via-brand-100 to-brand-200">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(10,52,25,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(10,52,25,0.06) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
          aria-hidden="true"
        />

        {/* Decorative tilted phone mockups */}
        <div className="pointer-events-none absolute -bottom-16 -left-6 hidden w-[280px] -rotate-[12deg] sm:block md:w-[320px]">
          <Image
            src="/images/cta_phone_left.png"
            alt=""
            width={320}
            height={640}
            aria-hidden="true"
            className="h-auto w-full drop-shadow-2xl"
          />
        </div>
        <div className="pointer-events-none absolute -bottom-16 -right-6 hidden w-[280px] rotate-[12deg] sm:block md:w-[320px]">
          <Image
            src="/images/cta_phone_right.png"
            alt=""
            width={320}
            height={640}
            aria-hidden="true"
            className="h-auto w-full drop-shadow-2xl"
          />
        </div>

        <div className="relative flex flex-col items-center px-6 py-20 text-center sm:py-24">
          <h2 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
            Start building your financial trust the smart way
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">
            From tracking contributions to unlocking real credit, everything is designed
            to be simple, transparent, and secure.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/login"
              className="whitespace-nowrap rounded-full border border-brand-100 bg-white px-7 py-3 text-sm font-semibold text-ink transition-colors hover:bg-brand-50"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="whitespace-nowrap rounded-full bg-brand-600 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}