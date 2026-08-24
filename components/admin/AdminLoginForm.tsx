"use client";

import { useActionState } from "react";
import { adminLoginAction } from "@/lib/admin/actions";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function AdminLoginForm({ nextPath }: { nextPath: string }) {
  const [state, formAction, pending] = useActionState(adminLoginAction, null);

  return (
    <Card className="mx-auto max-w-md">
      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-blue">
        Admin login
      </p>
      <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight">
        HarshOnRoads CMS
      </h1>
      <p className="mt-3 text-sm leading-6 text-muted">
        Sign in to manage destinations, itineraries and other published content.
      </p>

      <form action={formAction} className="mt-8 space-y-4">
        <input type="hidden" name="next" value={nextPath} />
        <label className="block">
          <span className="mb-2 block text-sm font-bold">Password</span>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            required
            className="min-h-[3.25rem] w-full rounded-2xl border border-border bg-surface px-4 text-base shadow-sm outline-none focus:border-foreground/30"
          />
        </label>
        {state?.error ? (
          <p className="rounded-2xl border border-orange/40 bg-orange/10 px-4 py-3 text-sm">
            {state.error}
          </p>
        ) : null}
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </Card>
  );
}
