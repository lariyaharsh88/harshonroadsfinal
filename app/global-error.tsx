"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en-IN">
      <body
        style={{
          margin: 0,
          background: "#f7f8fa",
          color: "#111318",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ maxWidth: "40rem", margin: "0 auto", padding: "4rem 1.25rem" }}>
          <p style={{ letterSpacing: "0.2em", textTransform: "uppercase", fontSize: 11, color: "#2f6bff", fontWeight: 700 }}>
            Error
          </p>
          <h1 style={{ fontSize: "2.25rem", fontWeight: 800, letterSpacing: "-0.02em", marginTop: 16 }}>
            Something went wrong
          </h1>
          <p style={{ color: "#5f6673", lineHeight: 1.6, marginTop: 16 }}>
            The site failed to load. Try again.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              marginTop: 24,
              minHeight: 44,
              padding: "0 1.5rem",
              borderRadius: 999,
              border: 0,
              background: "#b6f04a",
              color: "#14200a",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
