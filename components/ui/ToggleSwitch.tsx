interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export default function ToggleSwitch({
  checked,
  onChange,
  disabled = false,
}: ToggleSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`
        relative inline-flex h-7 w-12 items-center rounded-full
        transition-all duration-200 ease-in-out
        focus:outline-none
        focus:ring-2
        focus:ring-brand-400
        focus:ring-offset-2
        ${
          checked
            ? "bg-brand-500"
            : "bg-gray-300 dark:bg-gray-700"
        }
        ${
          disabled
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer hover:brightness-95 active:scale-95"
        }
      `}
    >
      <span
        className={`
          inline-block h-5 w-5 rounded-full
          bg-white shadow-md
          transition-transform duration-200 ease-in-out
          ${checked ? "translate-x-6" : "translate-x-1"}
        `}
      />
    </button>
  );
}