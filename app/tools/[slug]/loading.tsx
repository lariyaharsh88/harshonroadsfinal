import { Card } from "@/components/ui/Card";

export default function ToolSlugLoading() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 lg:px-8">
      <Card>
        <p className="text-sm text-muted">Loading tool…</p>
      </Card>
    </div>
  );
}
