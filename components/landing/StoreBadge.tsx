interface StoreBadgeProps {
  href: string;
  store: 'apple' | 'google';
  eyebrow: string;
  title: string;
}

function AppleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16.365 1.43c0 1.14-.462 2.11-1.386 2.914-.923.804-1.923 1.267-3.001 1.187-.077-1.1.442-2.15 1.365-2.994.924-.844 2.017-1.332 3.022-1.107ZM20.5 17.28c-.516 1.194-.765 1.727-1.43 2.782-.928 1.474-2.237 3.313-3.86 3.328-1.44.014-1.812-.94-3.767-.93-1.955.01-2.363.949-3.804.934-1.622-.014-2.862-1.674-3.79-3.148-2.6-4.115-2.874-8.943-1.27-11.51.14-.223 1.318-2.104 3.62-2.104 2.014 0 2.579 1.087 3.985 1.087 1.367 0 1.7-1.09 3.976-1.09 1.31 0 2.85.716 3.89 1.955-3.42 1.87-2.865 6.75.45 8.696Z"
        fill="currentColor"
      />
    </svg>
  );
}

function GooglePlayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.6 2.8 13.9 12l-10.3 9.2V2.8Z" fill="#1F8B47" />
      <path d="M13.9 12 3.6 2.8c.3-.2.7-.2 1 0l11 6.2-1.7 3Z" fill="#84CF99" />
      <path d="M13.9 12l1.7 3-11 6.2c-.3.2-.7.2-1 0L13.9 12Z" fill="#0F4A26" />
      <path d="M15.6 9 19 11c.8.5.8 1.6 0 2.1l-3.4 2L13.9 12l1.7-3Z" fill="#4FB16E" />
    </svg>
  );
}

export default function StoreBadge({ href, store, eyebrow, title }: StoreBadgeProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2.5 rounded-xl border border-brand-100 bg-white py-2.5 pl-3.5 pr-4.5 transition-all hover:-translate-y-0.5 hover:border-ink"
    >
      <span className="flex flex-shrink-0 text-ink">
        {store === 'apple' ? <AppleIcon /> : <GooglePlayIcon />}
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-[10px] font-medium uppercase tracking-wide text-ink-muted">{eyebrow}</span>
        <span className="text-base font-bold text-ink">{title}</span>
      </span>
    </a>
  );
}