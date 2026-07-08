import Image from 'next/image';

interface Feature {
  title: string;
  description: string;
  image: string;
}

const FEATURES: Feature[] = [
  {
    title: 'Digitized Savings Infrastructure',
    description:
      'Automate contributions, secure your funds, and guarantee payouts directly to your account — no more risk of collector default or mismanagement.',
    image: '/images/feat_1.png',
  },
  {
    title: 'Behavioral Credit History',
    description:
      "Every completed savings cycle and timely contribution becomes a verified financial event — turning discipline and community trust into real data.",
    image: '/images/feat_2.png',
  },
  {
    title: 'Credal Trust Score',
    description:
      'A transparent, easy-to-understand credit score built for informal workers — reflecting real financial behavior, not just banking history.',
    image: '/images/feat_3.png',
  },
  {
    title: 'Lending Infrastructure (API)',
    description:
      "Banks and fintechs connect through Credal's API for data-driven lending decisions — opening new credit access for previously excluded users.",
    image: '/images/feat_4.png',
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-brand-50/40 py-20 sm:py-28">
      <div className="mx-auto max-w-container px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
            Everything you need to build financial trust
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">
            Credal transforms your everyday savings habits into a secure, transparent, and
            verifiable path to real credit access.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {FEATURES.map((feature) => (
            <article
              key={feature.title}
              className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-brand-50"
            >
              <h3 className="text-2xl font-semibold text-ink">{feature.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-ink-muted">
                {feature.description}
              </p>

              <div className="relative mt-8 aspect-[3/2] w-full overflow-hidden rounded-2xl bg-brand-50">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}