"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { loginAdmin, logoutAdmin, requireAdmin } from "@/lib/admin/auth";
import {
  getStoredDestinations,
  getStoredItineraries,
  saveDestinations,
  saveItineraries,
} from "@/lib/cms/store";
import type { DestinationGuide } from "@/lib/data/destinations/types";
import type { ItineraryRecord } from "@/lib/data/itineraries/types";

function parseJsonRecord<T>(raw: string, label: string): T {
  try {
    return JSON.parse(raw) as T;
  } catch {
    throw new Error(`Invalid JSON for ${label}.`);
  }
}

function revalidateDestinationPaths(slug?: string): void {
  revalidatePath("/");
  revalidatePath("/destinations");
  revalidatePath("/weekend-trips");
  revalidatePath("/sitemap.xml");
  if (slug) {
    revalidatePath(`/destinations/${slug}`);
  }
}

function revalidateItineraryPaths(slug?: string): void {
  revalidatePath("/");
  revalidatePath("/itineraries");
  revalidatePath("/sitemap.xml");
  if (slug) {
    revalidatePath(`/itineraries/${slug}`);
  }
}

export async function adminLoginAction(
  _prev: { error?: string } | null,
  formData: FormData,
): Promise<{ error?: string }> {
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");

  const result = await loginAdmin(password);
  if (!result.ok) {
    return { error: result.error ?? "Login failed." };
  }

  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function adminLogoutAction(): Promise<void> {
  await logoutAdmin();
  redirect("/admin/login");
}

export async function saveDestinationAction(
  originalSlug: string,
  rawJson: string,
): Promise<{ ok: boolean; error?: string; slug?: string }> {
  await requireAdmin();

  const record = parseJsonRecord<DestinationGuide>(rawJson, "destination");
  if (!record.slug?.trim() || !record.name?.trim()) {
    return { ok: false, error: "Destination name and slug are required." };
  }

  const destinations = getStoredDestinations();
  const index = destinations.findIndex((item) => item.slug === originalSlug);
  if (index === -1) {
    return { ok: false, error: "Destination not found." };
  }

  if (originalSlug !== record.slug && destinations.some((item) => item.slug === record.slug)) {
    return { ok: false, error: "Another destination already uses that slug." };
  }

  destinations[index] = record;
  saveDestinations(destinations);
  revalidateDestinationPaths(record.slug);
  if (originalSlug !== record.slug) {
    revalidateDestinationPaths(originalSlug);
  }

  return { ok: true, slug: record.slug };
}

export async function createDestinationAction(
  rawJson: string,
): Promise<{ ok: boolean; error?: string; slug?: string }> {
  await requireAdmin();

  const record = parseJsonRecord<DestinationGuide>(rawJson, "destination");
  if (!record.slug?.trim() || !record.name?.trim()) {
    return { ok: false, error: "Destination name and slug are required." };
  }

  const destinations = getStoredDestinations();
  if (destinations.some((item) => item.slug === record.slug)) {
    return { ok: false, error: "A destination with this slug already exists." };
  }

  destinations.push(record);
  saveDestinations(destinations);
  revalidateDestinationPaths(record.slug);

  return { ok: true, slug: record.slug };
}

export async function deleteDestinationAction(
  slug: string,
): Promise<{ ok: boolean; error?: string }> {
  await requireAdmin();

  const destinations = getStoredDestinations().filter((item) => item.slug !== slug);
  if (destinations.length === getStoredDestinations().length) {
    return { ok: false, error: "Destination not found." };
  }

  saveDestinations(destinations);
  revalidateDestinationPaths(slug);

  return { ok: true };
}

export async function saveItineraryAction(
  originalSlug: string,
  rawJson: string,
): Promise<{ ok: boolean; error?: string; slug?: string }> {
  await requireAdmin();

  const record = parseJsonRecord<ItineraryRecord>(rawJson, "itinerary");
  if (!record.slug?.trim() || !record.title?.trim()) {
    return { ok: false, error: "Itinerary title and slug are required." };
  }

  const itineraries = getStoredItineraries();
  const index = itineraries.findIndex((item) => item.slug === originalSlug);
  if (index === -1) {
    return { ok: false, error: "Itinerary not found." };
  }

  if (originalSlug !== record.slug && itineraries.some((item) => item.slug === record.slug)) {
    return { ok: false, error: "Another itinerary already uses that slug." };
  }

  itineraries[index] = record;
  saveItineraries(itineraries);
  revalidateItineraryPaths(record.slug);
  if (originalSlug !== record.slug) {
    revalidateItineraryPaths(originalSlug);
  }

  return { ok: true, slug: record.slug };
}

export async function createItineraryAction(
  rawJson: string,
): Promise<{ ok: boolean; error?: string; slug?: string }> {
  await requireAdmin();

  const record = parseJsonRecord<ItineraryRecord>(rawJson, "itinerary");
  if (!record.slug?.trim() || !record.title?.trim()) {
    return { ok: false, error: "Itinerary title and slug are required." };
  }

  const itineraries = getStoredItineraries();
  if (itineraries.some((item) => item.slug === record.slug)) {
    return { ok: false, error: "An itinerary with this slug already exists." };
  }

  itineraries.push(record);
  saveItineraries(itineraries);
  revalidateItineraryPaths(record.slug);

  return { ok: true, slug: record.slug };
}

export async function deleteItineraryAction(
  slug: string,
): Promise<{ ok: boolean; error?: string }> {
  await requireAdmin();

  const itineraries = getStoredItineraries().filter((item) => item.slug !== slug);
  if (itineraries.length === getStoredItineraries().length) {
    return { ok: false, error: "Itinerary not found." };
  }

  saveItineraries(itineraries);
  revalidateItineraryPaths(slug);

  return { ok: true };
}

export async function reseedCmsAction(): Promise<void> {
  await requireAdmin();

  const { seedDestinations, seedItineraries } = await import("@/lib/cms/seed");
  saveDestinations(seedDestinations);
  saveItineraries(seedItineraries);
  revalidateDestinationPaths();
  revalidateItineraryPaths();
  revalidatePath("/admin");
  redirect("/admin");
}
