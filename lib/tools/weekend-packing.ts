export const packingDurations = [
  { value: "day-trip", label: "Day trip" },
  { value: "1-night", label: "1 night" },
  { value: "2-nights", label: "2 nights" },
  { value: "3-plus", label: "3+ nights" },
] as const;

export const packingSeasons = [
  { value: "summer", label: "Summer" },
  { value: "winter", label: "Winter" },
  { value: "monsoon", label: "Monsoon" },
  { value: "spring-autumn", label: "Spring/Autumn" },
] as const;

export const packingTripTypes = [
  { value: "mountain", label: "Mountain" },
  { value: "nature", label: "Nature" },
  { value: "adventure", label: "Adventure" },
  { value: "city", label: "City" },
  { value: "beach", label: "Beach" },
  { value: "wildlife", label: "Wildlife" },
  { value: "road-trip", label: "Road Trip" },
] as const;

export const packingTransports = [
  { value: "bike", label: "Bike" },
  { value: "car", label: "Car" },
  { value: "train", label: "Train" },
  { value: "bus", label: "Bus" },
] as const;

export const packingCategoryOrder = [
  "documents",
  "clothing",
  "footwear",
  "toiletries",
  "electronics",
  "travel-essentials",
  "medicine",
  "riding-gear",
  "car-essentials",
  "photography",
  "outdoor-gear",
] as const;

export type PackingDuration = (typeof packingDurations)[number]["value"];
export type PackingSeason = (typeof packingSeasons)[number]["value"];
export type PackingTripType = (typeof packingTripTypes)[number]["value"];
export type PackingTransport = (typeof packingTransports)[number]["value"];
export type PackingCategory = (typeof packingCategoryOrder)[number];

export const packingCategoryLabels: Record<PackingCategory, string> = {
  documents: "Documents",
  clothing: "Clothing",
  footwear: "Footwear",
  toiletries: "Toiletries",
  electronics: "Electronics",
  "travel-essentials": "Travel essentials",
  medicine: "Medicine/first-aid essentials",
  "riding-gear": "Riding gear",
  "car-essentials": "Car essentials",
  photography: "Photography",
  "outdoor-gear": "Outdoor gear",
};

export type PackingSelection = {
  duration: PackingDuration;
  season: PackingSeason;
  tripType: PackingTripType;
  transport: PackingTransport;
};

type PackingWhen = {
  durations?: PackingDuration[];
  seasons?: PackingSeason[];
  types?: PackingTripType[];
  transports?: PackingTransport[];
  /** Default is all listed keys must match. `any` means at least one listed key matches. */
  match?: "all" | "any";
};

export type PackingItemDef = {
  id: string;
  label: string;
  category: PackingCategory;
  when?: PackingWhen;
};

export type PackingLine = {
  id: string;
  label: string;
  category: PackingCategory;
  custom: boolean;
};

const overnight: PackingDuration[] = ["1-night", "2-nights", "3-plus"];
const twoPlus: PackingDuration[] = ["2-nights", "3-plus"];
const longStay: PackingDuration[] = ["3-plus"];
const outdoorTypes: PackingTripType[] = [
  "mountain",
  "nature",
  "adventure",
  "wildlife",
];
const scenicTypes: PackingTripType[] = [
  "mountain",
  "nature",
  "adventure",
  "wildlife",
  "beach",
];

export const defaultPackingSelection: PackingSelection = {
  duration: "2-nights",
  season: "winter",
  tripType: "mountain",
  transport: "car",
};

