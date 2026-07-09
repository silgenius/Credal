import Link from 'next/link';

interface LogoProps {
  href?: string;
  className?: string;
}

export default function Logo({ href = '/', className = '' }: LogoProps) {
  return (
    <Link href={href} className={`flex items-center gap-2.5 ${className}`} aria-label="Credal home">
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
  );
}