import { milestones, type Milestone, type Status } from "./milestones";
import { repos, type Repo } from "./repos";
import { tracks, type Track, type TrackId } from "./tracks";

export { milestones, repos, tracks };
export type { Milestone, Repo, Status, Track, TrackId };

const statusOrder: Record<Status, number> = { done: 0, now: 1, next: 2 };

export function getTrack(id: TrackId) {
  // Safe: TrackId can only be an id that exists in `tracks`.
  return tracks.find((t) => t.id === id)!;
}

/** "01", "02", … from the track's position in tracks.ts. */
export function chapterNumber(id: TrackId) {
  return String(tracks.findIndex((t) => t.id === id) + 1).padStart(2, "0");
}

export function milestonesIn(trackId: TrackId) {
  // filter() returns a fresh array, so sorting it in place is safe. sort() is
  // stable, so file order breaks ties.
  return milestones
    .filter((m) => m.track === trackId)
    .sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
}

export function getMilestone(slug: string) {
  return milestones.find((m) => m.slug === slug);
}

export function neighbours(milestone: Milestone) {
  const list = milestonesIn(milestone.track);
  const i = list.findIndex((m) => m.slug === milestone.slug);
  return { prev: list[i - 1], next: list[i + 1] };
}

export function evidenceFor(milestone: Milestone) {
  return milestone.evidence.map((id) => repos.find((r) => r.id === id)!);
}

/** Every repo with the milestones it proves — the reverse of `evidence`. */
export function evidenceIndex() {
  return repos.map((repo) => ({
    repo,
    proves: milestones.filter((m) => m.evidence.includes(repo.id)),
  }));
}

export function counts() {
  const by = (s: Status) => milestones.filter((m) => m.status === s).length;
  const linked = new Set(milestones.flatMap((m) => m.evidence)).size;
  return {
    done: by("done"),
    now: by("now"),
    next: by("next"),
    repos: repos.length,
    reposLinked: linked,
  };
}
