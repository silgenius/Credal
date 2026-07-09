import Link from "next/link";

export default function ServiceTile({
  icon: Icon,
  label,
  href,
}: {
  icon: React.ElementType;
  label: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col items-center gap-2 rounded-2xl p-3 text-center transition hover:bg-brand-50 active:scale-[0.97]"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 transition group-hover:bg-brand-100">
        <Icon className="h-5 w-5" strokeWidth={2} />
      </span>
      <span className="text-xs font-medium leading-tight text-ink">
        {label}
      </span>
    </Link>
  );
}