export type Track = {
  id: string;
  name: string;
  blurb?: string;
};

// Order here is the order on the page, and sets each track's chapter number.
// Rename, reorder, add or remove freely.
const trackList = [
  { id: "frontend", name: "Frontend & UI" },
  { id: "backend", name: "Backend & APIs" },
  { id: "data", name: "Data & Databases" },
  { id: "ml", name: "Machine Learning" },
  { id: "shipping", name: "Shipping & DevOps" },
  { id: "practice", name: "Engineering Practice" },
] as const satisfies readonly Track[];

// `as const` keeps the literal ids so milestones can only point at real ones.
export type TrackId = (typeof trackList)[number]["id"];

// Re-exported with the wide type so optional fields like `blurb` stay readable.
export const tracks: readonly (Track & { id: TrackId })[] = trackList;
