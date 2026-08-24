import type { FormEvent, ReactNode } from "react";

type ToolFormProps = {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onReset?: () => void;
  children: ReactNode;
  submitLabel?: string;
  resetLabel?: string;
};

export function ToolForm({
  onSubmit,
  onReset,
  children,
  submitLabel = "Calculate",
  resetLabel = "Reset",
}: ToolFormProps) {
  return (
    <form
      id="calculator"
      method="get"
      action="#how-to-calculate"
      onSubmit={onSubmit}
      noValidate
      className="space-y-6"
    >
      <div className="grid gap-5 sm:grid-cols-2">{children}</div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-6 text-sm font-semibold text-[#fff8ef] hover:bg-accent-hover"
        >
          {submitLabel}
        </button>
        {onReset ? (
          <button
            type="reset"
            onClick={(event) => {
              event.preventDefault();
              onReset();
            }}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-6 text-sm font-semibold text-muted-strong hover:text-foreground"
          >
            {resetLabel}
          </button>
        ) : null}
      </div>
    </form>
  );
}
