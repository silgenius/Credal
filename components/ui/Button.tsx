import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

const VARIANT_CLASSES: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700',
  outline: 'border border-brand-100 bg-white text-ink hover:bg-brand-50',
  ghost: 'text-ink-muted hover:text-ink',
};

const SPINNER_CLASSES: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'border-white/40 border-t-white',
  outline: 'border-brand-100 border-t-brand-600',
  ghost: 'border-brand-100 border-t-brand-600',
};

export default function Button({
  isLoading = false,
  variant = 'primary',
  fullWidth = false,
  className = '',
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-150 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100 ${
        VARIANT_CLASSES[variant]
      } ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <span
          className={`h-4 w-4 flex-shrink-0 animate-spin rounded-full border-2 ${SPINNER_CLASSES[variant]}`}
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  );
}