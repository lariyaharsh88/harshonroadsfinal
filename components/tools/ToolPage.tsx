import { Suspense } from "react";
import { FAQSection } from "@/components/tools/FAQSection";
import { FormulaSection } from "@/components/tools/FormulaSection";
import { RelatedArticles } from "@/components/tools/RelatedArticles";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolBreadcrumbs } from "@/components/tools/ToolBreadcrumbs";
import { ToolCTA } from "@/components/tools/ToolCTA";
import { ToolCalculator } from "@/components/tools/ToolCalculator";
import { TripCostSplitter } from "@/components/tools/TripCostSplitter";
import { WeekendPackingList } from "@/components/tools/WeekendPackingList";
import { AiItineraryGenerator } from "@/components/tools/ai/AiItineraryGenerator";
import { AiPackingList } from "@/components/tools/ai/AiPackingList";
import { AiTravelContentCreator } from "@/components/tools/ai/AiTravelContentCreator";
import { AiTripCostEstimator } from "@/components/tools/ai/AiTripCostEstimator";
import { AiTripFinder } from "@/components/tools/ai/AiTripFinder";
import { AiWeekendPlanner } from "@/components/tools/ai/AiWeekendPlanner";
import { LongWeekendPlanner } from "@/components/tools/weekend/LongWeekendPlanner";
import { WeekendTripFinder } from "@/components/tools/weekend/WeekendTripFinder";
import { ToolEducation } from "@/components/tools/ToolEducation";
import { ToolHeader } from "@/components/tools/ToolHeader";
import { ToolWebApplicationSchema } from "@/components/tools/ToolWebApplicationSchema";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import type { ToolDefinition } from "@/types/tool";

function CalculatorFallback() {
  return (
    <Card>
      <p className="text-sm text-muted">Loading calculator…</p>
    </Card>
  );
}

function ComingSoonPanel({ tool }: { tool: ToolDefinition }) {
  return (
    <Card className="border-dashed">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
        Coming soon
      </p>
      <h2 className="mt-3 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
        Calculator on the workbench
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
        {tool.explanation} The URL is reserved. The interactive form is not
        live yet.
      </p>
    </Card>
  );
}

