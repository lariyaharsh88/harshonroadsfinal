export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function formatComingSoonLabel(status: "coming-soon" | "live"): string {
  return status === "live" ? "Live" : "Coming Soon";
}
