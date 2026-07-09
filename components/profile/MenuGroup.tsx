export default function MenuGroup({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      {title && (
        <h2 className="mb-2 px-1 text-sm font-semibold text-ink-muted">
          {title}
        </h2>
      )}
      <div className="divide-y divide-black/5 overflow-hidden rounded-3xl border border-black/5 bg-white shadow-header">
        {children}
      </div>
    </section>
  );
}