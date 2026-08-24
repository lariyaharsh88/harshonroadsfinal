"use client";

import { useMemo, useState } from "react";
import { ChoiceButton } from "@/components/tools/weekend/ChoiceButton";
import { Card } from "@/components/ui/Card";
import {
  emptyDestinationFilters,
  matchesDestinationFilters,
  type DestinationCardData,
  type DestinationDirectoryFilters,
} from "@/lib/data/destinations/catalog";
import {
  destinationBudgetLabels,
  destinationDurationLabels,
  destinationInterestLabels,
  destinationRegionLabels,
  destinationTransportLabels,
  destinationTravelStyleLabels,
  destinationTravelTimeLabels,
  weekendSuitabilityLabels,
} from "@/lib/data/destinations/labels";
import {
  destinationBudgets,
  destinationDurations,
  destinationInterests,
  destinationRegions,
  destinationTransports,
  destinationTravelStyles,
} from "@/lib/data/destinations/types";
import Link from "next/link";

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="mt-6">
      <legend className="mb-3 text-sm font-semibold">{title}</legend>
      <div className="flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );
}

export function DestinationExplorer({
  destinations,
}: {
  destinations: DestinationCardData[];
}) {
  const [filters, setFilters] =
    useState<DestinationDirectoryFilters>(emptyDestinationFilters);

  const visible = useMemo(
    () =>
      destinations.filter((destination) =>
        matchesDestinationFilters(destination, filters),
      ),
    [destinations, filters],
  );

  function reset() {
    setFilters(emptyDestinationFilters);
  }

  return (
    <div>
      <div className="rounded-3xl border border-border bg-surface p-5 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Filter on this page
          </p>
          <button
            type="button"
            onClick={reset}
            className="text-sm font-semibold text-muted-strong hover:text-foreground"
          >
            Clear filters
          </button>
        </div>
        <FilterGroup title="Region">
          <ChoiceButton
            selected={filters.region === ""}
            onClick={() => setFilters((current) => ({ ...current, region: "" }))}
          >
            All regions
          </ChoiceButton>
          {destinationRegions.map((value) => (
            <ChoiceButton
              key={value}
              selected={filters.region === value}
              onClick={() =>
                setFilters((current) => ({ ...current, region: value }))
              }
            >
              {destinationRegionLabels[value]}
            </ChoiceButton>
          ))}
        </FilterGroup>
        <FilterGroup title="Trip duration">
          <ChoiceButton
            selected={filters.duration === ""}
            onClick={() =>
              setFilters((current) => ({ ...current, duration: "" }))
            }
          >
            Any duration
          </ChoiceButton>
          {destinationDurations.map((value) => (
            <ChoiceButton
              key={value}
              selected={filters.duration === value}
              onClick={() =>
                setFilters((current) => ({ ...current, duration: value }))
              }
            >
              {destinationDurationLabels[value]}
            </ChoiceButton>
          ))}
        </FilterGroup>
        <FilterGroup title="Budget">
          <ChoiceButton
            selected={filters.budget === ""}
            onClick={() => setFilters((current) => ({ ...current, budget: "" }))}
          >
            Any budget
          </ChoiceButton>
          {destinationBudgets.map((value) => (
            <ChoiceButton
              key={value}
              selected={filters.budget === value}
              onClick={() =>
                setFilters((current) => ({ ...current, budget: value }))
              }
            >
              {destinationBudgetLabels[value]}
            </ChoiceButton>
          ))}
        </FilterGroup>
        <FilterGroup title="Travel style">
          <ChoiceButton
            selected={filters.travelStyle === ""}
            onClick={() =>
              setFilters((current) => ({ ...current, travelStyle: "" }))
            }
          >
            Any style
          </ChoiceButton>
          {destinationTravelStyles.map((value) => (
            <ChoiceButton
              key={value}
              selected={filters.travelStyle === value}
              onClick={() =>
                setFilters((current) => ({ ...current, travelStyle: value }))
              }
            >
              {destinationTravelStyleLabels[value]}
            </ChoiceButton>
          ))}
        </FilterGroup>
        <FilterGroup title="Interests">
          <ChoiceButton
            selected={filters.interest === ""}
            onClick={() =>
              setFilters((current) => ({ ...current, interest: "" }))
            }
          >
            Any interest
          </ChoiceButton>
          {destinationInterests.map((value) => (
            <ChoiceButton
              key={value}
              selected={filters.interest === value}
              onClick={() =>
                setFilters((current) => ({ ...current, interest: value }))
              }
            >
              {destinationInterestLabels[value]}
            </ChoiceButton>
          ))}
        </FilterGroup>
        <FilterGroup title="Transport">
          <ChoiceButton
            selected={filters.transport === ""}
            onClick={() =>
              setFilters((current) => ({ ...current, transport: "" }))
            }
          >
            Any transport
          </ChoiceButton>
          {destinationTransports.map((value) => (
            <ChoiceButton
              key={value}
              selected={filters.transport === value}
              onClick={() =>
                setFilters((current) => ({ ...current, transport: value }))
              }
            >
              {destinationTransportLabels[value]}
            </ChoiceButton>
          ))}
        </FilterGroup>
      </div>

      <p className="mt-8 text-sm text-muted" role="status">
        Showing {visible.length} of {destinations.length} destinations. Hours and
        budgets are categories, not live quotes.
      </p>

      {visible.length === 0 ? (
        <p className="mt-6 text-sm text-muted-strong">
          No destination matches these filters. Clear one group and try again.
        </p>
      ) : (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((destination) => (
            <li key={destination.slug}>
              <Link
                href={`/destinations/${destination.slug}`}
                className="block h-full"
              >
                <Card className="h-full transition-colors hover:border-foreground/20 hover:bg-surface-raised">
                  <p className="text-xs uppercase tracking-[0.16em] text-muted">
                    {destinationRegionLabels[destination.region]}
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
                    {destination.name}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-muted">
                    {destination.shortDescription}
                  </p>
                  <p className="mt-4 text-xs leading-5 text-muted-strong">
                    {destinationDurationLabels[destination.tripDuration]} ·{" "}
                    {destinationBudgetLabels[destination.budgetCategory]} ·{" "}
                    {destinationTravelTimeLabels[destination.travelTimeCategory]}
                  </p>
                  <p className="mt-2 text-xs text-muted">
                    {weekendSuitabilityLabels[destination.weekendSuitability]}
                  </p>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
