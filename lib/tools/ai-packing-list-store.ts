const STORAGE_KEY = "harshonroads-ai-packing-list-v1";

const listeners = new Set<() => void>();
let cached: string | null | undefined;

function emit() {
  for (const listener of listeners) {
    listener();
  }
}

export function subscribeAiPackingList(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getAiPackingListSnapshot(): string | null {
  if (typeof window === "undefined") {
    return null;
  }
  if (cached === undefined) {
    cached = window.localStorage.getItem(STORAGE_KEY);
  }
  return cached;
}

export function getAiPackingListServerSnapshot(): string | null {
  return null;
}

export function writeAiPackingList(value: string | null): void {
  cached = value;
  if (typeof window !== "undefined") {
    if (value === null) {
      window.localStorage.removeItem(STORAGE_KEY);
    } else {
      window.localStorage.setItem(STORAGE_KEY, value);
    }
  }
  emit();
}
