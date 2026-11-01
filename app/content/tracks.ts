export type Track = {
  id: string;
  name: string;
  blurb?: string;
};

// Order here is the order on the page, and sets each track's chapter number.
const trackList = [
  {
    id: "systems",
    name: "Public Systems & Digital Initiatives",
    blurb:
      "Ongoing institutional systems, public sector digital infrastructure, and national data frameworks.",
  },
  {
    id: "frontend",
    name: "Frontend & Web Applications",
    blurb:
      "Production dashboards, interactive web tools, and responsive interfaces built with TypeScript and modern web standards.",
  },
  {
    id: "backend",
    name: "Backend & Systems",
    blurb:
      "Relational database schemas, CRUD operations, and secure server architectures.",
  },
  {
    id: "ml",
    name: "Machine Learning & AI",
    blurb:
      "Deep learning models, computer vision systems, and LLM-powered conversational pipelines.",
  },
] as const satisfies readonly Track[];

// `as const` keeps the literal ids so milestones can only point at real ones.
export type TrackId = (typeof trackList)[number]["id"];

// Re-exported with the wide type so optional fields like `blurb` stay readable.
export const tracks: readonly (Track & { id: TrackId })[] = trackList;

