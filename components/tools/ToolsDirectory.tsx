"use client";

import { DirectoryToolCard } from "@/components/tools/DirectoryToolCard";
import {
  directoryGroups,
  matchesDirectoryQuery,
  type DirectoryGroupId,
  type DirectoryTool,
} from "@/lib/tools/directory";
import { useMemo, useState } from "react";

type ToolsDirectoryProps = {
  tools: DirectoryTool[];
};

export function ToolsDirectory({ tools }: ToolsDirectoryProps) {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<DirectoryGroupId | "all">("all");

  const filtered = useMemo(() => {
    return tools.filter((tool) => {
      const inGroup = group === "all" || tool.group === group;
      return inGroup && matchesDirectoryQuery(tool, query);
    });
  }, [tools, group, query]);

  const grouped = directoryGroups
    .map((item) => ({
      ...item,
      tools: filtered.filter((tool) => tool.group === item.id),
    }))
    .filter((item) => item.tools.length > 0);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <label className="block max-w-xl flex-1">
          <span className="mb-2 block text-sm font-medium text-muted-strong">
            Search tools
          </span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try fuel, budget, weekend, trip, road, packing, mileage"
            className="min-h-11 w-full rounded-full border border-border bg-background px-4 text-base"
            autoComplete="off"
          />
        </label>
        <p className="text-sm text-muted" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? "tool" : "tools"}
        </p>
      </div>

      <div
        className="mt-5 flex flex-wrap gap-2"
        role="group"
        aria-label="Filter by category"
      >
        <FilterChip
          selected={group === "all"}
          onClick={() => setGroup("all")}
        >
          All
        </FilterChip>
        {directoryGroups.map((item) => (
          <FilterChip
            key={item.id}
            selected={group === item.id}
            onClick={() => setGroup(item.id)}
          >
            {item.label}
          </FilterChip>
        ))}
      </div>

      {grouped.length === 0 ? (
        <p className="mt-10 text-sm leading-6 text-muted">
          No tools match that search. Try weekend, budget, fuel, packing or
          mileage.
        </p>
      ) : (
        <div className="mt-12 space-y-14">
          {grouped.map((item) => (
            <section key={item.id} aria-labelledby={`group-${item.id}`}>
              <h2
                id={`group-${item.id}`}
                className="font-display text-3xl font-extrabold tracking-tight"
              >
                {item.label}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
                {item.description}
              </p>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {item.tools.map((tool) => (
                  <li key={tool.id}>
                    <DirectoryToolCard tool={tool} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={
        selected
          ? "min-h-11 rounded-full bg-accent px-4 text-sm font-semibold text-[#fff8ef]"
          : "min-h-11 rounded-full border border-border px-4 text-sm font-semibold text-muted-strong hover:text-foreground"
      }
    >
      {children}
    </button>
  );
}
