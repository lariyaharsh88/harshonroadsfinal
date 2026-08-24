export type FieldErrors = Partial<Record<string, string>>;

export type ToolFieldOption = {
  value: string;
  label: string;
};

export type ToolField = {
  name: string;
  label: string;
  type: "number" | "select";
  required?: boolean;
  prefix?: string;
  suffix?: string;
  placeholder?: string;
  helper?: string;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: string;
  options?: ToolFieldOption[];
  section?: string;
};

export type ResultItem = {
  key: string;
  label: string;
  value: string;
  hint?: string;
  emphasize?: boolean;
};

export type BreakdownItem = {
  label: string;
  value: string;
  detail?: string;
  emphasize?: boolean;
};

export type CalculatorOutput = {
  headline?: ResultItem;
  results: ResultItem[];
  breakdown?: BreakdownItem[];
};

export type CalculatorSpec<
  TInput extends Record<string, number | string> = Record<string, number | string>,
> = {
  fields: ToolField[];
  validate: (input: TInput) => FieldErrors;
  calculate: (input: TInput) => CalculatorOutput;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type FormulaContent = {
  title?: string;
  expression: string | string[];
  notes?: string[];
};

export type EducationSection = {
  title: string;
  paragraphs: string[];
  links?: { href: string; label: string }[];
};

export type RelatedArticle = {
  title: string;
  href: string;
  description?: string;
};

export type ToolCtaContent = {
  title: string;
  body: string;
  href: string;
  label: string;
};
