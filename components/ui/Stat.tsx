type StatProps = {
  label: string;
  value: string;
};

export function Stat({ label, value }: StatProps) {
  return (
    <div className="rounded-[1.25rem] border border-border bg-surface px-5 py-4">
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
        {label}
      </p>
      <p className="mt-2 font-display text-2xl font-extrabold tracking-tight text-foreground">
        {value}
      </p>
    </div>
  );
}
