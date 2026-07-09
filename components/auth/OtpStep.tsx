'use client';

import { useEffect, useState } from 'react';
import OtpField from '../ui/OtpField';
import BackButton from '../ui/BackButton';

const OTP_LENGTH = 6;
const RESEND_COOLDOWN_SECONDS = 30;

// DEMO OVERRIDE: there is no SMS provider wired up yet, so this hardcoded
// code always succeeds. This guarantees the signup flow is never blocked by
// real SMS delivery during demos/testing. Replace with real OTP verification
// against the backend before shipping to production.
const DEMO_OTP = '123456';

interface OtpStepProps {
  phone: string;
  onVerified: () => void;
  onBack: () => void;
}

export default function OtpStep({ phone, onVerified, onBack }: OtpStepProps) {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [status, setStatus] = useState<'idle' | 'checking' | 'error'>('idle');
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN_SECONDS);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (cooldown === 0) return undefined;
    const timer = setTimeout(() => setCooldown((seconds) => seconds - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  useEffect(() => {
    const code = otp.join('');
    if (code.length !== OTP_LENGTH) return undefined;

    setStatus('checking');
    const timer = setTimeout(() => {
      if (code === DEMO_OTP) {
        onVerified();
        return;
      }

      setStatus('error');
      setShake(true);
      setTimeout(() => setShake(false), 400);
      setTimeout(() => {
        setOtp(Array(OTP_LENGTH).fill(''));
        setStatus('idle');
      }, 500);
    }, 600);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp]);

  const handleResend = () => {
    setCooldown(RESEND_COOLDOWN_SECONDS);
    setOtp(Array(OTP_LENGTH).fill(''));
    setStatus('idle');
  };

  const formattedPhone = phone ? `+234 ${phone}` : 'your number';

  return (
    <div>
      <BackButton onClick={onBack} />
      <h2 className="text-2xl font-semibold text-ink">Enter the code we sent you</h2>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
        We sent a 6-digit code to <span className="font-medium text-ink">{formattedPhone}</span>.
        Enter it below.
      </p>

      <div className={`mt-6 ${shake ? 'animate-[shake-x_0.4s_ease-in-out]' : ''}`}>
        <OtpField
          value={otp}
          onChange={(next) => {
            setOtp(next);
            setStatus('idle');
          }}
          error={status === 'error' ? 'Incorrect code — please try again' : undefined}
        />
      </div>

      {status === 'checking' && (
        <p className="mt-4 text-center text-sm font-medium text-brand-600">Verifying…</p>
      )}

      <p className="mt-6 text-center text-sm text-ink-muted">
        Didn&apos;t receive a code?{' '}
        {cooldown > 0 ? (
          <span className="font-medium text-ink-muted">Resend in {cooldown}s</span>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            className="font-semibold text-brand-600 hover:text-brand-700"
          >
            Resend.
          </button>
        )}
      </p>

      <p className="mt-4 text-center text-xs text-ink-muted/70">
        Demo mode — use code <span className="font-semibold text-ink-muted">123456</span> to
        continue.
      </p>
    </div>
  );
}