const catalog: PackingItemDef[] = [
  {
    id: "doc-id",
    category: "documents",
    label: "Government photo ID (Aadhaar, passport or driving licence)",
  },
  {
    id: "doc-cash",
    category: "documents",
    label: "Cash plus a working UPI app",
  },
  {
    id: "doc-stay",
    category: "documents",
    label: "Stay confirmation screenshot or printout",
    when: { durations: overnight },
  },
  {
    id: "doc-tickets",
    category: "documents",
    label: "Train or bus tickets / PNR",
    when: { transports: ["train", "bus"] },
  },
  {
    id: "doc-licence",
    category: "documents",
    label: "Driving licence (original)",
    when: { transports: ["bike", "car"] },
  },
  {
    id: "doc-vehicle",
    category: "documents",
    label: "RC, insurance and PUC copies",
    when: { transports: ["bike", "car"] },
  },
  {
    id: "doc-fastag",
    category: "documents",
    label: "FASTag balance or toll cash",
    when: { transports: ["bike", "car"] },
  },
  {
    id: "doc-permits",
    category: "documents",
    label: "Park / sanctuary permit notes (if booked)",
    when: { types: ["wildlife"] },
  },

  { id: "cl-day", category: "clothing", label: "Comfortable day clothes" },
  {
    id: "cl-nightwear",
    category: "clothing",
    label: "Nightwear",
    when: { durations: overnight },
  },
  {
    id: "cl-underwear",
    category: "clothing",
    label: "Spare underwear (one set per night, plus one extra)",
    when: { durations: overnight },
  },
  {
    id: "cl-shirts",
    category: "clothing",
    label: "Spare T-shirt or shirt",
    when: { durations: overnight },
  },
  {
    id: "cl-extra-layers",
    category: "clothing",
    label: "Extra trousers / track pants",
    when: { durations: twoPlus },
  },
  {
    id: "cl-laundry",
    category: "clothing",
    label: "Laundry bag for used clothes",
    when: { durations: longStay },
  },
  {
    id: "cl-cotton",
    category: "clothing",
    label: "Light cotton / breathable layers",
    when: { seasons: ["summer"] },
  },
  {
    id: "cl-thermals",
    category: "clothing",
    label: "Thermals (top and bottom)",
    when: { seasons: ["winter"] },
  },
  {
    id: "cl-warm-jacket",
    category: "clothing",
    label: "Warm jacket",
    when: { seasons: ["winter"], types: ["mountain", "nature", "wildlife", "road-trip", "adventure"] },
  },
  {
    id: "cl-city-jacket",
    category: "clothing",
    label: "Light jacket or hoodie for evenings",
    when: { seasons: ["spring-autumn", "winter", "monsoon"] },
  },
  {
    id: "cl-rain",
    category: "clothing",
    label: "Rain jacket or poncho",
    when: { seasons: ["monsoon"] },
  },
  {
    id: "cl-cap",
    category: "clothing",
    label: "Cap or sun hat",
    when: { seasons: ["summer", "spring-autumn"], types: ["mountain", "beach", "nature", "city", "adventure"] },
  },
  {
    id: "cl-beanie",
    category: "clothing",
    label: "Beanie, muffler or neck warmer",
    when: { seasons: ["winter"] },
  },
  {
    id: "cl-swim",
    category: "clothing",
    label: "Swimwear and a quick-dry cover-up",
    when: { types: ["beach"] },
  },
  {
    id: "cl-wildlife",
    category: "clothing",
    label: "Muted colours (avoid bright white and neon)",
    when: { types: ["wildlife"] },
  },
  {
    id: "cl-city",
    category: "clothing",
    label: "One smarter outfit for a restaurant or walk",
    when: { types: ["city"] },
  },
  {
    id: "cl-socks",
    category: "clothing",
    label: "Extra socks (keep one pair dry in a zip bag)",
    when: { seasons: ["monsoon", "winter"], durations: overnight },
  },

  {
    id: "ft-walk",
    category: "footwear",
    label: "Comfortable walking shoes you have already worn in",
  },
  {
    id: "ft-slides",
    category: "footwear",
    label: "Slides or flip-flops for the stay",
    when: { durations: overnight },
  },
  {
    id: "ft-trek",
    category: "footwear",
    label: "Trekking shoes with grip",
    when: { types: ["mountain", "adventure", "nature"] },
  },
  {
    id: "ft-closed",
    category: "footwear",
    label: "Closed shoes (not sandals) for the park",
    when: { types: ["wildlife"] },
  },
  {
    id: "ft-beach",
    category: "footwear",
    label: "Flip-flops that can get wet",
    when: { types: ["beach"] },
  },
  {
    id: "ft-rain",
    category: "footwear",
    label: "Waterproof shoes or shoe covers",
    when: { seasons: ["monsoon"] },
  },
  {
    id: "ft-city",
    category: "footwear",
    label: "Comfortable shoes for long city walks",
    when: { types: ["city"] },
  },

  { id: "to-wipes", category: "toiletries", label: "Wet wipes" },
  { id: "to-sanitiser", category: "toiletries", label: "Hand sanitiser" },
  {
    id: "to-brush",
    category: "toiletries",
    label: "Toothbrush and toothpaste",
    when: { durations: overnight },
  },
  {
    id: "to-soap",
    category: "toiletries",
    label: "Soap or face wash",
    when: { durations: overnight },
  },
  {
    id: "to-towel",
    category: "toiletries",
    label: "Quick-dry towel",
    when: { durations: overnight, types: ["adventure", "beach", "mountain"] },
  },
  {
    id: "to-sun",
    category: "toiletries",
    label: "Sunscreen (SPF you already use)",
    when: { seasons: ["summer", "spring-autumn"], types: ["mountain", "beach", "city", "nature", "adventure", "road-trip"] },
  },
  {
    id: "to-lip",
    category: "toiletries",
    label: "Lip balm and moisturiser",
    when: { seasons: ["winter"] },
  },
  {
    id: "to-bug",
    category: "toiletries",
    label: "Insect repellent",
    when: { types: ["nature", "wildlife", "mountain"], seasons: ["monsoon", "summer"] },
  },
  {
    id: "to-tissue",
    category: "toiletries",
    label: "Tissues or a small toilet-paper roll",
    when: { types: outdoorTypes },
  },
  {
    id: "to-groom",
    category: "toiletries",
    label: "Small grooming kit (comb, deodorant)",
    when: { durations: overnight },
  },
  {
    id: "to-wet-bag",
    category: "toiletries",
    label: "Zip bags for wet clothes and used toiletries",
    when: { seasons: ["monsoon"], types: ["beach"], match: "any" },
  },

  { id: "el-phone", category: "electronics", label: "Phone" },
  { id: "el-charger", category: "electronics", label: "Phone charger" },
  { id: "el-bank", category: "electronics", label: "Power bank (charged)" },
  {
    id: "el-cable",
    category: "electronics",
    label: "Spare charging cable",
    when: { durations: twoPlus },
  },
  {
    id: "el-headphones",
    category: "electronics",
    label: "Headphones or earphones",
    when: { transports: ["train", "bus"] },
  },
  {
    id: "el-vehicle-cable",
    category: "electronics",
    label: "USB cable for the bike or car charger",
    when: { transports: ["bike", "car"] },
  },
  {
    id: "el-torch",
    category: "electronics",
    label: "Headlamp or torch",
    when: { types: ["mountain", "adventure", "wildlife", "nature"], durations: overnight },
  },
  {
    id: "el-power-extra",
    category: "electronics",
    label: "Second power bank or a wall multi-plug",
    when: { durations: longStay },
  },

  {
    id: "tr-bottle",
    category: "travel-essentials",
    label: "Reusable water bottle",
  },
  { id: "tr-pack", category: "travel-essentials", label: "Daypack or backpack" },
  {
    id: "tr-snacks",
    category: "travel-essentials",
    label: "Road snacks and a small dry-food buffer",
    when: { types: ["road-trip"], transports: ["bike", "car", "train", "bus"], match: "any" },
  },
  {
    id: "tr-sunglasses",
    category: "travel-essentials",
    label: "Sunglasses",
    when: { seasons: ["summer", "spring-autumn", "winter"] },
  },
  {
    id: "tr-buff",
    category: "travel-essentials",
    label: "Buff, mask or dust scarf",
    when: { transports: ["bike"] },
  },
  {
    id: "tr-pillow",
    category: "travel-essentials",
    label: "Neck pillow",
    when: { transports: ["train", "bus"] },
  },
  {
    id: "tr-earplugs",
    category: "travel-essentials",
    label: "Earplugs",
    when: { transports: ["train", "bus"], durations: overnight },
  },
  {
    id: "tr-lock",
    category: "travel-essentials",
    label: "Small bag lock",
    when: { transports: ["train", "bus"] },
  },
  {
    id: "tr-tote",
    category: "travel-essentials",
    label: "Foldable tote for shopping",
    when: { types: ["city"] },
  },
  {
    id: "tr-plastic",
    category: "travel-essentials",
    label: "Spare plastic or dry bags",
    when: { seasons: ["monsoon"], types: ["beach"], match: "any" },
  },
  {
    id: "tr-copies",
    category: "travel-essentials",
    label: "Photocopy or phone scan of ID in a second pocket",
  },

  {
    id: "md-rx",
    category: "medicine",
    label: "Your usual prescription medicines",
  },
  { id: "md-bandaid", category: "medicine", label: "Band-aids" },
  {
    id: "md-pain",
    category: "medicine",
    label: "Painkiller you already take (if any)",
  },
  {
    id: "md-antiseptic",
    category: "medicine",
    label: "Antiseptic cream",
    when: { types: ["adventure", "mountain", "nature", "wildlife"] },
  },
  {
    id: "md-ors",
    category: "medicine",
    label: "ORS or electrolytes",
    when: { seasons: ["summer"], types: ["adventure", "road-trip", "mountain"] },
  },
  {
    id: "md-motion",
    category: "medicine",
    label: "Motion-sickness tablets (if you use them)",
    when: { transports: ["bus"], types: ["mountain", "road-trip"] },
  },
  {
    id: "md-bite",
    category: "medicine",
    label: "Mosquito-bite cream",
    when: { types: ["wildlife", "nature"], seasons: ["monsoon", "summer"] },
  },
  {
    id: "md-cold",
    category: "medicine",
    label: "Cold / cough medicine you already use",
    when: { seasons: ["winter"] },
  },
  {
    id: "md-kit",
    category: "medicine",
    label: "Small first-aid pouch",
    when: { durations: twoPlus, types: ["adventure", "wildlife", "mountain"] },
  },

  {
    id: "rg-helmet",
    category: "riding-gear",
    label: "ISI helmet",
    when: { transports: ["bike"] },
  },
  {
    id: "rg-jacket",
    category: "riding-gear",
    label: "Riding jacket",
    when: { transports: ["bike"] },
  },
  {
    id: "rg-gloves",
    category: "riding-gear",
    label: "Riding gloves",
    when: { transports: ["bike"] },
  },
  {
    id: "rg-pants",
    category: "riding-gear",
    label: "Riding pants or knee/shin protection",
    when: { transports: ["bike"] },
  },
  {
    id: "rg-rain",
    category: "riding-gear",
    label: "Motorcycle rain suit or rain liner",
    when: { transports: ["bike"], seasons: ["monsoon"] },
  },
  {
    id: "rg-winter",
    category: "riding-gear",
    label: "Balaclava and winter riding gloves",
    when: { transports: ["bike"], seasons: ["winter"] },
  },
  {
    id: "rg-mount",
    category: "riding-gear",
    label: "Phone mount (charged phone, cable routed safely)",
    when: { transports: ["bike"] },
  },
  {
    id: "rg-puncture",
    category: "riding-gear",
    label: "Puncture kit / tyre inflator",
    when: { transports: ["bike"], types: ["road-trip", "adventure", "mountain"] },
  },
  {
    id: "rg-lube",
    category: "riding-gear",
    label: "Chain lube",
    when: { transports: ["bike"], durations: twoPlus },
  },
  {
    id: "rg-straps",
    category: "riding-gear",
    label: "Bungee cords or a tail bag",
    when: { transports: ["bike"] },
  },

  {
    id: "car-mount",
    category: "car-essentials",
    label: "Phone mount and car charger",
    when: { transports: ["car"] },
  },
  {
    id: "car-water",
    category: "car-essentials",
    label: "Drinking water for the cabin",
    when: { transports: ["car"] },
  },
  {
    id: "car-wipes",
    category: "car-essentials",
    label: "Wipes and a small rubbish bag",
    when: { transports: ["car"] },
  },
  {
    id: "car-umbrella",
    category: "car-essentials",
    label: "Umbrella",
    when: { transports: ["car"], seasons: ["monsoon"] },
  },
  {
    id: "car-blanket",
    category: "car-essentials",
    label: "Light blanket or extra layer in the boot",
    when: { transports: ["car"], seasons: ["winter"] },
  },
  {
    id: "car-spare",
    category: "car-essentials",
    label: "Check spare tyre, jack and warning triangle",
    when: { transports: ["car"], types: ["road-trip", "mountain", "adventure"] },
  },
  {
    id: "car-firstaid",
    category: "car-essentials",
    label: "Car first-aid box",
    when: { transports: ["car"] },
  },
  {
    id: "car-cash",
    category: "car-essentials",
    label: "Parking cash and a toll buffer",
    when: { transports: ["car"] },
  },

  {
    id: "ph-cloth",
    category: "photography",
    label: "Microfibre cloth for phone or lens",
    when: { types: scenicTypes },
  },
  {
    id: "ph-card",
    category: "photography",
    label: "Spare memory card",
    when: { types: scenicTypes },
  },
  {
    id: "ph-battery",
    category: "photography",
    label: "Spare camera battery (charged)",
    when: { types: scenicTypes },
  },
  {
    id: "ph-dry",
    category: "photography",
    label: "Dry bag or rain cover for camera",
    when: { types: scenicTypes, seasons: ["monsoon"] },
  },
  {
    id: "ph-phone-space",
    category: "photography",
    label: "Clear phone storage before you leave",
  },

  {
    id: "out-daypack",
    category: "outdoor-gear",
    label: "Daypack with a rain cover",
    when: { types: outdoorTypes },
  },
  {
    id: "out-pole",
    category: "outdoor-gear",
    label: "Trekking pole (if you use one)",
    when: { types: ["mountain", "adventure"] },
  },
  {
    id: "out-binos",
    category: "outdoor-gear",
    label: "Binoculars",
    when: { types: ["wildlife", "nature"] },
  },
  {
    id: "out-picnic",
    category: "outdoor-gear",
    label: "Picnic mat or sit pad",
    when: { types: ["nature"] },
  },
  {
    id: "out-bars",
    category: "outdoor-gear",
    label: "Energy bars or dry fruit",
    when: { types: ["adventure", "mountain"] },
  },
  {
    id: "out-headlamp",
    category: "outdoor-gear",
    label: "Spare batteries for headlamp",
    when: { types: ["mountain", "adventure", "wildlife"], durations: overnight },
  },
  {
    id: "out-layers",
    category: "outdoor-gear",
    label: "Extra warm layer for altitude or wind",
    when: { types: ["mountain"], seasons: ["winter", "spring-autumn"] },
  },
];

