"use client";

import { useState } from "react";

type ShareButtonProps = {
  title: string;
  url: string;
  text?: string;
};

export function ShareButton({ title, url, text }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  async function share() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url, text });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
      }
    }

    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={() => {
        void share();
      }}
      className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-5 text-sm font-semibold text-muted-strong hover:text-foreground"
    >
      {copied ? "Link copied" : "Share"}
    </button>
  );
}
