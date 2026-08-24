import type { FormulaContent } from "@/types/calculator";

export function FormulaSection({ formula }: { formula?: FormulaContent }) {
  if (!formula) {
    return null;
  }

  const expressions = Array.isArray(formula.expression)
    ? formula.expression
    : [formula.expression];

  return (
    <section id="formula">
      <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
        {formula.title ?? "Formula"}
      </h2>
      <div className="mt-4 space-y-2 rounded-2xl border border-border bg-surface px-5 py-4 font-mono text-sm leading-7 text-muted-strong">
        {expressions.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      {formula.notes && formula.notes.length > 0 ? (
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
          {formula.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
