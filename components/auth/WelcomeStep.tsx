import Link from 'next/link';
import Button from '../ui/Button';

interface WelcomeStepProps {
  onBegin: () => void;
}

export default function WelcomeStep({ onBegin }: WelcomeStepProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">Trust, digitized</p>
      <h1 className="mt-3 text-3xl font-semibold leading-tight text-ink">Welcome to Credal</h1>
      <p className="mt-4 text-base leading-relaxed text-ink-muted">
        Welcome to Credal — where your everyday savings become a real financial identity.
        Every contribution you make, every cycle you complete, and every bit of trust you
        earn from your community counts toward something bigger: access to real credit,
        on your terms.
      </p>

      <Button onClick={onBegin} fullWidth className="mt-8">
        Let&apos;s Begin
      </Button>

      <p className="mt-6 text-sm text-ink-muted">
        Already have an account?{' '}
        <Link href="/login" className="font-semibold text-brand-600 hover:text-brand-700">
          Sign in.
        </Link>
      </p>
    </div>
  );
}