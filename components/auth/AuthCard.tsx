import { ReactNode } from 'react';
import Logo from '../ui/Logo';

interface AuthCardProps {
  children: ReactNode;
}

export default function AuthCard({ children }: AuthCardProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-brand-50 to-white px-4 py-10 sm:px-6">
      <div className="w-full max-w-[440px]">
        <Logo className="mb-8 justify-center" />
        <div className="rounded-3xl bg-white p-6 shadow-header sm:p-9">{children}</div>
      </div>
    </div>
  );
}