"use client";

import { useState } from "react";

type CopyBlockProps = {
  label: string;
  text: string;
};

export function CopyBlock({ label, text }: CopyBlockProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="rounded-2xl border border-border bg-background px-4 py-4">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-extrabold tracking-tight">{label}</h3>
        <button
          type="button"
          onClick={() => {
            void copy();
          }}
          className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border border-border px-4 text-xs font-semibold"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-6 text-muted">
        {text}
      </pre>
    </section>
  );
}
