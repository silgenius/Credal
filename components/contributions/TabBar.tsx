"use client";

export interface TabDef {
  key: string;
  label: string;
  count?: number;
}

export default function TabBar({
  tabs,
  active,
  onChange,
}: {
  tabs: TabDef[];
  active: string;
  onChange: (key: string) => void;
}) {
  return (
    <div className="flex gap-1 rounded-full bg-brand-50 p-1">
      {tabs.map((tab) => {
        const isActive = tab.key === active;
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-sm font-medium transition ${
              isActive
                ? "bg-white text-brand-700 shadow-sm"
                : "text-ink-muted hover:text-ink"
            }`}
          >
            {tab.label}
            {!!tab.count && (
              <span
                className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[11px] font-semibold ${
                  isActive
                    ? "bg-brand-500 text-white"
                    : "bg-white text-brand-700"
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}