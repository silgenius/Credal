import { InputHTMLAttributes, forwardRef } from 'react';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, hint, id, name, className = '', ...props }, ref) => {
    const inputId = id ?? name;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-ink">
            {label}
          </label>
        )}
        <input
          id={inputId}
          name={name}
          ref={ref}
          className={`w-full rounded-xl border bg-white px-4 py-3 text-base text-ink outline-none transition-colors placeholder:text-ink-muted/60 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 ${
            error ? 'border-red-400' : 'border-brand-100'
          } ${className}`}
          {...props}
        />
        {error ? (
          <span className="text-xs font-medium text-red-500">{error}</span>
        ) : hint ? (
          <span className="text-xs text-ink-muted">{hint}</span>
        ) : null}
      </div>
    );
  },
);

TextField.displayName = 'TextField';

export default TextField;