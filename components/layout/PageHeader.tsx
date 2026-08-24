type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <header className="border-b border-border bg-[radial-gradient(ellipse_at_top,_rgba(182,240,74,0.18),_transparent_55%)]">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-20 lg:px-8">
        {eyebrow ? (
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-blue">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="max-w-3xl font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg">
            {description}
          </p>
        ) : null}
      </div>
    </header>
  );
}
