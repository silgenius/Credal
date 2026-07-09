import { SelectHTMLAttributes, forwardRef } from 'react';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, error, options, placeholder, id, name, className = '', ...props }, ref) => {
    const inputId = id ?? name;

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-sm font-medium text-ink">
          {label}
        </label>
        <div className="relative">
          <select
            id={inputId}
            name={name}
            ref={ref}
            className={`w-full appearance-none rounded-xl border bg-white px-4 py-3 pr-10 text-base text-ink outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-100 ${
              error ? 'border-red-400' : 'border-brand-100'
            } ${className}`}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-muted"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M2 4.5L7 9.5L12 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {error && <span className="text-xs font-medium text-red-500">{error}</span>}
      </div>
    );
  },
);

SelectField.displayName = 'SelectField';

export default SelectField;