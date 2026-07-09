import { InputHTMLAttributes, forwardRef } from 'react';

interface PhoneFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
}

const PhoneField = forwardRef<HTMLInputElement, PhoneFieldProps>(
  ({ label = 'Phone number', error, id, name, className = '', ...props }, ref) => {
    const inputId = id ?? name;

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-sm font-medium text-ink">
          {label}
        </label>
        <div
          className={`flex items-center overflow-hidden rounded-xl border bg-white transition-colors focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100 ${
            error ? 'border-red-400' : 'border-brand-100'
          }`}
        >
          <span className="flex flex-shrink-0 items-center gap-2 border-r border-brand-100 bg-brand-50/60 px-3.5 py-3">
            <span aria-hidden="true" className="text-lg leading-none">
              🇳🇬
            </span>
            <span className="text-sm font-semibold text-ink">+234</span>
          </span>
          <input
            id={inputId}
            name={name}
            ref={ref}
            type="tel"
            inputMode="numeric"
            placeholder="801 234 5678"
            className={`w-full bg-transparent px-4 py-3 text-base text-ink outline-none placeholder:text-ink-muted/60 ${className}`}
            {...props}
          />
        </div>
        {error && <span className="text-xs font-medium text-red-500">{error}</span>}
      </div>
    );
  },
);

PhoneField.displayName = 'PhoneField';

export default PhoneField;