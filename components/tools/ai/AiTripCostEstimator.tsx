"use client";

import { useMemo, useState, type ReactNode } from "react";
import { estimateTripCostAction } from "@/lib/ai/actions/estimate-trip-cost";
import type { TravelStyle } from "@/lib/ai/schemas/weekend-planner";
import type {
  TripCostEstimatorInput,
  TripCostEstimatorResult,
} from "@/lib/ai/schemas/trip-cost-estimator";
import { ChoiceButton } from "@/components/tools/weekend/ChoiceButton";
import { ShareButton } from "@/components/tools/ShareButton";
import { ToolInput } from "@/components/tools/ToolInput";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Card } from "@/components/ui/Card";
import { formatInr } from "@/lib/tools/engine";
import {
  computeScenarioCost,
  durationNightsDays,
  isPrivateVehicle,
  type CostScenarioRates,
} from "@/lib/tools/trip-cost-estimate";
import {
  durationLabels,
  originLabels,
  transportLabels,
} from "@/lib/tools/weekend-engine";
import { transports, tripDurations } from "@/types/destination";
import {
  AiError,
  AiGenerateButton,
  AiPromptInput,
  AiToolShell,
} from "@/components/tools/ai/shared/AiShell";
import { AiPlannerFrame } from "@/components/tools/ai/shared/AiPlannerFrame";

const exampleQuery =
  "Four friends from Noida are going to Rishikesh for 2 nights in a car.";

const travelStyleLabels: Record<TravelStyle, string> = {
  budget: "Budget",
  relaxed: "Relaxed",
  adventure: "Adventure",
  comfort: "Comfort",
  luxury: "Luxury",
};

type Draft = {
  query: string;
};

const emptyDraft: Draft = { query: "" };

function toInput(draft: Draft): TripCostEstimatorInput | null {
  const query = draft.query.trim();
  if (query.length < 20) {
    return null;
  }
  return { query };
}

function parseAmount(value: string): number {
  const next = Number(value);
  return Number.isFinite(next) && next >= 0 ? next : 0;
}

function FilterBlock({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="mt-6">
      <p className="mb-3 text-sm font-semibold">{title}</p>
      {children}
    </div>
  );
}

function ChoiceGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
  );
}