export function ToolPage({ tool }: { tool: ToolDefinition }) {
  const isCalculator = tool.status === "live" && Boolean(tool.calculatorId);
  const isWeekendFinder =
    tool.status === "live" && tool.interactiveKind === "weekend-trip-finder";
  const isSplitter =
    tool.status === "live" && tool.interactiveKind === "trip-cost-splitter";
  const isPackingList =
    tool.status === "live" && tool.interactiveKind === "weekend-packing-list";
  const isLongWeekendPlanner =
    tool.status === "live" && tool.interactiveKind === "long-weekend-planner";
  const isAiWeekendPlanner =
    tool.status === "live" && tool.interactiveKind === "ai-weekend-planner";
  const isAiTripFinder =
    tool.status === "live" && tool.interactiveKind === "ai-trip-finder";
  const isAiItineraryGenerator =
    tool.status === "live" && tool.interactiveKind === "ai-itinerary-generator";
  const isAiTripCostEstimator =
    tool.status === "live" && tool.interactiveKind === "ai-trip-cost-estimator";
  const isAiPackingList =
    tool.status === "live" && tool.interactiveKind === "ai-packing-list";
  const isAiTravelContentCreator =
    tool.status === "live" &&
    tool.interactiveKind === "ai-travel-content-creator";

  return (
    <>
      <ToolWebApplicationSchema tool={tool} />
      <ToolHeader tool={tool} />
      <Container className="space-y-16 py-14 sm:py-16">
        <ToolBreadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Tools", path: "/tools" },
            { name: tool.name, path: `/tools/${tool.slug}` },
          ]}
        />

        {isCalculator && tool.calculatorId ? (
          <>
            <noscript>
              <Card className="border-dashed">
                <p className="text-sm leading-6 text-muted">
                  The interactive calculator needs JavaScript. You can still
                  use the formula, the worked example and the FAQs on this
                  page to work out the numbers by hand.
                </p>
              </Card>
            </noscript>
            <Suspense fallback={<CalculatorFallback />}>
              <ToolCalculator calculatorId={tool.calculatorId} />
            </Suspense>
          </>
        ) : isWeekendFinder ? (
          <>
            <noscript>
              <Card className="border-dashed">
                <p className="text-sm leading-6 text-muted">
                  The Weekend Trip Finder form needs JavaScript. The destination
                  notes and FAQs below still work without it.
                </p>
              </Card>
            </noscript>
            <WeekendTripFinder />
          </>
        ) : isSplitter ? (
          <>
            <noscript>
              <Card className="border-dashed">
                <p className="text-sm leading-6 text-muted">
                  The Trip Cost Splitter needs JavaScript. The explainer and
                  FAQs below still work without it.
                </p>
              </Card>
            </noscript>
            <TripCostSplitter />
          </>
        ) : isPackingList ? (
          <>
            <noscript>
              <Card className="border-dashed">
                <p className="text-sm leading-6 text-muted">
                  The packing checklist needs JavaScript. The packing notes and
                  FAQs below still work without it.
                </p>
              </Card>
            </noscript>
            <WeekendPackingList />
          </>
        ) : isLongWeekendPlanner ? (
          <>
            <noscript>
              <Card className="border-dashed">
                <p className="text-sm leading-6 text-muted">
                  The Long Weekend Planner form needs JavaScript. The planning
                  notes and FAQs below still work without it.
                </p>
              </Card>
            </noscript>
            <LongWeekendPlanner />
          </>
        ) : isAiWeekendPlanner ? (
          <>
            <noscript>
              <Card className="border-dashed">
                <p className="text-sm leading-6 text-muted">
                  The AI Weekend Planner form needs JavaScript. The planning
                  notes and FAQs below still work without it.
                </p>
              </Card>
            </noscript>
            <AiWeekendPlanner />
          </>
        ) : isAiTripFinder ? (
          <>
            <noscript>
              <Card className="border-dashed">
                <p className="text-sm leading-6 text-muted">
                  The AI Trip Finder form needs JavaScript. The destination
                  notes and FAQs below still work without it.
                </p>
              </Card>
            </noscript>
            <AiTripFinder />
          </>
        ) : isAiItineraryGenerator ? (
          <>
            <noscript>
              <Card className="border-dashed">
                <p className="text-sm leading-6 text-muted">
                  The AI Itinerary Generator form needs JavaScript. The planning
                  notes and FAQs below still work without it.
                </p>
              </Card>
            </noscript>
            <AiItineraryGenerator />
          </>
        ) : isAiTripCostEstimator ? (
          <>
            <noscript>
              <Card className="border-dashed">
                <p className="text-sm leading-6 text-muted">
                  The AI Trip Cost Estimator form needs JavaScript. The
                  explainer and FAQs below still work without it.
                </p>
              </Card>
            </noscript>
            <AiTripCostEstimator />
          </>
        ) : isAiPackingList ? (
          <>
            <noscript>
              <Card className="border-dashed">
                <p className="text-sm leading-6 text-muted">
                  The AI Packing List form needs JavaScript. The packing notes
                  and FAQs below still work without it.
                </p>
              </Card>
            </noscript>
            <AiPackingList />
          </>
        ) : isAiTravelContentCreator ? (
          <>
            <noscript>
              <Card className="border-dashed">
                <p className="text-sm leading-6 text-muted">
                  The AI Travel Content Creator form needs JavaScript. The
                  notes and FAQs below still work without it.
                </p>
              </Card>
            </noscript>
            <AiTravelContentCreator />
          </>
        ) : (
          <ComingSoonPanel tool={tool} />
        )}

        <ToolEducation sections={tool.education} />
        <FormulaSection formula={tool.formula} />
        <FAQSection faqs={tool.faqs} />
        <RelatedTools slugs={tool.relatedToolSlugs} excludeSlug={tool.slug} />
        <RelatedArticles articles={tool.relatedArticles} />
        <ToolCTA cta={tool.cta} />
      </Container>
    </>
  );
}
