import { ResultCard } from "@/components/tools/ResultCard";
import type { CalculatorOutput } from "@/types/calculator";

export function ToolResult({ result }: { result: CalculatorOutput }) {
  return (
    <div aria-live="polite" className="space-y-4">
      <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
        Your result
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {result.results.map((item) => (
          <ResultCard key={item.key} item={item} />
        ))}
      </div>
    </div>
  );
}
