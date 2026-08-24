import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (props) => (
      <h2
        className="mt-8 font-display text-2xl font-extrabold tracking-tight sm:text-3xl text-foreground"
        {...props}
      />
    ),
    p: (props) => (
      <p className="mt-4 text-base leading-7 text-muted" {...props} />
    ),
    ul: (props) => (
      <ul className="mt-4 list-disc space-y-2 pl-5 text-muted" {...props} />
    ),
    ...components,
  };
}
