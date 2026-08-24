import type {
  EducationSection,
  FaqItem,
  FormulaContent,
  RelatedArticle,
  ToolCtaContent,
} from "@/types/calculator";

export type ToolStatus = "coming-soon" | "live";

export type ToolCategory =
  | "fuel"
  | "budget"
  | "planning"
  | "packing"
  | "india";

export type Tool = {
  slug: string;
  name: string;
  description: string;
  category: ToolCategory;
  status: ToolStatus;
};

export type ToolDefinition = Tool & {
  seoTitle?: string;
  seoDescription?: string;
  explanation: string;
  education?: EducationSection[];
  formula?: FormulaContent;
  faqs: FaqItem[];
  relatedToolSlugs: string[];
  relatedArticles: RelatedArticle[];
  cta: ToolCtaContent;
  /**
   * When set, the client calculator loader imports matching logic
   * from lib/tools (e.g. "fuel" → fuel.ts). Omit for coming-soon tools.
   */
  calculatorId?: string;
  /** Interactive tool that is not a numeric calculator. */
  interactiveKind?:
    | "weekend-trip-finder"
    | "trip-cost-splitter"
    | "weekend-packing-list"
    | "long-weekend-planner"
    | "ai-weekend-planner"
    | "ai-trip-finder"
    | "ai-itinerary-generator"
    | "ai-trip-cost-estimator"
    | "ai-packing-list"
    | "ai-travel-content-creator";
  heading?: string;
};
