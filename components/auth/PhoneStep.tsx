'use client';

import { FormEvent, useState } from 'react';
import PhoneField from '../ui/PhoneField';
import Button from '../ui/Button';
import BackButton from '../ui/BackButton';

interface PhoneStepProps {
  value: string;
  onNext: (phone: string) => void;
  onBack: () => void;
}

export default function PhoneStep({ value, onNext, onBack }: PhoneStepProps) {
  const [phone, setPhone] = useState(value);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const digits = phone.replace(/\D/g, '');

    if (digits.length !== 10) {
      setError('Enter a valid 10-digit phone number');
      return;
    }

    setError('');
    setIsSubmitting(true);

    // Simulated "send code" request — in production this triggers an SMS via the backend.
    setTimeout(() => {
      setIsSubmitting(false);
      onNext(digits);
    }, 700);
  };

  return (
    <div>
      <BackButton onClick={onBack} />
      <h2 className="text-2xl font-semibold text-ink">What is your phone number?</h2>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
        This is your unique identifier on Credal. We will send you a one-time code to
        verify it.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-6" noValidate>
        <PhoneField
          name="phone"
          value={phone}
          onChange={(event) => {
            setPhone(event.target.value.replace(/\D/g, '').slice(0, 10));
            setError('');
          }}
          error={error}
          autoFocus
        />

        <Button type="submit" isLoading={isSubmitting} fullWidth>
          {isSubmitting ? 'Sending…' : 'Send Code'}
        </Button>
      </form>
    </div>
  );
}