import { FAQSection } from "@/components/tools/FAQSection";
import { ButtonLink } from "@/components/ui/ButtonLink";
import type { FaqItem } from "@/types/calculator";
import Link from "next/link";

const toolsFaqs: FaqItem[] = [
  {
    question: "What can I use these travel tools for?",
    answer:
      "They help you pick a weekend getaway from Delhi NCR, sketch a travel budget, split costs, estimate fuel and packing, and shape a longer break. Every tool runs in the browser. Nothing is booked or priced live.",
  },
  {
    question: "How can I plan a weekend trip from Delhi NCR?",
    answer:
      "Start with the Weekend Trip Finder: time, budget, group, transport and interests. For a 2- to 5-day holiday, use the Long Weekend Planner. Then price the trip and pack.",
  },
  {
    question: "How can I calculate my trip budget?",
    answer:
      "Use the Weekend Trip Budget Calculator for stay, food and extras on an NCR weekend. For a longer highway outing, use the Road Trip Cost Calculator. If several people paid different bills, use the Trip Cost Splitter.",
  },
  {
    question: "How can I calculate fuel costs?",
    answer:
      "Enter distance and mileage in the Fuel Required Calculator, or use Bike Fuel Cost and Bike Mileage if you are on a motorcycle. These are arithmetic from the numbers you type, not pump prices.",
  },
  {
    question: "Which tool should I use to find a weekend destination?",
    answer:
      "The Weekend Trip Finder. It ranks a fixed Delhi NCR destination list. It is not an AI trip planner.",
  },
];

export function ToolsSeoContent() {
  return (
    <div className="space-y-12">
      <section>
        <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          Free Travel Tools for Delhi NCR Weekend Trips
        </h2>
        <div className="mt-5 max-w-3xl space-y-4 text-base leading-7 text-muted">
          <p>
            HarshOnRoads is a weekend travel platform. These free tools are
            here so a Friday afternoon in Delhi NCR can turn into a plan:
            where to go, what it might cost, how long the road will take, and
            what to pack.
          </p>
          <p>
            Weekend trip planning starts with the{" "}
            <Link
              href="/tools/weekend-trip-finder"
              className="font-semibold text-accent hover:text-accent-hover"
            >
              Weekend Trip Finder
            </Link>
            . Travel budgets for a short getaway belong in the{" "}
            <Link
              href="/tools/weekend-trip-budget"
              className="font-semibold text-accent hover:text-accent-hover"
            >
              Weekend Trip Budget Calculator
            </Link>
            . Road trips — car or bike — can be priced in the{" "}
            <Link
              href="/tools/road-trip-cost-calculator"
              className="font-semibold text-accent hover:text-accent-hover"
            >
              Road Trip Cost Calculator
            </Link>
            . A longer break uses the{" "}
            <Link
              href="/tools/long-weekend-planner"
              className="font-semibold text-accent hover:text-accent-hover"
            >
              Long Weekend Planner
            </Link>
            .
          </p>
          <p>
            None of this replaces a hotel website or a map app. The tools
            keep weekend getaways from Delhi NCR honest: your numbers, a
            fixed destination list, and no account.
          </p>
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/tools/weekend-trip-finder">
            Find a weekend trip
          </ButtonLink>
          <ButtonLink href="/weekend-trips" variant="secondary">
            Weekend trip ideas
          </ButtonLink>
        </div>
      </section>
      <FAQSection faqs={toolsFaqs} />
    </div>
  );
}
