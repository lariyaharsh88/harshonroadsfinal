"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";

type JsonRecordEditorProps = {
  entity: "destinations" | "itineraries";
  title: string;
  description: string;
  initialJson: string;
  onSave: (rawJson: string) => Promise<{ ok: boolean; error?: string; slug?: string }>;
  onDelete?: () => Promise<{ ok: boolean; error?: string }>;
  viewHref?: string;
};

export function JsonRecordEditor({
  entity,
  title,
  description,
  initialJson,
  onSave,
  onDelete,
  viewHref,
}: JsonRecordEditorProps) {
  const router = useRouter();
  const [json, setJson] = useState(initialJson);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function formatJson() {
    try {
      setJson(`${JSON.stringify(JSON.parse(json), null, 2)}\n`);
      setError(null);
    } catch {
      setError("JSON is not valid yet. Fix syntax before formatting.");
    }
  }

  function handleSave() {
    setMessage(null);
    setError(null);
    startTransition(async () => {
      const result = await onSave(json);
      if (!result.ok) {
        setError(result.error ?? "Save failed.");
        return;
      }
      setMessage("Saved. Public pages will refresh on the next request.");
      if (result.slug) {
        router.replace(`/admin/${entity}/${result.slug}`);
      }
      router.refresh();
    });
  }

  function handleDelete() {
    if (!onDelete) {
      return;
    }
    if (!window.confirm("Delete this record? This cannot be undone.")) {
      return;
    }
    setMessage(null);
    setError(null);
    startTransition(async () => {
      const result = await onDelete();
      if (!result.ok) {
        setError(result.error ?? "Delete failed.");
        return;
      }
      router.push(entity === "itineraries" ? "/admin/itineraries" : "/admin/destinations");
      router.refresh();
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-extrabold tracking-tight">
          {title}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          {description}
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button type="button" onClick={handleSave} disabled={pending}>
          {pending ? "Saving…" : "Save changes"}
        </Button>
        <Button type="button" variant="secondary" onClick={formatJson} disabled={pending}>
          Format JSON
        </Button>
        {viewHref ? (
          <a
            href={viewHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center rounded-full border border-border px-6 text-sm font-bold"
          >
            View live page
          </a>
        ) : null}
        {onDelete ? (
          <Button type="button" variant="ghost" onClick={handleDelete} disabled={pending}>
            Delete
          </Button>
        ) : null}
      </div>

      {message ? (
        <p className="rounded-2xl border border-accent/40 bg-accent-soft/50 px-4 py-3 text-sm text-accent-ink">
          {message}
        </p>
      ) : null}
      {error ? (
        <p className="rounded-2xl border border-orange/40 bg-orange/10 px-4 py-3 text-sm text-foreground">
          {error}
        </p>
      ) : null}

      <label className="block">
        <span className="mb-2 block text-sm font-bold">Record JSON</span>
        <textarea
          value={json}
          onChange={(event) => setJson(event.target.value)}
          spellCheck={false}
          className="min-h-[32rem] w-full rounded-[1.25rem] border border-border bg-surface px-4 py-4 font-mono text-sm leading-6 shadow-sm outline-none focus:border-foreground/30"
        />
      </label>
    </div>
  );
}
