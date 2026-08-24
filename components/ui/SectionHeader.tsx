type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  className = "",
}: SectionHeaderProps) {
  return (
    <header className={className}>
      {eyebrow ? (
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-blue">
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl ${eyebrow ? "mt-3" : ""}`}
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
          {description}
        </p>
      ) : null}
    </header>
  );
}
