'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthCard from '@/components/auth/AuthCard';
import PhoneField from '@/components/ui/PhoneField';
import PinCodeInput from '@/components/profile/PinCodeInput';
import Button from '@/components/ui/Button';

interface Errors {
  phone?: string;
  pin?: string;
}

const PIN_LENGTH = 6;

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const nextErrors: Errors = {};
    if (phone.replace(/\D/g, '').length !== 10) {
      nextErrors.phone = 'Enter a valid 10-digit phone number';
    }
    if (pin.length !== PIN_LENGTH) {
      nextErrors.pin = 'Enter your 6-digit PIN';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulated login request.
    setTimeout(() => {
      router.push('/home');
    }, 800);
  };

  return (
    <AuthCard>
      <h1 className="mb-1 text-2xl font-semibold text-ink">Welcome back</h1>
      <p className="mb-6 text-sm text-ink-muted">
        Log in with your phone number and PIN to continue building your financial trust.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
        <PhoneField
          name="phone"
          value={phone}
          onChange={(event) => {
            setPhone(event.target.value.replace(/\D/g, '').slice(0, 10));
            setErrors((prev) => ({ ...prev, phone: undefined }));
          }}
          error={errors.phone}
          autoFocus
        />

        <div>
          <label className="mb-3 block text-center text-sm font-medium text-ink">
            Enter your 6-digit PIN
          </label>
          <PinCodeInput
            value={pin}
            onChange={(value) => {
              setPin(value);
              setErrors((prev) => ({ ...prev, pin: undefined }));
            }}
          />
          {errors.pin && (
            <p className="mt-3 text-center text-xs font-medium text-red-500">{errors.pin}</p>
          )}
        </div>

        <Button type="submit" isLoading={isSubmitting} fullWidth className="mt-2">
          {isSubmitting ? 'Logging in…' : 'Log in'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-muted">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="font-semibold text-brand-600 hover:text-brand-700">
          Sign up
        </Link>
      </p>
    </AuthCard>
  );
}