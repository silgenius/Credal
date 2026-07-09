'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthCard from '@/components/auth/AuthCard';
import TextField from '@/components/ui/TextField';
import Button from '@/components/ui/Button';

interface Errors {
  name?: string;
  password?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const nextErrors: Errors = {};
    if (!name.trim()) nextErrors.name = 'Enter your full name';
    if (!password.trim()) nextErrors.password = 'Enter your password';
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
      <p className="mb-6 text-sm text-ink-muted">Log in to continue building your financial trust.</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
        <TextField
          label="Full name"
          name="name"
          placeholder="Amina Okafor"
          value={name}
          onChange={(event) => setName(event.target.value)}
          error={errors.name}
          autoComplete="name"
          autoFocus
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={errors.password}
          autoComplete="current-password"
        />

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