export function AiTripCostEstimator() {
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TripCostEstimatorResult | null>(null);
  const [scenarios, setScenarios] = useState<CostScenarioRates[]>([]);
  const [travellers, setTravellers] = useState(4);
  const [duration, setDuration] = useState<TripCostEstimatorResult["duration"]>(
    "2n3d",
  );
  const [transport, setTransport] =
    useState<TripCostEstimatorResult["transport"]>("car");
  const [roundTripKm, setRoundTripKm] = useState("500");
  const [mileageKmpl, setMileageKmpl] = useState("14");
  const [fuelPricePerLitre, setFuelPricePerLitre] = useState("105");
  const [shareUrl, setShareUrl] = useState("/tools/ai-trip-cost-estimator");

  const input = useMemo(() => toInput(draft), [draft]);
  const privateVehicle = isPrivateVehicle(transport);
  const { nights, days } = durationNightsDays(duration);

  const computed = useMemo(() => {
    const context = {
      travellers,
      duration,
      transport,
      roundTripKm: parseAmount(roundTripKm),
      mileageKmpl: parseAmount(mileageKmpl) || 1,
      fuelPricePerLitre: parseAmount(fuelPricePerLitre),
    };
    return scenarios.map((rates) => computeScenarioCost(context, rates));
  }, [
    scenarios,
    travellers,
    duration,
    transport,
    roundTripKm,
    mileageKmpl,
    fuelPricePerLitre,
  ]);

  const shareText = result
    ? `HarshOnRoads estimated trip cost sketch: ${result.destinationName}`
    : "HarshOnRoads AI Trip Cost Estimator";

  async function generate() {
    if (!input) {
      return;
    }
    setPending(true);
    setError(null);
    try {
      const response = await estimateTripCostAction(input);
      if (!response.ok) {
        setError(response.message);
        return;
      }
      const data = response.data;
      setResult(data);
      setScenarios(data.scenarios);
      setTravellers(data.travellerCount);
      setDuration(data.duration);
      setTransport(data.transport);
      setRoundTripKm(String(data.estimatedRoundTripKm));
      setMileageKmpl(String(data.typicalMileageKmpl));
      setFuelPricePerLitre(String(data.typicalFuelPricePerLitre));
      if (typeof window !== "undefined") {
        setShareUrl(
          window.location.href.split("#")[0] ??
            "/tools/ai-trip-cost-estimator",
        );
      }
    } catch {
      setError(
        "The estimator could not complete this request. Please try again.",
      );
    } finally {
      setPending(false);
    }
  }

  function reset() {
    setDraft(emptyDraft);
    setResult(null);
    setScenarios([]);
    setError(null);
  }

  function updateScenario(
    id: CostScenarioRates["id"],
    patch: Partial<CostScenarioRates>,
  ) {
    setScenarios((current) =>
      current.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    );
  }

  if (result) {
    return (
      <div className="print-results space-y-6">
        <div className="no-print rounded-2xl border border-accent/30 bg-accent-soft px-5 py-4 text-sm leading-6 text-muted-strong">
          These figures are planning sketches, not live hotel, fuel, toll,
          parking or ticket prices. Edit the assumptions, then verify stay and
          roads before you go. Nothing is saved.
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            Estimated cost sketch
          </p>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight">
            {result.querySummary}
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            {originLabels[result.origin]} → {result.destinationName} (
            {result.destinationRegion}). {travellers} traveller
            {travellers === 1 ? "" : "s"}, {durationLabels[duration]},{" "}
            {transportLabels[transport]}, {travelStyleLabels[result.tripStyle]}{" "}
            style. Stay uses {nights} night{nights === 1 ? "" : "s"} and food
            uses {days} day{days === 1 ? "" : "s"}.
          </p>
        </div>
        <div className="no-print flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            onClick={() => setResult(null)}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-6 text-sm font-semibold"
          >
            Edit request
          </button>
          <button
            type="button"
            disabled={pending}
            onClick={() => {
              void generate();
            }}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-6 text-sm font-semibold text-[#fff8ef] disabled:opacity-40"
          >
            {pending ? "Estimating…" : "Regenerate sketch"}
          </button>
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-6 text-sm font-semibold"
          >
            Start over
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-6 text-sm font-semibold"
          >
            Print
          </button>
          <ShareButton
            title="HarshOnRoads AI Trip Cost Estimator"
            url={shareUrl}
            text={shareText}
          />
        </div>
        {error ? (
          <p className="no-print text-sm text-accent" role="alert">
            {error}
          </p>
        ) : null}

        <Card className="no-print">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-strong">
            Edit assumptions
          </p>
          <p className="mt-2 text-sm leading-6 text-muted">
            Changing travellers, duration or vehicle numbers recalculates in
            the browser. Regenerating asks the model for a new sketch.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <ToolInput
              name="travellers"
              label="Travellers"
              value={String(travellers)}
              min={1}
              max={12}
              step={1}
              onChange={(value) =>
                setTravellers(
                  Math.min(12, Math.max(1, Math.round(parseAmount(value) || 1))),
                )
              }
            />
          </div>
          <FilterBlock title="Duration">
            <ChoiceGrid>
              {tripDurations.map((value) => (
                <ChoiceButton
                  key={value}
                  selected={duration === value}
                  onClick={() => setDuration(value)}
                >
                  {durationLabels[value]}
                </ChoiceButton>
              ))}
            </ChoiceGrid>
          </FilterBlock>
          <FilterBlock title="Transport">
            <ChoiceGrid>
              {transports.map((value) => (
                <ChoiceButton
                  key={value}
                  selected={transport === value}
                  onClick={() => setTransport(value)}
                >
                  {transportLabels[value]}
                </ChoiceButton>
              ))}
            </ChoiceGrid>
          </FilterBlock>
          {privateVehicle ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <ToolInput
                name="roundTripKm"
                label="Round-trip distance"
                suffix="km"
                value={roundTripKm}
                helper="Typical highway sketch, not GPS."
                min={20}
                max={3000}
                onChange={setRoundTripKm}
              />
              <ToolInput
                name="mileageKmpl"
                label="Mileage"
                suffix="km/l"
                value={mileageKmpl}
                helper="Your vehicle, not a lab figure."
                min={4}
                max={80}
                step={0.1}
                onChange={setMileageKmpl}
              />
              <ToolInput
                name="fuelPricePerLitre"
                label="Fuel price"
                prefix="₹"
                suffix="/L"
                value={fuelPricePerLitre}
                helper="Assumption, not today's pump price."
                min={50}
                max={200}
                step={0.1}
                onChange={setFuelPricePerLitre}
              />
            </div>
          ) : (
            <p className="mt-4 text-sm leading-6 text-muted">
              Bus and train transport lines are estimated tickets per scenario.
              Edit them on each card. They are not live IRCTC or operator fares.
            </p>
          )}
        </Card>

        <div className="grid gap-6 lg:grid-cols-3">
          {computed.map((scenario) => {
            const rates = scenarios.find((item) => item.id === scenario.id);
            if (!rates) {
              return null;
            }
            return (
              <article
                key={scenario.id}
                className="rounded-2xl border border-border bg-surface p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                  {scenario.label}
                </p>
                <p className="mt-4 text-sm text-muted">Estimated total</p>
                <p className="font-display text-3xl font-extrabold tracking-tight">
                  {formatInr(scenario.totalInr)}
                </p>
                <p className="mt-3 text-sm text-muted">
                  Estimated per person
                </p>
                <p className="text-lg font-semibold">
                  {formatInr(scenario.perPersonInr)}
                </p>
                <dl className="mt-6 space-y-3 text-sm">
                  {scenario.lines.map((line) => (
                    <div key={line.key} className="flex justify-between gap-3">
                      <dt className="text-muted">{line.label}</dt>
                      <dd className="font-semibold">
                        {formatInr(line.amountInr)}
                      </dd>
                    </div>
                  ))}
                </dl>
                <div className="no-print mt-6 space-y-4">
                  <ToolInput
                    name={`${scenario.id}-stay`}
                    label="Stay per night (group)"
                    prefix="₹"
                    value={String(rates.stayPerNightInr)}
                    onChange={(value) =>
                      updateScenario(scenario.id, {
                        stayPerNightInr: parseAmount(value),
                      })
                    }
                  />
                  <ToolInput
                    name={`${scenario.id}-food`}
                    label="Food per person per day"
                    prefix="₹"
                    value={String(rates.foodPerPersonPerDayInr)}
                    onChange={(value) =>
                      updateScenario(scenario.id, {
                        foodPerPersonPerDayInr: parseAmount(value),
                      })
                    }
                  />
                  <ToolInput
                    name={`${scenario.id}-activities`}
                    label="Activities (group total)"
                    prefix="₹"
                    value={String(rates.activitiesTotalInr)}
                    onChange={(value) =>
                      updateScenario(scenario.id, {
                        activitiesTotalInr: parseAmount(value),
                      })
                    }
                  />
                  <ToolInput
                    name={`${scenario.id}-tolls`}
                    label="Tolls"
                    prefix="₹"
                    value={String(rates.tollsInr)}
                    onChange={(value) =>
                      updateScenario(scenario.id, {
                        tollsInr: parseAmount(value),
                      })
                    }
                  />
                  <ToolInput
                    name={`${scenario.id}-parking`}
                    label="Parking"
                    prefix="₹"
                    value={String(rates.parkingInr)}
                    onChange={(value) =>
                      updateScenario(scenario.id, {
                        parkingInr: parseAmount(value),
                      })
                    }
                  />
                  <ToolInput
                    name={`${scenario.id}-misc`}
                    label="Miscellaneous"
                    prefix="₹"
                    value={String(rates.miscellaneousInr)}
                    onChange={(value) =>
                      updateScenario(scenario.id, {
                        miscellaneousInr: parseAmount(value),
                      })
                    }
                  />
                  {!privateVehicle ? (
                    <ToolInput
                      name={`${scenario.id}-tickets`}
                      label="Transport tickets (group)"
                      prefix="₹"
                      value={String(rates.publicTransportTotalInr)}
                      onChange={(value) =>
                        updateScenario(scenario.id, {
                          publicTransportTotalInr: parseAmount(value),
                        })
                      }
                    />
                  ) : null}
                </div>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-muted-strong">
                  Assumptions
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-muted">
                  {scenario.assumptions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <Card className="bg-surface-raised">
          <h3 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
            Verify before you go
          </h3>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-muted">
            {result.verificationNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm leading-6 text-muted">
            {result.disclaimer}
          </p>
          <div className="mt-6 no-print">
            <ButtonLink href={`/destinations/${result.destinationSlug}`}>
              Open destination page
            </ButtonLink>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <AiPlannerFrame
      pending={pending}
      loadingContext={draft.query}
      toolLabel="cost estimator"
      onSubmit={(event) => {
        event.preventDefault();
        void generate();
      }}
    >
      <AiToolShell
        title="Your trip cost, one brief"
        hint="Describe the trip once. AI returns Budget, Comfort and Higher Comfort sketches."
        footer={
          <>
            {error ? <AiError message={error} /> : null}
            <AiGenerateButton
              type="submit"
              disabled={!input}
              label="Generate my plan"
              pendingLabel="Estimating…"
            />
          </>
        }
      >
        <AiPromptInput
          name="query"
          label="Describe your trip"
          value={draft.query}
          onChange={(value) => setDraft({ query: value })}
          placeholder={exampleQuery}
          hint="Include origin, destination, nights, transport and group size."
          rows={5}
        />
      </AiToolShell>
    </AiPlannerFrame>
  );
}