function inList<T extends string>(allowed: T[] | undefined, value: T): boolean {
  return !allowed || allowed.length === 0 || allowed.includes(value);
}

export function itemMatchesSelection(
  item: PackingItemDef,
  selection: PackingSelection,
): boolean {
  const when = item.when;
  if (!when) {
    return true;
  }
  const checks: boolean[] = [];
  if (when.durations) {
    checks.push(inList(when.durations, selection.duration));
  }
  if (when.seasons) {
    checks.push(inList(when.seasons, selection.season));
  }
  if (when.types) {
    checks.push(inList(when.types, selection.tripType));
  }
  if (when.transports) {
    checks.push(inList(when.transports, selection.transport));
  }
  if (checks.length === 0) {
    return true;
  }
  return when.match === "any" ? checks.some(Boolean) : checks.every(Boolean);
}

export function generatePackingItems(
  selection: PackingSelection,
): PackingItemDef[] {
  return catalog.filter((item) => itemMatchesSelection(item, selection));
}

export function isPackingDuration(value: string): value is PackingDuration {
  return packingDurations.some((item) => item.value === value);
}

export function isPackingSeason(value: string): value is PackingSeason {
  return packingSeasons.some((item) => item.value === value);
}

export function isPackingTripType(value: string): value is PackingTripType {
  return packingTripTypes.some((item) => item.value === value);
}

export function isPackingTransport(value: string): value is PackingTransport {
  return packingTransports.some((item) => item.value === value);
}

export function isPackingCategory(value: string): value is PackingCategory {
  return packingCategoryOrder.includes(value as PackingCategory);
}

export function selectionLabels(selection: PackingSelection): string {
  const duration =
    packingDurations.find((item) => item.value === selection.duration)?.label ??
    selection.duration;
  const season =
    packingSeasons.find((item) => item.value === selection.season)?.label ??
    selection.season;
  const tripType =
    packingTripTypes.find((item) => item.value === selection.tripType)?.label ??
    selection.tripType;
  const transport =
    packingTransports.find((item) => item.value === selection.transport)
      ?.label ?? selection.transport;
  return `${duration} · ${season} · ${tripType} · ${transport}`;
}
