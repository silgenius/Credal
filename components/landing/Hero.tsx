import Image from 'next/image';
import StoreBadge from './StoreBadge';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white pb-16 pt-[144px] sm:pb-20 sm:pt-[152px]"
    >
      <div
        className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black_0%,transparent_85%)]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(10,52,25,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(10,52,25,0.05) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
        aria-hidden="true"
      />

      <div className="container relative mx-auto grid max-w-container grid-cols-1 items-center gap-10 px-6 md:grid-cols-2">
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2.5 rounded-full bg-white py-1.5 pl-1.5 pr-4 text-sm font-medium text-ink-muted shadow-sm">
            <span className="rounded-full bg-brand-100 px-3.5 py-1 text-[13px] font-bold text-brand-700">
              New
            </span>
            Trust Score is now live
          </span>

          <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[64px]">
            Your Savings Circle,
            <br />
            Now Your Credit Score.
          </h1>

          <p className="max-w-[520px] text-base leading-relaxed text-ink-muted sm:text-lg">
            Credal turns your Ajo, Susu, and Tontine contributions into a verifiable
            financial identity — helping you build credit history, earn trust, and
            unlock real loans, all in one secure platform.
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-3.5">
            <StoreBadge href="#" store="apple" eyebrow="Download on the" title="App Store" />
            <StoreBadge href="#" store="google" eyebrow="Get it on" title="Google Play" />
          </div>
        </div>

        <div className="relative flex justify-center">
          <Image
            src="/images/hero_img.png"
            alt="Credal mobile app showing available balance, trust score, and recent activity"
            width={640}
            height={860}
            priority
            className="h-auto w-full max-w-[420px] md:max-w-[480px]"
            style={{
              WebkitMaskImage:
                'radial-gradient(ellipse 88% 88% at 50% 48%, black 72%, transparent 100%)',
              maskImage:
                'radial-gradient(ellipse 88% 88% at 50% 48%, black 72%, transparent 100%)',
            }}
          />
        </div>
      </div>
    </section>
  );
}