import type { CalculatorSpec } from "@/types/calculator";

/**
 * Map calculatorId → module. Add a file under lib/tools and one entry here
 * when you ship a new live calculator. Dynamic import keeps unused maths
 * out of other tool pages.
 */
const calculatorLoaders: Record<
  string,
  () => Promise<CalculatorSpec<Record<string, number | string>>>
> = {
  fuel: () =>
    import("./fuel").then(
      (mod) => mod.spec as CalculatorSpec<Record<string, number | string>>,
    ),
  mileage: () =>
    import("./mileage").then(
      (mod) => mod.spec as CalculatorSpec<Record<string, number | string>>,
    ),
  "trip-cost": () =>
    import("./trip-cost").then(
      (mod) => mod.spec as CalculatorSpec<Record<string, number | string>>,
    ),
  budget: () =>
    import("./budget").then(
      (mod) =>
        mod.spec as CalculatorSpec<Record<string, number | string>>,
    ),
  "fuel-required": () =>
    import("./fuel-required").then(
      (mod) =>
        mod.spec as CalculatorSpec<Record<string, number | string>>,
    ),
  "weekend-budget": () =>
    import("./weekend-budget").then(
      (mod) =>
        mod.spec as CalculatorSpec<Record<string, number | string>>,
    ),
  "distance-time": () =>
    import("./distance-time").then(
      (mod) =>
        mod.spec as CalculatorSpec<Record<string, number | string>>,
    ),
};

const specCache = new Map<
  string,
  Promise<CalculatorSpec<Record<string, number | string>>>
>();

export function loadCalculatorSpec(
  calculatorId: string,
): Promise<CalculatorSpec<Record<string, number | string>>> {
  const cached = specCache.get(calculatorId);
  if (cached) {
    return cached;
  }

  const load = calculatorLoaders[calculatorId];
  if (!load) {
    return Promise.reject(
      new Error(`No calculator module registered for "${calculatorId}".`),
    );
  }

  const promise = load();
  specCache.set(calculatorId, promise);
  return promise;
}

export function hasCalculatorModule(calculatorId: string): boolean {
  return calculatorId in calculatorLoaders;
}
