import type { RepoId } from "./repos";
import type { TrackId } from "./tracks";

export type Status = "done" | "now" | "next";

export type Milestone = {
  /** URL segment: lowercase letters, digits, hyphens. */
  slug: string;
  track: TrackId;
  /** The capability, in your words: "Built JWT auth with refresh tokens". */
  title: string;
  status: Status;
  /** Repos that prove it. A `done` milestone needs at least one. */
  evidence: readonly RepoId[];
  /** What you built. Blank lines start new paragraphs. */
  what?: string;
  /** What clicked — the idea you didn't have before. */
  learned?: string;
  /** What you'd do differently now. */
  wouldChange?: string;
};

// Order within a track is status first (done → now → next), then this order.
export const milestones: readonly Milestone[] = [
  {
    slug: "react-router-site-with-motion",
    track: "frontend",
    title: "Build a React Router v8 site with Motion",
    status: "now",
    evidence: ["portfolio"],
  },
];
