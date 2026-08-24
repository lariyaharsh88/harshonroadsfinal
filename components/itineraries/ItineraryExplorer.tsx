"use client";

import { useMemo, useState } from "react";
import { ChoiceButton } from "@/components/tools/weekend/ChoiceButton";
import { Card } from "@/components/ui/Card";
import {
  emptyItineraryFilters,
  getItineraryDestinationOptions,
  matchesItineraryFilters,
  type ItineraryCardData,
  type ItineraryDirectoryFilters,
} from "@/lib/data/itineraries";
import {
  itineraryAudienceLabels,
  itineraryBudgetLabels,
  itineraryDurationLabels,
  itineraryTransportLabels,
  itineraryTravelStyleLabels,
} from "@/lib/data/itineraries/labels";
import {
  itineraryAudiences,
  itineraryBudgets,
  itineraryDurations,
  itineraryTransports,
  itineraryTravelStyles,
} from "@/lib/data/itineraries/types";
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

export function ItineraryExplorer({
  itineraries,
}: {
  itineraries: ItineraryCardData[];
}) {
  const [filters, setFilters] =
    useState<ItineraryDirectoryFilters>(emptyItineraryFilters);
  const destinations = useMemo(
    () => getItineraryDestinationOptions(itineraries),
    [itineraries],
  );

  const visible = useMemo(
    () =>
      itineraries.filter((itinerary) =>
        matchesItineraryFilters(itinerary, filters),
      ),
    [itineraries, filters],
  );

  function reset() {
    setFilters(emptyItineraryFilters);
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
        <FilterGroup title="Destination">
          <ChoiceButton
            selected={filters.destinationSlug === ""}
            onClick={() =>
              setFilters((current) => ({ ...current, destinationSlug: "" }))
            }
          >
            All destinations
          </ChoiceButton>
          {destinations.map((destination) => (
            <ChoiceButton
              key={destination.slug}
              selected={filters.destinationSlug === destination.slug}
              onClick={() =>
                setFilters((current) => ({
                  ...current,
                  destinationSlug: destination.slug,
                }))
              }
            >
              {destination.name}
            </ChoiceButton>
          ))}
        </FilterGroup>
        <FilterGroup title="Duration">
          <ChoiceButton
            selected={filters.duration === ""}
            onClick={() =>
              setFilters((current) => ({ ...current, duration: "" }))
            }
          >
            Any duration
          </ChoiceButton>
          {itineraryDurations.map((value) => (
            <ChoiceButton
              key={value}
              selected={filters.duration === value}
              onClick={() =>
                setFilters((current) => ({ ...current, duration: value }))
              }
            >
              {itineraryDurationLabels[value]}
            </ChoiceButton>
          ))}
        </FilterGroup>
        <FilterGroup title="Budget">
          <ChoiceButton
            selected={filters.budget === ""}
            onClick={() =>
              setFilters((current) => ({ ...current, budget: "" }))
            }
          >
            Any budget
          </ChoiceButton>
          {itineraryBudgets.map((value) => (
            <ChoiceButton
              key={value}
              selected={filters.budget === value}
              onClick={() =>
                setFilters((current) => ({ ...current, budget: value }))
              }
            >
              {itineraryBudgetLabels[value]}
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
          {itineraryTravelStyles.map((value) => (
            <ChoiceButton
              key={value}
              selected={filters.travelStyle === value}
              onClick={() =>
                setFilters((current) => ({ ...current, travelStyle: value }))
              }
            >
              {itineraryTravelStyleLabels[value]}
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
          {itineraryTransports.map((value) => (
            <ChoiceButton
              key={value}
              selected={filters.transport === value}
              onClick={() =>
                setFilters((current) => ({ ...current, transport: value }))
              }
            >
              {itineraryTransportLabels[value]}
            </ChoiceButton>
          ))}
        </FilterGroup>
        <FilterGroup title="Best for">
          <ChoiceButton
            selected={filters.bestFor === ""}
            onClick={() =>
              setFilters((current) => ({ ...current, bestFor: "" }))
            }
          >
            Anyone
          </ChoiceButton>
          {itineraryAudiences.map((value) => (
            <ChoiceButton
              key={value}
              selected={filters.bestFor === value}
              onClick={() =>
                setFilters((current) => ({ ...current, bestFor: value }))
              }
            >
              {itineraryAudienceLabels[value]}
            </ChoiceButton>
          ))}
        </FilterGroup>
      </div>

      <p className="mt-8 text-sm text-muted" role="status">
        Showing {visible.length} of {itineraries.length} itineraries. Budgets
        and travel times are categories, not live quotes.
      </p>

      {visible.length === 0 ? (
        <p className="mt-6 text-sm text-muted-strong">
          No itinerary matches these filters. Clear one group and try again.
        </p>
      ) : (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((itinerary) => (
            <li key={itinerary.slug}>
              <Card className="flex h-full flex-col">
                <p className="text-xs uppercase tracking-[0.16em] text-muted">
                  {itinerary.destinationName}
                </p>
                <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
                  {itinerary.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {itinerary.shortDescription}
                </p>
                <p className="mt-4 text-xs leading-5 text-muted-strong">
                  {itineraryDurationLabels[itinerary.duration]} ·{" "}
                  {itineraryBudgetLabels[itinerary.budgetCategory]} ·{" "}
                  {itineraryTravelStyleLabels[itinerary.travelStyle]}
                </p>
                <div className="mt-5">
                  <Link
                    href={`/itineraries/${itinerary.slug}`}
                    className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-5 text-sm font-semibold tracking-wide text-[#fff8ef] hover:bg-accent-hover"
                  >
                    View Itinerary
                  </Link>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
