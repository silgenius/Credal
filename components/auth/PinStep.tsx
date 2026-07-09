'use client';

import { useEffect, useState } from 'react';
import PinCodeInput from '../profile/PinCodeInput';
import BackButton from '../ui/BackButton';

const PIN_LENGTH = 6;

interface PinStepProps {
  onNext: (pin: string) => void;
  onBack: () => void;
  isSubmitting: boolean;
}

export default function PinStep({ onNext, onBack, isSubmitting }: PinStepProps) {
  const [phase, setPhase] = useState<'create' | 'confirm'>('create');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);

  // Once the first PIN is fully entered, advance to the confirmation phase.
  useEffect(() => {
    if (phase !== 'create' || pin.length !== PIN_LENGTH) return undefined;
    const timer = setTimeout(() => setPhase('confirm'), 250);
    return () => clearTimeout(timer);
  }, [pin, phase]);

  // Once the confirmation PIN is fully entered, check it matches.
  useEffect(() => {
    if (phase !== 'confirm' || confirmPin.length !== PIN_LENGTH) return undefined;

    const timer = setTimeout(() => {
      if (confirmPin === pin) {
        onNext(pin);
        return;
      }

      setError("PINs don't match — try again");
      setShake(true);
      setTimeout(() => setShake(false), 400);
      setTimeout(() => {
        setConfirmPin('');
        setError('');
      }, 500);
    }, 300);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmPin, phase]);

  const handleBack = () => {
    if (phase === 'confirm') {
      // Step back within the PIN screen first, rather than leaving it entirely.
      setPhase('create');
      setConfirmPin('');
      setError('');
    } else {
      onBack();
    }
  };

  return (
    <div>
      <BackButton onClick={handleBack} />

      {phase === 'create' ? (
        <div key="create" className="animate-step-forward">
          <h2 className="text-2xl font-semibold text-ink">Create a 6-digit PIN</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            You&apos;ll use this PIN to log in and authorize transactions on Credal. Keep
            it private.
          </p>
          <div className="mt-8">
            <PinCodeInput value={pin} onChange={setPin} autoFocus />
          </div>
        </div>
      ) : (
        <div key="confirm" className="animate-step-forward">
          <h2 className="text-2xl font-semibold text-ink">Confirm your PIN</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            Enter the same 6-digit PIN again to confirm.
          </p>
          <div className={`mt-8 ${shake ? 'animate-[shake-x_0.4s_ease-in-out]' : ''}`}>
            <PinCodeInput value={confirmPin} onChange={setConfirmPin} autoFocus />
          </div>
          {error && (
            <p className="mt-4 text-center text-sm font-medium text-red-500">{error}</p>
          )}
          {isSubmitting && (
            <p className="mt-4 text-center text-sm font-medium text-brand-600">
              Setting up your account…
            </p>
          )}
        </div>
      )}
    </div>
  );
}